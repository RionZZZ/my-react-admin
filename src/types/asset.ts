import { AssetSourceEnum, AssetStatusEnum, DeleteEnum } from "./enums";

export interface AssetData {
  id: number | null;
  name: string;
  assetClassId: number | null;
  positionId: number | null;
  isDelete: DeleteEnum;
  createTime: string;
  remark?: string;
  model: string;
  brand: string;
  unit: string;
  assetValue: string;
  serialNumber: string;
  position: string;
  deptId: number | null;
  adminId: number | null;
  userId: number | null;
  assetSource: AssetSourceEnum;
  buyDate: string;
  supplier: string;
  timeLimit: string;
  status: AssetStatusEnum;
  assetClassName: string;
  deptName: string;
  labelId: string;
}

export type AssetSearchField = Partial<
  Pick<AssetData, "assetClassId" | "positionId">
>;

export type AssetField = Partial<Pick<AssetData, "name" | "status" | "id">>;
