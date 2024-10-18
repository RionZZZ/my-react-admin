import { DeleteEnum } from "./enums";

export interface AreaData {
  id: number | null;
  name: string;
  parentId: number | null;
  parentName: string | null;
  areaList: AreaData[];
  isDelete: DeleteEnum;
}

export type AreaField = Partial<Pick<AreaData, "name">>;
