import { FC, useEffect, useState } from "react";
import { Form, Input, TreeSelect } from "antd";
import { DeptData } from "@/types/dept";
import { formatTreeData } from "@/utils/app";
import { HandleModal } from "@/component/handle";
import { ModalPropState } from "@/types";

interface PropState {
  tree?: DeptData[];
}

const DeptModal: FC<ModalPropState<DeptData> & PropState> = (props) => {
  const { initialData, tree } = props;
  const [treeData, setTreeData] = useState<DeptData[]>([]);
  useEffect(() => {
    if (tree) {
      const data = JSON.parse(JSON.stringify(tree));
      setTreeData(
        formatTreeData(
          data,
          "deptList",
          initialData?.id
        ) as unknown as DeptData[]
      );
    }
  }, [initialData, tree]);

  return (
    <HandleModal<DeptData> {...props}>
      <Form.Item<DeptData>
        label="部门名称"
        name="name"
        rules={[{ required: true, message: "请输入部门名称！" }]}
      >
        <Input placeholder="请输入部门名称" />
      </Form.Item>
      {initialData?.parentId !== 0 && (
        <Form.Item<DeptData>
          label="上级部门"
          name="parentId"
          rules={[{ required: true, message: "请选择上级部门！" }]}
        >
          <TreeSelect
            placeholder="请选择上级部门"
            treeData={treeData}
            fieldNames={{ label: "name", value: "id", children: "deptList" }}
          />
        </Form.Item>
      )}
    </HandleModal>
  );
};

export default DeptModal;
