import axios, { CanceledError } from "axios";
import type { Method } from "axios";
import { ElMessage } from "element-plus";
import { debounce } from "lodash";
import { download, isFunction } from "./index";
import { stringify } from "querystring";

const RESPONSE_SUCCESS = [200];
const REQUEST_METHODS: Method[] = ["get", "post", "put", "delete"];

const DOMAIN = "";

const SUFFIX = "";

const config = {
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
};

const DEFAULT_DEBOUNCE_USER_CONFIG = {
  debounce: false,
};

class Axios {
  $http = {} as any;
  config = {};
  controller: any = {};

  constructor(Props: any) {
    const { config, domain } = Props;
    this.config = config;
    this.$http = axios.create(config);
    this.$http.defaults.baseURL = domain;
    this.createController();
  }

  createAxiosMethod(method: Method) {
    return (data: any) => this.createAxiosBody(method, data);
  }

  createController() {
    const controller = new AbortController();
    this.controller.signal = controller.signal;
    this.controller.abort = () => {
      controller.abort();
      this.createController();
    };
  }

  createAxiosBody(method: Method, data: any) {
    console.log("%c 111 请求数据", "color:red", data);
    const configs = this.createAxiosConfigs(method, data);
    const {
      isFileContent,
      data: { mockFunc },
    } = configs;

    if (mockFunc) {
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.$http(configs);
        const { message } = response?.data || { data: {} };
        const { status } = response || {};

        if (isFileContent) {
          const {
            headers,
            config: { filename },
          } = response;

          download(response?.data, filename ?? "");
        } else if (RESPONSE_SUCCESS.includes(Number(status))) {
          console.log("%c 111 响应数据", "color:red", response?.data);
          resolve(response?.data);
        } else {
          ElMessage({
            message,
            type: "error",
            grouping: true,
          });
          reject(response?.data);
        }
      } catch (error: any) {
        resolve(this.handleAxiosError(error));
      }
    });
  }

  handleAxiosError(e: Error) {
    return new Promise((resolve, reject) => {
      const isCancelErr = e instanceof CanceledError;
      if (isCancelErr) {
        resolve({ canceled: true, error: e });
        return;
      }
      console.log("%c 111 服务异常", "color:red", e);
      reject(e);
    });
  }

  createAxiosConfigs(method: Method, data: any) {
    this.setRequestInterceptor();
    this.setResponseInterceptor();

    const { url, params = {}, suffix = SUFFIX, userConfig } = data;
    const { context, combineQuery = true } = userConfig || {};
    const configuration = userConfig || this.config;
    const isFileContent = ["arraybuffer"].includes(configuration.responseType);

    const { query } = params;
    const $queryCombine =
      query && combineQuery ? `?${stringify(query || {})}` : "";
    const { $param, newHeaders } = this.handleFormData(data);

    return {
      url: `${suffix}${url.replace(/^\//, "")}${$queryCombine}`,
      data: $param,
      method,
      ...configuration,
      isFileContent,
      context,
      headers: {
        ...newHeaders,
      },
      signal: this.controller.signal,
    };
  }

  handleFormData(data: any) {
    const { params = {}, userConfig, headers } = data;
    const { type } = userConfig || {};

    let form = params;

    const isFormData = type === "formData" || params instanceof FormData;

    if (isFormData && !(params instanceof FormData)) {
      form = new FormData();
      Object.keys(params).forEach((key: string) => {
        form.append(key, params[key]);
      });
    }

    return {
      $param: form,
      newHeaders: isFormData
        ? { ...headers, "Content-Type": "multipart/form-data" }
        : headers,
    };
  }

  setRequestInterceptor() {}
  setResponseInterceptor() {}
}

const attachController = (controller: AbortController, fn: any) => {
  fn.controller = controller;

  return fn;
};

const genApi = (axiosMethod: any, options: ((params?: any) => any) | any) => {
  const { userConfig = DEFAULT_DEBOUNCE_USER_CONFIG } = isFunction(options)
    ? options({})
    : options;

  const debounceUserConfig = { ...DEFAULT_DEBOUNCE_USER_CONFIG, ...userConfig };

  const f = (params?: any) => {
    const opts = isFunction(options) ? options({}) : options;

    return axiosMethod({ ...opts });
  };

  const fn = debounceUserConfig?.debounce
    ? debounce(
        f,
        debounceUserConfig?.debounceTime ?? 1000,
        debounceUserConfig?.debounceSettings ?? {
          leading: true,
          trailing: false,
        }
      )
    : f;

  return attachController(axiosMethod.controller, fn);
};

const createCancelMethod =
  (axiosMethod: any) => (options: ((params?: any) => any) | any) => {
    return genApi(axiosMethod, options);
  };

const createAxios = (Props: any) => {
  return REQUEST_METHODS.reduce((acc: any, method: Method) => {
    const axiosInstance = new Axios(Props);
    const axiosMethod: any = axiosInstance.createAxiosMethod(method);
    axiosMethod.controller = axiosInstance.controller;

    return { ...acc, [method]: createCancelMethod(axiosMethod) };
  }, {});
};

const request: any = createAxios({
  domain: DOMAIN,
  config,
});

export const { get, post, put, delete: del } = request;

export default request;
