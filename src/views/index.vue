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
              :sort="false"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              @end="templateOnEnd"
              :clone="cloneComponent"
            >
              <template #item="{ element }">
                <div class="item">
                  {{ element.__config__.label }}
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="center-panel">
      <el-scrollbar class="center-scrollbar" height="calc(100%)">
        <el-form>
          <draggable
            class="entity-draggable"
            :list="entityComponents"
            :group="{ name: 'componentsGroup', pull: false, put: true }"
          >
            <template #item="{ element }">
             <DraggableItem :key="element.renderKey" :drawingList="entityComponents" :currentItem="element" :activeId="activeId" :formConf="formConf" @activeItem="activeFormItem" @copyItem="copyFormItem" @deleteItem="deleteFormItem">

             </DraggableItem>
            </template>
          </draggable>
          <div v-show="!entityComponents.length" class="empty-info">
            从左侧拖入或选组件进行表单设计
          </div>
        </el-form>
      </el-scrollbar>
    </div>
    <RightPanel></RightPanel>
  </div>
</template>

<script lang="tsx">
import { defineComponent, nextTick, onMounted, reactive, toRefs } from "vue";
import { getIdGlobal } from "@/utils/db";
import { formConf, testComponents } from "@/components/generator/config";
import draggable from "vuedraggable";
import RightPanel from "./RightPanel.vue";
import DraggableItem from "./DraggableItem.vue";
import { deepClone } from "@/utils";
export default defineComponent({
  name: "customerForm",
  components: {
    draggable,
    RightPanel,
    DraggableItem
  },
  setup() {
    const state = reactive({
      idGlobal: 0, //组件id,
      activeId:0,//当前活动组件id
      activedata:{} as any,//当前活动组件,
      tempActiveData:{} as any,
      formConf:{} as any,
      templateComponents: [
        { title: "组件类型1", list: testComponents },
        { title: "组件类型2", list: testComponents },
      ],
      entityComponents: [] as any,
    });
    const templateOnEnd = () => {
      console.log("data==>", state.entityComponents);
    };
    // 创建新的表单子组件实例 =====================================
    const drwingItemCopy = (item, list) => {
      //
    };

    const cloneComponent =(item:any) =>{
      const clone = deepClone(item)
      const config = clone.__config__
      config.span = state.formConf.span
      console.log('clone==>',item);
      
      createIdAndKey(clone)
      console.log('clone2==>',item);
      clone.placeholder !==undefined &&(clone.placeholder += config.label)
      state.tempActiveData = clone
      return state.tempActiveData
    }
    const createIdAndKey = (item: any) => {
      const config = item.__config__;
      config.formId == ++state.idGlobal;
      config.renderKey == `${config.formId}${+new Date()}`; //通过改变renderKey实现强制更新组件
      if (config.layout === "colFormItem") {
        item.__vModel__ = `field${state.idGlobal}`;
      } else if (config.layout === "rowFormItem") {
        config.componentName = `row${state.idGlobal}`;
        !Array.isArray(config.children) && (config.children = []);
        delete config.label; // rowFormItem无需配置label属性
      }
      console.log('item==>',item);
      return item;
    };
 
    // END 创建新的表单子组件实例   ==================

    // 组件方法 ========================
    const activeFormItem = (currentItem:any) => {
     state.activedata = currentItem
     state.activeId = currentItem.__config__.formId
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
        }
      })
    }
    onMounted(() => {
      state.idGlobal = getIdGlobal();
    });
    return {
      ...toRefs(state),
      templateOnEnd,
      createIdAndKey,
      cloneComponent,
      drwingItemCopy,
      activeFormItem,
      copyFormItem,
      deleteFormItem,
    };
  },
});
</script>

<style scoped>
@import "@/assets/css/index.css";
</style>