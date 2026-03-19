"""Training and evaluation module."""

import argparse

import torch
import torchmetrics

import npfl138
from npfl138.callbacks import SaveBestWeights
from npfl138.datasets.mnist import MNIST

from research.models import Model
from research.datasets import DatasetOfPairs


parser = argparse.ArgumentParser()
parser.add_argument("--batch_size", default=50, type=int, help="Batch size.")
parser.add_argument("--epochs", default=5, type=int, help="Number of epochs.")
parser.add_argument("--recodex", default=False, action="store_true", help="Evaluation in ReCodEx.")
parser.add_argument("--seed", default=42, type=int, help="Random seed.")
parser.add_argument("--threads", default=1, type=int, help="Maximum number of threads to use.")


def main(args: argparse.Namespace) -> dict[str, float]:
    # Set the random seed and the number of threads.
    npfl138.startup(args.seed, args.threads, args.recodex)
    npfl138.global_keras_initializers()

    # Load the data and create dataloaders.
    mnist = MNIST()

    train = torch.utils.data.DataLoader(DatasetOfPairs(mnist.train), batch_size=args.batch_size, shuffle=True)
    dev = torch.utils.data.DataLoader(DatasetOfPairs(mnist.dev), batch_size=args.batch_size)

    # Create the model and train it.
    model = Model(args)

    model.configure(
        optimizer=torch.optim.Adam(model.parameters()),
        metrics={
            "direct_comparison": torchmetrics.Accuracy("binary"),
            "indirect_comparison": torchmetrics.Accuracy("binary"),
        },
        logdir=npfl138.format_logdir("logs/{file-}{timestamp}{-config}", **vars(args)),
    )

    # Calls after each epoch
    def custom_callback(
        model: Model, epoch: int, logs: dict[str, float]
        ) -> None | npfl138.callback.StopTraining:
        ...
    callbacks = [
        SaveBestWeights(path="{logdir}/best_val_loss.pt", metric="dev:loss", mode="min"),
    ]

    logs = model.fit(train, dev=dev, epochs=args.epochs, callbacks=callbacks)

    # Return development metrics for ReCodEx to validate.
    return {metric: value for metric, value in logs.items() if metric.startswith("dev:")}


if __name__ == "__main__":
    main_args = parser.parse_args([] if "__file__" not in globals() else None)
    main(main_args)
