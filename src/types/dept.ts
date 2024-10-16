import { DeleteEnum } from "./enums";

export interface DeptData {
  id: number | null;
  name: string;
  parentId: number | null;
  parentName: string | null;
  deptList: DeptData[];
  isDelete: DeleteEnum;
}

export type DeptField = Partial<Pick<DeptData, "name">>;
