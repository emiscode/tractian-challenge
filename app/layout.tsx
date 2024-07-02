"use client";

import Link from "next/link";
import "./globals.css";
import useSWR from "swr";
import { fetchCompanies } from "./actions";
import { useEffect, useState } from "react";
import Company from "./types";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { data: companiesData } = useSWR("companies", fetchCompanies);

  useEffect(() => {
    setCompanies(companiesData);
  }, [companiesData]);

  return (
    <html lang="en">
      <body>
        <header className="flex justify-between items-center w-full px-6 py-4 shadow-md">
          <div>Tractian</div>
          <div className="flex">
            {companiesData &&
              companiesData.map((company: Company) => (
                <button key={company.id} className="mx-2 text-muted-foreground">
                  {company.name}
                </button>
              ))}
          </div>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
