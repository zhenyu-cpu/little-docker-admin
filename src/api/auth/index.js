import request from '/@/utils/request';

export function login(params){
    return request({
        url:'/auth/login',
        method:'post',
        data:{
            ...params
        }
    })
}

export function catcha(){
    return request({
        url:'/captcha/img',
        method:'get'
    })
}

export function logout(){
    return request({
        url:'/auth/logout',
        method:'get'
    })
}

export function info(){
    return request({
        url:'/auth/info',
        method:'get'
    })
}

export function router(){
    return request({
        url:'/auth/router',
        method:'get'
    })
}