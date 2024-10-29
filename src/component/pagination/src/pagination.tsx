import { FC } from "react";
import { paginationConfig } from "@/config";
import { Pagination, PaginationProps } from "antd";
import useCustomStyles from "@/style/custom";

export interface PaginationAreaProps {
  total: number;
  pageSize: number;
  pageNum: number;
  handlePageChange: PaginationProps["onChange"];
}

const PaginationArea: FC<PaginationAreaProps> = ({
  total,
  pageSize,
  pageNum,
  handlePageChange,
}) => {
  const { styles: customStyles } = useCustomStyles();

  return (
    <Pagination
      className={customStyles.pagination}
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
};

export default PaginationArea;
