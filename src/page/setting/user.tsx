import { useCRUD } from "@/hooks/useCRUD";
import { DeptApi, UserApi } from "@/service";
import { UserData, UserField } from "@/types/user";
import {
  Card,
  Form,
  Input,
  PaginationProps,
  Switch,
  Table,
  TableProps,
  TreeSelect,
} from "antd";
import { FC, useEffect, useState } from "react";
import useCustomStyles from "@/style/custom";
import { Search } from "@/component/search";
import { HandleTypeEnum } from "@/types/enums/type";
import { HandleButton } from "@/component/handle";
import { useMessage } from "@/hooks/useMessage";
import UserModal from "./components/UserModal";
import { DeptData } from "@/types/dept";
import { formatDate } from "@/utils/app";
import { md5 } from "@/utils/encrypt";
import { DEFAULT_PWD, paginationConfig } from "@/config";
import { PaginationArea } from "@/component/pagination";
import { DeleteEnum, UserStatusEnum } from "@/types/enums";

const SettingUserPage: FC = () => {
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
  } = useCRUD<UserField, UserData>(UserApi, () => fetchData());
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

  const { queryPage: queryDept, queryData: queryDeptData } = useCRUD<
    null,
    DeptData
  >(DeptApi);
  useEffect(() => {
    queryDept();
  }, [queryDept]);

  const columns: TableProps<UserData>["columns"] = [
    {
      title: "账号",
      dataIndex: "userAccount",
      key: "userAccount",
      fixed: "left",
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName",
      fixed: "left",
    },
    {
      title: "部门",
      dataIndex: "deptName",
      key: "deptName",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (time) => formatDate(time),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status, data) => (
        <Switch
          value={status === UserStatusEnum.ENABLE}
          checkedChildren="启用"
          unCheckedChildren="停用"
          onChange={(val) => {
            edit({
              ...data,
              status: val ? UserStatusEnum.ENABLE : UserStatusEnum.DISABLE,
            });
          }}
        />
      ),
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
              onClick: () => handleModal(HandleTypeEnum.EDIT, data),
            },
            {
              text: "删除",
              onClick: () => handleDelete(data),
            },
            {
              text: "重置密码",
              onClick: () => handleResetPwd(data),
            },
          ]}
        />
      ),
    },
  ];

  const handleSubmit = (data: UserData) => (data.id ? edit(data) : add(data));

  const { createConfirm } = useMessage();
  const handleDelete = (data: UserData) => {
    const content = `确定删除${data.userName}？`;
    createConfirm({
      type: "warning",
      content,
      onOk: () => {
        const isDelete = DeleteEnum.TRUE;
        return edit({ ...data, isDelete });
      },
    });
  };
  const handleResetPwd = (data: UserData) => {
    const content = `确定给${data.userName}重置密码？`;
    createConfirm({
      type: "warning",
      content,
      onOk: () => {
        const userPassword = md5(DEFAULT_PWD);
        return edit({ ...data, userPassword });
      },
    });
  };

  const { styles: customStyles } = useCustomStyles();
  return (
    <div className={customStyles.containerWrapper}>
      <Search
        query={fetchSearchData}
        add={() => handleModal(HandleTypeEnum.ADD)}
      >
        <Form.Item<UserField> label="姓名" name="userName">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item<UserField> label="部门" name="deptId">
          <TreeSelect
            allowClear
            placeholder="请选择上级部门"
            popupMatchSelectWidth={false}
            treeData={queryDeptData}
            fieldNames={{ label: "name", value: "id", children: "deptList" }}
          />
        </Form.Item>
      </Search>
      <Card bordered={false}>
        <Table<UserData>
          columns={columns}
          dataSource={queryData as UserData[]}
          rowKey="id"
          loading={loading}
          scroll={{ x: "max-content" }}
          pagination={false}
        />
        <PaginationArea
          total={total}
          pageSize={pageSize}
          pageNum={pageNum}
          handlePageChange={handlePageChange}
        />
      </Card>
      <UserModal
        title="用户"
        modalVisible={modalVisible}
        initialData={modalData}
        type={handleType}
        close={setModalFalse}
        submit={handleSubmit}
        tree={queryDeptData}
      />
    </div>
  );
};

export default SettingUserPage;
