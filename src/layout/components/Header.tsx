import {
  createElement,
  FC,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Avatar,
  Breadcrumb,
  Divider,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Space,
} from "antd";
import useStyles from "../style";
import { UserOutlined } from "@ant-design/icons";
import { useMessage } from "@/hooks/useMessage";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetUser } from "@/store/modules/user";
import { UserData } from "@/types/user";
import ChangePwd from "./ChangePwd";
import { useBoolean } from "ahooks";

import { routeList } from "@/router";
import { matchRoutes, useLocation } from "react-router-dom";
import * as Icon from "@ant-design/icons";
import { MetaProps } from "@/router/types";

const { Header: AntdHeader } = Layout;

const items: MenuProps["items"] = [
  {
    label: "修改密码",
    key: "changePwd",
  },
  {
    label: "退出登录",
    key: "logout",
  },
];

const Header: FC = () => {
  const { styles } = useStyles();
  const { createConfirm } = useMessage();
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector<UserData>((state) => state.user);

  const [modalVisible, { setTrue: setModalTrue, setFalse: setModalFalse }] =
    useBoolean(false);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "changePwd":
        handleChangePwd();
        break;
      case "logout":
        handleLogout();
        break;
    }
  };

  const handleChangePwd = () => {
    setModalTrue();
  };

  const handleLogout = () => {
    createConfirm({
      type: "info",
      content: "确定退出登录？",
      onOk: () => {
        dispatch(resetUser());
      },
    });
  };

  const { pathname } = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { title: ReactNode }[]
  >([]);

  useEffect(() => {
    const matchList = matchRoutes(routeList, pathname) ?? [];
    const breadcrumbs = matchList.map((item) => {
      const { title, icon } = item.route.meta as MetaProps;
      return {
        title: (
          <>
            {icon &&
              createElement(
                Icon[icon as keyof typeof Icon] as FunctionComponent<unknown>
              )}
            <span>{title}</span>
          </>
        ),
      };
    });
    setBreadcrumbItems(breadcrumbs);
  }, [pathname]);

  return (
    <AntdHeader className={styles.headerWrapper}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Breadcrumb items={breadcrumbItems} />
        <Space>
          {userName}
          <Divider type="vertical" className={styles.divider} />
          <Dropdown menu={{ items, onClick }} placement="bottom"  overlayStyle={{ width: 'max-content' }} >
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Space>
      </Flex>
      <ChangePwd modalVisible={modalVisible} handleClose={setModalFalse} />
    </AntdHeader>
  );
};

export default Header;
