import { FC } from "react";
import { Form, Input, Radio, TreeSelect } from "antd";
import { UserData } from "@/types/user";
import { HandleModal } from "@/component/handle";
import { ModalPropState } from "@/types";
import { DeptData } from "@/types/dept";

interface PropState {
  tree?: DeptData[];
}
const GenderOptions = [
  { label: "男", value: 1 },
  { label: "女", value: 0 },
];
const StatusOptions = [
  { label: "停用", value: 0 },
  { label: "启用", value: 1 },
];

const UserModal: FC<ModalPropState<UserData> & PropState> = (props) => {
  return (
    <HandleModal<UserData> {...props}>
      <Form.Item<UserData>
        label="姓名"
        name="userName"
        rules={[{ required: true, message: "请输入姓名！" }]}
      >
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item<UserData>
        label="账号"
        name="userAccount"
        rules={[{ required: true, message: "请输入账号！" }]}
      >
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item<UserData>
        label="所属部门"
        name="deptId"
        rules={[{ required: true, message: "请选择部门！" }]}
      >
        <TreeSelect
          placeholder="请选择部门"
          treeData={props.tree}
          fieldNames={{ label: "name", value: "id", children: "deptList" }}
        />
      </Form.Item>
      <Form.Item<UserData> label="性别" name="sex">
        <Radio.Group options={GenderOptions} />
      </Form.Item>
      <Form.Item<UserData> label="手机号" name="phone">
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item<UserData> label="邮箱" name="email">
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item<UserData> label="状态" name="status">
        <Radio.Group options={StatusOptions} />
      </Form.Item>
    </HandleModal>
  );
};

export default UserModal;
