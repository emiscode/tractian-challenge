"use client";

import React from "react";

interface AssetDetailsProps {
  asset: any;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ asset }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{asset.name}</h2>
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
            <strong>Status:</strong> {asset.status}
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
