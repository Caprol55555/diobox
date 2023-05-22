<!-- 所有牛只页面 -->
<template>
    <div>
        <section class="back_button" @click="back">
            <i class="el-icon-arrow-left"></i>
        </section>
        <header>
            <section>已录入牛只</section>
        </header>
        <Search
                :placeholder="`请输入${options_set[1][pitch_on_options_index[1]]}号`"
                :fuzzy_search="true"
                :fuzzy_items="fuzzy_items"
                :fuzzy_title="fuzzy_title"
                :isLoading="isLoading"
                @change="search_value_change"
                @choose_fuzzy_block="choose_fuzzy_block"
        ></Search>
        <DropDownMenu
                :menu_items="menu_items"
                :options_set="options_set"
                :pitch_on_options_index="pitch_on_options_index"
                @choose="change_search_config"
        ></DropDownMenu>
        <section class="data_num">--- 搜索到{{ info_block_set.length }}条数据 ---</section>
        <section class="block_set">
            <InfoBlock class="info_block" main_data="牛只号" sub_data="设备号"></InfoBlock>
            <InfoBlock
                    class="info_block"
                    v-for="(item, index) in info_block_set"
                    :key="index"
                    :main_data="item.cow_id + ''"
                    :sub_data="item.imei + ''"
                    :highlight="item.status"
                    @long_tap="long_tap_info_block(index)"
                    @choose="choose_info_block(index)"
            ></InfoBlock>
        </section>
        <van-dialog v-model="show_binding_dialog" title="重新绑定牛只" show-cancel-button @confirm="confirm_binding">
            <van-cell-group>
                <van-field v-model="binding_info" placeholder="请输入牛只号"/>
            </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
// vue
import {mapState} from 'vuex'
import Vue from 'vue'
// common components
// import AllItem from '../../views/Common/AllItem/index.vue'
import Search from '../../components/Search.vue'
import DropDownMenu from '../../components/DropDownMenu.vue'
import InfoBlock from '../../components/InfoBlock.vue'
// components library
import {Dialog, Field, CellGroup} from 'vant'

Vue.use(Field)
Vue.use(CellGroup)
// api
import DEVICE from '../../api/device.js'
import COW from '../../api/cow.js'
export default {
    data() {
        return {
            data_name: {
                main: '牛只',
                sub: '设备',
            },
            menu_items: ['地区', '搜索类型'],
            options_set: [['所有地区'], ['牛只号', '设备号']],
            pitch_on_options_index: [0, 0],
            fuzzy_items: [],
            fuzzy_title: ['牛只号', '设备号'],
            search_config: [],
            info_block_set: [
                // { ear_tag_id: '-1', imei: 0, cow_id: 0 }
            ],
            show_binding_dialog: false,
            binding_info: '',
            current_index: -1,
            type: '',
            isLoading: false,
        }
    },

    components: {
        // AllItem,
        Search,
        DropDownMenu,
        InfoBlock,
        [Dialog.Component.name]: Dialog.Component,
    },
    computed: {
        ...mapState(['region']),
    },
    async mounted() {
        this.options_set = [
            [this.region],
            ['牛只号', '设备号'],
        ]
        this.search_config = [this.options_set[0][0], this.options_set[1][0]]
        this.update_info_blocks()
    },

    methods: {
        update_info_blocks() {
            COW.get_all_cows(this.region).then((info_block_set) => {
                this.info_block_set = info_block_set
            })
        },
        show_dialog() {
            Dialog.confirm({
                title: '系统提示',
                message: '牛只未绑定耳标号，是否进行绑定',
                cancelButtonText: '直接查看',
            }).then(() => {
                this.binding_info = ''
                this.show_binding_dialog = true
            }).catch(() => {
                this.enter_page()
            })
        },
        change_search_config(menu_index, menu_item_index) {
            this.search_config[menu_index] = this.options_set[menu_index][menu_item_index]
            if (menu_index == 0) {
                this.update_info_blocks(this.options_set[0][menu_item_index])
            }
        },
        async search_value_change(value) {
            this.isLoading = true;
            if (this.search_config[1] === '设备号') {
                await DEVICE.fuzzy_search_imeis(String(value), this.region).then((res) => {
                    this.fuzzy_items = res
                    this.isLoading = false;
                })
            } else if (this.search_config[1] === '牛只号') {
                await DEVICE.fuzzy_search_cow(value, this.region).then((res) => {
                    this.fuzzy_items = res
                    this.isLoading = false;
                })
            }
        },
        back() {
            this.$router.go(-1)
        },
        long_tap_info_block(index) {
            // this.show_binding_dialog = true
            // this.current_index = index
            // this.binding()
        },
        choose_info_block(index) {
            this.current_index = index
            if (this.info_block_set[index].ear_tag_id === '-1') {
                this.show_dialog()
            } else {
                this.enter_page()
            }
        },
        confirm_binding() {
            this.enter_page()
        },
        async binding(imei, cow_id) {
            await DEVICE.bind_ear_tag(imei, cow_id, this.region).then(res => {
                // notification
            })
        },
        enter_page() {
            if (this.current_index !== -1) {
                this.$router.push({
                    // path: '/CowInfo',
                    path: '/Archive',
                    query: {
                        cow_info: this.info_block_set[this.current_index].cow_id,
                    },
                })
            }
        },
        choose_fuzzy_block(item) {
            this.$router.push({
                path: '/CowInfo',
                query: {
                    cow_info: item['牛只号'],
                },
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
}

.data_num {
  margin-top: 10px;
  font-size: 12px;
  color: #c4c9db;
}

.block_set {
  display: grid;
  grid-template-columns: repeat(auto-fill, 32vw);
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.info_block {
  margin: 5px 0;
}
</style>
