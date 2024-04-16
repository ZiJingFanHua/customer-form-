<template>
  <div class="right-panel">
    <el-tabs v-model="currentTable" class="right-panel-tabs">
      <el-tab-pane label="组件属性" name="field"></el-tab-pane>
      <el-tab-pane label="表单属性" name="form"></el-tab-pane>
    </el-tabs>
    <div class="field-box">
      <el-srollbar>
        <el-form v-if="currentTable === 'field'">
          <el-form-item v-if="props.activeData.__vModel__ !== undefined" label="字段名">
            <el-input placeholder="请输入字段名" v-model="props.activeData.__vModel__"></el-input>
          </el-form-item>
          <el-form-item v-if="props.activeData.__vModel__ !== undefined" label="默认值">
            <el-input
              v-model="props.activeData.__config__.defaultValue"
              placeholder="请输入默认值"
            />
          </el-form-item>
        </el-form>
        <el-form v-if="currentTable === 'form'">
          <el-form-item label="表单名">
            <el-input placeholder="请输入表单名" v-model="props.formConf.formRef"></el-input>
          </el-form-item>
          <el-form-item label="校验规则">
            <el-input placeholder="请输入表单校验规则" v-model="props.formConf.formRules"></el-input>
          </el-form-item>
        </el-form>
      </el-srollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "rightPanel",
  props: ["activeData","formConf"],
  setup(props) {
    const state = reactive({
      currentTable: "field",
    });

  //   const setDefaultValue = (val:any) => {
  //     if (Array.isArray(val)) {
  //       return val.join(',')
  //     }
  //     // if (['string', 'number'].indexOf(typeof val) > -1) {
  //     //   return val
  //     // }
  //     if (typeof val === 'boolean') {
  //       return `${val}`
  //     }
  //     return val
  //   }
  //  const onDefaultValueInput = (str:any) => {
  //   let config = props.activeData.__config__
  //     if (Array.isArray(config.defaultValue)) {
  //       // 数组
  //       config.defaultValue = str.split(',').map()
  //       this.$set(
  //         this.activeData.__config__,
  //         'defaultValue',
  //         str.split(',').map(val => (isNumberStr(val) ? +val : val))
  //       )
  //     } else if (['true', 'false'].indexOf(str) > -1) {
  //       // 布尔
  //       this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
  //     } else {
  //       // 字符串和数字
  //       this.$set(
  //         this.activeData.__config__,
  //         'defaultValue',
  //         isNumberStr(str) ? +str : str
  //       )
  //     }
  //   },
    return {
      ...toRefs(state),
      props,
    };
  },
});
</script>

<style scoped>
.right-panel {
  width: 300px;
  height: calc(100vh - 40px);
  background-color: aqua;
}
</style>