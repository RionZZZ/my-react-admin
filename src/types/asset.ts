import { DeleteEnum } from "./enums";

export interface AssetData {
  id: number | null;
  name: string;
  assetClassId: number | null;
  positionId: number | null;
  isDelete: DeleteEnum;
  createTime: string;
}

export type AssetSearchField = Partial<
  Pick<AssetData, "assetClassId" | "positionId">
>;

export type AssetField = Partial<Pick<AssetData, "name">>;
