import { paginationConfig } from "@/config";
import { Pagination, PaginationProps } from "antd";
import { FC } from "react";

interface PropState {
  total: number;
  pageSize: number;
  pageNum: number;
  handlePageChange: PaginationProps["onChange"];
}

const PaginationArea: FC<PropState> = ({
  total,
  pageSize,
  pageNum,
  handlePageChange,
}) => (
  <Pagination
    align="end"
    hideOnSinglePage={true}
    total={total}
    showTotal={(total) => `总计${total}条`}
    pageSize={pageSize}
    showQuickJumper
    showSizeChanger
    pageSizeOptions={paginationConfig.pageSizes}
    current={pageNum}
    onChange={handlePageChange}
  />
);

export default PaginationArea;
