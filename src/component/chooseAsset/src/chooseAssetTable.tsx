import { AssetData } from "@/types/asset";
import { Button, Table, TableProps, Typography } from "antd";
import { FC, useState } from "react";
import ChooseAssetModal from "./chooseAssetModal";
import useCommonStyles from "@/style/common";
import { PlusCircleFilled } from "@ant-design/icons";
import { useBoolean } from "ahooks";
import { useMessage } from "@/hooks/useMessage";

const ChooseAssetTable: FC = () => {
  const [
    modalVisible,
    { setFalse: setModalVisibleFalse, setTrue: setModalVisibleTrue },
  ] = useBoolean(false);
  const columns: TableProps<AssetData>["columns"] = [
    {
      title: "资产编码",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "资产名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "规格型号",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "品牌",
      dataIndex: "brand",
      key: "brand",
    },
  ];

  const { createMessage } = useMessage();
  const [assetData, setAssetData] = useState<AssetData[]>([]);
  const addAsset = (asset: AssetData) => {
    if (assetData.find((data) => data.id === asset.id)) {
      createMessage.warning("列表中已存在选中的资产，请选择其他资产！");
      return;
    }
    setAssetData([...assetData, asset]);
    setModalVisibleFalse();
  };

  const { styles: commonStyles } = useCommonStyles();
  return (
    <>
      <div className={commonStyles.spaceBetween}>
        <Typography.Title level={4}>选择资产</Typography.Title>
        <Button
          type="primary"
          icon={<PlusCircleFilled />}
          onClick={setModalVisibleTrue}
        >
          添加资产
        </Button>
      </div>
      <Table<AssetData>
        columns={columns}
        dataSource={assetData as AssetData[]}
        rowKey="id"
        pagination={false}
        rowSelection={{ type: "checkbox" }}
      />
      <ChooseAssetModal
        visible={modalVisible}
        close={setModalVisibleFalse}
        handleSubmit={addAsset}
      />
    </>
  );
};

export default ChooseAssetTable;
