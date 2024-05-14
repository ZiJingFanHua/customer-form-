//深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString;

  //null undefined function non-object
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // Dom Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  //Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  if (_toString.call(obj) === '[object RegExp]') {
    const flags = [] as any
    if (obj.global) { flags.push('g') }
    if (obj.multiline) { flags.push('m') }
    if (obj.ignoreCase) { flags.push('i') }
    return new RegExp(obj.source, flags.join(''))
  }

  const  result =   Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor : {}
  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }
  return result
}

// export function deepClone(obj){
//   let newObj = Array.isArray(obj)?[]:{}
//   if(obj&& typeof obj === 'object'){
//     for(let key in obj){
//       if(obj.hasOwnProperty(key)){
//         newObj[key] = (obj&&typeof obj[key] === 'object')?deepClone(obj[key]):obj[key]
//       }
//     }
//   }
//   return newObj
// }

