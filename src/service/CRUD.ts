import type { Result, PageResult } from "@type/http";
import http from "@/utils/request";

export default class CRUD {
  private url;
  constructor(url: string) {
    this.url = url;
  }

  fetchList<T, P>(params?: T) {
    return http.get<T, Result<P>>(`${this.url}/getList`, params);
  }
  fetchPage<T, P>(params?: T) {
    return http.get<T, Result<PageResult<P>>>(`${this.url}/page`, params);
  }

  create<T>(data: T) {
    return http.post<T, Result<unknown>>(`${this.url}/add`, data);
  }
  
  update<T>(data: T) {
    return http.post<T, Result<unknown>>(`${this.url}/update`, data);
  }
}
