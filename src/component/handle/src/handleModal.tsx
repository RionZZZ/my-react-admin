import { ReactElement, ReactNode, useEffect } from "react";
import { Form, Modal } from "antd";
import { ModalPropState } from "@/types";
import { HandleTypeEnum } from "@/types/enums/type";
import useCustomStyles from "@/style/custom";

interface PropState {
  children: ReactNode;
}

declare function HandleModalType<T>(
  props: PropState & ModalPropState<T>
): ReactElement;

const HandleModal: typeof HandleModalType = ({
  title,
  modalVisible,
  type,
  initialData,
  close,
  submit,
  children,
}) => {
  const formatTitle = {
    add: "新增" + title,
    edit: "编辑" + title,
    detail: title + "详情",
  }[type ?? HandleTypeEnum.DETAIL];

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

  const { styles: customStyles } = useCustomStyles();
  return (
    <Modal
      open={modalVisible}
      title={formatTitle}
      width="600px"
      okText="保存"
      cancelText="取消"
      onCancel={close}
      onOk={form.submit}
      destroyOnClose
      forceRender
      afterClose={handleAfterClose}
    >
      <Form
        form={form}
        className={customStyles.modalForm}
        labelCol={{ span: 5 }}
        onFinish={handleSubmit}
      >
        {children}
      </Form>
    </Modal>
  );
};

export default HandleModal;
