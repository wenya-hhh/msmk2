import axios from 'axios'
import store from '../store'
// axios.defaults.withCredentials = true;//配置为true
import {
    Guid
} from './guid'
let deviceid = null
let id = window.localStorage.getItem('deviceid')
if (id) {
    deviceid = id
} else {
    id = Guid.NewGuid.toString('D')
}
// export default instance;
// instance 新创建的一个axios 赋值给instance
const instance = axios.create({
    // baseURL: 'http://120.53.31.103:84/api/app/',
    baseURL:'https://www.365msmk.com/api/app/',
    timeout: "7000"
})
//让ajax携带cookie
// instance.defaults.withCredentials=true;
// 请求拦截器
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = `Bearer  ${token}` //请求头加上token
    }
    store.state.isshow = true
    config.headers.deviceid = deviceid
    config.headers.devicetype = 'h5'
    //  store.state.islod=true
    return config
})
// 响应拦截器
instance.interceptors.response.use((res) => {
    //  if(res.data.meta.status == 401){
    //      window.sessionStorage.removeItem('token')
    //      router.push('/login')
    //  }
    store.state.isshow = false
    return res
})
// 将新创建的一个axios导出
export default instance