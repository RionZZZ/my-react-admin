import { UserApi } from "@/service";
import { UserData, UserField } from "@/types/user";
import { useBoolean, useDebounceFn, useRequest } from "ahooks";
import { Empty, Select, SelectProps, Spin } from "antd";
import { FC, useEffect, useState } from "react";

interface UserSearchProp {
  immediately?: boolean;
  deptId?: string;
}

const UserSearch: FC<UserSearchProp & SelectProps> = ({
  immediately,
  deptId,
  ...props
}) => {
  const [fetching, { setFalse: setFetchFalse, setTrue: setFetchTrue }] =
    useBoolean(false);
  const [options, setOptions] = useState<UserData[]>([]);

  const { run: debounceFetcher } = useDebounceFn(
    (value: string) => {
      setOptions([]);
      setFetchTrue();
      fetchUserList(value);
    },
    { wait: 500 }
  );

  const { runAsync: getUserList } = useRequest(
    UserApi.fetchList<UserField, UserData>,
    {
      manual: true,
    }
  );
  const fetchUserList = (userName?: string) => {
    getUserList({ userName, deptId: deptId ? +deptId : undefined })
      .then((res) => {
        if (res.code === 0) {
          setOptions(res.obj);
          setFetchFalse();
        } else {
          setOptions([]);
          setFetchFalse();
        }
      })
      .catch(() => {
        setOptions([]);
        setFetchFalse();
      });
  };

  useEffect(() => {
    if (immediately) {
      fetchUserList();
    }
  }, []);

  return (
    <Select
      showSearch
      onSearch={debounceFetcher}
      filterOption={false}
      notFoundContent={
        fetching ? (
          <Spin size="small" />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      }
      {...props}
      options={options}
      fieldNames={{ label: "userName", value: "id" }}
    />
  );
};

export default UserSearch;
