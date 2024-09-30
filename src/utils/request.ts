import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type Method,
} from "axios";
import { appConfig } from "@/config";
import qs from "qs";
import { useAppDispatch, useAppSelector } from "@/store";
import { useMessage } from "@/hooks/useMessage";
import { resetUser } from "@/store/modules/user";

const defaultConfig: AxiosRequestConfig = {
  timeout: appConfig.requestTimeout,
  baseURL: appConfig.baseUrl,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json;charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
  },
};

class _Http {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  private httpInterceptorsRequest() {
    _Http.axiosInstance.interceptors.request.use(
      (config) => {
        const { token } = useAppSelector((state) => state.user);
        if (token) {
          config.headers!.Authorization = token;
        }

        const { createMessage } = useMessage();
        if (!navigator.onLine) {
          createMessage.error("网络故障，请检查");
          return config;
        }

        if (config.method === "get") {
          config.params = {
            t: new Date().getTime(),
            ...config.params,
          };
        }
        return config;
      },
      (error) => {
        console.log("request error");
        return Promise.reject(error);
      }
    );
  }

  private httpInterceptorsResponse() {
    _Http.axiosInstance.interceptors.response.use(
      (res) => {
        // 未设置状态码则默认成功状态
        const code = res.data.code;
        if (code && code !== 0) {
          const { createMessage } = useMessage();
          createMessage.error(res.data.msg);
          if (code === 401) {
            const dispatch = useAppDispatch();
            dispatch(resetUser());
          }
        }
        return res.data;
      },
      (err) => {
        let message = "服务器错误，请稍后尝试";
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              message = "请求错误(400)";
              break;
            case 401:
              message = "未授权，请重新登录(401)";
              break;
            case 403:
              message = "拒绝访问(403)";
              break;
            case 404:
              message = "请求出错(404)";
              break;
            case 408:
              message = "请求超时(408)";
              break;
            case 500:
              message = "服务器错误(500)";
              break;
            case 501:
              message = "服务未实现(501)";
              break;
            case 502:
              message = "网络错误(502)";
              break;
            case 503:
              message = "服务不可用(503)";
              break;
            case 504:
              message = "网络超时(504)";
              break;
            case 505:
              message = "HTTP版本不受支持(505)";
              break;
            default:
              message = `连接出错(${err.response.status})!`;
          }

          const { createMessage } = useMessage();
          createMessage.error(message);

          return Promise.reject(err);
        }
        return null;
      }
    );
  }

  public request<T>(
    method: Method,
    url: string,
    requestConfig?: AxiosRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...requestConfig,
    };
    return _Http.axiosInstance.request(config);
  }

  public get<T, P>(
    url: string,
    params?: T,
    requestConfig?: AxiosRequestConfig
  ): Promise<P> {
    return this.request<P>("get", url, {
      params,
      paramsSerializer: (params) => qs.stringify(params),
      ...requestConfig,
    });
  }
  public post<T, P>(
    url: string,
    data: T,
    requestConfig?: AxiosRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, { data, ...requestConfig });
  }
}

export default new _Http();
