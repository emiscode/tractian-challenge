"use client";

import "./globals.css";
import useSWR from "swr";
import { fetchCompanies } from "./actions";
import { useEffect } from "react";
import Button from "./components/Button";
import { useAssetStore } from "@/store/assetsStore";
import { AssetTree } from "./types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: companiesData } = useSWR("companies", fetchCompanies);
  const {
    assets,
    addAsset,
    reset: resetAssetStore,
    updateSelectedAsset,
    setIsFiltered,
  } = useAssetStore();

  useEffect(() => {
    resetAssetStore();
  }, [resetAssetStore]);

  useEffect(() => {
    if (!companiesData?.length) return;

    companiesData.forEach((company, index) => {
      addAsset({
        companyId: company.id,
        companyName: company.name,
        selected: index === 0,
      });
    });
  }, [addAsset, companiesData, setIsFiltered]);

  return (
    <html lang="en">
      <body>
        <header className="flex justify-between items-center w-full px-6 py-4 shadow-md bg-background-blue">
          <div className="text-white text-xl font-semi">Tractian</div>
          <div className="flex">
            {assets &&
              assets.map((asset: AssetTree) => (
                <Button
                  key={asset.companyId}
                  variant={asset.selected ? "secondary" : "primary"}
                  className="mx-2 text-muted-foreground"
                  onClick={() => updateSelectedAsset(asset)}
                >
                  {asset.companyName}
                </Button>
              ))}
          </div>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
