 <!-- 获取component 实例 -->
<script lang="tsx">
import { defineComponent, h } from "vue";

//获取 vnodes所需属性
const makeDataObject = () => {
  return {
    class: {},
    attrs: {},
    props: {},
    domProps: {},
    nativeOn: {},
    on: {},
    style: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key: null,
    ref: null,
    refInFor: true,
  };
};
export default defineComponent({
  name:'tagRunder',
  props: {
    conf: {
      type: Object,
      require: true,
    },
  },
  render() {
    const dataObject = makeDataObject();
    const children = [];
    console.log(this);
    
    return h(this.conf.__config__.tag, dataObject, children);
  },
})
</script>
