import request  from '/@/utils/request';

export function getServerInfo(){
    return request({
        url:'/monitor/server/info',
        method:'get'
    })
}

export function getRedisCacheInfo(){
    return request({
        url:'monitor/redis/info',
        method:'get'
    })
}