import type { StateCreator } from "zustand";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const storeResetFns = new Set<() => void>();

export const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

export const managedStoreCreate = (<T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = create(subscribeWithSelector(stateCreator));
    const initialState = store.getState();
    storeResetFns.add(() => {
      store.setState(initialState, true);
    });
    return store;
  };
}) as typeof create;
