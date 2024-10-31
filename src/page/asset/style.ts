import { createStyles } from "antd-style";

export default createStyles(({ css, prefixCls }) => ({
  handleButtonArea: {
    marginTop: "20px",
  },
  handleModalIcon: {
    color: "#52c41a",
    fontSize: 26,
  },
  handleModalCheck: {
    display: "flex",
    margin: "20px 60px",
  },
  tabs: css`
    .${prefixCls}-tabs-nav {
      margin: 0 20px;
      .${prefixCls}-tabs-tab {
        padding: 12px 18px;
      }
    }
  `,
}));
