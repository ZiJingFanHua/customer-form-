<script lang="tsx">
import { defineComponent, h, reactive } from 'vue'
import TagRunder from "@/components/render/render.vue";
import { deepClone } from '@/utils/index'

const layouts = {
  colFormItem(h,item){
   const config = item.__config__
   const labelWidth = config.labelWidth?`${config.labelWidth}px`:null
   return <el-col span={config.span}>
    <el-form-item label={config.label} label-width={labelWidth} prop={item.__vModel__}>
      <TagRunder conf={item} onInput={(event: any) => {config.defaultValue  = event}}></TagRunder>
    </el-form-item>
   </el-col>
  },
  rowFormItem(h,item){
    const config = item.__config__
    const children = renderChildren.apply(this,arguments)
    return <el-col span={config.span}>
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
  console.log(this);
  
  const {formConfCopy} = this
  return(
    <el-form label-position = {formConfCopy.labelPosition} disabled={formConfCopy.disabled} label-width={`${formConfCopy.labelWidth}px`} ref={formConfCopy.formRef}>
    {renderFormItem.call(this, h, formConfCopy.fields)}
    { formConfCopy.formBtns&&formBtns.call(this,h)}
    </el-form>
  )
}

function formBtns(h) {
  return <el-col>
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
    submitForm(){
      console.log('submit');
      
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
})
</script>

<style scoped>

</style>