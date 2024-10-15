export interface DeptData {
  id: number | null;
  name: string;
  parentId: number | null;
  parentName: string | null;
  deptList: DeptData[];
  isDelete: number;
}

export type DeptField = Partial<Pick<DeptData, "name">>;
