export interface DeptData {
  id: number | null;
  name: string;
  parentId: number | null;
  parentName: string | null;
  deptList: DeptData[];
  isDelete: number;
}

export interface DeptField {
  name: string;
}
