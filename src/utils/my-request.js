import axios, {Axios} from "axios"
import qs from "qs"
import {MessagePlugin} from 'tdesign-vue';

const errorHandle = (state, info) => {
  switch (state) {
  case 400:
    console.log("服务器收到客户端通过PUT或者POST请求提交的表示，表示的格式正确，但服务器不懂它什么意思");
    break;
  case 401:
    console.log("客户端试图对一个受保护的资源进行操作，却又没有提供正确的认证证书");
    break;
  case 403:
    console.log("客户端请求的结构正确，但是服务器不想处理它");
    break;
  case 404:
    console.log("资源未被定义(网络请求地址错误)");
    break;
  case 500:
    console.log("执行请求处理代码时遇到了异常，它们就发送此响应代码");
    break;
  case 503:
    console.log("最可能的原因是资源不足：服务器突然收到太多请求，以至于无法全部处理");
    break;
  default:
    console.log(info);
    break;
  }
}

// 创建axios的实例对象(单例)
const instance = axios.create({
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("jwt")
  }
})
// 创建axios的实例对象(非单例)

// 处理并发请求方法
instance.all = axios.all;
instance.spread = axios.spread

// 全局配置
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截和响应拦截
instance.interceptors.request.use(
  config => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      config.headers.Authorization = jwt
    }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  // response => response.data.state === 200 ? Promise.resolve(response) : Promise.reject(response),
  response => {
    if (response.data.state === 200) {
      return Promise.resolve(response)
    } else if (response.data.state === 401) { // TODO: 此处应修改为状态码等于600时返回登录页
      MessagePlugin.error('出错了')
      localStorage.clear()
      location.href = "/login"
      return Promise.reject(response)
    } else {
      console.log("捕获到异常");
      MessagePlugin.error(response.data.message)
      return Promise.reject(response)
    }
  },
  error => {
    const {response} = error;

    if (response) {
      /**
       * 错误信息以状态码为主
       */
      MessagePlugin.error('服务器异常')
      console.error("服务器异常")

      errorHandle(response.data.state, response.data);
      return Promise.reject(response);
    } else {
      console.log("请求被中断");
    }
  }
)

/**
 * 提供get和post的请求方式
 */

export function GET(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log(err.data);
        reject(err.data);
      })
  })
}

export function POST(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        // console.log(err);
        reject(err.data)
      })
  })
}

export function PUT(url, params) {
  const formData = new URLSearchParams();
  for (const key in params) {
    formData.append(key, params[key]);
  }

  return new Promise((resolve, reject) => {
    instance
      .put(url, formData)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}


export function DELETE(url, params) {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        // console.log(err);
        reject(err.data)
      })
  })
}

export default instance
