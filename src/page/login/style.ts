import { createStyles } from "antd-style";
import Bg from "@image/login/bg.png";
import People from "@image/login/people.png";

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
  loginWrapper: {
    display: "flex",
    height: "586px",
    width: "1180px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  loginImage: {
    flex: 1,
    height: "100%",
    backgroundImage: `url('${People}')`,
  },
  loginContent: {
    boxSizing: "border-box",
    width: "590px",
    padding: "110px 120px",
  },
  loginTitle: {
    fontSize: "32px",
    color: token.colorPrimary,
    lineHeight: "40px",
    textAlign: "center",
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
