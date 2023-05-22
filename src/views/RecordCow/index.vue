<!-- 牛只录入页面 -->
<template>
    <div class="record_page">
        <TopBarVue title="牛只录入"></TopBarVue>
        <InfoListVue
            class="record_page_info_list"
            title="基本信息"
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
        ></InfoListVue>
        <button @click="save" v-show="hideshow">保存</button>
    </div>

</template>

<script>
// vue
import {mapState} from 'vuex'
// api
import COW from '../../api/cow.js'
import DEVICE from '../../api/device.js'
// common components
import InfoListVue from '../../components/InfoListPro.vue'
import TopBarVue from '../../components/TopBar.vue'

export default {
    data() {
        return {
            item_title: [
                '牛只号',
                '设备号',
                '围产日期',
                '转入牛舍',
                '工作人员',
                '备注信息',
            ],
            item_info: ['', '', '', '', '', ''],
            item_placeholder: [
                '请输入牛只号',
                '请输入设备号',
                '请输入围产日期',
                '请输入转入牛舍',
                '请输入工作人员',
                '请输入备注信息',
            ],
            item_star: [true, false, true, true, true, false],
            item_affirm: [false, false, false, false, false, false],
            item_result: [false, false, false, false, false, false],
            item_can_input: [true, true, true, true, true, true],
            item_fuzzy_title: [
                undefined,
                ['设备号', '牛只号'],
                undefined,
                undefined,
                undefined,
                undefined
            ],
            item_fuzzy_items: [],
            docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
            showHeight: document.documentElement.clientHeight,   //实时屏幕高度
            hideshow: true,  //显示或者隐藏footer
            is_loading: false,
        }
    },

    components: {
        TopBarVue,
        InfoListVue,
    },

    computed: {
        ...mapState(['region']),
    },

    mounted() {
        window.onresize = () => {
            return (() => {
                this.showHeight = document.body.clientHeight;
            })()
        }
    },
    destroyed() {
        this.is_loading = false
    },

    watch: {
        showHeight: function () {
            if (this.docmHeight > this.showHeight) {
                this.hideshow = false
            } else {
                this.hideshow = true
            }
        }
    },

    methods: {
        async save() {
            COW.record_cow(
                this.item_info[0], // 牛只号
                this.item_info[1], // 设备号
                this.item_info[2], // 围产日期
                this.item_info[3], // 转入牛舍
                this.item_info[4], // 工作人员
                this.item_info[5], // 备注
                this.region
            ).then((res) => {
                if (res === 'record success') {
                    this.$store.commit('total_cow_num_increment')
                    this.$notify({
                        title: '成功',
                        message: '牛只录入成功',
                        type: 'success',
                    })
                    this.item_info.map((e) => {
                        e = ''
                    })
                } else if (res === 'id exist') {
                    this.$notify({
                        title: '警告',
                        message: '牛只号已存在',
                        type: 'warning',
                    })
                } else if (res === 'imei do not exist') {
                    this.$notify({
                        title: '警告',
                        message: '设备号不存在',
                        type: 'warning',
                    })
                } else {
                    this.$notify({
                        title: '错误',
                        message: '牛只录入失败',
                        type: 'warning',
                    })
                }
            })
        },
        async fuzzy_search(payload) {
            let {index, value} = payload
            this.is_loading = true
            await DEVICE.fuzzy_search_unbind_imeis(value, this.region).then(res=> {
                this.item_fuzzy_items = res
                this.is_loading = false
            })
        }
    },
}
</script>
<style lang="less" scoped>
.record_page {
  background-color: #f0f0f0;
  height: 100vh;
}

.record_page_info_list {
  margin-top: 15px;
}

button {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 45px;
  border: 0;
  outline: 0;
  color: #fff;
  background-color: #0989ea;
}
</style>
