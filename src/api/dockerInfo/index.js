import request from '/@/utils/request';

export function info(){
    return request({
        url:'/docker/info',
        method:'get'
    })
}

export function version(){
    return request({
        url:'/docker/info/version',
        method:'get'
    })
}