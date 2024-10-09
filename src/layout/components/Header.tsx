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
import { useAppDispatch, useAppSelector } from "@/store";
import { resetUser } from "@/store/modules/user";
import { User } from "@/types/user";

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
  const { createConfirm, createMessage } = useMessage();
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector<User>((state) => state.user);

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
    createMessage.success("handleChangePwdo");
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
  return (
    <AntdHeader className={styles.headerWrapper}>
      <Flex justify="space-between" align="center" className={styles.header}>
        <Breadcrumb>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <Space>
          {userName}
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
