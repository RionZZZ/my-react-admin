import { useCRUD } from "@/hooks/useCRUD";
import { CategoryApi, UserApi } from "@/service";
import { CategoryData, CategoryField } from "@/types/category";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card, Form, Input, Table, TableProps } from "antd";
import { FC, useEffect } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";
import CategoryModal from "./components/categoryModal";
import { HandleTypeEnum } from "@/types/enums/type";
import { HandleButton } from "@/component/handle";
import { useMessage } from "@/hooks/useMessage";
import { useRequest } from "ahooks";
import { UserField, UserData } from "@/types/user";

const BasicCategoryPage: FC = () => {
  const {
    queryPage,
    queryData,
    pageLoading: loading,
    edit,
    add,
    modalVisible,
    setModalFalse,
    handleType,
    modalData,
    handleModal,
  } = useCRUD<CategoryField, CategoryData>(CategoryApi, () => queryPage());
  useEffect(() => {
    queryPage();
  }, [queryPage]);

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
  const { runAsync: getUserList } = useRequest(
    UserApi.fetchPage<UserField, UserData[]>,
    {
      manual: true,
    }
  );
  const handleDelete = (data: CategoryData) => {
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
      <Search query={queryPage} add={() => handleModal(HandleTypeEnum.ADD)}>
        <Form.Item<CategoryField> label="资产分类名称" name="name">
          <Input placeholder="请输入资产分类名称" />
        </Form.Item>
      </Search>
      <Card bordered={false}>
        <Table<CategoryData>
          columns={columns}
          dataSource={queryData as CategoryData[]}
          rowKey="id"
          pagination={false}
          loading={loading}
          expandable={{
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
                    (!record.assetClassList || !record.assetClassList.length) &&
                      customStyles.hideExpand
                  )}
                  onClick={(e) => onExpand(record, e)}
                />
              ),
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
