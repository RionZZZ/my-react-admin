import { ExceptionEnum } from "@/types/enums/exception";
import { Result, Button } from "antd";
import { FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const subTitleMap = new Map([
  [ExceptionEnum.PAGE_NOT_ACCESS, "您没有权限访问此页面"],
  [ExceptionEnum.PAGE_NOT_FOUND, "您访问的页面不存在"],
  [ExceptionEnum.SERVER_ERROR, "服务器错误，请稍后再试"],
]);

const ExceptionPage: FC = () => {
  const navigate = useNavigate();
  const { status } = useLoaderData() as { status: ExceptionEnum };

  console.log(status);
  

  const onHomeClick = () => {
    navigate("/home");
  };
  return (
    <Result
      status={status}
      title={status}
      subTitle={subTitleMap.get(status)}
      extra={
        <Button type="primary" onClick={onHomeClick}>
          回首页
        </Button>
      }
    />
  );
};

export default ExceptionPage;
