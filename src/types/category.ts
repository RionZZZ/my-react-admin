import { DeleteEnum } from "./enums";

export interface CategoryData {
  id: number | null;
  name: string;
  parentId: number | null;
  parentName: string | null;
  assetClassList: CategoryData[];
  isDelete: DeleteEnum;
}

export type CategoryField = Partial<Pick<CategoryData, "name">>;
