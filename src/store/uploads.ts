import create from "zustand";

interface FileStatus {
  name: string;
  percentage: number;
}

interface UploadsState {
  files: FileStatus[];
  updateFile: (name: string, percentage: number) => void;
  clearFiles: () => void;
}

export const useUploadsStore = create<UploadsState>((set, get) => ({
  files: [],
  updateFile: (name: string, percentage: number) => {
    const files = get().files;

    const found = files.find((file) => file.name === name);
    if (found) {
      set((state) => ({
        files: state.files.map((file) =>
          file.name === name ? { ...file, percentage } : file
        ),
      }));
    } else {
      set((state) => ({
        ...state,
        files: [...state.files, { name, percentage }],
      }));
    }
  },
  clearFiles: () => set((state) => ({ files: [] })),
}));
