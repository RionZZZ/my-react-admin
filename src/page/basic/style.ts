import { createStyles } from "antd-style";

export default createStyles(({ css }) => ({
  radioButton: {
    paddingInline: "40px",
  },
  card: {
    width: "360px",
    border: "2px dashed #1677ff",
    borderRadius: "4px",
    margin: "20px",
  },
  codeCard: {
    width: "320px",
    border: "2px solid #555",
    margin: "16px auto",
  },
  descRow: {
    borderBottom: "1px solid #555",
  },
  descCol: css`
    padding: 4px;
    & + & {
      border-left: 1px solid #555;
    }
  `,
  barCode: {
    padding: "4px",
    width: "100%",
  },
  qrCode: {
    padding: "10px",
    height: "120px",
  },
  qrCodeCard: {
    width: "200px",
  },
  labelButton: {
    width: "180px",
    marginTop: "60px",
  },
}));
