import { Button, Card, Form, Space } from "antd";
import { FC, ReactNode } from "react";

interface PropState {
  children: ReactNode;
  query: () => void;
  add: () => void;
}

const Search: FC<PropState> = ({ children, add, query }) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    query();
  };
  return (
    <Card>
      <Form layout="inline" form={form} onFinish={query}>
        {children}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button type="default" onClick={handleReset}>
              重置
            </Button>
            <Button type="primary" onClick={add}>
              新增
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Search;
