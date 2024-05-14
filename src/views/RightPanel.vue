<template>
  <div class="right-panel">
    <el-tabs v-model="currentTable" class="right-panel-tabs">
      <el-tab-pane label="组件属性" name="field"></el-tab-pane>
      <el-tab-pane label="表单属性" name="form"></el-tab-pane>
    </el-tabs>
    <div class="field-box">
      <el-scrollbar>
        <el-form v-if="currentTable === 'field'" label-position="top">
          <el-form-item v-if="props.activeData.__vModel__ !== undefined" label="字段名">
            <el-input placeholder="请输入字段名" v-model="props.activeData.__vModel__"></el-input>
          </el-form-item>
          <el-form-item v-if="props.activeData.__vModel__ !== undefined" label="默认值">
            <el-input
              v-model="props.activeData.__config__.defaultValue"
              placeholder="请输入默认值"
            />
          </el-form-item>
          <el-form-item label="大小" v-if="props.activeData.__config__">
            <!-- <el-input
              v-model="props.activeData.__config__.span"
              placeholder="请输入"
            /> -->
            <el-slider v-model="props.activeData.__config__.span" :step="1" show-stops :max="24" size="small" style="width: 96%;"/>
          </el-form-item>
          <el-form-item label="是否必填" v-if="props.activeData.__config__">
            <el-switch v-model="props.activeData.__config__.required" />
          </el-form-item>
          <el-form-item label="选择列表" v-if="props.activeData.__config__?.label === '下拉选择'">
              <el-row v-for="(item,index) in props.activeData.__slot__.options" :key="item.value">
              <el-col :span="10">
              <el-input placeholder="选项名" v-model="item.label"></el-input>
              </el-col>
              <el-col :span="10">
              <el-input placeholder="选项值" v-model="item.value"></el-input>
              </el-col>
              <el-col :span="4" class="options-delete" @click="deleteOption(index)">
                <el-icon :size="26" :color="'#f89898'"><Delete /></el-icon>
              </el-col>
            </el-row>
            <el-row class="options-add" @click="addOption">
              <el-icon :size="26" :color="'#79bbff'"><CirclePlus /></el-icon>
            </el-row>
          </el-form-item>
          <el-form-item label="选择列表" v-if="props.activeData.__config__?.label === '级联选择'">
            <el-row>
              <el-radio-group v-model="cascadeRadio">
                <el-radio-button label="静态数据" value="static" />
                <el-radio-button label="动态数据" value="dynamic" />
              </el-radio-group>
            </el-row>
              <el-button @click="openCascadeDataEditer" class="static-cascade-btn">
                设置
               </el-button>
          </el-form-item>
          <el-form-item label="选择列表" v-if="props.activeData.__config__?.label === '单项选择'">
            <el-row v-for="(item,index) in props.activeData.__slot__.options" :key="item.value">
              <el-col :span="10">
              <el-input placeholder="选项名" v-model="item.label"></el-input>
              </el-col>
              <el-col :span="10">
              <el-input placeholder="选项值" v-model="item.value"></el-input>
              </el-col>
              <el-col :span="4" class="options-delete" @click="deleteOption(index)">
                <el-icon :size="26" :color="'#f89898'"><Delete /></el-icon>
              </el-col>
            </el-row>
            <el-row class="options-add" @click="addOption">
              <el-icon :size="26" :color="'#79bbff'"><CirclePlus /></el-icon>
            </el-row>
          </el-form-item>
          <el-form-item label="前缀" v-if="props.activeData.__slot__?.prepend !==undefined">
            <el-input
              v-model="props.activeData.__slot__.prepend"
              placeholder="请输入"
            />
          </el-form-item>
          <el-form-item label="后缀" v-if="props.activeData.__slot__?.append !==undefined">
            <el-input
              v-model="props.activeData.__slot__.append"
              placeholder="请输入"
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
          <el-form-item label="标签对齐">
            <el-radio-group v-model="props.formConf.labelPosition" class="ml-4">
            <el-radio value="left" size="large">左对齐</el-radio>
            <el-radio value="right" size="large">右对齐</el-radio>
            <el-radio value="top" size="large">顶部对齐</el-radio>
          </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input v-model="props.formConf.labelWidth">
            <template #append>
              px
            </template>
            </el-input>
          </el-form-item>
          <el-form-item label="禁用表单">
            <el-switch v-model="props.formConf.disabled" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <el-dialog v-model="cascadeVisbile" @opened="onOpen" :title="'选项'">
    <div style="height: 500px;margin: 0 0 10px 0;">
      <div id="cascadeDataEditer" style="height:100%;text-align: left;"></div>
    </div>
    <div class="btn-sl">
        <el-button @click="cascadeVisbile = false">取消</el-button>
        <el-button type="primary" @click="confirmOptions">确认</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, toRefs, watch } from "vue";
import { CirclePlus,Delete} from '@element-plus/icons-vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import beautify from "js-beautify";
import { ElMessage } from "element-plus";
interface Tree {
  id:number
  label:string
  children?:Tree[]
}
export default defineComponent({
  name: "rightPanel",
  props: ["activeData","formConf"],
  components:{
    CirclePlus,
    Delete
  },
  setup(props,{emit}) {
    let cascadeDataEditer = null //级联选项编辑器
    const state = reactive({
      currentTable: "form",
      activeData:{} as any,
      cascadeRadio:'static',//级联数据类型
      cascadeVisbile:false,//级联静态数据修改
    });
    // watch(
    //   () => props.activeData,
    //    (value) => {
    //     if(value.__config__){
    //       state.currentTable = 'field'
    //     }else{
    //       state.currentTable =''
    //     }
    //   },
    // );
    
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

  //选项增加
  const addOption = () => {
    if(Array.isArray(props.activeData.__slot__?.options)){
      state.activeData.__slot__?.options.push({
        label:'',
        value:''
      })
      emit('update:activeData', state.activeData)
    }
  }
  //选项减少
  const deleteOption = (index:number) => {
    if(Array.isArray(props.activeData.__slot__?.options)){
      state.activeData.__slot__?.options.splice(index,1)
      emit('update:activeData', state.activeData)
    }
}

    //美化code
    const beautifulCode = (codeStr:string)=>{
      return  beautify(codeStr,{
        indent_size: 2,//缩进两个空格
        space_in_empty_paren: true,
      })
    }

    // 级联操作
    const openCascadeDataEditer= ()=>{
      state.cascadeVisbile = true
    }

    const onOpen = ()=>{
      let beautifyOptions  =  beautifulCode(JSON.stringify(state.activeData.options))
      if(cascadeDataEditer){
        cascadeDataEditer.setValue(beautifyOptions)
      }else{
        cascadeDataEditer = monaco.editor.create(document.getElementById("cascadeDataEditer"), {
          value:beautifyOptions,
          // theme: 'vs-dark',
          language: 'json',
          folding: true,//代码折叠
      });
      }
    }
    const confirmOptions = () =>{
      try {
        state.activeData.options = JSON.parse(cascadeDataEditer.getValue())
        emit('update:activeData', state.activeData)
        state.cascadeVisbile = false
      }
      catch(err){
        ElMessage({
        message: '格式错误',
        type: 'error',
      })
        
      }
    }
    watch(()=>props.activeData,value=>{
      state.activeData = value
    })
    return {
      ...toRefs(state),
      props,
      addOption,
      deleteOption,
      onOpen,
      openCascadeDataEditer,
      confirmOptions
    };
  },
});
</script>

<style scoped>
.right-panel {
  width: 300px;
  height: calc(100vh - 20px);
  padding: 0 10px;
  background-color: #ffffff;
}

.options-delete {
  cursor: pointer;
}
.options-add {
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.static-cascade-btn {
  width: 100%;
  margin: 10px 0;
}
</style>