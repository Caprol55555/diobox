<template>
    <div v-show="isVisible" class="mask-component" ref="mask_dom" @click.stop="clickMask" @touchmove.prevent @mousewheel.prevent>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean,
        z_index: Number,
    },
    data() {
        return{
            show: false,
        }
    },
    watch: {
        isVisible() {
            const maskDom = this.$refs.mask_dom;
            maskDom.setAttribute('class', `mask-component ${this.isVisible ? 'mask-appear' : 'mask-disappear'}`);

            if (this.isVisible) {
                this.show = true;
            } else {
                setTimeout(() => {
                    this.show = false;
                }, 300)
            }
        },
    },
    mounted() {
        const maskDom = this.$refs.mask_dom;

        if (this.z_index !== undefined && this.z_index !== null) {
            maskDom.style.zIndex = this.z_index;
        }
    },
    methods: {
        clickMask() {
            this.$emit('clickMask');
        },
    },
}
</script>

<style lang="less" scoped>
.mask-component {
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.mask-appear {
  animation: mask-appear 0.3s forwards;
}

.mask-disappear {
  animation: mask-disappear 0.3s forwards;
}

@keyframes mask-appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes mask-disappear {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>