<!-- 空怀检测提醒页面 -->
<template>
    <div class="event_page">
        <section class="back_button" @click="back">
            <i class="el-icon-arrow-left"></i>
        </section>
        <header>
            <section>空怀检测提醒</section>
        </header>
        <Search
            class="search"
            placeholder="请输入牛只号"
            :fuzzy_search="true"
            :fuzzy_items="fuzzy_items"
            :fuzzy_title="fuzzy_title"
            :isLoading="isLoading"
            main_data_name="牛只号"
            @change="search_value_change"
            @choose_fuzzy_block="choose_fuzzy_block"
            @clear="clear_search_value"
            @value_empty="clear_search_value"
        ></Search>
        <section class="search_tip">-- 当前牛只检索范围：{{ cow_range }} --</section>
        <InfoListVue
            v-for="(item, index) in muti_list_items"
            :key="index"
            class="info_list"
            :title="item.title"
            :list_items="item.data"
            @choose_item="choose_item(arguments, index)"
            @choose_unconfirmed="choose_unconfirmed(arguments, index)"
        ></InfoListVue>
        <footer>暂无更多数据</footer>
        <MySelectorVue
            v-if="is_select"
            :title="selector_title"
            :selector_items="selector_items"
            left_button_name="查看"
            @exit="is_select = false"
            @cancel="check_cow"
            @confirm="confirm"
        ></MySelectorVue>
    </div>
</template>

<script>
// vue
import {mapState} from 'vuex'
// api
import DEVICE from '../../api/device.js'
import ALERT from '../../api/alert.js'
// common components
import InfoListVue from '../../components/InfoList.vue'
import Search from '../../components/Search.vue'
import MySelectorVue from "../../components/MySelector.vue";

export default {
    data() {
        return {
            muti_list_items: [],
            cow_range: '所有牛只',
            fuzzy_items: [],
            fuzzy_title: ['牛只号', '设备号'],
            isLoading: false,
            is_select: false,
            selector_items: ['已检测', '', ''],
            selected_event: [0, 0],
            selector_title: '请确认是否已检测空怀',
        }
    },

    components: {
        MySelectorVue,
        InfoListVue,
        Search,
    },

    computed: {
        ...mapState(['region']),
    },

    mounted() {
        this.get_event()
    },

    methods: {
        back() {
            this.$router.go(-1)
        },
        choose_item(my_arguments, index) {
            let muti_item_index = index
            let item_index = my_arguments[0]
            this.is_select = true
            this.selected_event = [muti_item_index, item_index]
        },
        async get_event() {
            await ALERT.get_none_pregnant_alert(this.cow_range, this.region).then((res) => {
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
                            title: e.date,
                            data: [],
                        }
                    }
                    list_items.data.push({
                        event_id: e.event_id,
                        cow_id: e.cow_id,
                        title: `${e.cow_id}号牛只`,
                        info: `${e.specific_date}`,
                        isStar: false,
                        affirm: false,
                        result: false,
                        can_input: false,
                        name: e.name,
                    })
                    if (index === res.length - 1) {
                        this.muti_list_items.push(list_items)
                    }
                })
            })
        },
        choose_unconfirmed(my_arguments, index) {
            let cow_id = this.muti_list_items[index].data[my_arguments[0]].cow_id
            this.$router.push({path: '/CowInfo', query: {cow_info: cow_id}})
        },
        async search_value_change(value) {
            this.isLoading = true;
            await DEVICE.fuzzy_search_cow(value, this.region).then((res) => {
                this.fuzzy_items = res
                this.isLoading = false;
            })
        },
        choose_fuzzy_block(item) {
            this.cow_range = `${item['牛只号']}号牛只`
            this.get_event()
        },
        clear_search_value() {
            this.cow_range = '所有牛只'
            this.get_event()
        },
        check_cow() {
            this.is_select = false
            let cow_id = this.muti_list_items[this.selected_event[0]]['data'][this.selected_event[1]].cow_id
            this.$router.push({path: '/CowInfo', query: {cow_info: cow_id}})
        },
        async confirm() {
            let muti_item_index = this.selected_event[0]
            let item_index = this.selected_event[1]
            let item = this.muti_list_items[muti_item_index].data[item_index]
            let id = item.event_id
            await ALERT.confirm_none_pregnant(id, this.region).then((res) => {
                this.is_select = false
                if (res === 'has been confirmed.') {
                    this.$notify({
                        message: `牛只已进行空怀检测`,
                        type: 'warning',
                    })
                } else if (res === 'status changed') {
                    this.muti_list_items[muti_item_index].data[item_index].affirm = true
                    this.muti_list_items[muti_item_index].data[item_index].result = true
                    this.muti_list_items[muti_item_index].data[item_index].info = '已配种'
                    this.$notify({
                        message: `空怀检测状态设置成功`,
                        type: 'success',
                    })
                } else if(res==='cow do not exist'){
                    this.$notify({
                        message: `不存在对应牛只`,
                        type: 'warning',
                    })
                } else {
                    this.$notify({
                        message: `空怀检测状态出错`,
                        type: 'warning',
                    })
                }
            })
        },
    },
}
</script>
<style lang="less" scoped>
.back_button {
    position: absolute;
    top: 10px;
    left: 5vw;
    height: 30px;
    line-height: 30px;
    width: 30px;
    color: #4b9fe5;
    font-size: 20px;
    font-weight: bolder;
    background-color: #f0f0f0;
    border-radius: 50%;
    z-index: 99;
}

header {
    position: relative;
    height: 50px;
    line-height: 50px;
    color: #5470c6;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 1px;
    background-color: #fff;
}

.event_page {
    background-color: #f0f0f0;
    height: 100%;
    min-height: 100vh;
}

.search {
    background-color: #fff;
}

.search_tip {
    background-color: #fff;
    padding-top: 5px;
    font-size: 12px;
    color: #c7c5c5;
    padding-bottom: 10px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

//.DropDownMenu {
//  background-color: #fff;
//  padding-bottom: 10px;
//  border-bottom-left-radius: 15px;
//  border-bottom-right-radius: 15px;
//}

.info_list {
    margin-top: 15px;
}

footer {
    padding: 12px 0;
    color: #a6a6a6;
    font-size: 10px;
}
</style>
