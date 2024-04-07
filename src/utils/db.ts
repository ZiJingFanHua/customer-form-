export function getIdGlobal() {
  const idGlobal = localStorage.getItem('DRAWING_ID')
  if(idGlobal) return parseInt(idGlobal,10)
  return 100
}