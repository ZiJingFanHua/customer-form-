export default {
  prepend(h: any, conf: any, key: any) {
    return <template slot="prepend" >
      {conf._slot_[key]}
    </template>
  },
  append(h: any, conf: any, key: any) {
    return <template slot="append" >
      {conf._slot_[key]}
    </template>
  }
}