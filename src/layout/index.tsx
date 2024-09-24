import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Aside from "./components/Aside";
import Header from "./components/Header";
import useStyles from "./style";

const { Content } = Layout;

const CommonLayout: FC = () => {
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
