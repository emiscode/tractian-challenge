"use client";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  CpuChipIcon,
  CubeIcon,
} from "@heroicons/react/16/solid";
import { LocateIcon } from "lucide-react";
import React, { useState } from "react";

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
        return <LocateIcon className="h-5 w-5 text-blue-500" />;
      case "asset":
        return <CubeIcon className="h-5 w-5 text-green-500" />;
      case "component":
        return <CpuChipIcon className="h-5 w-5 text-yellow-500" />;
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
        <span onClick={handleSelect}>{node.name}</span>
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
