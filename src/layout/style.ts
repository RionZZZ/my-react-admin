import { createStyles } from "antd-style";

export default createStyles(({ token }) => ({
  layoutWrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  aside: {
    height: "calc(100% - 64px)",
  },
  appName: {
    color: "#fff",
    textAlign: "center",
    fontSize: "16px",
    margin: 0,
    lineHeight: "64px",
  },
  headerWrapper: {
    backgroundColor: token.colorBgContainer,
  },
  header: {
    height: "100%",
  },
  divider: {
    height: "20px",
    borderColor: "#bfbfbf",
  },
}));
