import { persist } from "zustand/middleware";

import { managedStoreCreate } from "@/store/storeManager";
import { AssetTree } from "@/app/types";

interface AssetState {
  updated: string;
  assets: AssetTree[];
}

interface AssetActions {
  reset: () => void;
  setUpdated: () => void;
  addAsset: (asset: AssetTree) => void;
  updateSelectedAsset: (asset: AssetTree) => void;
}

type AssetStore = AssetState & AssetActions;

const initialState: AssetState = {
  updated: "",
  assets: [],
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
      },
      setUpdated: () => set({ updated: new Date().toISOString() }),
      reset: () => set(initialState),
    }),
    {
      name: "asset-store",
      partialize: (state) => state,
    }
  )
);
