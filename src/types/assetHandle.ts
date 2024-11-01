import { DateState } from ".";
import { DeleteEnum } from "./enums";
import {
  AssetStatusEnum,
  AssetTypeEnum,
  DisposalTypeEnum,
} from "./enums/asset";

export interface AssetHandleData {
  content: string;
  deptId: number;
  deptName: string;
  id: number;
  isDelete: DeleteEnum;
  list: AssetHandleItem[];
  manageAmount: string;
  manageType: DisposalTypeEnum;
  operationDate: string;
  remark: string;
  storageArea: string;
  type: AssetTypeEnum;
  userId: number;
  userName: string;
  positionId: number;
  position: string;
}

export interface AssetHandleItem {
  assetId: number;
  brand: string;
  id?: number;
  model: string;
  name: string;
  operationId?: number;
  remark?: string;
  status: AssetStatusEnum;
  userId: number | null;
}

export type AssetHandleField = Partial<
  Pick<AssetHandleData, "type" | "userId" | "id"> & DateState
>;
