"use client";

import { useAssetStore } from "@/store/assetsStore";
import Button from "./Button";
import { useEffect, useState } from "react";
import { fetchAssets, fetchLocations } from "../actions";
import Sidebar from "./Sidebar";
import AssetContent from "./AssetContent";

export default function Assets() {
  const { assets } = useAssetStore();
  const [treeData, setTreeData] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const selectedAsset = assets.find((asset) => asset.selected);

  const handleSelectNode = (node: any) => {
    setSelectedNode(node);
  };

  useEffect(() => {
    const loadData = async () => {
      if (!selectedAsset) return;

      const locationsData = await fetchLocations(selectedAsset.companyId);
      const assetsData = await fetchAssets(selectedAsset.companyId);

      // Structure data
      const locationsMap = new Map();
      const assetsMap = new Map();

      locationsData.forEach((location: any) => {
        locationsMap.set(location.id, {
          ...location,
          type: "location",
          children: [],
        });
      });

      assetsData.forEach((asset: any) => {
        const type = asset.sensorType ? "component" : "asset";
        assetsMap.set(asset.id, {
          ...asset,
          type,
          children: [],
        });
      });

      // Build tree
      const tree: any = [];

      locationsData.forEach((location: any) => {
        if (location.parentId) {
          locationsMap
            .get(location.parentId)
            .children.push(locationsMap.get(location.id));
        } else {
          tree.push(locationsMap.get(location.id));
        }
      });

      assetsData.forEach((asset: any) => {
        if (asset.parentId) {
          if (assetsMap.has(asset.parentId)) {
            assetsMap
              .get(asset.parentId)
              .children.push(assetsMap.get(asset.id));
          }
        } else if (asset.locationId) {
          if (locationsMap.has(asset.locationId)) {
            locationsMap
              .get(asset.locationId)
              .children.push(assetsMap.get(asset.id));
          }
        } else {
          tree.push(assetsMap.get(asset.id));
        }
      });

      setTreeData(tree);
    };

    loadData();
  }, [selectedAsset]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex justify-between items-center">
        <h1>Ativos / {selectedAsset?.companyName}</h1>
        <div className="flex gap-x-4">
          <Button variant="outline">Sensor de Energia</Button>
          <Button variant="outline">Crítico</Button>
        </div>
      </div>
      <div className="w-full flex gap-x-2">
        <Sidebar treeData={treeData} onSelectNode={handleSelectNode} />
        <AssetContent selectedNode={selectedNode} />
      </div>
    </div>
  );
}
