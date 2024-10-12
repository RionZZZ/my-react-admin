import CRUD from "@/service/CRUD";
import { useRequest } from "ahooks";

let api: CRUD;
let queryData: unknown;

const useQueryAll = <T, P>() => {
  useRequest(api.fetchList<T, P>, {
    onSuccess: (res) => {
      if (res.code === 0) {
        console.log(res);
        queryData = res.obj;
      }
    },
  });
};

export const useCRUD = (service: CRUD) => {
  api = service;

  return { useQueryAll, queryData };
};
