import { Empty, Form, Modal, Radio, RadioProps, Select, Spin } from "antd";
import { FC, useState } from "react";
import useCustomStyles from "@/style/custom";
import { AssetData, AssetField } from "@/types/asset";
import { useBoolean, useDebounceFn, useRequest } from "ahooks";
import { AssetApi } from "@/service";

interface ChooseAssetModalProp {
  visible: boolean;
  close: () => void;
  handleSubmit: (data: AssetData) => void;
}

type SearchType = "id" | "name" | undefined;
interface ChooseAssetField {
  searchType: SearchType;
  searchResult: number;
}

const searchTypeMap = new Map([
  ["id", "资产编码"],
  ["name", "资产名称"],
]);

const ChooseAssetModal: FC<ChooseAssetModalProp> = ({
  visible,
  close,
  handleSubmit,
}) => {
  const [form] = Form.useForm();
  const handleAfterClose = () => {
    setSearchType(undefined);
    form.resetFields();
  };

  const [searchType, setSearchType] = useState<SearchType>();
  const handleSearchTypeChange: RadioProps["onChange"] = (evt) => {
    setSearchType(evt.target.value);
    form.resetFields(["searchResult"]);
    setOptions([]);
  };

  const [fetching, { setFalse: setFetchFalse, setTrue: setFetchTrue }] =
    useBoolean(false);
  const [options, setOptions] = useState<AssetData[]>([]);

  const { run: debounceFetcher } = useDebounceFn(
    (value: string) => {
      setOptions([]);
      setFetchTrue();
      fetchAssetList(value);
    },
    { wait: 500 }
  );

  const { runAsync: getUserList } = useRequest(
    AssetApi.fetchList<AssetField, AssetData>,
    {
      manual: true,
    }
  );
  const fetchAssetList = (value?: string) => {
    const params: AssetField = { [searchType!]: value };
    getUserList(params)
      .then((res) => {
        if (res.code === 0) {
          setOptions(res.obj);
          setFetchFalse();
        } else {
          setOptions([]);
          setFetchFalse();
        }
      })
      .catch(() => {
        setOptions([]);
        setFetchFalse();
      });
  };
  const submit = (data: ChooseAssetField) => {
    if (data.searchResult) {
      const result = options.filter(
        (option) => option.id === data.searchResult
      );
      handleSubmit(result[0]);
    }
  };

  const { styles: customStyles } = useCustomStyles();
  return (
    <Modal
      open={visible}
      title="选择资产"
      width="600px"
      okText="确定"
      cancelText="取消"
      onCancel={close}
      onOk={form.submit}
      destroyOnClose
      forceRender
      afterClose={handleAfterClose}
    >
      <Form
        form={form}
        className={customStyles.modalForm}
        labelCol={{ span: 5 }}
        onFinish={submit}
      >
        <Form.Item<ChooseAssetField> label="搜索类型" name="searchType">
          <Radio.Group onChange={handleSearchTypeChange}>
            <Radio value="id">资产编码</Radio>
            <Radio value="name">资产名称</Radio>
          </Radio.Group>
        </Form.Item>
        {searchType && (
          <Form.Item<ChooseAssetField>
            label="选择资产"
            name="searchResult"
            rules={[{ required: true, message: "请选择资产！" }]}
          >
            <Select
              showSearch
              onSearch={debounceFetcher}
              placeholder={`请输入${searchTypeMap.get(searchType)}`}
              filterOption={false}
              notFoundContent={
                fetching ? (
                  <Spin size="small" />
                ) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )
              }
              options={options}
              fieldNames={{ label: "name", value: "id" }}
              labelRender={(props) => {
                return (
                  <span>
                    {props.label}({props.value})
                  </span>
                );
              }}
              optionRender={(props) => {
                return (
                  <span>
                    {props.label}({props.value})
                  </span>
                );
              }}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ChooseAssetModal;
