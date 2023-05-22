import axios from 'axios';
import api from './api.js';
import qs from 'qs';
export default {
    axios_head: `${api.path}:${api.axios_port}/device/`,
    // check_id_exist(ear_tag_id) {
    //     return new Promise(resolve => {
    //         axios({
    //             method: 'Get',
    //             url: `${this.axios_head}earTag/exist`,
    //             params: {
    //                 ear_tag_id
    //             }
    //         }).then(res => {
    //             resolve(res.data);
    //         }).catch(res => {
    //             console.log(res);
    //         })
    //     })
    // },
    // search(imei) {
    //     return new Promise(resolve => {
    //         axios({
    //             method: 'Get',
    //             url: `${this.axios_head}search/imei`,
    //             params: {
    //                 imei
    //             }
    //         }).then(res => {
    //             resolve(res.data);
    //         }).catch(res => {
    //             console.log(res);
    //         })
    //     })
    // },
    // 1
    fuzzy_search_ear_tag_id(fuzzy_word, region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}fuzzySearch/earTag`,
                params: {
                    fuzzy_word,
                    region
                }
            }).then(res => {
                resolve(res.data);
            }).catch(() => {
                resolve(false)
            })
        })
    },
    // 1
    fuzzy_search_imeis(fuzzy_word, region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}fuzzySearch/imei`,
                params: {
                    fuzzy_word,
                    region
                }
            }).then(res => {
                resolve(res.data);
            }).catch(() => {
                resolve(false)
            })
        })
    },    // 1
    fuzzy_search_unbind_imeis(fuzzy_word, region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}fuzzySearch/unbind_imeis`,
                params: {
                    fuzzy_word,
                    region
                }
            }).then(res => {
                resolve(res.data);
            }).catch(() => {
                resolve(false)
            })
        })
    },
    // 1
    fuzzy_search_cow(fuzzy_word, region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}fuzzySearch/cow`,
                params: {
                    fuzzy_word,
                    region
                }
            }).then(res => {
                resolve(res.data);
            }).catch(() => {
                resolve(false)
            })
        })
    },
    // get_all_imeis(region = 'undefined') {
    //     return new Promise(resolve => {
    //         if (region == '所有地区') region = 'undefined'
    //         axios({
    //             method: 'Get',
    //             url: `${this.axios_head}region/id`,
    //             params: {
    //                 region
    //             }
    //         }).then(res => {
    //             resolve(res.data);
    //         }).catch(() => {
    //             resolve(false)
    //         })
    //     })
    // },
    bind_ear_tag(imei, cow_id, region) {
        return new Promise(resolve => {
            axios({
                method: 'Put',
                url: `${this.axios_head}id`,
                params: {
                    imei,
                    cow_id,
                    region,
                }
            }).then(() => {
                resolve(1);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    // get_all_region() {
    //     return new Promise(resolve => {
    //         axios({
    //             method: 'Get',
    //             url: `${this.axios_head}regions`,
    //         }).then(res => {
    //             resolve(res.data);
    //         }).catch(() => {
    //             resolve(false)
    //         })
    //     })
    // },
    get_suspected_oestrus(region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}suspected_oestrus`,
                params: {region},
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    }
}