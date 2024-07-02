export interface Company {
  id: string;
  name: string;
}

export interface AssetTree {
  companyId: string;
  companyName: string;
  selected: boolean;
}
