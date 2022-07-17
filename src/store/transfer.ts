import create from "zustand";

interface Transfer {
  name: string;
  percentage: number;
  type: "upload" | "download";
}

interface TransferState {
  transfers: Transfer[];
  updateFile: (
    name: string,
    percentage: number,
    type: "upload" | "download"
  ) => void;
  clear: () => void;
}

export const useTransferStore = create<TransferState>((set, get) => ({
  transfers: [],
  updateFile: (
    name: string,
    percentage: number,
    type: "upload" | "download"
  ) => {
    const files = get().transfers;

    const found = files.find((file) => file.name === name);
    if (found) {
      set((state) => ({
        transfers: state.transfers.map((file) =>
          file.name === name ? { ...file, percentage } : file
        ),
      }));
    } else {
      set((state) => ({
        ...state,
        transfers: [...state.transfers, { name, percentage, type }],
      }));
    }
  },
  clear: () => set(() => ({ transfers: [] })),
}));
