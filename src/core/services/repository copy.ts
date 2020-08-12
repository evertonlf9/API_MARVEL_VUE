import axios from 'axios'
import Utils from '../utils/utils'

class Http {
  instanceAxios: any

  constructor () {
    this.instanceAxios = axios.create({
      baseURL: 'https://gateway.marvel.com/v1/public/'
    })
  }

  getInstanceAxios () {
    return { ...this.instanceAxios }
  }

  getData (data: any, type: string, callback: Function): void {
    const promisse = []
    if (data && typeof data !== 'string') {
      data.forEach((url: string) => {
  		  console.log(url)
        promisse.push(this.getInstanceAxios().get(url))
      })
    } else if (data) {
      console.log(data)
      promisse.push(this.getInstanceAxios().get(data))
    }

    Promise.all(promisse).then((results) => {
      results = results.map((resp) => resp.data)
      callback && callback(type, results)
    })
  }

  _getData (data: any, type: string): Promise<any> {
    const promisse: any = []
    if (data && typeof data !== 'string') {
      data.forEach((url: string) => {
        url = url.replace('http://', 'https://')
        promisse.push(this.getInstanceAxios().get(url))
      })
    } else if (data) {
      data = data.replace('http://', 'https://')
          	promisse.push(this.getInstanceAxios().get(data))
    }

    return new Promise((resolve, reject) =>
      Promise.all(promisse).then((results: any) => {
        results = results.map((resp: any) => resp.data)
        resolve({ data: results, type: type })
      }).catch((err) => reject(err))
    )
  }

  get (params: any, headers: any = {}): Promise<any> {
    const url = `${Utils.getUrl(params)}`
    const configs: any = {}

    configs.headers = {
      ...headers
    }

    return new Promise((resolve, reject) =>
      this.instanceAxios.get(url, configs)
        .then(resolve)
        .catch((err: any) => {
          reject(err)
        })
    )
  }

  post (url: string, data: any, headers: any): Promise<any> {
    const configs: any = {}

    configs.headers = {
      ...headers
    }

    return new Promise((resolve, reject) => this.instanceAxios.post(url, data || {}, configs)
      .then(resolve)
      .catch((err: any) => {
        reject(err)
      })
    )
  }

  put (url: string, data: any, headers: any): Promise<any> {
    const configs: any = {}

    configs.headers = {
      ...headers
    }

    return new Promise((resolve, reject) => this.instanceAxios.put(url, data || {}, configs)
      .then(resolve)
      .catch((err: any) => {
        reject(err)
      })
    )
  }

  delete (url: string, headers: any, data: any) {
    const configs: any = {}

    configs.headers = {
      ...headers
    }

    return new Promise((resolve, reject) => this.instanceAxios.delete(url, configs, data || {})
      .then(resolve)
      .catch((err: any) => {
        reject(err)
      })
    )
  }
}

export default new Http()
