import { FC, useEffect, useState } from "react";
import { Form, Input, Modal, TreeSelect } from "antd";
import { HandleTypeEnum } from "@/types/enums/type";
import { DeptData } from "@/types/dept";
import { formatTreeData } from "@/utils/app";

interface PropState {
  modalVisible: boolean;
  type?: HandleTypeEnum;
  initialData?: DeptData;
  close: () => void;
  submit: (data: DeptData) => void;
  tree?: DeptData[];
}

const DeptModal: FC<PropState> = ({
  modalVisible,
  type,
  initialData,
  close,
  submit,
  tree,
}) => {
  const [form] = Form.useForm();

  const [treeData, setTreeData] = useState<DeptData[]>([]);
  useEffect(() => {
    form.setFieldsValue({ ...initialData });
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
  }, [form, initialData, tree]);

  const handleAfterClose = () => {
    form.resetFields();
  };

  const handleSubmit = (params: DeptData) => {
    submit({ ...initialData, ...params });
  };
  return (
    <Modal
      open={modalVisible}
      title={`${type}`}
      width="600px"
      okText="保存"
      cancelText="取消"
      onCancel={close}
      onOk={form.submit}
      destroyOnClose
      forceRender
      afterClose={handleAfterClose}
    >
      <Form form={form} labelCol={{ span: 5 }} onFinish={handleSubmit}>
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
      </Form>
    </Modal>
  );
};

export default DeptModal;
