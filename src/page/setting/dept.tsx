import { useCRUD } from "@/hooks/useCRUD";
import { DeptApi } from "@/service";
import { DeptData, DeptField } from "@/types/dept";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Card, Form, Input, Table, TableProps } from "antd";
import { FC, useEffect } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";

const SettingDeptPage: FC = () => {
  const { queryPage, queryData, pageLoading: loading } = useCRUD(DeptApi);
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
      render: (_, { id }) => <span>{id}</span>,
    },
  ];

  const { styles: customStyles, cx: customCx } = useCustomStyles();

  const add = () => {
    console.log("add");
  };

  return (
    <div className={customStyles.containerWrapper}>
      <Search query={queryPage} add={add}>
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
    </div>
  );
};

export default SettingDeptPage;
