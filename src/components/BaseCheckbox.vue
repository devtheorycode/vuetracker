<template>  
  <el-checkbox
    v-model="value"
    v-bind="$attrs"
  >
    <slot></slot>
  </el-checkbox>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      modelValue: { 
        type: Boolean,
        required: true
      }
    },
    emits: ['update:modelValue'],
    computed: {
      value: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-input  { 
    display: block;
    max-width: 75%;
    margin: 10px 0;
  }
</style>