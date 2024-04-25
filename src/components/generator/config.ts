import { ElInput } from "element-plus"
// 表单属性 [右面板]
export const formConf = {
  formRef: 'elform',
  formModel: 'formData',
  formRules: 'rules',
  span: 24,
  disabled: false,
  formBtns: true//是否出现提交取消按钮
}

//组件 [左面板] 
export const testComponents = [
  {
    __config__: {
      label: '单行文本',
      showLabel:true,
      labelWidth: null,
      component:ElInput,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      require: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element-plus.org/zh-CN/component/input.html'
    },
    __slot__: {
      prepend: '12',
      append: '%'
    },
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    disabled: false
  },{
    __config__:{
      layout:'rowFormItem',
      tagIcon:'row',
      label:'行容器',
      // layoutTree:'tr' 
    }
  }
]
