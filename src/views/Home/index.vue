<!-- 首页 -->
<template>
    <div class="home_page">
        <header>首页</header>
        <MySearchVue class="search" @change="change" :fuzzy_items="fuzzy_items" :isLoading="isLoading"
                     @choose="choose_fuzzy_item"></MySearchVue>
        <InfoPanel
                class="first_info_panel"
                :panel_items="status_data_panel_items"
                title_font_size="18px"
                @choose="choose_data_panel"></InfoPanel>
        <InfoPanel @choose="choose_data_panel" :panel_items="cow_data_panel_items"></InfoPanel>
        <ButtonPanel @choose="choose_alert_button_panel" :buttons="alert_button_panel_items"></ButtonPanel>
        <ButtonPanel @choose="choose_event_button_panel" :buttons="event_button_panel_items"></ButtonPanel>
        <ButtonPanel @choose="choose_record_button_panel" :buttons="record_button_panel_items"></ButtonPanel>
    </div>
</template>

<script>
// vue
import {mapState} from 'vuex'
// api
import DEVICE from '../../api/device.js'
// local components
import MySearchVue from './MySearch.vue'
import InfoPanel from './InfoPanel.vue'
import ButtonPanel from './ButtonPanel.vue'

export default {
    data() {
        return {
            status_data_panel_items: [
                {title_front: '待处理', title_tail: '', attr: -1},
                {title_front: '待配种', title_tail: '', attr: -1},
                {title_front: '待孕检', title_tail: '', attr: -1},
            ],
            cow_data_panel_items: [
                {title_front: '已录入', title_tail: '牛只总数', attr: -1},
                {title_front: '疑似', title_tail: '发情牛只数', attr: -1},
                {title_front: '确认', title_tail: '发情牛只数', attr: -1},
            ],
            alert_button_panel_items: [
                {icon: 'el-icon-date', title: '配种提醒', path: '/HybridizationAlert'},
                {icon: 'el-icon-date', title: '验孕提醒', path: '/NonePregnantAlert'},
            ],
            event_button_panel_items: [
                {icon: 'el-icon-bell', title: '发情事件', path: '/EstrusEvent'},
                {icon: 'el-icon-bell', title: '异常事件', path: '/AnomalousEvent'},
                {icon: 'el-icon-bell', title: '断电事件', path: '/PowerOffEvent'},
            ],
            record_button_panel_items: [
                {icon: 'el-icon-circle-plus-outline', title: '牛只录入', path: '/RecordCow'},
                {icon: 'el-icon-circle-plus-outline', title: '事件录入', path: '/RecordEvent'},
            ],
            fuzzy_items: [],
            isLoading: false,
        }
    },

    components: {
        MySearchVue,
        InfoPanel,
        ButtonPanel,
    },

    computed: {
        ...mapState([
            'total_cow_num',
            'oestrus_cow_num',
            'confirm_cow_num',
            'pending_event',
            'pending_hybridize',
            'pending_none_pregnant',
            'region',
            ]),
    },

    created() {
        this.$store.dispatch('farm_info')
        this.refresh()
    },
    watch: {
        total_cow_num() {
            this.cow_data_panel_items[0].attr = this.total_cow_num
        },
        oestrus_cow_num() {
            this.cow_data_panel_items[1].attr = this.oestrus_cow_num
        },
        confirm_cow_num() {
            this.cow_data_panel_items[2].attr = this.confirm_cow_num
        },
        pending_event() {
            this.status_data_panel_items[0].attr = this.pending_event
        },
        pending_hybridize() {
            this.status_data_panel_items[1].attr = this.pending_hybridize
        },
        pending_none_pregnant() {
            this.status_data_panel_items[2].attr = this.pending_none_pregnant
        },
    },
    methods: {
        choose_alert_button_panel(index) {
            this.$router.push(this.alert_button_panel_items[index].path)
        },
        choose_event_button_panel(index) {
            this.$router.push(this.event_button_panel_items[index].path)
        },
        choose_record_button_panel(index) {
            this.$router.push(this.record_button_panel_items[index].path)
        },
        async change(value) {
            this.isLoading = true;
            await DEVICE.fuzzy_search_ear_tag_id(String(value), this.region).then((res) => {
                this.fuzzy_items = res
                this.isLoading = false;
            })
        },
        choose_fuzzy_item(index) {
            this.$router.push({
                path: '/CowInfo',
                query: {
                    cow_info: this.fuzzy_items[index][0],
                },
            })
        },
        refresh() {
            this.cow_data_panel_items[0].attr = this.total_cow_num
            this.cow_data_panel_items[1].attr = this.oestrus_cow_num
            this.cow_data_panel_items[2].attr = this.confirm_cow_num
            this.status_data_panel_items[0].attr = this.pending_event
            this.status_data_panel_items[1].attr = this.pending_hybridize
            this.status_data_panel_items[2].attr = this.pending_none_pregnant
        },
        choose_data_panel(index) {
            index === 0 &&
            this.$router.push({
                name: 'AllCow',
                params: {},
            })
            index === 1 &&
            this.$router.push({
                name: 'SuspectedOestrus',
                params: {},
            })
            index === 2 &&
            this.$router.push({
                name: 'EstrusEvent',
                params: {
                    affirm: true,
                },
            })
        },
    },
}
</script>
<style lang="less" scoped>
.home_page {
  height: calc(100vh - 60px);
  background-image: url('../../assets/home_top.jpg');
  background-repeat: no-repeat;
  background-size: contain;
}

header {
  padding-top: 12px;
  font-size: 18px;
  font-weight: 800;
  color: #fff;
}

.search {
  margin-top: 12px;
}

.first_info_panel {
  margin-top: 5vh;
}
</style>