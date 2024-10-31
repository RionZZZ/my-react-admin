import { HandleTypeEnum } from "./enums/type";

export interface ModalPropState<T> {
  title: string;
  modalVisible: boolean;
  type?: HandleTypeEnum;
  initialData?: T;
  close: () => void;
  submit: (data: T) => void;
}

export interface DateState {
  date: string[] | null;
  startTime: string;
  endTime: string;
}
