import { useCRUD } from "@/hooks/useCRUD";
import { DeptApi, UserApi } from "@/service";
import { DeptData, DeptField } from "@/types/dept";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card, Form, Input, Table, TableProps } from "antd";
import { FC, useEffect } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";
import DeptModal from "./components/deptModal";
import { HandleTypeEnum } from "@/types/enums/type";
import { HandleButton } from "@/component/handle";
import { useMessage } from "@/hooks/useMessage";
import { useRequest } from "ahooks";
import { UserField, UserData } from "@/types/user";

const SettingDeptPage: FC = () => {
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
  } = useCRUD<DeptField, DeptData>(DeptApi);
  useEffect(() => {
    queryPage();
  }, [queryPage]);

  const columns: TableProps<DeptData>["columns"] = [
    {
      title: "部门名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "上级部门",
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

  const handleSubmit = (data: DeptData) => (data.id ? edit(data) : add(data));

  const { createConfirm } = useMessage();
  const { runAsync: getUserList } = useRequest(
    UserApi.fetchPage<UserField, UserData[]>,
    {
      manual: true,
    }
  );
  const handleDelete = (data: DeptData) => {
    // 先判断部门下是否有员工
    getUserList({ deptId: data.id }).then((res) => {
      const hasUser = res.obj.total > 0;
      const content = hasUser
        ? `${data.name}下存在员工，请迁移后再删除！`
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
        <Form.Item<DeptField> label="部门名称" name="name">
          <Input placeholder="请输入名称" />
        </Form.Item>
      </Search>
      <Card bordered={false}>
        <Table<DeptData>
          columns={columns}
          dataSource={queryData as DeptData[]}
          rowKey="id"
          pagination={false}
          loading={loading}
          expandable={{
            childrenColumnName: "deptList",
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
                    (!record.deptList || !record.deptList.length) &&
                      customStyles.hideExpand
                  )}
                  onClick={(e) => onExpand(record, e)}
                />
              ),
          }}
        />
      </Card>
      <DeptModal
        title="部门"
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

export default SettingDeptPage;
