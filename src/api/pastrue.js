import axios from 'axios';
import api from './api.js';
import qs from 'qs';

export default {
    axios_head: `${api.path}:${api.axios_port}/pasture/`,
    farm_info(region) {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: `${this.axios_head}summary`,
                params: {region}
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
}