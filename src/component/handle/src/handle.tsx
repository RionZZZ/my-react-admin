import { Button, ButtonProps } from "antd";
import { FC } from "react";

interface HandleItem {
  text: string;
  type?: ButtonProps["color"];
  onClick: () => void;
}
interface PropState {
  items: HandleItem[];
}

const Handle: FC<PropState> = ({ items }) => (
  <>
    {items.map((item, index) => (
      <Button
        type="link"
        color={item.type ?? "default"}
        size="small"
        key={index}
        onClick={item.onClick}
      >
        {item.text}
      </Button>
    ))}
  </>
);

export default Handle;
