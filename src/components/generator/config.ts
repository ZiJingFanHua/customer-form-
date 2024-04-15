import { ElInput } from "element-plus"
// 表单属性 [右面板]
export const formConf = {
  formRef: 'elform',
  formModel: 'formData',
  formRules: 'rules',
  span: 24,
  disabled: false,
}

//组件 [左面板] 
export const testComponents = [
  {
    __config__: {
      label: '单行文本',
      labelWidth: null,
      tag: ElInput,
      tagIcon: 'input',
      defaultValue: undefined,
      require: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element-plus.org/zh-CN/component/input.html'
    },
    __solt__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    disabled: false
  }
]
