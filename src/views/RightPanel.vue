<template>
  <div class="right-panel">
    <el-tabs v-model="currentTable" class="right-panel-tabs">
      <el-tab-pane label="组件属性" name="field"></el-tab-pane>
      <el-tab-pane label="表单属性" name="form"></el-tab-pane>
    </el-tabs>
    <div class="field-box">
      <el-srollbar>
        <el-form v-if="currentTable === 'field'">
          <el-form-item v-if="activeData._vModel_ !== undefined" label="字段名">
            <el-input placeholder="请输入字段名"></el-input>
          </el-form-item>
        </el-form>

        <el-form v-if="currentTable === 'form'">
          <el-form-item>
            <el-input placeholder="请输入表单名"></el-input>
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
  props: ["activeData"],
  setup() {
    const state = reactive({
      currentTable: "",
    });
    return {
      ...toRefs(state),
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