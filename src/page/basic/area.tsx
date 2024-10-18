import { useCRUD } from "@/hooks/useCRUD";
import { AreaApi, UserApi } from "@/service";
import { AreaData, AreaField } from "@/types/area";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card, Form, Input, PaginationProps, Table, TableProps } from "antd";
import { FC, useEffect, useState } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";
import AreaModal from "./components/areaModal";
import { HandleTypeEnum } from "@/types/enums/type";
import { HandleButton } from "@/component/handle";
import { useMessage } from "@/hooks/useMessage";
import { useRequest } from "ahooks";
import { UserField, UserData } from "@/types/user";
import { paginationConfig } from "@/config";
import { PaginationArea } from "@/component/pagination";

const BasicAreaPage: FC = () => {
  const {
    queryPage,
    queryData,
    pageLoading: loading,
    total,
    edit,
    add,
    modalVisible,
    setModalFalse,
    handleType,
    modalData,
    handleModal,
  } = useCRUD<AreaField, AreaData>(AreaApi, () => fetchData());
  useEffect(() => {
    fetchData();
  }, []);

  const [searchForm, setSearchForm] = useState<UserField>({});
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(paginationConfig.pageSize);

  const fetchSearchData = (params: UserField = {}) => {
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
  const columns: TableProps<AreaData>["columns"] = [
    {
      title: "区域名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "上级区域",
      dataIndex: "parentName",
      key: "parentName",
    },
    {
      title: "操作",
      key: "handle",
      render: (_, data) => (
        <HandleButton
          items={[
            {
              text: "编辑",
              onClick: () => handleModal(HandleTypeEnum.EDIT, data),
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

  const handleSubmit = (data: AreaData) => (data.id ? edit(data) : add(data));

  const { createConfirm } = useMessage();
  const { runAsync: getUserList } = useRequest(
    UserApi.fetchPage<UserField, UserData[]>,
    {
      manual: true,
    }
  );
  const handleDelete = (data: AreaData) => {
    // 先判断分类下是否有资产
    getUserList({ deptId: data.id }).then((res) => {
      const hasUser = res.obj.total > 0;
      const content = hasUser
        ? `${data.name}下存在资产，请迁移后再删除！`
        : `确定删除${data.name}？`;
      createConfirm({
        type: "warning",
        content,
        onOk: () => {
          if (!hasUser) {
            const isDelete = 1;
            return edit({ ...data, isDelete });
          }
        },
      });
    });
  };

  const { styles: customStyles, cx: customCx } = useCustomStyles();
  return (
    <div className={customStyles.containerWrapper}>
      <Search
        query={fetchSearchData}
        add={() => handleModal(HandleTypeEnum.ADD)}
      >
        <Form.Item<AreaField> label="区域名称" name="name">
          <Input placeholder="请输入区域名称" />
        </Form.Item>
      </Search>
      <Card bordered={false}>
        <Table<AreaData>
          columns={columns}
          dataSource={queryData as AreaData[]}
          rowKey="id"
          pagination={false}
          loading={loading}
          expandable={{
            childrenColumnName: "areaList",
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <CaretDownOutlined
                  className={customStyles.treeExpand}
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <CaretRightOutlined
                  className={customCx(
                    customStyles.treeExpand,
                    (!record.areaList || !record.areaList.length) &&
                      customStyles.hideExpand
                  )}
                  onClick={(e) => onExpand(record, e)}
                />
              ),
          }}
        />
        <PaginationArea
          total={total}
          pageSize={pageSize}
          pageNum={pageNum}
          handlePageChange={handlePageChange}
        />
      </Card>
      <AreaModal
        title="资产"
        modalVisible={modalVisible}
        initialData={modalData}
        type={handleType}
        close={setModalFalse}
        submit={handleSubmit}
        tree={queryData}
      />
    </div>
  );
};

export default BasicAreaPage;
