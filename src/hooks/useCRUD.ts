import CRUD from "@/service/CRUD";
import { HandleTypeEnum } from "@/types/enums/type";
import { useBoolean, useRequest } from "ahooks";
import { useState } from "react";
import { useMessage } from "./useMessage";

export const useCRUD = <T, P>(api: CRUD) => {
  const { createMessage } = useMessage();

  //请求相关
  const [queryData, setQueryData] = useState<P[]>();

  // 全部数据请求
  const { run: queryList, loading: queryLoading } = useRequest(
    api.fetchList<T, P[]>,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 0) {
          setQueryData(res.obj);
        }
      },
    }
  );
  // 分页数据请求
  const { run: queryPage, loading: pageLoading } = useRequest(
    api.fetchPage<T, P[]>,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 0) {
          setQueryData(res.obj.list);
        }
      },
    }
  );

  // 编辑接口
  /**
   * 使用run，走通用逻辑，弹出成功信息，关掉弹窗，刷新列表
   * 不通用逻辑使用runAsync，在组件内写回调逻辑
   */
  const {
    run: edit,
    runAsync: editAsync,
    loading: editLoading,
  } = useRequest(api.update<P, unknown>, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 0) {
        createMessage.success(res.msg);
        setModalFalse();
        queryPage();
      }
    },
  });
  // 创建接口
  const {
    run: add,
    runAsync: addAsync,
    loading: addLoading,
  } = useRequest(api.create<P, unknown>, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 0) {
        createMessage.success(res.msg);
        setModalFalse();
        queryPage();
      }
    },
  });

  // Modal相关
  const [modalVisible, { setTrue: setModalTrue, setFalse: setModalFalse }] =
    useBoolean(false);
  const [handleType, setHandleType] = useState<HandleTypeEnum>();
  const [modalData, setModalData] = useState<P>();
  const handleModal = (type: HandleTypeEnum, data?: P) => {
    setHandleType(type);
    setModalData(data);
    setModalTrue();
  };

  return {
    queryList,
    queryPage,
    queryData,
    queryLoading,
    pageLoading,
    edit,
    editAsync,
    editLoading,
    add,
    addAsync,
    addLoading,
    modalVisible,
    setModalFalse,
    handleType,
    modalData,
    handleModal,
  };
};
