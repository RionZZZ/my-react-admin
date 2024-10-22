import { createStyles } from "antd-style";

export default createStyles(() => ({
  flex: {
    display: "flex",
  },
  flex1: {
    flex: 1,
  },
  flexCenter: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  justifyContentEnd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  spaceBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
