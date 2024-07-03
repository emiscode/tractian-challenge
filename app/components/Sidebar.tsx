"use client";

import React, { useCallback, useEffect, useState } from "react";
import TreeView from "./TreeView";
import { useAssetStore } from "@/store/assetsStore";

interface SidebarProps {
  treeData: any[];
  onSelectNode: (node: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ treeData, onSelectNode }) => {
  const [filteredData, setFilteredData] = useState<any[]>(treeData);
  const { isFiltered, setIsFiltered } = useAssetStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredData(treeData);
    console.log({ treeData });
  }, [treeData]);

  const filterAssets = useCallback((node: any, filter: string) => {
    if (node.name.toLowerCase().includes(filter.toLocaleLowerCase())) {
      return { ...node };
    }

    const filteredChildren = node.children
      .map((child: any) => filterAssets(child, filter))
      .filter(Boolean) as any[];

    if (filteredChildren.length > 0) {
      return { ...node, children: filteredChildren };
    }

    return null;
  }, []);

  const handleFilterBySearch = (event: any) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      const newFilteredData = treeData
        .map((node) => filterAssets(node, searchQuery))
        .filter(Boolean) as any[];
      setFilteredData(newFilteredData);
      setIsFiltered(true);
    } else {
      setFilteredData(treeData);
    }
  }, [filterAssets, searchQuery, treeData, setIsFiltered]);

  useEffect(() => {
    if (isFiltered || searchQuery) return;
    setFilteredData(treeData);
    setSearchQuery("");
  }, [isFiltered, treeData, searchQuery]);

  return (
    <aside className="w-1/2 bg-slate-50 pb-4 border border-gray-200">
      <input
        type="text"
        value={searchQuery}
        placeholder="Buscar ativo ou local"
        className="w-full p-2 pl-4 border-b border-gray-200"
        onChange={handleFilterBySearch}
      />
      <TreeView data={filteredData} onSelectNode={onSelectNode} />
    </aside>
  );
};

export default Sidebar;
