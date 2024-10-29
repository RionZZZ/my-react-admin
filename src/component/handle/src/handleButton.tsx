import { Button, ButtonProps } from "antd";
import { FC } from "react";

interface HandleItem {
  text: string;
  type?: ButtonProps["color"];
  onClick: () => void;
}
interface HandleButtonProps {
  items: HandleItem[];
}

const HandleButton: FC<HandleButtonProps> = ({ items }) => (
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

export default HandleButton;
