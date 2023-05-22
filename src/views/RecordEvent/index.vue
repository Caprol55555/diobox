<!-- 事件录入页面 -->
<template>
    <div class="record_event_page">
        <TopBarVue title="牛只事件录入"></TopBarVue>
        <InfoListVue
            class="info_list"
            title="事件信息"
            :item_title="item_title"
            :item_info="item_info"
            :item_placeholder="item_placeholder"
            :item_star="item_star"
            :item_affirm="item_affirm"
            :item_result="item_result"
            :item_can_input="item_can_input"
            :item_fuzzy_title="item_fuzzy_title"
            :item_fuzzy_items="item_fuzzy_items"
            :is_loading="is_loading"
            @fuzzy_search="fuzzy_search"
            @choose_item="choose_item"
        ></InfoListVue>
        <MySelectorVue
                v-if="is_select"
                :title="selector_title"
                :selector_items="selector_item"
                @cancel="is_select = false"
                @confirm="confirm"
                @exit="is_select = false"
        ></MySelectorVue>
        <button @click="record">确认</button>
    </div>
</template>

<script>
// vue
import {mapState} from 'vuex'
// api
import EVENT from '../../api/event.js'
import DEVICE from '../../api/device.js'
// common components
import InfoListVue from '../../components/InfoListPro.vue'
import MySelectorVue from '../../components/MySelector.vue'
import TopBarVue from '../../components/TopBar.vue'

export default {
    data() {
        return {
            item_title: [
                '牛只号',
                '信息来源',
                '事件类型',
                '事件名',
            ],
            item_info: ['', '请选择信息来源', '发情事件', '发情'],
            item_placeholder: [
                '请输入牛只号',
                '请输入信息来源',
                '请输入事件类型',
                '请输入事件名',
            ],
            item_star: [true, true, true, true],
            item_affirm: [false, false, false, false],
            item_result: [false, false, false, false],
            item_can_input: [true, false, false, false],
            item_fuzzy_title: [
                ['牛只号', '设备号'],
                undefined,
                undefined,
                undefined,
            ],
            item_fuzzy_items: [],
            list_items: [
                {
                    title: '牛只号',
                    placeholder: '请输入牛只号',
                    info: '',
                    isStar: true,
                    affirm: false,
                    result: false,
                    can_input: true,
                    fuzzy_title: ['牛只号', '设备号'],
                    fuzzy_items: [],
                },
                {
                    title: '信息来源',
                    placeholder: '',
                    info: '请选择信息来源',
                    isStar: true,
                    affirm: false,
                    result: false,
                    can_input: false,
                },
                {
                    title: '事件类型',
                    placeholder: '请选择事件类型',
                    info: '发情事件',
                    isStar: true,
                    affirm: false,
                    result: false,
                    can_input: false,
                },
                {
                    title: '事件名',
                    placeholder: '请选择事件名',
                    info: '发情',
                    isStar: true,
                    affirm: false,
                    result: false,
                    can_input: false,
                },
            ],
            selector_title: '',
            selector_item: [],
            selector_items: {
                '信息来源': ['观察数据', '实地观察', '', ''],
                '事件类型': ['发情事件', '异常事件', '', ''],
                '发情事件': ['发情', '', ''],
                '异常事件': ['跛行', '感冒', '', ''],
            },
            is_select: false,
            info_list_index: 0,
            is_loading: false,
        }
    },

    components: {
        InfoListVue,
        MySelectorVue,
        TopBarVue,
    },

    computed: {
        ...mapState(['region']),
    },

    mounted() {
    },

    methods: {
        async record() {
            let affirm, result;
            if (this.item_info[1] === '观察数据') {
                affirm = false;
                result = false;
            } else if (this.item_info[1] === '实地观察') {
                affirm = true;
                result = true;
            } else {
                return;
            }
            let id = this.item_info[0]
            let type = this.item_info[2]
            let name = this.item_info[3]
            if (!type.length || !name.length || !id.length) {
                this.$notify({
                    title: '警告',
                    message: '存在未填写信息',
                    type: 'warning',
                })
            } else {
                await EVENT.create_event(id, type, name, affirm, result, this.region).then((res) => {
                    if (res === 'success') {
                        this.$notify({
                            message: '事件录入成功',
                            type: 'success',
                        })
                    } else {
                        this.$notify({
                            message: '牛只不存在',
                            type: 'warning',
                        })
                    }
                })
            }
        },
        choose_item(index) {
            let event_name = this.item_title[index]
            if (event_name === '信息来源' || event_name === '事件类型') {
                this.selector_title = `请选择${event_name}`
                this.selector_item = this.selector_items[event_name]
                this.is_select = true
            } else if(event_name === '事件名') {
                this.selector_title = `请选择${event_name}`
                this.selector_item = this.selector_items[this.item_info[2]]
                this.is_select = true
            }
        },
        async fuzzy_search(payload) {
            let {index, value} = payload
            this.is_loading = true
            await DEVICE.fuzzy_search_cow(value, this.region).then(res=> {
                this.item_fuzzy_items = res
                this.is_loading = false
            })
        },
        confirm(status) {
            this.is_select = false
            switch (this.selector_title) {
                case '请选择信息来源':
                    this.item_info[1] = status
                    break;
                case '请选择事件类型':
                    this.item_info[2] = status
                    this.item_info[3] = this.selector_items[status][0]
                    break;
                case '请选择事件名':
                    this.item_info[3] = status
                    break;
            }
        },
    },
}
</script>
<style lang="less" scoped>
.record_event_page {
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}

.info_list {
  margin-top: 15px;
}

button {
  margin-top: 15px;
  border-radius: 14px;
  border: 0;
  width: 80vw;
  height: 40px;
  outline: 0;
  color: #fff;
  background-color: #409eff;
}
</style>
