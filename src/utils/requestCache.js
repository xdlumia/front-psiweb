/*
 * @Author: 赵伦
 * @Date: 2019-11-27 16:03:23
 * @LastEditors: 赵伦
 * @LastEditTime: 2019-11-27 16:26:24
 * @Description: 接口请求数据缓存
 */
export class RequestCache {
    store = new Map;
    time = 0;

    constructor(store = new Map, time = 0) {
        this.store = store;
        this.time = time;
    }

    /**
     * 在多少秒内，使用相同请求结果，默认0
     */
    in(second) {
        return new RequestCache(this.store, second);
    }

    /**
     * 为接口 api函数 提供缓存服务
     */
    for(api = () => { }, ...params) {
        let key = JSON.stringify(params);
        let inStore = this.store.get(api) || new Map();
        let reqData = inStore.get(key)
        if (!(reqData && reqData.timestamp >= +new Date - this.time * 1000)) {
            inStore.set(key, {
                data: api.apply(this, params),
                timestamp: +new Date
            })
        }
        this.store.set(api, inStore)
        return inStore.get(key).data;
    }
}

export default new RequestCache()