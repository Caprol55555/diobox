<script>
// api
import DEVICE from '../../api/device'
// common components
import InfoListVue from '../../components/InfoList.vue'
import TopBarVue from '../../components/TopBar.vue'
import {mapState} from "vuex";

export  default {
    data() {
        return {
            muti_list_items: [],
        }
    },
    components: {
        InfoListVue,
        TopBarVue,
    },
    mounted() {
        this.get_event()
    },
    computed: {
        ...mapState(['region']),
    },
    methods: {
        choose_item(my_arguments, muti_item_index) {
            let item_index = my_arguments[0]
            let cow_id = this.muti_list_items[muti_item_index]['data'][item_index]['cow_id']
            this.$router.push({ path: '/CowInfo', query: { cow_info: cow_id } })
        },
        async get_event() {
            await DEVICE.get_suspected_oestrus(this.region).then((res) => {
                this.muti_list_items = []
                let list_items = {
                    title: '',
                    data: [],
                }
                res.forEach((e, index) => {
                    if (!list_items.title) {
                        // 刚初始化list_items
                        list_items.title = e.date
                    }
                    if (e.date !== list_items.title) {
                        // 当数据是新的日期或者当前数据是最后一个时
                        this.muti_list_items.push(list_items)
                        list_items = {
                            title: '',
                            data: [],
                        }
                    }
                    list_items.data.push({
                        event_id: e.event_id,
                        title: `${e.cow_id}号牛只`,
                        info: e.detail_date,
                        isStar: false,
                        affirm: false,
                        result: false,
                        can_input: false,
                        cow_id: e.cow_id,
                    })
                    if (index === res.length - 1) {
                        this.muti_list_items.push(list_items)
                    }
                })
            })
        }
    }
}
</script>

<template>
    <div class="suspected_oestrus_page">
        <TopBarVue title="疑似发情牛只"></TopBarVue>
        <InfoListVue
            v-for="(item, index) in muti_list_items"
            :key="index"
            class="info_list"
            :title="item.title"
            :list_items="item.data"
            @choose_item="choose_item(arguments, index)"
        ></InfoListVue>
        <footer>暂无更多数据</footer>
    </div>
</template>

<style scoped lang="less">
.suspected_oestrus_page {
    background-color: #f0f0f0;
    height: 100%;
    min-height: 100vh;
}
.info_list {
    margin-top: 15px;
}
footer {
    padding: 12px 0;
    color: #a6a6a6;
    font-size: 10px;
}
</style>