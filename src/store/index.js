import Vue from 'vue'
import Vuex from 'vuex'
import PASTRUE from '../api/pastrue.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // cow info
        total_cow_num: -1,
        oestrus_cow_num: -1,
        confirm_cow_num: -1,

        // event info
        pending_event: -1,
        pending_hybridize: -1,
        pending_none_pregnant: -1,

        // user info
        region: '',
    },
    mutations: {
        total_cow_num_increment(state) {
            state.total_cow_num = state.total_cow_num + 1;
        },
        change_farm_info(state, payload) {
            state.total_cow_num = payload.cow_amount;
            state.oestrus_cow_num = payload.cow_oestrus;
            state.confirm_cow_num = payload.cow_confirm;
            state.pending_event = payload.pending_event;
            state.pending_hybridize = payload.pending_hybridize;
            state.pending_none_pregnant = payload.pending_none_pregnant;
        },
        update_region(state, payload) {
            state.region = payload;
        },
    },
    actions: {
        async farm_info(context) {
            await PASTRUE.farm_info(context.state.region).then(payload => {
                context.commit('change_farm_info', payload)
            })
        },
        update_region(context, payload) {
            context.commit('update_region', payload)
        }
    },
    modules: {
    }
})
