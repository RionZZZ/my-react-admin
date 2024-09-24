import { FC, ReactNode, useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { routeList } from "@/router";
import { SelfRouteObject } from "@/router/types";
import useStyles from "../style";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const formatMenuItem = (
  label: ReactNode,
  key: string,
  children?: MenuItem[]
): MenuItem =>
  ({
    label,
    key,
    children,
  } as MenuItem);

const getOpenKey = (path: string) => {
  return [`/${path.split("/")[1]}`];
};

const Aside: FC = () => {
  useEffect(() => {
    getMenuList();
  }, []);

  const [menuList, setMenuList] = useState<MenuItem[]>([]);

  const getMenuList = () => {
    const menus = getOriginMenus();
    setMenuList(formatMenu(menus));
  };

  const getOriginMenus: () => SelfRouteObject[] = () => {
    const routes = [...routeList];
    routes.map((route) => {
      if (route.meta?.hideChildMenu) {
        route.children = [];
      }
      formatMenuPath(route);
    });
    routes.sort((a, b) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0));

    return routes;
  };
  const formatMenuPath = (menu: SelfRouteObject, parentPath: string = "") => {
    if (!menu.path?.startsWith("/")) {
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu.children?.length) {
      menu.children.map((child: SelfRouteObject) => {
        formatMenuPath(child, menu.path);
      });
    }
  };

  const formatMenu = (routes: SelfRouteObject[], list: MenuItem[] = []) => {
    routes.map((route) => {
      if (!route.meta?.hideMenu) {
        if (!route.children?.length) {
          list.push(formatMenuItem(route.meta?.title, route.path!));
        } else {
          list.push(
            formatMenuItem(
              route.meta?.title,
              route.path!,
              formatMenu(route.children)
            )
          );
        }
      }
    });
    return list;
  };

  const { pathname } = useLocation();
  console.log(pathname);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState([pathname]);

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenKeys(getOpenKey(pathname));
  }, [pathname]);

  const onOpenChange = (keys: string[]) => {
    // 一级菜单的key，控制一次只能打开一个一级菜单
    if (keys.length <= 1) {
      setOpenKeys(keys);
      return;
    }
    setOpenKeys([keys.at(-1)!]);
  };

  const navigate = useNavigate();
  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const { styles } = useStyles();
  return (
    <Sider trigger={null} className={styles.aside}>
      <h3 className={styles.appName}>固定资产管理系统</h3>
      <Menu
        style={{ height: "100%" }}
        mode="inline"
        theme="dark"
        onClick={onMenuClick}
        items={menuList}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
};

export default Aside;
