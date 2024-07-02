"use client";

import { useAssetStore } from "@/store/assetsStore";
import Button from "./Button";

export default function Ativos() {
  const { assets } = useAssetStore();
  const companyName = assets.find((asset) => asset.selected)?.companyName;

  return (
    <div className="w-full flex justify-between items-center">
      <h1>Ativos / {companyName}</h1>
      <div className="flex gap-x-4">
        <Button variant="primary">Sensor de Energia</Button>
        <Button variant="primary">Crítico</Button>
      </div>
    </div>
  );
}
