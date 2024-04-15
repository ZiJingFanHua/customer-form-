<script lang="tsx">
import { defineComponent, h, PropType } from "vue";
import draggable from "vuedraggable";
import TagRunder from "@/components/render/render.vue";

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
        复制
      </span>,
      <span
        class="drawing-item-delete"
        title="删除"
        onClick={(event: { stopPropagation: () => void; }) => {
          onDeleteItem(currentItem, list);
          event.stopPropagation();
        }}
      >
        删除
      </span>,
    ];
  },
};

const layouts = {
  colFormItem(h: any, currentItem: any, index: any, list: any) { 
    const { onActiveItem } = this.$attrs;
    const config = currentItem.__config__;
    
    let className = this.activeId == config.formId
        ? "drawing-item active-form-item"
        : "drawing-item";
    let labelWidth = config.labelWidth
      ? `${currentItem.__config__.labelWidth}px`
      : null;
    if (config.showLabel === false) labelWidth = "0";
    return (
      <el-col
        span={config.span}
        class={className}
        nativeOnClick={(event: { stopPropagation: () => void; }) => {
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
            
            onInput={(event: any) => {config.defaultValue  = event}}
          ></TagRunder>
        </el-form-item>
        {components.itemBtns.apply(this, [h, currentItem, index, list])}
      </el-col>
    );
  },
  rowFormItem() {
    //
  },
  raw() {
    //
  },
};
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
  },
  components: {
    TagRunder,
    draggable,
  },
  computed: {
    index() {
      return this.drawingList.findIndex((item: any) => {
        item.renderKey == this.currentItem.renderKey;
      });
    },
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