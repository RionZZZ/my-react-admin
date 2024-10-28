import { AssetSourceEnum, AssetStatusEnum, DeleteEnum } from "./enums";

export interface AssetData {
  id: number | null;
  name: string;
  assetClassId: number | null;
  positionId: number | null;
  isDelete: DeleteEnum | null;
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
  adminName: string;
  userId: number | null;
  userName: string;
  assetSource: AssetSourceEnum | null;
  buyDate: string;
  expireDate: string;
  productDate: string;
  supplier: string;
  timeLimit: string;
  warrantyLimit: string;
  status: AssetStatusEnum | null;
  assetClassName: string;
  deptName: string;
  labelId: string;
}

export interface AssetState {
  assetInfo: Nullable<AssetData>;
}

export type AssetSearchField = Partial<
  Pick<AssetData, "assetClassId" | "positionId">
>;

export type AssetField = Partial<Pick<AssetData, "name" | "status" | "id">>;
