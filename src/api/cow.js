import axios from 'axios';
import api from './api.js';
import qs from 'qs';
export default {
    axios_head: `${api.path}:${api.axios_port}/cow/`,
    // 1
    record_cow(id, imei, date, pen, worker, remark, region) {
        if (imei == '') {
            imei = -1
        }
        return new Promise(resolve => {
            axios({
                method: 'Post',
                url: this.axios_head,
                params: {
                    id,
                    imei,
                    date,
                    pen,
                    worker,
                    remark,
                    region,
                }
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    // 1
    update_cow(previous_id, previous_imei, id, imei, date, pen, worker, remark, id_changed, imei_changed, region) {
        if (imei === '未绑定') imei = -1
        return new Promise(resolve => {
            axios({
                method: 'Put',
                url: this.axios_head,
                data: qs.stringify({ previous_id, previous_imei, id, imei, date, pen, worker, remark, id_changed, imei_changed, region })
            }
            ).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    // 1
    delete_cow(id, region) {
        return new Promise(resolve => {
            axios({
                method: 'Delete',
                url: this.axios_head,
                params: { id, region }
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    // get_cow_info_by_ear(ear_tag_id) {
    //     return new Promise(resolve => {
    //         axios({
    //             method: 'Get',
    //             url: `${this.axios_head}earTag`,
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
    // // 1
    // get_cow_info_by_device(imei) {
    //     return new Promise(resolve => {
    //         axios({
    //             method: 'Get',
    //             url: `${this.axios_head}device`,
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
    get_cow_info_by_cow(cow_id, type) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}cow`,
                params: {
                    cow_id,
                    type
                }
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    // 1
    get_all_cows(region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}region/id`,
                params: {region}
            }).then(res => {
                resolve(res.data);
            }).catch(() => {
                resolve(false)
            })
        })
    },
    // 1
    get_all_region() {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}ids/region`,
            }).then(res => {
                resolve(res.data);
            }).catch(() => {
                resolve(false)
            })
        })
    }
}