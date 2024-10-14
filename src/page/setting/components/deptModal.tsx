import { FC } from "react";
import { Form, Input, Modal } from "antd";
import { HandleTypeEnum } from "@/types/enums/type";
import { DeptData } from "@/types/dept";

interface PropState {
  modalVisible: boolean;
  type?: HandleTypeEnum;
  initialData?: DeptData;
  close: () => void;
  submit: (data: DeptData) => void;
}

const DeptModal: FC<PropState> = (props) => {
  const { modalVisible, type, initialData, close, submit } = props;

  const [form] = Form.useForm();

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
    >
      <Form
        form={form}
        initialValues={initialData}
        labelCol={{ span: 5 }}
        onFinish={submit}
      >
        <Form.Item<DeptData>
          label="部门名称"
          name="name"
          rules={[{ required: true, message: "请输入部门名称！" }]}
        >
          <Input placeholder="请输入部门名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeptModal;
