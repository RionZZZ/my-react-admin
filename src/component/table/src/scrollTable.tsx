import { PaginationArea } from "@/component/pagination";
import { PaginationAreaProps } from "@/component/pagination/src/pagination";
import { getTableScroll } from "@/utils/table";
import { Table, TableProps } from "antd";
import { ReactElement, useEffect, useState } from "react";

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
  useEffect(() => {
    setScrollY(
      getTableScroll({
        pagination:
          !!paginationProps && paginationProps.total > paginationProps.pageSize,
      })
    );
  }, [paginationProps?.total, paginationProps?.pageSize]);

  return (
    <>
      <Table {...tableProps} scroll={{ x: "max-content", y: scrollY }} />
      {!tableProps.pagination && <PaginationArea {...paginationProps!} />}
    </>
  );
};

export default ScrollTable;
