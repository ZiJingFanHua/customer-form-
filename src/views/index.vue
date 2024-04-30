<template>
  <div class="container">
    <div class="left-panel">
      <el-scrollbar class="left-scrollbar">
        <div class="template-components-list">
          <div v-for="item in templateComponents" :key="item.title">
            <div class="components-title">
              {{ item.title }}
            </div>
            <draggable
              :list="item.list"
              class="components-draggable"
              :sort="false"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              @end="templateOnEnd"
              :clone="cloneComponent"
              item-key="index"
            >
              <template #item="{ element }">
                <div class="components-item">
                  {{ element.__config__.label }}
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-panel">
      <div class="action-bar">
        <el-button icon="el-icon-video-play" type="text" @click="run">
          运行
        </el-button>
        <el-button icon="el-icon-view" type="text" >
          查看json
        </el-button>
        <el-button icon="el-icon-download" type="text" >
          导出vue文件
        </el-button>
        <el-button class="copy-btn-main" icon="el-icon-document-copy" type="text">
          复制代码
        </el-button>
        <el-button class="delete-btn" icon="el-icon-delete" type="text" >
          清空
        </el-button>
      </div>
      <el-scrollbar class="center-scrollbar" height="calc(100%)">
        <el-form
            :disabled="formConfig.disabled"
            >
          <draggable
            class="entity-draggable"
            :list="entityComponents"
            :group="{ name: 'componentsGroup', pull: true, put: true }"
            item-key="renderKey"
          >
            <template #item="{ element ,index}">
             <DraggableItem :drawingList="entityComponents" :currentItem="element" :index="index" :activeId="activeId" :formConf="formConfig" @activeItem="activeFormItem" @copyItem="copyFormItem" @deleteItem="deleteFormItem">

             </DraggableItem>
            </template>
          </draggable>
          <div v-show="!entityComponents.length" class="empty-info">
            从左侧拖入或选组件进行表单设计
          </div>
        </el-form>
      </el-scrollbar>
    </div>
    <RightPanel :activeData="activeData" :formConf="formConfig"></RightPanel>
    <template v-if="isShow">
      <el-dialog v-model="isShow">
      <Show :form-conf="formConfig"></Show>
    </el-dialog>
    </template>
  </div>
</template>

<script lang="tsx">
import { defineComponent, nextTick, onMounted, reactive, toRefs } from "vue";
import { getIdGlobal } from "@/utils/db";
import { formConf, inputComponents, layoutComponents,selectComponents} from "@/components/generator/config";
import draggable from "vuedraggable";
import RightPanel from "./RightPanel.vue";
import DraggableItem from "./DraggableItem.vue";
import { deepClone } from "@/utils";
import Show from '@/components/parser/show/index.vue'
export default defineComponent({  
  name: "customerForm",
  components: {
    draggable,
    RightPanel,
    DraggableItem,
    Show
  },
  setup() {
    const state = reactive({
      idGlobal: 0, //组件id,
      activeId:0,//当前活动组件id
      activeData:{} as any,//当前活动组件,
      tempActiveData:{} as any,
      formConfig:formConf,
      isShow:false,
      templateComponents: [
        { title: "输入类型组件", list: inputComponents },
        {title:'选择类型组件', list:selectComponents},
        { title: "布局类型组件", list: layoutComponents },
      ],
      entityComponents: [] as any,
    });
    const templateOnEnd = (obj:any) => {
      if(obj.to!==obj.from){
      state.activeData = state.tempActiveData
      state.activeId = state.idGlobal
      }
    };
    // 创建新的表单子组件实例 =====================================
    // const drwingItemCopy = (item, list) => {
    //   //
    //     // state.activeData = state.tempActiveData
    //     // state.activeId = state.idGlobal
    // };

    const cloneComponent =(item:any) =>{
      const clone = deepClone(item)
      const config = clone.__config__
      config.span = state.formConfig.span
      createIdAndKey(clone)
      clone.placeholder !==undefined &&(clone.placeholder += config.label)
      state.tempActiveData = clone
      return state.tempActiveData
    }
    const createIdAndKey = (item: any) => {
      const config = item.__config__;
      config.formId = ++state.idGlobal;
      config.renderKey == `${config.formId}${+new Date()}`; //通过改变renderKey实现强制更新组件
      if (config.layout === "colFormItem") {
        item.__vModel__ = `field${state.idGlobal}`;
      } else if (config.layout === "rowFormItem") {
        config.componentName = `row${state.idGlobal}`;
        !Array.isArray(config.children) && (config.children = []);
        delete config.label; // rowFormItem无需配置label属性
      }
      return item;
    };
 
    // END 创建新的表单子组件实例   ==================

    // 组件方法 ========================
    const activeFormItem = (currentItem:any) => {
     state.activeData = currentItem
     state.activeId = currentItem.__config__?.formId  

    }

    const copyFormItem = (item:any,list:any) => {
      let clone = deepClone(item)
      clone = createIdAndKey(clone)
      list.push(clone)
      activeFormItem(clone)
    }

    const deleteFormItem = (index:any,list:any) => {
      list.splice(index,1)
      nextTick(() =>{
        let length = state.entityComponents.length 
        if(length) {
          activeFormItem(state.entityComponents[length - 1])
        }else{
          activeFormItem({})
        }
      })
    }

    const run = ()=>{
      state.isShow = true;
      state.formConfig.fields = deepClone(state.entityComponents)
      
    }
    onMounted(() => {
      state.idGlobal = getIdGlobal();
    });
    return {
      ...toRefs(state),
      templateOnEnd,
      createIdAndKey,
      cloneComponent,
      activeFormItem,
      copyFormItem,
      deleteFormItem,
      run,
    };
  },
});
</script>

<style scoped>
@import "@/assets/css/index.css";
</style>