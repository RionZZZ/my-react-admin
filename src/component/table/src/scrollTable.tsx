import { PaginationArea } from "@/component/pagination";
import { PaginationAreaProps } from "@/component/pagination/src/pagination";
import { getTableScroll } from "@/utils/table";
import { useUpdateLayoutEffect } from "ahooks";
import { Table, TableProps } from "antd";
import { ReactElement, useState } from "react";

interface ScrollTableProp<T> {
  tableProps: TableProps<T>;
  paginationProps?: PaginationAreaProps;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare function ScrollTableType<T>(props: ScrollTableProp<T>): ReactElement;

const ScrollTable: typeof ScrollTableType = ({
  tableProps,
  paginationProps,
}) => {
  const [scrollY, setScrollY] = useState("");
  useUpdateLayoutEffect(() => {
    if (!tableProps.loading) {
      setScrollY(getTableScroll());
    }
  }, [tableProps.loading]);

  return (
    <>
      <Table {...tableProps} scroll={{ x: "100%", y: scrollY }} />
      {!tableProps.pagination && <PaginationArea {...paginationProps!} />}
    </>
  );
};

export default ScrollTable;
