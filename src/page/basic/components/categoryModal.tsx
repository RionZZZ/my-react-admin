import { FC, useEffect, useState } from "react";
import { Form, FormInstance, Input, TreeSelect } from "antd";
import { CategoryData } from "@/types/category";
import { formatTreeData } from "@/utils/app";
import { HandleModal } from "@/component/handle";
import { ModalPropState } from "@/types";

interface PropState {
  tree?: CategoryData[];
}

const CategoryModal: FC<ModalPropState<CategoryData> & PropState> = (props) => {
  const { initialData, tree } = props;
  const [treeData, setTreeData] = useState<CategoryData[]>([]);
  useEffect(() => {
    if (tree) {
      const data = JSON.parse(JSON.stringify(tree));
      setTreeData(
        formatTreeData(
          data,
          "assetClassList",
          initialData?.id
        ) as unknown as CategoryData[]
      );
    }
  }, [initialData, tree]);

  const formatData = (form: FormInstance) => {
    if (initialData && initialData.parentId === 0) {
      form.setFieldValue("parentId", null);
    }
  };

  const handleSubmitData = (data: CategoryData) => {
    const parentId = data.parentId ?? 0;
    return { ...data, parentId };
  };
  return (
    <HandleModal<CategoryData>
      {...props}
      handleSubmitData={handleSubmitData}
      formatData={formatData}
    >
      <Form.Item<CategoryData>
        label="资产分类名称"
        name="name"
        rules={[{ required: true, message: "请输入分类名称！" }]}
      >
        <Input placeholder="请输入分类名称" />
      </Form.Item>
      <Form.Item<CategoryData> label="上级分类" name="parentId">
        <TreeSelect
          placeholder="请选择上级分类"
          treeData={treeData}
          fieldNames={{
            label: "name",
            value: "id",
            children: "assetClassList",
          }}
          allowClear
        />
      </Form.Item>
    </HandleModal>
  );
};

export default CategoryModal;
