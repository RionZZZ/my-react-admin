import { useCRUD } from "@/hooks/useCRUD";
import { DeptApi } from "@/service";
import { DeptData } from "@/types/dept";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { Table, TableProps } from "antd";
import { FC, useEffect } from "react";
import useCustomStyles from "@/style/custom";

const SettingDeptPage: FC = () => {
  const { useQueryAll, queryData } = useCRUD(DeptApi);
  useQueryAll();
  useEffect(() => {
    console.log(queryData);
  }, [queryData]);

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

  return (
    <>
      <Table<DeptData>
        columns={columns}
        dataSource={queryData as DeptData[]}
        rowKey="id"
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
                  !record.deptList && customStyles.hideExpand
                )}
                onClick={(e) => onExpand(record, e)}
              />
            ),
        }}
      />
    </>
  );
};

export default SettingDeptPage;
