 <!-- 获取component 实例 -->
<script lang="tsx">
import { deepClone } from "@/utils";
import { defineComponent, h } from "vue";


//获取 vnodes所需属性
const makeDataObject = () => {
  // return {
  //   class: {},
  //   attrs: {},
  //   props: {},
  //   domProps: {},
  //   nativeOn: {},
  //   on: {},
  //   style: {},
  //   directives: [],
  //   scopedSlots: {},
  //   slot: null,
  //   key: null,
  //   ref: null,
  //   refInFor: true,
  // };
  return {
    class: {},
    // attrs: {},
    // props: {},
    domProps: {},
    nativeOn: {},
    // on: {},
    style: {},
    directives: [],
    scopedSlots: {},
    slot: null,
    key: null,
    ref: null,
    refInFor: true,
  };
};

//转换格式 将json配置调整为H函数可以识别的数据
function buildDataObject(confClone,dataObject){
  Object.keys(confClone).forEach((key:any) => {
    const val = confClone[key]
    if(key === '__vModel__'){
      //输入值绑定
      dataObject['model-value'] = confClone.__config__.defaultValue
      dataObject.onInput = (val:any) => {
        this.$emit('input', val)
      }
    }else if(key === 'props'){
      Object.keys(confClone[key]).forEach((k:any) => {
        dataObject[`.${k}`] =  confClone[key][k]
      })
    }else if(key === 'attr'){
      Object.keys(confClone[key]).forEach((k:any) => {
        dataObject[`^${k}`] =  confClone[key][k]
      })
    }else if(key === 'on'){
      Object.keys(confClone[key]).forEach((k:any) => {
        dataObject[`on${k}`] =  confClone[key][k]
      })
    }else if(dataObject[key] !== undefined){
     if(dataObject[key] === null || dataObject[key] instanceof RegExp || ['boolean', 'string', 'number', 'function'].includes(typeof dataObject[key])){
      dataObject[key] = val
     }else if(Array.isArray(dataObject[key])) {
      dataObject[key] = [...dataObject[key],...val]
     }else{
      dataObject[key] = {...dataObject[key],...val}
     }
    }else{
      dataObject[key] = val
    }
  })
    // 清理属性
    clearAttrs(dataObject)
}

function clearAttrs(dataObject) {
  delete dataObject['^__config__']
  delete dataObject['^__slot__']
  delete dataObject['^__methods__']
}
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
    const confClone = deepClone(this.conf)
    const children = [];
    buildDataObject.call(this,confClone,dataObject)
    return h(this.conf.__config__.tag, dataObject, children);
  },
})
</script>
