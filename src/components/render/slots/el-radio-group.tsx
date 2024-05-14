
export default {
  options(h: any, conf: any, key: any){
    const list  = []
    conf.__slot__.options.forEach(item => {
      list.push(<el-radio value={item.value} disabled={item.disabled}>{item.label}</el-radio>)
    });
    return {default:()=>list}
  }
}