import { FC, useEffect, useState } from "react";
import { Form, FormInstance, Input, TreeSelect } from "antd";
import { AssetData } from "@/types/asset";
import { formatTreeData } from "@/utils/app";
import { HandleModal } from "@/component/handle";
import { ModalPropState } from "@/types";

interface PropState {
  tree?: AssetData[];
}

const ListModal: FC<ModalPropState<AssetData> & PropState> = (props) => {
  const { initialData, tree } = props;
  const [treeData, setTreeData] = useState<AssetData[]>([]);
  useEffect(() => {
    if (tree) {
      const data = JSON.parse(JSON.stringify(tree));
      setTreeData(
        formatTreeData(
          data,
          "areaList",
          initialData?.id
        ) as unknown as AssetData[]
      );
    }
  }, [initialData, tree]);

  const formatData = (form: FormInstance) => {
    // if (initialData && initialData.parentId === 0) {
    //   form.setFieldValue("parentId", null);
    // }
  };

  const handleSubmitData = (data: AssetData) => {
    // const parentId = data.parentId ?? 0;
    // return { ...data, parentId };
  };
  return (
    <HandleModal<AssetData>
      {...props}
      handleSubmitData={handleSubmitData}
      formatData={formatData}
    >
      <Form.Item<AssetData>
        label="区域名称"
        name="name"
        rules={[{ required: true, message: "请输入区域名称！" }]}
      >
        <Input placeholder="请输入区域名称" />
      </Form.Item>
      <Form.Item<AssetData> label="上级区域" name="positionId">
        <TreeSelect
          placeholder="请选择上级区域"
          treeData={treeData}
          fieldNames={{
            label: "name",
            value: "id",
            children: "areaList",
          }}
          allowClear
        />
      </Form.Item>
    </HandleModal>
  );
};

export default ListModal;
