<template>  
  <label :for="id">{{ label }}</label>
  <el-input 
    v-model="value"
    :id="id"
    v-bind="$attrs"
  ></el-input>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: { 
      label: { 
        type: String,
        required: true
      },
      id: { 
        type: String,
        required: true
      },
      modelValue: { 
        type: String,
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