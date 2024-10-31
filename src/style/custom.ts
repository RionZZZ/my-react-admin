import { createStyles } from "antd-style";

export default createStyles(({ token, css, prefixCls }) => ({
  containerWrapper: css`
    padding: ${token.padding}px;
    .${prefixCls}-card + .${prefixCls}-card {
      margin-top: ${token.padding}px;
    }
  `,
  searchForm: css`
    .ant-form-item-control {
      width: 180px;
    }
  `,
  searchFormRange: css`
    .ant-form-item-control {
      width: 240px;
    }
  `,
  treeExpand: {
    marginRight: "10px",
  },
  hideExpand: {
    visibility: "hidden",
  },
  modalForm: {
    padding: token.padding,
  },
  pagination: {
    marginTop: token.margin,
  },
}));
