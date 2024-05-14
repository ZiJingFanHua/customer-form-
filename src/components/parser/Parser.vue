<script lang="tsx">
import { defineComponent, h, reactive } from 'vue'
import TagRunder from "@/components/render/render.vue";
import { deepClone } from '@/utils/index'
import ruleTrigger from '../generator/ruleTrigger';
const layouts = {
  colFormItem(h,item){
   const config = item.__config__
   const labelWidth = config.labelWidth?`${config.labelWidth}px`:null
   return <el-col span={parseInt(config.span)}>
    <el-form-item label={config.label} label-width={labelWidth} prop={item.__vModel__}>
      <TagRunder conf={item} onInput={(event: any) => {config.defaultValue  = event;this.formConfCopy.formData[item.__vModel__] =event }} onChange={(event:any) => {config.defaultValue  = event}}></TagRunder>
    </el-form-item>
   </el-col>
  },
  rowFormItem(h,item){
    const config = item.__config__
    const children = renderChildren.apply(this,arguments)
    return <el-col span={parseInt(config.span)}>
      <el-row gutter={config.gutter}>
        {children}
      </el-row>
    </el-col>
  }
}
function renderChildren(h,item){
  const config = item.__config__
  if (!Array.isArray(config.children)) return null;
  return renderFormItem.call(this, h, config.children)
}
function renderFrom(h) {
  const {formConfCopy} = this
  return(
    <el-form model={formConfCopy.formData} label-position = {formConfCopy.labelPosition} disabled={formConfCopy.disabled} label-width={`${formConfCopy.labelWidth}px`} ref={formConfCopy.formRef} rules={formConfCopy.formRules}>
    {renderFormItem.call(this, h, formConfCopy.fields)}
    { formConfCopy.formBtns&&formBtns.call(this,h)}
    </el-form>
  )
}

function formBtns(h) {
  return <el-col span={24} class="btns">
    <el-form-item>
       <el-button type="primary" onClick={this.submitForm}> 提交</el-button>
       <el-button  onClick={this.submitForm}> 取消</el-button>
    </el-form-item>
  </el-col>
}

function renderFormItem(h,elementList) {
   return elementList.map(item => {
    const layout  = layouts[item.__config__.layout]
    if(layout) return layout.call(this,h,item)
    throw new Error(`没有与${item.__config__.layout}匹配的layout`)
   })
}

export default defineComponent({
  name:'formParser',
  props:['formConf'],
  components: {
    TagRunder
  },
  data(){
    return{
      formConfCopy : reactive(deepClone(this.formConf))
    }
  },
  methods:{
    buildRules(componentList, rules){
      componentList.forEach(element => {
        const config = element.__config__
        // if(element.__vModel__ === undefined)  return 
        if(element.__vModel__ !== undefined){
        const rule = []
        if(ruleTrigger[config.tag]){
            if(config.required){
            let message = Array.isArray(config.defaultValue)?`请至少选择一个${config.label}`:element.placeholder
            if(message === undefined) message = `${config.label}不能为空`
            rule.push({ required: true, message: message, trigger: ruleTrigger[config.tag] })
            }
            rules[element.__vModel__] = rule
          }       
        }
        if(config.children){
        this.buildRules(config.children,rules)
        }
            });
    },
    initFormData(componentList,formData){
      componentList.forEach(cur => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    submitForm(){
      this.$refs[this.formConf.formRef].validate(valid => {
        if (!valid) return false
        // 触发sumit事件
        console.log('submit');
        
        this.$emit('submit', this[this.formConf.formModel])
        return true
      })
    },
    cancelForm(){
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    }
  },
  // computed:{
  //   formConfCopy(){
  //   let copy = reactive(deepClone(this.formConf))
  //   copy.formData ={}
  //   copy.formRules = {}
  //   this.initFormData(copy.fields,copy.formData)
  //   this.buildRules(copy.fields, copy.formRules)
  //   return copy
  //   }
  // },
  render(h) {
    this.formConfCopy.formData ={}
    this.formConfCopy.formRules = {}
    this.initFormData(this.formConfCopy.fields,this.formConfCopy.formData)
    this.buildRules(this.formConfCopy.fields, this.formConfCopy.formRules)
    console.log( this.formConfCopy.formRules);
    console.log(this.formConfCopy.formData);
    
    return renderFrom.call(this, h)
  }
})
</script>

<style scoped>
.btns {
  width: 100%;
  display: flex;
  justify-content: right;
}
</style>