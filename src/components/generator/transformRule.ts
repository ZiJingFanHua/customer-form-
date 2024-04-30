import ruleTrigger from "./ruleTrigger"

//构建表单校验规则
function buildRules(element,ruleList){
  const config = element.__config__
  if(element.__vModel === undefined)  return 
  const rules = []
  if(ruleTrigger[config.tag]){
     if(config.require){
      let message = Array.isArray(config.defaultValue)?`请至少选择一个${config.label}`:element.placeholder
      if(message === undefined) message = `${config.label}不能为空`
      rules.push({ required: true, message: message, trigger: ruleTrigger[config.tag] })
     }

     ruleList[element.__vModel__] = rules
  }
}


export {
  buildRules
}