import { useCRUD } from "@/hooks/useCRUD";
import { AssetApi } from "@/service";
import { AssetData, AssetField } from "@/types/asset";
import { Card, Form, Input, PaginationProps, Select, TableProps } from "antd";
import { FC, useEffect, useState } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";
import { HandleTypeEnum } from "@/types/enums/type";
import { HandleButton } from "@/component/handle";
import { paginationConfig } from "@/config";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { setAsset } from "@/store/modules/asset";
import { useMessage } from "@/hooks/useMessage";
import { DeleteEnum } from "@/types/enums";
import { ScrollTable } from "@/component/table";
import { AssetStatus } from "@/component/assetStatus";
import { AssetStatusEnum } from "@/types/enums/asset";

const StatusOptions = [
  { label: "闲置", value: AssetStatusEnum.IDLE },
  { label: "在用", value: AssetStatusEnum.RECEIVE },
  { label: "借用", value: AssetStatusEnum.BORROW },
  { label: "已处置", value: AssetStatusEnum.DISPOSAL },
  { label: "维护", value: AssetStatusEnum.MAINTENANCE },
];
const AssetListPage: FC = () => {
  const {
    queryPage,
    queryData,
    pageLoading: loading,
    total,
    edit,
  } = useCRUD<AssetField, AssetData>(AssetApi, () => fetchData());
  useEffect(() => {
    fetchData();
  }, []);

  const [searchForm, setSearchForm] = useState<AssetField>({});
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(paginationConfig.pageSize);

  const fetchSearchData = (params: AssetField = {}) => {
    setPageNum(1);
    setSearchForm(params);
    queryPage({ ...params, pageNum: 1, pageSize });
  };
  const fetchData = () => queryPage({ ...searchForm, pageNum, pageSize });

  const handlePageChange: PaginationProps["onChange"] = (num, size) => {
    setPageNum(num);
    setPageSize(size);
    queryPage({ ...searchForm, pageNum: num, pageSize: size });
  };
  const columns: TableProps<AssetData>["columns"] = [
    {
      title: "资产状态",
      dataIndex: "status",
      key: "status",
      fixed: "left",
      render: (status) => {
        return <AssetStatus status={status} />;
      },
    },
    {
      title: "资产编码",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "资产名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "资产分类",
      dataIndex: "assetClassName",
      key: "assetClassName",
    },
    {
      title: "规格型号",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "品牌",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "计量单位",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "价值",
      dataIndex: "assetValue",
      key: "assetValue",
    },
    {
      title: "序列号",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "存放区域",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "所属组织",
      dataIndex: "deptName",
      key: "deptName",
      ellipsis: true,
    },
    {
      title: "所属管理员",
      dataIndex: "adminName",
      key: "adminName",
    },
    {
      title: "操作",
      key: "handle",
      fixed: "right",
      render: (_, data) => (
        <HandleButton
          items={[
            {
              text: "编辑",
              onClick: () => handleEdit(data),
            },
            {
              text: "复制",
              onClick: () => handleAdd(data),
            },
            {
              text: "删除",
              onClick: () => handleDelete(data),
            },
          ]}
        />
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleAdd = (data?: AssetData) => {
    if (data) dispatch(setAsset(data));
    navigate("/asset/handle/" + HandleTypeEnum.ADD, {
      state: { copyId: data?.id },
    });
  };
  const handleEdit = (data: AssetData) => {
    dispatch(setAsset(data));
    navigate("/asset/handle/" + HandleTypeEnum.EDIT);
  };

  const { createConfirm } = useMessage();
  const handleDelete = (data: AssetData) => {
    const content = `确定删除${data.assetClassName}？`;
    createConfirm({
      type: "warning",
      content,
      onOk: () => {
        const isDelete = DeleteEnum.TRUE;
        return edit({ ...data, isDelete });
      },
    });
  };

  const { styles: customStyles } = useCustomStyles();
  return (
    <div className={customStyles.containerWrapper}>
      <Search query={fetchSearchData} add={() => handleAdd()}>
        <Form.Item<AssetField> label="资产状态" name="status">
          <Select
            options={StatusOptions}
            placeholder="请输入资产状态"
            allowClear
          />
        </Form.Item>
        <Form.Item<AssetField> label="资产名称" name="name">
          <Input placeholder="请输入资产名称" allowClear />
        </Form.Item>
        <Form.Item<AssetField> label="资产编码" name="id">
          <Input placeholder="请输入资产编码" allowClear />
        </Form.Item>
      </Search>
      <Card bordered={false}>
        <ScrollTable<AssetData>
          tableProps={{
            columns,
            dataSource: queryData,
            rowKey: "id",
            loading,
            pagination: false,
          }}
          paginationProps={{
            total,
            pageSize,
            pageNum,
            handlePageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default AssetListPage;
