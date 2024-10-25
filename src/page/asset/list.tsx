import { useCRUD } from "@/hooks/useCRUD";
import { AssetApi } from "@/service";
import { AssetData, AssetField } from "@/types/asset";
import { Card, Form, Input, PaginationProps, Table, TableProps } from "antd";
import { FC, useEffect, useState } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";
import { HandleTypeEnum } from "@/types/enums/type";
import { HandleButton } from "@/component/handle";
import { paginationConfig } from "@/config";
import { PaginationArea } from "@/component/pagination";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { setAsset } from "@/store/modules/asset";

const AssetListPage: FC = () => {
  const {
    queryPage,
    queryData,
    pageLoading: loading,
    total,
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

  const handleDelete = (data: AssetData) => {
    console.log(data);
  };

  const { styles: customStyles } = useCustomStyles();
  return (
    <div className={customStyles.containerWrapper}>
      <Search query={fetchSearchData} add={() => handleAdd()}>
        <Form.Item<AssetField> label="区域名称" name="name">
          <Input placeholder="请输入区域名称" />
        </Form.Item>
      </Search>
      <Card bordered={false}>
        <Table<AssetData>
          columns={columns}
          dataSource={queryData as AssetData[]}
          rowKey="id"
          pagination={false}
          loading={loading}
        />
        <PaginationArea
          total={total}
          pageSize={pageSize}
          pageNum={pageNum}
          handlePageChange={handlePageChange}
        />
      </Card>
    </div>
  );
};

export default AssetListPage;
