export default {
  prepend(h: any, conf: any, key: any) {
    // return <template v-slot:prepend >
    //   {conf.__slot__[key]}
    // </template>
    return {prepend:() =>conf.__slot__[key]}
  },
  append(h: any, conf: any, key: any) {
    // return <template v-slot:append >
    //   {conf.__slot__[key]}
    // </template>
    return {append:() =>conf.__slot__[key]}
  }
}