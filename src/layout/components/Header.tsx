import { FC } from "react";
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
import { useAppDispatch } from "@/store";
import { useNavigate } from "react-router-dom";
import { resetUser } from "@/store/modules/user";

const { Header: AntdHeader } = Layout;

const items: MenuProps["items"] = [
  {
    label: "个人中心",
    key: "user",
  },
  {
    label: "退出登陆",
    key: "logout",
  },
];

const Header: FC = () => {
  const { styles } = useStyles();
  const { createConfirm, createMessage } = useMessage();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "user":
        handleUserInfo();
        break;
      case "logout":
        handleLogout();
        break;
    }
  };

  const handleUserInfo = () => {
    createMessage.success("userInfo");
  };

  const handleLogout = () => {
    createConfirm({
      type: "info",
      content: "确定退出登录？",
      onOk: () => {
        dispatch(resetUser());
        navigate("/login");
      },
    });
  };
  return (
    <AntdHeader className={styles.headerWrapper}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Breadcrumb>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <Space>
          郑大世
          <Divider type="vertical" className={styles.divider} />
          <Dropdown menu={{ items, onClick }} placement="bottom">
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </Space>
      </Flex>
    </AntdHeader>
  );
};

export default Header;
