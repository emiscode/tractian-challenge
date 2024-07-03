"use client";

import "./globals.css";
import useSWR from "swr";
import { fetchCompanies } from "./actions";
import { useEffect } from "react";
import Button from "./components/Button";
import { useAssetStore } from "@/store/assetsStore";
import { AssetTree } from "./types";
import { FullScreenLoading } from "@/components/ui/FullScreenLoading";
import { Building2Icon, BuildingIcon } from "lucide-react";
import Logo from "@/components/svg/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: companiesData, isLoading } = useSWR(
    "companies",
    fetchCompanies
  );
  const {
    assets,
    addAsset,
    reset: resetAssetStore,
    updateSelectedAsset,
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
  }, [addAsset, companiesData]);

  return (
    <html lang="en">
      <body>
        {isLoading && <FullScreenLoading dark={true} />}
        <header className="flex justify-between items-center w-full px-6 py-4 shadow-md bg-background-blue">
          <div className="text-white text-xl font-semi">
            <Logo />
          </div>
          <div className="flex">
            {assets &&
              assets.map((asset: AssetTree) => (
                <Button
                  key={asset.companyId}
                  variant={asset.selected ? "secondary" : "primary"}
                  className="mx-2 text-muted-foreground flex gap-x-2 items-center"
                  onClick={() => updateSelectedAsset(asset)}
                >
                  <Building2Icon className="w-4 h-4 text-white" />
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
