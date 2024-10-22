import { FC } from "react";
import { Form, FormInstance, Input, Radio, Switch, TreeSelect } from "antd";
import { UserData } from "@/types/user";
import { HandleModal } from "@/component/handle";
import { ModalPropState } from "@/types";
import { DeptData } from "@/types/dept";
import { md5 } from "@/utils/encrypt";
import { DEFAULT_PWD } from "@/config";
import { GenderEnum, UserStatusEnum } from "@/types/enums";

interface PropState {
  tree?: DeptData[];
}
const GenderOptions = [
  { label: "男", value: GenderEnum.MALE },
  { label: "女", value: GenderEnum.FEMALE },
];

const UserModal: FC<ModalPropState<UserData> & PropState> = (props) => {
  const formatData = (form: FormInstance) => {
    if (props.initialData) {
      form.setFieldValue(
        "status",
        props.initialData.status === UserStatusEnum.ENABLE ? true : false
      );
    }
  };
  const handleSubmitData = (data: UserData) => {
    const status = data.status ? UserStatusEnum.ENABLE : UserStatusEnum.DISABLE;
    if (!data.id) {
      // 创建默认密码
      data.userPassword = md5(DEFAULT_PWD);
      // 默认角色1
      data.roleId = 1;
    }
    return { ...data, status };
  };
  return (
    <HandleModal<UserData>
      {...props}
      handleSubmitData={handleSubmitData}
      formatData={formatData}
    >
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
        <Switch checkedChildren="启用" unCheckedChildren="停用" />
      </Form.Item>
    </HandleModal>
  );
};

export default UserModal;
