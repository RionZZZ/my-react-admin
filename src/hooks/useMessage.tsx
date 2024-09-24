import { TypeEnum } from "@/types/enums/type";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Modal, ModalFuncProps, message } from "antd";

const getIcon = (type: TypeEnum) => {
  switch (type) {
    case TypeEnum.INFO:
      return <InfoCircleFilled style={{ color: "#1677ff" }} />;
    case TypeEnum.SUCCESS:
      return <CheckCircleFilled style={{ color: "#52c41a" }} />;
    case TypeEnum.WARN:
      return <ExclamationCircleFilled style={{ color: "#faad14" }} />;
    case TypeEnum.ERROR:
      return <CloseCircleFilled style={{ color: "#ff4d4f" }} />;
    default:
      return <InfoCircleFilled style={{ color: "#1677ff" }} />;
  }
};

const createConfirm = (option: ModalFuncProps) => {
  const type: TypeEnum = (option.type as TypeEnum) || TypeEnum.INFO;
  const opt: ModalFuncProps = {
    title: "提示",
    style: { top: "30%" },
    icon: getIcon(type),
    type,
    okText: "确定",
    cancelText: "取消",
    ...option,
  };
  return Modal.confirm(opt);
};

export const useMessage = () => ({
  createConfirm,
  createMessage: message,
});
