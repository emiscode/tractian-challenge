import { persist } from "zustand/middleware";

import { managedStoreCreate } from "@/store/storeManager";
import { AssetTree } from "@/app/types";

interface AssetState {
  updated: string;
  assets: AssetTree[];
  isFiltered: boolean;
}

interface AssetActions {
  reset: () => void;
  setUpdated: () => void;
  addAsset: (asset: AssetTree) => void;
  updateSelectedAsset: (asset: AssetTree) => void;
  setIsFiltered: (isFiltered: boolean) => void;
}

type AssetStore = AssetState & AssetActions;

const initialState: AssetState = {
  updated: "",
  assets: [],
  isFiltered: false,
};

export const useAssetStore = managedStoreCreate<AssetStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      addAsset: (asset: AssetTree) => {
        set((state) => ({ assets: [...state.assets, asset] }));
        get().setUpdated();
      },
      updateSelectedAsset: (selectedAsset: AssetTree) => {
        set((state) => ({
          assets: state.assets.map((currentAsset: AssetTree) =>
            currentAsset.companyId === selectedAsset.companyId
              ? { ...currentAsset, selected: true }
              : { ...currentAsset, selected: false }
          ),
        }));
        get().setUpdated();
        get().setIsFiltered(false);
      },
      setUpdated: () => set({ updated: new Date().toISOString() }),
      setIsFiltered: (isFiltered: boolean) => set({ isFiltered }),
      reset: () => set(initialState),
    }),
    {
      name: "asset-store",
      partialize: (state) => state,
    }
  )
);
