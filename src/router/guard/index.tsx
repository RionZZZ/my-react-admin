import CommonLayout from "@/layout";
import { Guard } from "./guard";

export const GuardLayout = () => {
  console.log("GUARD");
  return (
    <Guard>
      <CommonLayout />
    </Guard>
  );
};
