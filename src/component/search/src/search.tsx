import { Button, Card, Form, Space } from "antd";
import { FC, ReactNode } from "react";
import useCustomStyles from "@/style/custom";

interface SearchProps {
  children: ReactNode;
  query: () => void;
  add: () => void;
}

const Search: FC<SearchProps> = ({ children, add, query }) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    query();
  };
  const { styles: customStyles } = useCustomStyles();
  return (
    <Card>
      <Form
        layout="inline"
        className={customStyles.searchForm}
        form={form}
        onFinish={query}
      >
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
