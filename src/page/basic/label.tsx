import { useCRUD } from "@/hooks/useCRUD";
import { LabelApi } from "@/service/label";
import { Button, Col, Flex, Radio, RadioProps, Row } from "antd";
import { FC, useEffect, useState } from "react";
import useCustomStyles from "@/style/custom";
import useCommonStyles from "@/style/common";
import useStyles from "./style";
import { LabelData } from "@/types/label";
import BarCode from "@image/code/bar_code.png";
import QrCode from "@image/code/qr_code.png";
import { LabelSelectEnum, LabelTypeEnum } from "@/types/enums";
import { useRequest } from "ahooks";
import { useMessage } from "@/hooks/useMessage";

const descriptions = [
  {
    key: "createTime",
    label: "生产日期",
    info: "2024-01-01",
  },
  {
    key: "buyTime",
    label: "购入日期",
    info: "2024-01-01",
  },
  {
    key: "area",
    label: "存放地点",
    info: "一楼办公大厅",
  },
];

const BasicLabelPage: FC = () => {
  const { queryList, queryData } = useCRUD<null, LabelData>(LabelApi, () =>
    queryList()
  );
  useEffect(() => {
    queryList();
  }, [queryList]);
  useEffect(() => {
    if (queryData) {
      queryData.forEach((item) => {
        if (item.isSelect === LabelSelectEnum.SELECTED) {
          setCodeType(item.id!);
        }
      });
    }
  }, [queryData]);

  const [codeType, setCodeType] = useState(0);

  const onRadioChange: RadioProps["onChange"] = (evt) => {
    setCodeType(evt.target.value);
  };

  const { runAsync: modify } = useRequest(LabelApi.modify, {
    manual: true,
  });
  const { createMessage } = useMessage();
  const onSaveClick = () => {
    modify({ id: codeType, isSelect: LabelSelectEnum.UNSELECTED }).then(
      (res) => {
        if (res.code === 0) {
          createMessage.success("模板更新成功");
        }
      }
    );
  };

  const { styles: customStyles } = useCustomStyles();
  const { styles: commonStyles, cx } = useCommonStyles();
  const { styles } = useStyles();
  return (
    <div className={customStyles.containerWrapper}>
      <Radio.Group
        buttonStyle="solid"
        value={codeType}
        onChange={onRadioChange}
      >
        <Radio.Button
          value={LabelTypeEnum.BARCODE}
          className={styles.radioButton}
        >
          条形码
        </Radio.Button>
        <Radio.Button
          value={LabelTypeEnum.QRCODE}
          className={styles.radioButton}
        >
          二维码
        </Radio.Button>
      </Radio.Group>
      {codeType === LabelTypeEnum.BARCODE ? (
        <div className={styles.card}>
          <div className={styles.codeCard}>
            {descriptions.map((desc) => (
              <Row key={desc.key} className={styles.descRow}>
                <Col span={8} className={styles.descCol}>
                  {desc.label}
                </Col>
                <Col span={16} className={styles.descCol}>
                  {desc.info}
                </Col>
              </Row>
            ))}
            <img src={BarCode} className={styles.barCode} />
          </div>
        </div>
      ) : (
        <div className={styles.card}>
          <Flex justify="space-between" className={styles.codeCard}>
            <img src={QrCode} className={styles.qrCode} />
            <Flex vertical className={styles.qrCodeCard}>
              {descriptions.map((desc) => (
                <Row
                  key={desc.key}
                  className={cx(commonStyles.flex1, commonStyles.spaceBetween)}
                >
                  <Col span={8}>{desc.label}</Col>
                  <Col span={16}>{desc.info}</Col>
                </Row>
              ))}
            </Flex>
          </Flex>
        </div>
      )}
      <Button
        type="primary"
        size="large"
        className={styles.labelButton}
        onClick={onSaveClick}
      >
        保存
      </Button>
    </div>
  );
};

export default BasicLabelPage;
