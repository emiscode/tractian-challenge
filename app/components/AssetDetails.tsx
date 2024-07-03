"use client";

import React from "react";
import AssetStatusIndicator from "./AssetStatusIndicator";
import AssetStatusBadge from "./AssetStatusBadge";

interface AssetDetailsProps {
  asset: any;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ asset }) => {
  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          {asset.name}
          <AssetStatusIndicator status={asset.status} />
        </h2>
      </div>
      <div className="space-y-2">
        {asset.type && (
          <div>
            <strong>Type:</strong> {asset.type}
          </div>
        )}
        {asset.sensorId && (
          <div>
            <strong>Sensor:</strong> {asset.sensorId}
          </div>
        )}
        {asset.status && (
          <div>
            <strong>Status:</strong>{" "}
            <AssetStatusBadge variant={asset.status}>
              {asset.status}
            </AssetStatusBadge>
          </div>
        )}
        {asset.gatewayId && (
          <div>
            <strong>Gateway:</strong> {asset.gatewayId}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDetails;
