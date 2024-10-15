import { ReactElement, ReactNode, useEffect } from "react";
import { Form, Modal } from "antd";
import { ModalPropState } from "@/types";

interface PropState {
  children: ReactNode;
}

declare function HandleModalType<T>(
  props: PropState & ModalPropState<T>
): ReactElement;

const HandleModal: typeof HandleModalType = ({
  modalVisible,
  type,
  initialData,
  close,
  submit,
  children,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...initialData });
  }, [form, initialData]);

  const handleAfterClose = () => {
    form.resetFields();
  };

  const handleSubmit = (params: object) => {
    submit(Object.assign({}, initialData, params));
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
        {children}
      </Form>
    </Modal>
  );
};

export default HandleModal;
