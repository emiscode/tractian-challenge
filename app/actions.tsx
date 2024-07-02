"use server";

const API_BASE_URL = "http://localhost:3000";

export const fetchCompanies = async () => {
  const response = await fetch(`${API_BASE_URL}/api/companies`);
  return response.json();
};

export const fetchLocations = async (companyId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/companies/${companyId}/locations`
  );
  return response.json();
};

export const fetchAssets = async (companyId: string) => {
  const response = await fetch(`${API_BASE_URL}/companies/${companyId}/assets`);
  return response.json();
};
