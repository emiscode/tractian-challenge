"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  CpuChipIcon,
  CubeIcon,
} from "@heroicons/react/16/solid";
import React, { useState } from "react";
import LocateIcon from "./LocateIcon";
import AssetIcon from "./AssetIcon";
import ComponentIcon from "./ComponentIcon";
import AssetStatusIndicator from "./AssetStatusIndicator";

interface TreeNodeProps {
  node: any;
  onSelectNode: (node: any) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, onSelectNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleSelect = () => onSelectNode(node);

  const renderIcon = () => {
    switch (node.type) {
      case "location":
        return <LocateIcon />;
      case "asset":
        return <AssetIcon />;
      case "component":
        return <ComponentIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="pl-4">
      <div
        onClick={handleToggle}
        className="cursor-pointer flex items-center space-x-2"
      >
        {node.children &&
          (isExpanded ? (
            <ChevronDownIcon className="h-5 w-5" />
          ) : (
            <ChevronRightIcon className="h-5 w-5" />
          ))}
        {renderIcon()}
        <div>
          <span onClick={handleSelect}>{node.name}</span>
          <AssetStatusIndicator status={node.status} />
        </div>
      </div>
      {isExpanded && node.children && (
        <div className="pl-4">
          {node.children.map((childNode: any) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              onSelectNode={onSelectNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
