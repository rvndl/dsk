import create from "zustand";

interface Item {
  path: string;
}

interface SelectedItemsState {
  items: Item[];
  add: (path: string) => void;
  remove: (path: string) => void;
  clear: () => void;
}

export const useSelectedItemsStore = create<SelectedItemsState>((set) => ({
  items: [],
  add: (path: string) =>
    set((state) => ({ items: [...state.items, { path }] })),
  remove: (path: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.path !== path),
    })),
  clear: () => set(() => ({ items: [] })),
}));
