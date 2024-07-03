"use client";

import React from "react";
import TreeNode from "./TreeNode";

interface TreeViewProps {
  data: any[];
  onSelectNode: (node: any) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onSelectNode }) => {
  return (
    <div className="pt-4">
      {data &&
        data.length > 0 &&
        data.map((node, index) => (
          <TreeNode key={index} node={node} onSelectNode={onSelectNode} />
        ))}
    </div>
  );
};

export default TreeView;
