import axios from 'axios';
import api from './api.js';
import qs from 'qs';

export default {
    axios_head: `${api.path}:${api.axios_port}/event/`,
    // 1
    get_event(event_type, date_range, cow_range, region, affirm = '无需确认') {
        return new Promise(resolve => {
            axios({
                method: 'Get',
                url: this.axios_head,
                params: {event_type, date_range, range: cow_range, region, affirm},
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    // 1
    create_event(id, type, name, affirm, result, region) {
        return new Promise(resolve => {
            axios({
                    method: 'Post',
                    url: this.axios_head,
                    data: qs.stringify({id, type, name, affirm, result, region}),
                }
            ).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
    // 1
    judge_event(event_id, result) {
        return new Promise(resolve => {
            axios({
                method: 'Put',
                url: `${this.axios_head}`,
                params: {
                    event_id,
                    result
                },
            }).then(res => {
                resolve(res.data);
            }).catch(res => {
                console.log(res);
            })
        })
    },
}