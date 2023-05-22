import axios from 'axios';
import qs from 'qs';
import api from './api.js';
export default {
    axios_head: `${api.path}:${api.axios_port}/Alert/`,
    get_hybridization_alert(range, region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}hybridization`,
                params: {
                    range,
                    region
                }
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    confirm_hybridization(alert_id, region) {
        return new Promise(resolve => {
            axios({
                method: 'Put',
                url: `${this.axios_head}hybridization`,
                params: {
                    alert_id,
                    region,
                }
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    get_none_pregnant_alert(range, region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}none_pregnant`,
                params: {
                    range,
                    region
                }
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    confirm_none_pregnant(alert_id, region) {
        return new Promise(resolve => {
            axios({
                method: 'Put',
                url: `${this.axios_head}none_pregnant`,
                params: {
                    alert_id,
                    region,
                }
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
}