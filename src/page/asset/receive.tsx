import { FC, useState } from "react";
import useCustomStyles from "@/style/custom";
import useStyles from "./style";
import { Tabs } from "antd";
import { AssetTypeEnum } from "@/types/enums/asset";
import ReceiveTab from "./components/receiveTab";

const AssetReceivePage: FC = () => {
  const [activeKey, setActiveKey] = useState();
  const { styles: customStyles } = useCustomStyles();
  const { styles, cx } = useStyles();
  return (
    <Tabs
      className={cx(customStyles.containerWrapper, styles.tabs)}
      defaultActiveKey={`${AssetTypeEnum.RECEIVE}`}
      activeKey={activeKey}
      size="large"
      items={[
        {
          label: "领用",
          key: `${AssetTypeEnum.RECEIVE}`,
          children: <ReceiveTab />,
        },
        {
          label: "退还",
          key: `${AssetTypeEnum.RETURN}`,
          children: "Tab 2",
        },
      ]}
    />
  );
};

export default AssetReceivePage;
