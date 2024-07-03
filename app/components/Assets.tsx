"use client";

import { useAssetStore } from "@/store/assetsStore";
import Button from "./Button";
import { useEffect, useState } from "react";
import { fetchAssets, fetchLocations } from "../actions";
import Sidebar from "./Sidebar";
import AssetContent from "./AssetContent";

export default function Assets() {
  const { assets, isFiltered, setIsFiltered } = useAssetStore();
  const [treeData, setTreeData] = useState<any[]>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const selectedAsset = assets.find((asset) => asset.selected);
  const [isFilteredBySensor, setIsFilteredBySensor] = useState(false);
  const [isFilteredByAlert, setIsFilteredByAlert] = useState(false);

  const handleSelectNode = (node: any) => {
    setSelectedNode(node);
  };

  const filterAssets = (node: any, filter: "energy" | "alert"): any | null => {
    switch (filter) {
      case "energy":
        if (node.sensorType === filter) {
          return { ...node };
        }
        break;
      case "alert":
        if (node.status === filter) {
          return { ...node };
        }
        break;
    }

    const filteredChildren = node.children
      .map((child: any) => filterAssets(child, filter))
      .filter(Boolean) as any[];

    if (filteredChildren.length > 0) {
      return { ...node, children: filteredChildren };
    }

    return null;
  };

  const handleFilterSensorClick = () => {
    if (isFilteredBySensor) {
      setIsFilteredBySensor(false);
      setIsFiltered(false);
      return;
    }

    const filteredTree = filterAssets(treeData[0], "energy");

    if (filteredTree) {
      setTreeData([filteredTree]);
      setIsFilteredBySensor(true);
      setIsFiltered(true);
    }
  };

  const handleFilterAlertClick = () => {
    if (isFilteredByAlert) {
      setIsFilteredByAlert(false);
      setIsFiltered(false);
      return;
    }

    const filteredTree = filterAssets(treeData[0], "alert");

    if (filteredTree) {
      setTreeData([filteredTree]);
      setIsFilteredByAlert(true);
      setIsFiltered(true);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!selectedAsset) return;

      const locationsData = await fetchLocations(selectedAsset.companyId);
      const assetsData = await fetchAssets(selectedAsset.companyId);

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

    if (isFiltered) return;
    setIsFilteredBySensor(false);
    setIsFilteredByAlert(false);
    loadData();
  }, [selectedAsset, isFiltered]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold">
          Ativos{" "}
          <span className="text-gray-600 font-normal">
            / {selectedAsset?.companyName}
          </span>
        </h1>
        <div className="flex gap-x-4">
          <Button
            variant={isFilteredBySensor ? "secondary" : "outline"}
            onClick={handleFilterSensorClick}
          >
            Sensor de Energia
          </Button>
          <Button
            variant={isFilteredByAlert ? "secondary" : "outline"}
            onClick={handleFilterAlertClick}
          >
            Crítico
          </Button>
        </div>
      </div>
      <div className="w-full flex gap-x-2">
        <Sidebar treeData={treeData} onSelectNode={handleSelectNode} />
        <AssetContent selectedNode={selectedNode} />
      </div>
    </div>
  );
}
