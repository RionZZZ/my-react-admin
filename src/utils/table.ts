export const getTableScroll = ({ pagination }: { pagination?: boolean }) => {
  const paginationHeight = pagination ? 48 : 0;
  const tHeader = document.getElementsByClassName("ant-table-thead")[0];
  const tHeaderBottom = tHeader.getBoundingClientRect().bottom + 40;
  return `calc(100vh - ${tHeaderBottom + paginationHeight}px)`;
};
