<script lang="tsx">
import { defineComponent, h, PropType } from "vue";
import draggable from "vuedraggable";
import TagRunder from "@/components/render/render.vue";
import { Plus,Delete} from '@element-plus/icons-vue'
interface ItemType {
  [key: string]: any;
}


const components = {
  itemBtns(h: any, currentItem: any, index: any, list: any) {
    
    const { onCopyItem, onDeleteItem } = this.$attrs;
    return [
      <span
        class="drawing-item-copy"
        title="复制"
        onClick={(event: { stopPropagation: () => void; }) => {
          onCopyItem(currentItem, list);
          event.stopPropagation();
        }}
      >
      <el-icon><Plus /></el-icon>
      </span>,
      <span
        class="drawing-item-delete"
        title="删除"
        onClick={(event: { stopPropagation: () => void; }) => {
          onDeleteItem(index, list);
          event.stopPropagation();
        }}
      >
      <el-icon><Delete /></el-icon>
      </span>,
    ];
  },
};

const layouts = {
  colFormItem(h: any, currentItem: any, index: any, list: any) { 
    const { onActiveItem } = this.$attrs;
    const config = currentItem.__config__;
    const children = renderChildren.apply(this,arguments)
    let className = this.activeId === config.formId
        ? "drawing-item active-form-item"
        : "drawing-item";
    let labelWidth = config.labelWidth
      ? `${currentItem.__config__.labelWidth}px`
      : null;
    if (config.showLabel === false) labelWidth = "0";   
    return (
      <el-col
        span={parseInt(config.span)}
        class={className}
        onClick={(event:any) => {
          onActiveItem(currentItem);
          event.stopPropagation();
        }}
      >
        <el-form-item
          label-width={labelWidth}
          label={config.showLabel ? config.label : ""}
          required={config.required}
        >
          <TagRunder
            key={config.renderKey}
            conf={currentItem}
            onUpdataValue={(event: any) => {;config.defaultValue  = event}}
          >
          {children}
          </TagRunder>
        </el-form-item>
        {components.itemBtns.apply(this, [h, currentItem, index, list])}
      </el-col>
    );
  },
  rowFormItem(h: any, currentItem: any, index: any, list: any) {
    const { onActiveItem } = this.$attrs;
    const config = currentItem.__config__;
    const children = renderChildren.apply(this,arguments)
    const className = this.activeId === config.formId
      ? 'drawing-row-item active-from-item'
      : 'drawing-row-item'
    const slots = {
       'item':({element,index}) =>{
        // return <span>{children[index]}</span>
        return h(children[index])
       }
    }
    return (
      <el-col span={parseInt(config.span)}>
        <el-row gutter={config.gutter}  class={className} onClick={(event:any) => {
          onActiveItem(currentItem);
          event.stopPropagation();
        }}>
           <draggable class="wrapper-draggable"  group={{ name: 'componentsGroup'}} list={config.children} v-slots={slots} item-key="renderKey">
            
           </draggable>
           {components.itemBtns.apply(this, [h, currentItem, index, list])}
        </el-row>
      </el-col>
    )
  },
  raw() {
    //
  },
};

function renderChildren(h,currentItem,index,list){
  const config = currentItem.__config__
  if(!Array.isArray(config.children))
  return null
  return config.children.map((item,index) => {
    const layout = layouts[item.__config__.layout]
    if(layout)
    return layout.call(this,h,item,index,config.children)
    else
    return layoutIsNotFound.call(this)
  })
}
function layoutIsNotFound() {
  
  throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`);
}
export default defineComponent({
  name:'draggableI',
  // props: ["currentItem", "drawingList", "activeId", "formConf"],
  props:{
    currentItem:{
      type:Object as PropType<ItemType>
      },
    drawingList:Array,
    activeId:[String,Number],
    formConf:Object,
    index:Number
  },
  components: {
    TagRunder,
    draggable,
    Plus,
    Delete,
  },
  render() {
    const layout = layouts[this.currentItem.__config__.layout];
    if (layout) {
      return layout.call(
        this,
        h,
        this.currentItem,
        this.index,
        this.drawingList
      );
    } else {
      return layoutIsNotFound.call(this);
    }
  },
});
</script>