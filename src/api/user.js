import axios from 'axios';
import qs from 'qs';
import api from './api.js';
export default {
    axios_head: `${api.path}:${api.axios_port}/user/`,
    // 1
    calibrate_account(account, password) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: this.axios_head,
                params: {
                    account,
                    password,
                }
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
}