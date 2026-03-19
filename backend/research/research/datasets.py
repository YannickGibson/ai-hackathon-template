import torch


class DatasetOfPairs(torch.utils.data.Dataset):
    def __init__(self, dataset: torch.utils.data.Dataset):
        self._dataset = dataset

    def __len__(self):
        return self._dataset.__len__() // 2

    def __getitem__(
        self,
        index: int,
    ) -> tuple[tuple[torch.Tensor, torch.Tensor], tuple[torch.Tensor, torch.Tensor]]:
        return (
            (
                self._dataset[2 * index]["image"].to(torch.float32) / 255,
                self._dataset[2 * index + 1]["image"].to(torch.float32) / 255,
            ),
            (
                self._dataset[2 * index]["label"],
                self._dataset[2 * index + 1]["label"],
            ),
        )
