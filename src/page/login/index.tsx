import { useTitle } from "@/hooks/useTitle";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/modules/user";
import { Button, Form, FormProps, Input, Space } from "antd";
import { FC } from "react";
import useStyles from "./style";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginField, User } from "@type/user";
import { appConfig } from "@/config";
import { useRequest } from "ahooks";
import { UserApi } from "@/service";
import { Result } from "@/types/http";
import { md5 } from "@/utils/encrypt";

const LoginPage: FC = () => {
  useTitle();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { styles } = useStyles();

  const dispatch = useAppDispatch();

  const { loading, run } = useRequest(UserApi.login, {
    manual: true,
    onSuccess: (res: Result<User>) => {
      console.log(res);
      if (res.code === 0) {
        dispatch(setUser(res.obj));
        const redirect = searchParams.get("redirect");
        navigate(redirect || "/home");
      }
    },
  });

  const handleLogin: FormProps<LoginField>["onFinish"] = (values) => {
    const userPassword = md5(values.userPassword);
    console.log(userPassword);

    run({ ...values, userPassword });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginImage}></div>
        <div className={styles.loginContent}>
          <div className={styles.loginTitle}>固定资产管理系统</div>
          <Form
            className={styles.loginForm}
            layout="vertical"
            size="large"
            onFinish={handleLogin}
          >
            <Form.Item<LoginField>
              label="用户名"
              name="userAccount"
              rules={[{ required: true, message: "请输入用户名！" }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item<LoginField>
              label="密码"
              name="userPassword"
              rules={[{ required: true, message: "请输入密码！" }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                立即登录
              </Button>
            </Form.Item>
            <Form.Item>
              <Space className={styles.versionSpace} align="center">
                版本号：
                <span className={styles.loginVersion}>
                  {appConfig.appVersion}
                </span>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
