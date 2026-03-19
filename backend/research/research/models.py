"""Model definition module."""

import argparse

import torch

import npfl138
from npfl138.datasets.mnist import MNIST


class Model(npfl138.TrainableModule):
    def __init__(self, args: argparse.Namespace) -> None:
        super().__init__()
        self.backbone = Model.Backbone(in_channels=MNIST.C)
        self.direct = Model.Direct()
        self.indirect = Model.Indirect()

        self.binary_loss: torch.nn.BCELoss = torch.nn.BCELoss()
        self.categorical_loss: torch.nn.CrossEntropyLoss = torch.nn.CrossEntropyLoss()

    def forward(
        self, first: torch.Tensor, second: torch.Tensor,
    ) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor, torch.Tensor]:

        fmap1, fmap2 = self.backbone(first), self.backbone(second)
        direct_comparison = self.direct(fmap1, fmap2)
        digit_1, digit_2, indirect_comparison = self.indirect(fmap1, fmap2)

        return direct_comparison, digit_1, digit_2, indirect_comparison

    def compute_loss(self, y_pred, y_true, *inputs):
        direct_comparison_pred, digit_1_pred, digit_2_pred, indirect_comparison_pred = y_pred
        digit_1_true, digit_2_true = y_true
        comparison_true = (digit_1_true > digit_2_true).to(torch.float32)

        # direct_comparison_pred is a probability (post-sigmoid),
        # digit_1_pred and digit_2_pred are 10-class logits.
        direct_comparison_loss = self.binary_loss(direct_comparison_pred, comparison_true)
        digit_1_loss = self.categorical_loss(digit_1_pred, digit_1_true)
        digit_2_loss = self.categorical_loss(digit_2_pred, digit_2_true)

        return direct_comparison_loss + digit_1_loss + digit_2_loss

    def compute_metrics(self, y_pred, y_true, *inputs):
        direct_comparison_pred, digit_1_pred, digit_2_pred, indirect_comparison_pred = y_pred
        digit_1_true, digit_2_true = y_true
        comparison_true = (digit_1_true > digit_2_true).to(torch.bool)

        self.metrics["direct_comparison"].update(direct_comparison_pred > 0.5, comparison_true)
        self.metrics["indirect_comparison"].update(indirect_comparison_pred, comparison_true)

        return {name: metric for name, metric in self.metrics.items()}


    class Backbone(npfl138.TrainableModule):
        def __init__(self, in_channels):
            super().__init__()
            self.model = torch.nn.Sequential(
                torch.nn.Conv2d(
                    in_channels=in_channels,
                    out_channels=10,
                    kernel_size=3,
                    stride=2,
                    padding=0,
                ),
                torch.nn.ReLU(),
                torch.nn.Conv2d(
                    in_channels=10,
                    out_channels=20,
                    kernel_size=3,
                    stride=2,
                    padding=0,
                ),
                torch.nn.ReLU(),
                torch.nn.Flatten(),
                torch.nn.LazyLinear(out_features=200),
                torch.nn.ReLU()
            )

        def forward(self, x: torch.Tensor) -> torch.Tensor:
            return self.model(x)

    class Direct(npfl138.TrainableModule):
        def __init__(self):
            super().__init__()
            self.linear = torch.nn.LazyLinear(200)
            self.output = torch.nn.Linear(in_features=200, out_features=1)
            self.relu = torch.nn.ReLU()
            self.sigmoid = torch.nn.Sigmoid()
        
        def forward(self, fmap1: torch.Tensor, fmap2: torch.Tensor)-> torch.Tensor:
            # fmap1 and fmap2 are of shape [B, 200] and [B, 200] -> [B, 400]
            concat = torch.cat([fmap1, fmap2], dim=1)
            x = self.linear(concat)
            x = self.relu(x)
            x = self.output(x)
            x = self.sigmoid(x)

            # Reshape to 1D [B, 1] -> [B]
            direct_comparison = x.reshape(-1)
            return direct_comparison


    class Indirect(npfl138.TrainableModule):
        def __init__(self):
            super().__init__()
            # This layer will have two images pass through it at the same time in one forward pass
            self.linear = torch.nn.LazyLinear(MNIST.LABELS)
        
        def forward(self, fmap1: torch.Tensor, fmap2: torch.Tensor) -> tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
            digit1 = self.linear(fmap1)
            digit2 = self.linear(fmap2)

            ind1 = torch.argmax(digit1, dim=1)  # Skip the batch dim
            ind2 = torch.argmax(digit2, dim=1)  # Skip the batch dim
            indirect_comparison = ind1 > ind2

            return digit1, digit2, indirect_comparison