<!-- 牛只档案页面 -->
<template>
    <div class="cow_info_page">
        <TopBarVue
                title="牛只档案"
                :rightButtonName="right_button_name"
                @rightButtonClick="is_edit ? cancel_edit() : edit()"
        ></TopBarVue>

        <InfoListVue class="cow_info_info_list" title="基本信息" :list_items="using_items"></InfoListVue>
        <InfoListVue class="cow_info_info_list" title="牛只档案" v-for="(item, index) in muti_archive_items"
                     :key="index"
                     :list_items="item">
        </InfoListVue>

        <section class="edit_button_list" v-if="is_edit">
            <confirmButtonVue
                    class="edit_left_button"
                    button_name="删除牛只"
                    action="删除牛只"
                    @confirm="delete_cow"
                    button_color="#f56c6c"
            ></confirmButtonVue>
            <confirmButtonVue
                    class="edit_right_button"
                    button_name="确认修改"
                    action="修改牛只信息"
                    @confirm="alter_cow_info"
                    button_color="#409eff"
            ></confirmButtonVue>
        </section>
    </div>
</template>

<script>
// vue
import {mapState} from 'vuex'
// api
import COW from '../../api/cow.js'
// common components
import InfoListVue from '../../components/InfoList.vue'
import TopBarVue from '../../components/TopBar.vue'
// local components
import confirmButtonVue from './confirmButton.vue'

export default {
    data() {
        return {
            using_items: [],
            list_items: [
                // { title: '牛只号', info: 'FJNP1329', isStar: true, confirmed: false, oestrus: false },
                // { title: '设备号', info: 'EB1986', isStar: true, confirmed: false, oestrus: false },
                // { title: '围产日期', info: '2023/03/10', isStar: true, confirmed: false, oestrus: false },
                // { title: '转入牛舍', info: '病牛舍', isStar: true, confirmed: false, oestrus: false },
                // { title: '工作人员', info: '张三', isStar: true, confirmed: false, oestrus: false },
                // { title: '备注信息', info: '无', isStar: false, confirmed: false, oestrus: false },
            ],
            edit_list_items: [
                // { title: '牛只号', placeholder: 'FJNP1329', info: '', isStar: true, confirmed: false, oestrus: false },
                // { title: '设备号', placeholder: 'EB1986', info: '', isStar: true, confirmed: false, oestrus: false },
                // { title: '围产日期', placeholder: '2023/03/10', info: '', isStar: true, confirmed: false, oestrus: false },
                // { title: '转入牛舍', placeholder: '病牛舍', info: '', isStar: true, confirmed: false, oestrus: false },
                // { title: '工作人员', placeholder: '张三', info: '', isStar: true, confirmed: false, oestrus: false },
                // { title: '备注信息', placeholder: '', info: '', isStar: false, confirmed: false, oestrus: false },
            ],
            muti_archive_items: [],
            is_edit: false,
            right_button_name: '编辑',
        }
    },

    components: {
        InfoListVue,
        TopBarVue,
        confirmButtonVue,
    },

    computed: {
        ...mapState(['region']),
    },

    mounted() {
        this.get_cow_info()
    },

    methods: {
        get_cow_info() {
            const that = this
            COW.get_cow_info_by_cow(this.$route.query.cow_info, "档案信息").then((res) => {
                clean_base_data(res.base_info, that)
                clean_archive_data(res.archive_info, that)
            })

            function clean_base_data(res, that) {
                that.list_items = [
                    {
                        title: '牛只号',
                        placeholder: '请输入牛只号',
                        info: res.cow_id,
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: false,
                    },
                    {
                        title: '设备号',
                        placeholder: '请输入设备号',
                        info: res.imei,
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: false,
                    },
                    {
                        title: '围产日期',
                        placeholder: '请输入围产日期',
                        info: res.date,
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: false,
                    },
                    {
                        title: '转入牛舍',
                        placeholder: '请输入转入牛舍',
                        info: res.pen,
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: false,
                    },
                    {
                        title: '工作人员',
                        placeholder: '请输入工作人员',
                        info: res.worker,
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: false,
                    },
                    {
                        title: '备注信息',
                        placeholder: '请输入备注信息',
                        info: res.remark,
                        isStar: false,
                        confirmed: false,
                        oestrus: false,
                        can_input: false,
                    },
                ]
                that.using_items = that.list_items
                that.edit_list_items = [
                    {
                        title: '牛只号',
                        placeholder: res.cow_id,
                        info: '',
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: true,
                    },
                    {
                        title: '设备号',
                        placeholder: res.imei,
                        info: '',
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: true,
                    },
                    {
                        title: '围产日期',
                        placeholder: res.date,
                        info: '',
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: true,
                    },
                    {
                        title: '转入牛舍',
                        placeholder: res.pen,
                        info: '',
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: true,
                    },
                    {
                        title: '工作人员',
                        placeholder: res.worker,
                        info: '',
                        isStar: true,
                        confirmed: false,
                        oestrus: false,
                        can_input: true,
                    },
                    {
                        title: '备注信息',
                        placeholder: res.remark,
                        info: '',
                        isStar: false,
                        confirmed: false,
                        oestrus: false,
                        can_input: true,
                    },
                ]
                // that.chart_data = res.chart_info
                // this.generate_chart()
            }

            function clean_archive_data(payload, that) {
                that.muti_archive_items = []
                for (let info of payload) {
                    let list_items = [
                        {
                            title: '配种日期',
                            info: info.hybridization_date === '0' ? '未配种' : info.hybridization_date,
                            isStar: false,
                            confirmed: false,
                            oestrus: false,
                            can_input: false,
                        },
                        {
                            title: '怀孕日期',
                            info: info.calving_date === '0' ? '未怀孕' : info.calving_date,
                            isStar: false,
                            confirmed: false,
                            oestrus: false,
                            can_input: false,
                        },
                    ]
                    that.muti_archive_items.push(list_items)
                }
            }
        },
        edit() {
            this.right_button_name = '取消编辑'
            this.using_items = this.edit_list_items
            this.is_edit = true
        },
        cancel_edit() {
            this.right_button_name = '编辑'
            this.edit_list_items.map((item, index, arr) => {
                item.info = ''
            })
            this.using_items = this.list_items
            this.is_edit = false
        },
        async delete_cow() {
            let id = this.edit_list_items[0].info.length ? this.edit_list_items[0].info : this.list_items[0].info
            await COW.delete_cow(id, this.region).then((res) => {
                if (res == 'id do not exist') {
                    this.$notify({
                        title: '警告',
                        message: '该牛只号不存在',
                        type: 'warning',
                    })
                } else if (res == 'delete success') {
                    this.$notify({
                        title: '成功',
                        message: '牛只信息删除成功',
                        type: 'success',
                    })
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 300)
                } else {
                }
            })
        },
        async alter_cow_info() {
            /**以下行为将会引发错误提示
             * 1、更改牛只id并且新的id已被其他牛只占用
             * 2、更改设备号并且设备号不存在
             */
            let id_changed = String(
                this.edit_list_items[0].info.length != 0 && this.edit_list_items[0].info != this.list_items[0].info
            )
            let imei_changed = String(
                this.edit_list_items[1].info.length != 0 && this.edit_list_items[1].info != this.list_items[1].info
            )
            let previous_id = this.list_items[0].info
            let previous_imei = this.list_items[1].info
            let id = this.edit_list_items[0].info.length ? this.edit_list_items[0].info : this.list_items[0].info
            let imei = this.edit_list_items[1].info.length ? this.edit_list_items[1].info : this.list_items[1].info
            let date = this.edit_list_items[2].info.length ? this.edit_list_items[2].info : this.list_items[2].info
            let pen = this.edit_list_items[3].info.length ? this.edit_list_items[3].info : this.list_items[3].info
            let worker = this.edit_list_items[4].info.length ? this.edit_list_items[4].info : this.list_items[4].info
            let remark = this.edit_list_items[5].info.length ? this.edit_list_items[5].info : this.list_items[5].info
            COW.update_cow(previous_id, previous_imei, id, imei, date, pen, worker, remark, id_changed, imei_changed, this.region).then(
                (res) => {
                    if (res == 'new id exist') {
                        this.$notify({
                            message: '新的牛只号已存在',
                            type: 'warning',
                        })
                    } else if (res === 'new id has been bind') {
                        this.$notify({
                            message: '新的牛只号已被绑定',
                            type: 'warning',
                        })
                    } else if (res === 'new imei do not exist') {
                        this.$notify({
                            message: '新的设备号不存在',
                            type: 'warning',
                        })
                    } else if (res === 'previous imei do not exist') {
                        this.$notify({
                            message: '旧的牛只号已被绑定',
                            type: 'warning',
                        })
                    } else if (res === 'update success') {
                        this.$notify({
                            title: '成功',
                            message: '牛只信息修改成功',
                            type: 'success',
                        })
                        this.edit_list_items.map((item, index, arr) => {
                            item.info.length && (this.list_items[index].info = item.info) && (item.placeholder = item.info)
                        })
                        this.cancel_edit()
                    } else {
                    }
                }
            )
        },
    },
}
</script>
<style lang="less" scoped>
.cow_info_page {
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
}

.cow_info_info_list {
  margin-top: 15px;
}

.edit_button_list {
  margin-top: 10px;
  margin-left: 5vw;
  width: 90vw;
  height: 40px;
}

.edit_button_list .edit_left_button {
  float: left;
  width: 40vw;
}

.edit_button_list .edit_right_button {
  float: right;
  width: 40vw;
}
</style>
