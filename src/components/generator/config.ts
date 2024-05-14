import { ElInput } from "element-plus"
// 表单属性 [右面板]
export const formConf = {
  fields: [] as any,
  formRef: 'elform',
  formModel: 'formData',
  formRules: 'rules',
  span: 24,
  disabled: false,
  labelPosition: 'left',
  labelWidth:100,
  formBtns: true//是否出现提交取消按钮
}

//组件 [左面板] 
//输入类型
export const inputComponents = [
  {
    __config__: {
      label: '单行文本',
      showLabel: true,
      labelWidth: null,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      onUpdataValue:'Input',
      required: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element-plus.org/zh-CN/component/input.html'
    },
    __slot__: {
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
  },
  {
    __config__: {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      tag: 'el-input',
      tagIcon: 'textarea',
      defaultValue: undefined,
      onUpdataValue:'Input',
      required: true,
      layout: 'colFormItem',
      span: 24,
      regList: [],
      changeTag: true,
      document: 'https://element-plus.org/zh-CN/component/input.html'
    },
    type: 'textarea',
    placeholder: '请输入',
    autosize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '密码',
      showLabel: true,
      labelWidth: null,
      changeTag: true,
      tag: 'el-input',
      tagIcon: 'password',
      defaultValue: undefined,
      onUpdataValue:'Input',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      document: 'https://element-plus.org/zh-CN/component/input.html'
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    'show-password': true,
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    readonly: false,
    disabled: false
  },
  {
    __config__: {
      label: '单行文本',
      showLabel: true,
      labelWidth: null,
      tag: 'el-input',
      tagIcon: 'input',
      defaultValue: undefined,
      onUpdataValue:'Input',
      required: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element-plus.org/zh-CN/component/input.html'
    },
    __slot__: {
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
  }, {
    __config__: {
      label: '计数器',
      showLabel: true,
      labelWidth: null,
      tag: 'el-input-number',
      tagIcon: 'number',
      defaultValue: undefined,
      onUpdataValue:'Input',
      required: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element-plus.org/zh-CN/component/input.html'
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxlength: null,
    'show-word-limit': false,
    disabled: false
  },
]

//选择组件
export const selectComponents = [
  {
    __config__: {
      label: '下拉选择',
      showLabel: true,
      labelWidth: null,
      tag: 'el-select',
      tagIcon: 'select',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      onUpdataValue:'Change',
      document: 'https://element.eleme.cn/#/zh-CN/component/select'
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    placeholder: '请选择',
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
    multiple: false
  },
  {
    __config__: {
      label: '级联选择',
      // url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'options',
      showLabel: true,
      labelWidth: null,
      tag: 'el-cascader',
      tagIcon: 'cascader',
      layout: 'colFormItem',
      defaultValue: [],
      onUpdataValue:'Change',
      dataType: 'dynamic',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/cascader'
    },
    options: [{
      id: 1,
      value: 1,
      label: '选项1',
      children: [{
        id: 2,
        value: 2,
        label: '选项1-1'
      }]
    }],
    placeholder: '请选择',
    style: { width: '100%' },
    props: {
      props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
      }
    },
    'show-all-levels': true,
    disabled: false,
    clearable: true,
    filterable: false,
    separator: '/'
  },
  {
    __config__: {
      label: '单选项',
      showLabel: true,
      labelWidth: null,
      tag: 'el-radio-group',
      tagIcon: 'radio',
      layout: 'colFormItem',
      span: 24,
      required: true,
      regList: [],
      changeTag: true,
      onUpdataValue:'Change',
      document: 'https://element.eleme.cn/#/zh-CN/component/select'
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: { width: '100%' },
    clearable: true,
    disabled: false,
    filterable: false,
  },
]

//时间类型组件
// export const 
//布局
export const layoutComponents = [
  {
    __config__: {
      layout: 'rowFormItem',
      tagIcon: 'row',
      label: '行容器',
      // layoutTree:'tr' 
    }
  }
]
