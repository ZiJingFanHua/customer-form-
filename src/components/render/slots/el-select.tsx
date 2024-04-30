
export default {
  options(h: any, conf: any, key: any){
    const list  = []
    conf.__slot__.options.forEach(item => {
      list.push(<el-option label={item.label} value={item.value} disabled={item.disabled}></el-option>)
    });
    return {default:()=>list}
  }
}