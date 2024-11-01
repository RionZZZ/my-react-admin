import { useAppDispatch, useAppSelector } from "@/store";
import { clearAsset } from "@/store/modules/asset";
import { AssetData, AssetState } from "@/types/asset";
import { HandleTypeEnum } from "@/types/enums/type";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCustomStyles from "@/style/custom";
import useCommonStyles from "@/style/common";
import useStyles from "./style";
import {
  Button,
  Card,
  Checkbox,
  CheckboxProps,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  TreeSelect,
  Typography,
} from "antd";
import { useBoolean, useRequest } from "ahooks";
import { AreaApi, AssetApi, CategoryApi, DeptApi } from "@/service";
import { CategoryData } from "@/types/category";
import { DeptData } from "@/types/dept";
import { AreaData } from "@/types/area";
import { UserSearch } from "@/component/userSearch";
import { AssetSourceEnum } from "@/types/enums/asset";
import { useCRUD } from "@/hooks/useCRUD";
import dayjs from "dayjs";
import { CheckCircleOutlined } from "@ant-design/icons";

const AssetSourceOptions = [
  {
    label: "购入",
    value: AssetSourceEnum.PURCHASE,
  },
  {
    label: "租赁",
    value: AssetSourceEnum.LEASE,
  },
  {
    label: "自建",
    value: AssetSourceEnum.BUILD,
  },
  {
    label: "捐赠",
    value: AssetSourceEnum.DONATION,
  },
  {
    label: "其他",
    value: AssetSourceEnum.OTHER,
  },
];

const AssetHandlePage: FC = () => {
  const { handle } = useParams();
  const location = useLocation();
  const { state } = location;
  const { assetInfo } = useAppSelector<AssetState>((state) => state.asset);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      handle === HandleTypeEnum.EDIT ||
      (handle == HandleTypeEnum.ADD &&
        assetInfo &&
        state.copyId &&
        assetInfo.id === state.copyId)
    ) {
      console.log(assetInfo);
      form.setFieldsValue(assetInfo);
      if (assetInfo?.buyDate)
        form.setFieldValue("buyDate", dayjs(assetInfo?.buyDate));
      if (assetInfo?.productDate) {
        form.setFieldValue("productDate", dayjs(assetInfo?.productDate));
      }
      if (assetInfo?.expireDate) {
        form.setFieldValue("expireDate", dayjs(assetInfo?.expireDate));
      }
    }

    return () => {
      dispatch(clearAsset());
    };
  }, [assetInfo, handle, state]);

  const [loading, { setFalse: setLoadingFalse }] = useBoolean(true);
  const [category, setCategory] = useState<CategoryData[]>();
  const [dept, setDept] = useState<DeptData[]>();
  const [area, setArea] = useState<AreaData[]>();
  // 资产分类
  const { runAsync: getCategoryTree } = useRequest(
    CategoryApi.fetchList<null, CategoryData>,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 0) {
          setCategory(res.obj);
        }
      },
    }
  );
  // 存放区域
  const { runAsync: getAreaTree } = useRequest(
    AreaApi.fetchList<null, AreaData>,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 0) {
          setArea(res.obj);
        }
      },
    }
  );
  // 所属组织
  const { runAsync: getDeptTree } = useRequest(
    DeptApi.fetchList<null, DeptData>,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 0) {
          setDept(res.obj);
        }
      },
    }
  );

  useEffect(() => {
    Promise.all([getCategoryTree(), getAreaTree(), getDeptTree()]).finally(() =>
      setLoadingFalse()
    );
  }, [getAreaTree, getCategoryTree, getDeptTree, setLoadingFalse]);

  const [openModal, { setTrue: setOpenTrue, setFalse: setOpenFalse }] =
    useBoolean(false);
  const { addAsync, editAsync } = useCRUD<unknown, AssetData>(AssetApi);
  const handleSubmit = (data: AssetData) => {
    const submitData = {
      ...assetInfo,
      ...data,
      id: handle === HandleTypeEnum.ADD ? null : assetInfo!.id,
    };
    console.log(submitData);
    if (handle === HandleTypeEnum.ADD) {
      addAsync(submitData).then((res) => {
        if (res.code === 0) {
          setOpenTrue();
        }
      });
    } else {
      editAsync(submitData).then((res) => {
        if (res.code === 0) {
          goList();
        }
      });
    }
  };

  const goList = () => {
    navigate("/asset/list");
  };

  const [checked, setChecked] = useState(true);
  const onCopyChange: CheckboxProps["onChange"] = (e) => {
    setChecked(e.target.checked);
  };

  const onModalOk = () => {
    if (!checked) {
      form.resetFields();
    }
    setOpenFalse();
  };

  const { styles: customStyles } = useCustomStyles();
  const { styles: commonStyles } = useCommonStyles();
  const { styles, cx } = useStyles();
  return (
    <div className={customStyles.containerWrapper}>
      <Spin spinning={loading}>
        <Form form={form} onFinish={handleSubmit} labelCol={{ span: 8 }}>
          <Card bordered={false}>
            <Form.Item noStyle>
              <Typography.Title level={4}>基本信息</Typography.Title>
            </Form.Item>
            <Row>
              <Col span={7}>
                <Form.Item<AssetData>
                  label="资产分类"
                  name="assetClassId"
                  rules={[{ required: true, message: "请选择资产分类！" }]}
                >
                  <TreeSelect
                    placeholder="请选择资产分类"
                    treeData={category}
                    fieldNames={{
                      label: "name",
                      value: "id",
                      children: "assetClassList",
                    }}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData>
                  label="资产名称"
                  name="name"
                  rules={[{ required: true, message: "请输入资产名称！" }]}
                >
                  <Input placeholder="请输入资产名称" />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData> label="规格型号" name="model">
                  <Input placeholder="请输入规格型号" />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item<AssetData> label="品牌名" name="brand">
                  <Input placeholder="请输入品牌名" />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData> label="计量单位" name="unit">
                  <Input placeholder="请输入计量单位" />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData> label="价值" name="assetValue">
                  <Input placeholder="请输入价值" />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item<AssetData> label="序列号" name="serialNumber">
                  <Input placeholder="请输入序列号" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card bordered={false}>
            <Form.Item noStyle>
              <Typography.Title level={4}>使用信息</Typography.Title>
            </Form.Item>
            <Row>
              <Col span={7}>
                <Form.Item<AssetData>
                  label="存放区域"
                  name="positionId"
                  rules={[{ required: true, message: "请选择存放区域！" }]}
                >
                  <TreeSelect
                    placeholder="请选择存放区域"
                    treeData={area}
                    fieldNames={{
                      label: "name",
                      value: "id",
                      children: "areaList",
                    }}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData>
                  label="所属组织"
                  name="deptId"
                  rules={[{ required: true, message: "请选择所属组织！" }]}
                >
                  <TreeSelect
                    placeholder="请选择所属组织"
                    treeData={dept}
                    fieldNames={{
                      label: "name",
                      value: "id",
                      children: "deptList",
                    }}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData>
                  label="所属管理员"
                  name="adminId"
                  rules={[{ required: true, message: "请选择所属管理员！" }]}
                >
                  <UserSearch immediately placeholder="请选择所属管理员" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card bordered={false}>
            <Form.Item noStyle>
              <Typography.Title level={4}>购入信息</Typography.Title>
            </Form.Item>
            <Row gutter={30}>
              <Col span={7}>
                <Form.Item<AssetData> label="资产来源" name="assetSource">
                  <Select
                    options={AssetSourceOptions}
                    placeholder="请选择资产来源"
                  />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData> label="供应商" name="supplier">
                  <Input placeholder="请输入供应商" />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData> label="购入日期" name="buyDate">
                  <DatePicker
                    placeholder="请选择购入日期"
                    className={commonStyles.fullWidth}
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="生产日期" name="productDate">
                  <DatePicker
                    placeholder="请选择生产日期"
                    className={commonStyles.fullWidth}
                  />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item label="质保期(月)" name="warrantyLimit">
                  <Input placeholder="请输入质保期(月)" />
                </Form.Item>
              </Col>
              <Col offset={1} span={7}>
                <Form.Item<AssetData> label="使用期限(月)" name="timeLimit">
                  <Input placeholder="请输入使用期限(月)" />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item label="临期日期" name="expireDate">
                  <DatePicker
                    placeholder="请选择临期日期"
                    className={commonStyles.fullWidth}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Form.Item
            className={cx(
              commonStyles.justifyContentEnd,
              styles.handleButtonArea
            )}
          >
            <Space size="large">
              <Button type="default" size="large" onClick={goList}>
                取消
              </Button>
              <Button type="primary" size="large" htmlType="submit">
                保存
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
      <Modal
        open={openModal}
        okText="继续录入"
        cancelText="去资产列表"
        onOk={onModalOk}
        onCancel={goList}
      >
        <div className={customStyles.modalForm}>
          <Space size="large">
            <CheckCircleOutlined className={styles.handleModalIcon} />
            <Typography.Title level={5}>
              保存成功，是否继续录入资产？
            </Typography.Title>
          </Space>
          <Checkbox
            checked={checked}
            onChange={onCopyChange}
            className={styles.handleModalCheck}
          >
            复制当前资产信息
          </Checkbox>
        </div>
      </Modal>
    </div>
  );
};

export default AssetHandlePage;
