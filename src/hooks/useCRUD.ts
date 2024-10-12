import CRUD from "@/service/CRUD";
import { useRequest } from "ahooks";
import { useState } from "react";

export const useCRUD = <T, P>(api: CRUD) => {
  const [queryData, setQueryData] = useState<P>();
  const { run: queryList, loading: queryLoading } = useRequest(
    api.fetchList<T, P>,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 0) {
          setQueryData(res.obj);
        }
      },
    }
  );
  const { run: queryPage, loading: pageLoading } = useRequest(
    api.fetchPage<T, P>,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 0) {
          setQueryData(res.obj.list);
        }
      },
    }
  );
  return { queryList, queryPage, queryData, queryLoading, pageLoading };
};
