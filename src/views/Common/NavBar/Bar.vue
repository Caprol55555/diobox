<!--&lt;!&ndash; 底下的导航栏 &ndash;&gt;-->
<!--<template>-->
<!--  <div>-->
<!--    <nav>-->
<!--      <section-->
<!--        :class="index == selected_index ? 'choosed_item' : ''"-->
<!--        v-for="(item, index) in itemGroup"-->
<!--        :key="index"-->
<!--        @click="click_item(index)"-->
<!--      >-->
<!--        <i :class="item.icon"></i>-->
<!--        <section class="word">{{ item.title }}</section>-->
<!--      </section>-->
<!--    </nav>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { Icon } from 'element-ui'-->
<!--export default {-->
<!--  props: {-->
<!--    itemGroup: Array,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      selected_index: 0,-->
<!--    }-->
<!--  },-->

<!--  components: {-->
<!--    Icon,-->
<!--  },-->

<!--  computed: {},-->

<!--  mounted() {-->
<!--    for (let dom of document.querySelectorAll('nav>section')) {-->
<!--      dom.style.width = 95 / this.itemGroup.length + '%'-->
<!--    }-->
<!--  },-->

<!--  methods: {-->
<!--    click_item(index) {-->
<!--      if (index == this.selected_index) return-->
<!--      this.selected_index = index-->
<!--      this.$emit('choose', index)-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->
<!--<style lang="less" scoped>-->
<!--nav {-->
<!--  position: absolute;-->
<!--  display: flex;-->
<!--  flex-direction: row;-->
<!--  justify-content: space-around;-->
<!--  align-items: center;-->
<!--  bottom: 0;-->
<!--  width: 100vw;-->
<!--  height: 60px;-->
<!--  background-color: #fff;-->
<!--}-->
<!--.choosed_item {-->
<!--  color: #0a7ae8;-->
<!--}-->
<!--nav section i {-->
<!--  font-size: 30px;-->
<!--}-->
<!--nav section .word {-->
<!--  width: 100%;-->
<!--  font-size: 10px;-->
<!--}-->
<!--</style>-->
<template>
    <div>
        <nav>
            <section
                    :class="index === selectedIndex ? 'choosed_item' : ''"
                    v-for="(item, index) in itemGroup"
                    :key="index"
                    :style="{ flexBasis: `${100 / itemGroup.length}%` }"
                    tabindex="0"
                    @click="clickItem(index)"
                    @keyup.enter="clickItem(index)"
            >
                <i :class="item.icon"></i>
                <section class="word">{{ item.title }}</section>
            </section>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        itemGroup: Array,
        value: Number,
    },
    data() {
        return {
            selectedIndex: this.value,
        }
    },
    methods: {
        clickItem(index) {
            if (index === this.selectedIndex) return
            this.selectedIndex = index
            this.$emit('choose', index)
        },
    },
}
</script>

<style lang="less" scoped>
nav {
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  width: 100vw;
  height: 60px;
  background-color: #fff;
}

.choosed_item {
  color: #0a7ae8;
}

nav section i {
  font-size: 30px;
}

nav section .word {
  width: 100%;
  font-size: 10px;
}
</style>