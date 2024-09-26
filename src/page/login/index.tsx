import { useTitle } from "@/hooks/useTitle";
import { useAppDispatch } from "@/store";
import { setToken } from "@/store/modules/user";
import { Button } from "antd";
import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LoginPage: FC = () => {
  useTitle();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const fetchToken = () => {
    dispatch(setToken("123123123"));
  };
  const login = () => {
    const redirect = searchParams.get("redirect");
    navigate(redirect || "/home");
  };
  return (
    <div>
      <Button onClick={fetchToken}>set token</Button>
      <Button onClick={login}>Home</Button>
    </div>
  );
};

export default LoginPage;
