"use client";

import React from "react";
import TreeView from "./TreeView";

interface SidebarProps {
  treeData: any[];
  onSelectNode: (node: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ treeData, onSelectNode }) => {
  return (
    <aside className="w-1/2 bg-slate-50 pt-4 pb-4 border border-gray-200">
      <TreeView data={treeData} onSelectNode={onSelectNode} />
    </aside>
  );
};

export default Sidebar;
