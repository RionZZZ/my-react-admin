import { createStyles } from "antd-style";

export default createStyles(({ token, css, prefixCls }) => ({
  containerWrapper: css`
    padding: ${token.padding}px;
    .${prefixCls}-card + .${prefixCls}-card {
      margin-top: ${token.padding}px;
    }
  `,
  treeExpand: {
    marginRight: "10px",
  },
  hideExpand: {
    visibility: "hidden",
  },
}));
