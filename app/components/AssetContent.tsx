"use client";

import React from "react";
import AssetDetails from "./AssetDetails";

interface AssetContentProps {
  selectedNode: any;
}

const AssetContent: React.FC<AssetContentProps> = ({ selectedNode }) => {
  return (
    <main className="flex w-full border border-gray-200">
      {selectedNode ? (
        <AssetDetails asset={selectedNode} />
      ) : (
        <div className="flex w-full justify-center p-4">
          <p className="text-gray-800 font-bold">
            Selecione um ativo para ver detalhes
          </p>
        </div>
      )}
    </main>
  );
};

export default AssetContent;
