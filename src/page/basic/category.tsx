import { useCRUD } from "@/hooks/useCRUD";
import { AssetApi, CategoryApi } from "@/service";
import { CategoryData, CategoryField } from "@/types/category";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card, Form, Input, PaginationProps, TableProps } from "antd";
import { FC, useEffect, useState } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";
import CategoryModal from "./components/categoryModal";
import { HandleTypeEnum } from "@/types/enums/type";
import { HandleButton } from "@/component/handle";
import { useMessage } from "@/hooks/useMessage";
import { useRequest } from "ahooks";
import { paginationConfig } from "@/config";
import { DeleteEnum } from "@/types/enums";
import { ScrollTable } from "@/component/table";

const BasicCategoryPage: FC = () => {
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
  } = useCRUD<CategoryField, CategoryData>(CategoryApi, () => fetchData());
  useEffect(() => {
    fetchData();
  }, []);

  const [searchForm, setSearchForm] = useState<CategoryField>({});
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(paginationConfig.pageSize);

  const fetchSearchData = (params: CategoryField = {}) => {
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
  const columns: TableProps<CategoryData>["columns"] = [
    {
      title: "资产分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "上级分类",
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

  const handleSubmit = (data: CategoryData) =>
    data.id ? edit(data) : add(data);

  const { createConfirm } = useMessage();
  const { runAsync: getAssetList } = useRequest(AssetApi.search, {
    manual: true,
  });
  const handleDelete = (data: CategoryData) => {
    // 先判断分类下是否有资产
    getAssetList({ assetClassId: data.id }).then((res) => {
      const hasUser = res.obj.length > 0;
      const content = hasUser
        ? `${data.name}下存在资产，请迁移后再删除！`
        : `确定删除${data.name}？`;
      createConfirm({
        type: "warning",
        content,
        onOk: () => {
          if (!hasUser) {
            const isDelete = DeleteEnum.TRUE;
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
        <Form.Item<CategoryField> label="资产分类名称" name="name">
          <Input placeholder="请输入资产分类名称" allowClear />
        </Form.Item>
      </Search>
      <Card bordered={false}>
        <ScrollTable<CategoryData>
          tableProps={{
            columns,
            dataSource: queryData,
            rowKey: "id",
            loading,
            pagination: false,
            expandable: {
              childrenColumnName: "assetClassList",
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
                      (!record.assetClassList ||
                        !record.assetClassList.length) &&
                        customStyles.hideExpand
                    )}
                    onClick={(e) => onExpand(record, e)}
                  />
                ),
            },
          }}
          paginationProps={{
            total,
            pageSize,
            pageNum,
            handlePageChange,
          }}
        />
      </Card>
      <CategoryModal
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

export default BasicCategoryPage;
