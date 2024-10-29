export const getTableScroll = () => {
  const tHeader = document.getElementsByClassName("ant-table-thead")[0];
  const calcTop = tHeader.getBoundingClientRect().bottom;
  const extraHeight = 40;

  let calcBottom = 0;
  const pagination = document.getElementsByClassName("ant-pagination")[0];
  if (pagination) {
    calcBottom = pagination.getBoundingClientRect().height + 16;
  }

  return `calc(100vh - ${calcTop + calcBottom + extraHeight}px)`;
};
