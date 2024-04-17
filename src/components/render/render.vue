 <!-- 获取component 实例 -->
<script lang="tsx">
import { deepClone } from "@/utils";
import { defineComponent, h } from "vue";

const componentChild = {}

/**
 * 将./slots中的文件挂载到对象componentChild上
 * 文件名为key，对应JSON配置中的__config__.tag
 * 文件内容为value，解析JSON配置中的__slot__
 */

// 创建一个上下文 (要搜索的目录、是否还搜索其子目录，匹配文件的正则表达式)
// https://webpack.docschina.org/guides/dependency-management/
const slotsFiles = require.context("./slots",false, /\.tsx$/)

const keys = slotsFiles.keys() || []
keys.forEach(key =>{
  const tag = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = slotsFiles(key).default
  componentChild[tag] = value
})

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

function mountSlotFiles(h,confClone,children){
  const childObjs = componentChild[confClone.__config__.tag]
  if(childObjs) {
    Object.keys(childObjs).forEach(key =>{
      const childFun = childObjs[key]
      if(confClone.__slot__&&confClone.__slot__[key]){
        // children.push(childFun(h,confClone,key))
        const child = childFun(h,confClone,key)
        Object.keys(child).forEach(k=>{
          children[k] = child[k]
        })
      }
    })
  }
}

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
    // const children = this.$slots.default || {};
    const children = {}
    //組件添加插槽
    mountSlotFiles.call(this,h,confClone,children)
    buildDataObject.call(this,confClone,dataObject)

    return h(this.conf.__config__.component, dataObject,children);
  },
})
</script>
