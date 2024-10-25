import { useAppDispatch, useAppSelector } from "@/store";
import { clearAsset } from "@/store/modules/asset";
import { AssetState } from "@/types/asset";
import { HandleTypeEnum } from "@/types/enums/type";
import { FC, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCustomStyles from "@/style/custom";
import { Button, Form, Space } from "antd";

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

  const navigate = useNavigate();

  const [form] = Form.useForm();
  const handleSubmit = () => {};

  const onCancel = () => {
    navigate(-1);
  };

  const { styles: customStyles } = useCustomStyles();
  return (
    <div className={customStyles.containerWrapper}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item>
          <Space size="large">
            <Button type="default" onClick={onCancel}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssetHandlePage;
