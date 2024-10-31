import { FC } from "react";
import { AssetStatusEnum } from "@/types/enums/asset";
import { Tag } from "antd";

interface AssetStatusProps {
  status: AssetStatusEnum;
}

const assetStatusMap = new Map([
  [AssetStatusEnum.IDLE, { label: "闲置", color: "volcano" }],
  [AssetStatusEnum.RECEIVE, { label: "在用", color: "green" }],
  [AssetStatusEnum.BORROW, { label: "借用", color: "green" }],
  [AssetStatusEnum.DISPOSAL, { label: "已处置", color: "volcano" }],
  [AssetStatusEnum.MAINTENANCE, { label: "维护", color: "volcano" }],
]);

const AssetStatus: FC<AssetStatusProps> = ({ status }) => {
  const assetStatus = assetStatusMap.get(status);
  return <Tag color={assetStatus?.color}>{assetStatus?.label}</Tag>;
};

export default AssetStatus;
