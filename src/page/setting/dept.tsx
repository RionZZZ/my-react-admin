import { useCRUD } from "@/hooks/useCRUD";
import { DeptApi } from "@/service";
import { DeptData, DeptField } from "@/types/dept";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card, Form, Input, Table, TableProps } from "antd";
import { FC, useEffect } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";
import DeptModal from "./components/deptModal";
import { HandleTypeEnum } from "@/types/enums/type";
import { Handle } from "@/component/handle";
import { useMessage } from "@/hooks/useMessage";

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
        <>
          <Handle
            items={[
              {
                text: "编辑",
                onClick: () => handleModal(HandleTypeEnum.EDIT, data),
              },
              {
                text: "删除",
                onClick: () => {
                  handleDelete(data);
                },
              },
            ]}
          />
        </>
      ),
    },
  ];

  const handleSubmit = (data: DeptData) => {
    console.log(data);
    return data.id ? edit(data) : add(data);
  };

  const { createConfirm } = useMessage();
  const handleDelete = (data: DeptData) => {
    createConfirm({
      type: "info",
      content: `确定删除${data.name}？`,
      onOk: () => {
        const isDelete = 1;
        return edit({ ...data, isDelete });
      },
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
        modalVisible={modalVisible}
        initialData={modalData}
        type={handleType}
        close={setModalFalse}
        submit={handleSubmit}
      />
    </div>
  );
};

export default SettingDeptPage;
