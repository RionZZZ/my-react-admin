import { FC, useEffect, useState } from "react";
import { Form, FormInstance, Input, TreeSelect } from "antd";
import { AreaData } from "@/types/area";
import { formatTreeData } from "@/utils/app";
import { HandleModal } from "@/component/handle";
import { ModalPropState } from "@/types";

interface PropState {
  tree?: AreaData[];
}

const AreaModal: FC<ModalPropState<AreaData> & PropState> = (props) => {
  const { initialData, tree } = props;
  const [treeData, setTreeData] = useState<AreaData[]>([]);
  useEffect(() => {
    if (tree) {
      const data = JSON.parse(JSON.stringify(tree));
      setTreeData(
        formatTreeData(
          data,
          "areaList",
          initialData?.id
        ) as unknown as AreaData[]
      );
    }
  }, [initialData, tree]);

  const formatData = (form: FormInstance) => {
    if (initialData && initialData.parentId === 0) {
      form.setFieldValue("parentId", null);
    }
  };

  const handleSubmitData = (data: AreaData) => {
    const parentId = data.parentId ?? 0;
    return { ...data, parentId };
  };
  return (
    <HandleModal<AreaData>
      {...props}
      handleSubmitData={handleSubmitData}
      formatData={formatData}
    >
      <Form.Item<AreaData>
        label="区域名称"
        name="name"
        rules={[{ required: true, message: "请输入区域名称！" }]}
      >
        <Input placeholder="请输入区域名称" />
      </Form.Item>
      <Form.Item<AreaData> label="上级区域" name="parentId">
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

export default AreaModal;
