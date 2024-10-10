import { FC } from "react";
import { Form, FormProps, Input, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { UserData } from "@/types/user";
import { md5 } from "@/utils/encrypt";
import { useRequest } from "ahooks";
import { UserApi } from "@/service";
import { useMessage } from "@/hooks/useMessage";
import { resetUser } from "@/store/modules/user";

interface PropState {
  modalVisible: boolean;
  handleClose: () => void;
}

const ChangePwd: FC<PropState> = (props) => {
  const { modalVisible, handleClose } = props;

  const [form] = Form.useForm();
  const user = useAppSelector<UserData>((state) => state.user);

  const handleChangePwd: FormProps["onFinish"] = (values) => {
    const userPassword = md5(values.userPassword);
    run({ ...user, userPassword });
  };

  const { createMessage } = useMessage();
  const dispatch = useAppDispatch();

  const { run } = useRequest(UserApi.update<UserData, null>, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 0) {
        handleClose();
        createMessage.success("修改密码成功，请重新登录！");
        setTimeout(() => {
          dispatch(resetUser());
        }, 1000);
      }
    },
  });

  return (
    <Modal
      open={modalVisible}
      title="修改密码"
      width="600px"
      okText="保存"
      cancelText="取消"
      onCancel={handleClose}
      onOk={form.submit}
      destroyOnClose
    >
      <Form form={form} labelCol={{ span: 5 }} onFinish={handleChangePwd}>
        <Form.Item label="账号">{user.userAccount}</Form.Item>
        <Form.Item
          label="新密码"
          name="userPassword"
          rules={[{ required: true, message: "请输入密码！" }]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="rePassword"
          dependencies={["userPassword"]}
          rules={[
            { required: true, message: "请确认密码！" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("userPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("确认密码与新密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请确认新密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePwd;
