import { useTitle } from "@/hooks/useTitle";
import { useAppDispatch } from "@/store";
import { setToken } from "@/store/modules/user";
import { Button, Card, Form, FormProps, Input, Space } from "antd";
import { FC } from "react";
import useStyles from "./style";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginField } from "@type/login";
import AppConfig from "@/config/app";
import { useBoolean } from "ahooks";

const LoginPage: FC = () => {
  useTitle();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { styles } = useStyles();

  const dispatch = useAppDispatch();

  const [loading, { setTrue: setLoadingTrue, setFalse: setLoadingFalse }] =
    useBoolean(false);
  const handleLogin: FormProps<LoginField>["onFinish"] = (values) => {
    console.log("Success:", values);
    setLoadingTrue();
    setTimeout(() => {
      setLoadingFalse();
      dispatch(setToken("123123123"));
      const redirect = searchParams.get("redirect");
      navigate(redirect || "/home");
    }, 2000);
  };

  return (
    <div className={styles.login}>
      <Card bordered={false} style={{ padding: 0 }}>
        <div className={styles.loginContent}>
          <div className={styles.loginTitle}>固定资产管理系统</div>
          <Form
            className={styles.loginForm}
            layout="vertical"
            size="large"
            onFinish={handleLogin}
          >
            <Form.Item<LoginField>
              label="账号"
              name="userName"
              rules={[{ required: true, message: "请输入账号！" }]}
            >
              <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item<LoginField>
              label="密码"
              name="password"
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
                  {AppConfig.appVersion}
                </span>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
