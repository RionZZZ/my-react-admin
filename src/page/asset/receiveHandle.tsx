import { FC, useEffect, useRef, useState } from "react";
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
  Space,
  Spin,
  TreeSelect,
  Typography,
} from "antd";
import { AssetHandleData } from "@/types/assetHandle";
import dayjs from "dayjs";
import { UserSearch } from "@/component/userSearch";
import { useNavigate } from "react-router-dom";
import { AreaApi, AssetHandleApi, DeptApi } from "@/service";
import { useBoolean, useRequest } from "ahooks";
import { DeptData } from "@/types/dept";
import { AreaData } from "@/types/area";
import { ChooseAssetTable, ForwardedRefState } from "@/component/chooseAsset";
import { useMessage } from "@/hooks/useMessage";
import { AssetTypeEnum } from "@/types/enums/asset";
import { useCRUD } from "@/hooks/useCRUD";

const type = AssetTypeEnum.RECEIVE;
const AssetReceiveHandlePage: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const goList = () => {
    navigate("/asset/receive");
  };

  const { addAsync } = useCRUD(AssetHandleApi);

  const [loading, { setFalse: setLoadingFalse }] = useBoolean(true);
  const [dept, setDept] = useState<DeptData[]>();
  const [area, setArea] = useState<AreaData[]>();

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
    Promise.all([getAreaTree(), getDeptTree()]).finally(() =>
      setLoadingFalse()
    );
  }, [getAreaTree, getDeptTree, setLoadingFalse]);

  const [userSearchDisabled, setUserSearchDisabled] = useState(true);
  const [deptId, setDeptId] = useState("");
  const onDeptChange = (value: string) => {
    setUserSearchDisabled(!value);
    setDeptId(value);
    form.resetFields(["userId"]);
  };

  const { createMessage } = useMessage();
  const chooseAsset = useRef<ForwardedRefState>(null);
  const handleSubmit = (data: AssetHandleData) => {
    const list = chooseAsset.current?.getRowSelections();
    if (!list?.length) {
      createMessage.warning("请在表格中勾选要领用的资产！");
      return;
    }
    const submitData = { ...data, type, list };
    console.log(submitData);
    addAsync(submitData).then((res) => {
      if (res.code === 0) {
        createMessage.success(res.msg);
      }
    });
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
              <Typography.Title level={4}>领用信息</Typography.Title>
            </Form.Item>
            <Row>
              <Col span={10}>
                <Form.Item<AssetHandleData>
                  label="领用日期"
                  name="operationDate"
                  initialValue={dayjs()}
                >
                  <DatePicker
                    className={commonStyles.fullWidth}
                    format="YYYY-MM-DD"
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col offset={2} span={10}>
                <Form.Item<AssetHandleData>
                  label="领用组织"
                  name="deptId"
                  rules={[{ required: true, message: "请选择领用组织！" }]}
                >
                  <TreeSelect
                    placeholder="请选择领用组织"
                    treeData={dept}
                    fieldNames={{
                      label: "name",
                      value: "id",
                      children: "deptList",
                    }}
                    onChange={onDeptChange}
                    allowClear
                    ref={"as"}
                  />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item<AssetHandleData>
                  label="领用人"
                  name="userId"
                  rules={[{ required: true, message: "请选择领用人！" }]}
                >
                  <UserSearch
                    deptId={deptId}
                    placeholder="请选择领用人"
                    immediately={!userSearchDisabled}
                    disabled={userSearchDisabled}
                  />
                </Form.Item>
              </Col>
              <Col offset={2} span={10}>
                <Form.Item<AssetHandleData>
                  label="领用后存放区域"
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
              <Col span={20}>
                <Form.Item<AssetHandleData>
                  label="备注"
                  name="remark"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                  <Input.TextArea placeholder="请输入备注" rows={4} />
                </Form.Item>
              </Col>
              <Col></Col>
            </Row>
          </Card>
          <Card bordered={false}>
            <ChooseAssetTable ref={chooseAsset} />
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
                提交
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default AssetReceiveHandlePage;
