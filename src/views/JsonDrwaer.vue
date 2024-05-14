<template>
  <div>
    <el-drawer v-model="isVisible" @opened="onOpen" :with-header="false" @close="onClose">
      <div id="editor" style="height:100%;"></div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, watch } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import beautify from "js-beautify";
export default defineComponent({
  props:['isShow','formData'],
  setup (props,{emit}) {
    let isVisible = ref(false)
    const state = reactive({
      jsonEditer:null,
      beautifyCode:''
    })

    //美化code
    const beautifulCode = (codeStr:string)=>{
      state.beautifyCode = beautify(codeStr,{
        indent_size: 2,//缩进两个空格
        space_in_empty_paren: true,
      })
    }

    const onOpen = () =>{
      beautifulCode(JSON.stringify(props.formData))
      if(state.jsonEditer){
        toRaw(state.jsonEditer).setValue(state.beautifyCode)
      }else{
      state.jsonEditer = monaco.editor.create(document.getElementById("editor"), {
          value:state.beautifyCode,
          theme: 'vs-dark',
          language: 'json',
          folding: true,//代码折叠
          // automaticLayout: true
      });
    }
    }
    const onClose =() =>{
      emit("update:isShow",false)
    }
    watch(()=> props.isShow,(value:boolean)=>{
      isVisible.value = value
    })
    return {
      props,
      isVisible,
      onOpen,
      onClose
    }
  }
})
</script>

<style scoped>
#editor {
  text-align: left;
}
</style>