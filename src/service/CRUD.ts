import type { Result, PageResult } from "@type/http";
import http from "@/utils/request";

export default class CRUD {
  private url;
  constructor(url: string) {
    this.url = url;
  }

  /*
    this指向问题，全部改成箭头函数形式
  */

  fetchList = <T, P>(params?: T) =>
    http.get<T, Result<P>>(`${this.url}/getList`, params);

  fetchPage = <T, P>(params?: T) =>
    http.get<T, Result<PageResult<P>>>(`${this.url}/page`, params);

  create = <T, P>(data: T) => http.post<T, Result<P>>(`${this.url}/add`, data);

  update = <T, P>(data: T) =>
    http.post<T, Result<P>>(`${this.url}/update`, data);
}
