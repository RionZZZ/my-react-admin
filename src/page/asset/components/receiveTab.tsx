import { FC, useEffect, useState } from "react";
import useCustomStyles from "@/style/custom";
import { AssetHandleData, AssetHandleField } from "@/types/assetHandle";
import { Search } from "@/component/search";
import {
  Card,
  Form,
  Input,
  PaginationProps,
  TableProps,
  DatePicker,
} from "antd";
import { UserSearch } from "@/component/userSearch";
import { ScrollTable } from "@/component/table";
import { HandleButton } from "@/component/handle";
import { useCRUD } from "@/hooks/useCRUD";
import { AssetHandleApi } from "@/service";
import { AssetTypeEnum } from "@/types/enums/asset";
import { paginationConfig } from "@/config";
import { formatDate } from "@/utils/app";

const type = AssetTypeEnum.RECEIVE;
const ReceiveTab: FC = () => {
  const {
    queryPage,
    queryData,
    pageLoading: loading,
    total,
  } = useCRUD<AssetHandleField, AssetHandleData>(AssetHandleApi, () =>
    fetchData()
  );
  useEffect(() => {
    fetchData();
  }, []);

  const [searchForm, setSearchForm] = useState<AssetHandleField>({});
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(paginationConfig.pageSize);

  const fetchSearchData = (params: AssetHandleField = {}) => {
    if (params.date) {
      const [startTime, endTime] = params.date;
      params.startTime = formatDate(startTime);
      params.endTime = formatDate(endTime);
      params.date = null;
    }
    setPageNum(1);
    setSearchForm(params);
    queryPage({ ...params, pageNum: 1, pageSize, type });
  };
  const fetchData = () => queryPage({ ...searchForm, pageNum, pageSize, type });

  const handlePageChange: PaginationProps["onChange"] = (num, size) => {
    setPageNum(num);
    setPageSize(size);
    queryPage({ ...searchForm, pageNum: num, pageSize: size, type });
  };
  const columns: TableProps<AssetHandleData>["columns"] = [
    {
      title: "领用单号",
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "领用日期",
      dataIndex: "operationDate",
      key: "operationDate",
    },
    {
      title: "领用人",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "领用组织",
      dataIndex: "deptName",
      key: "deptName",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (time) => formatDate(time),
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    },
    {
      title: "操作",
      key: "handle",
      fixed: "right",
      render: (_, data) => (
        <HandleButton
          items={[
            {
              text: "退还",
              onClick: () => handleReturn(data),
            },
          ]}
        />
      ),
    },
  ];

  const handleAdd = () => {};
  const handleReturn = (data: AssetHandleData) => {
    console.log(data);
  };

  const { styles: customStyles } = useCustomStyles();
  return (
    <div className={customStyles.containerWrapper}>
      <Search query={fetchSearchData} add={() => handleAdd()}>
        <Form.Item<AssetHandleField>
          label="领用日期"
          name="date"
          className={customStyles.searchFormRange}
        >
          <DatePicker.RangePicker
            placeholder={["开始时间", "结束时间"]}
            format="YYYY-MM-DD"
            allowClear
          />
        </Form.Item>
        <Form.Item<AssetHandleField> label="领用单号" name="id">
          <Input placeholder="请输入领用单号" allowClear />
        </Form.Item>
        <Form.Item<AssetHandleField> label="领用人" name="userId">
          <UserSearch placeholder="请选择领用人" allowClear />
        </Form.Item>
      </Search>
      <Card bordered={false}>
        <ScrollTable<AssetHandleData>
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

export default ReceiveTab;
