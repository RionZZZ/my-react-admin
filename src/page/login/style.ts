import { createStyles } from "antd-style";
import Bg from "@image/login/bg.png";

export default createStyles(({ token }) => ({
  login: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url('${Bg}')`,
    backgroundSize: "cover",
  },
  loginContent: {
    padding: "80px 100px",
    minWidth: "400px",
    textAlign: "center",
  },
  loginTitle: {
    fontSize: "32px",
    color: token.colorPrimary,
    lineHeight: "40px",
  },
  loginForm: {
    marginTop: "40px",
  },
  versionSpace: {
    width: "100%",
    justifyContent: "center",
    fontSize: token.fontSize,
  },
  loginVersion: {
    fontSize: token.fontSizeLG,
    color: token.colorPrimary,
  },
}));
