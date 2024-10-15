import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Aside from "./components/aside";
import Header from "./components/header";
import useStyles from "./style";
import { useTitle } from "@/hooks/useTitle";

const { Content } = Layout;

const CommonLayout: FC = () => {
  useTitle();
  const { styles } = useStyles();

  return (
    <Layout className={styles.layoutWrapper}>
      <Aside />
      <Layout>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
