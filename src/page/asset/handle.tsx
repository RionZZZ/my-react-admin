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
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  TreeSelect,
  Typography,
} from "antd";
import { useBoolean, useRequest } from "ahooks";
import { AreaApi, CategoryApi, DeptApi } from "@/service";
import { CategoryData } from "@/types/category";
import { DeptData } from "@/types/dept";
import { AreaData } from "@/types/area";
import { UserSearch } from "@/component/userSearch";

const AssetHandlePage: FC = () => {
  const { handle } = useParams();
  const location = useLocation();
  const { state } = location;
  const { assetInfo } = useAppSelector<AssetState>((state) => state.asset);

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

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = (data: AssetData) => {
    console.log(data);
  };

  const onCancel = () => {
    navigate(-1);
  };

  const { styles: customStyles } = useCustomStyles();
  const { styles: commonStyles, cx } = useCommonStyles();
  const { styles } = useStyles();
  return (
    <Spin spinning={loading} className={customStyles.containerWrapper}>
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
                <UserSearch placeholder="请选择所属管理员" />
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
                <Select placeholder="请选择资产来源" />
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
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="生产日期" name="date1">
                <DatePicker
                  placeholder="请选择生产日期"
                  className={commonStyles.fullWidth}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={7}>
              <Form.Item label="质保期(月)" name="date2">
                <Input placeholder="请输入质保期(月)" />
              </Form.Item>
            </Col>
            <Col offset={1} span={7}>
              <Form.Item<AssetData> label="使用期限(月)" name="timeLimit">
                <Input placeholder="请输入使用期限(月)" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label="临期日期" name="date3">
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
            <Button type="default" size="large" onClick={onCancel}>
              取消
            </Button>
            <Button type="primary" size="large" htmlType="submit">
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default AssetHandlePage;
