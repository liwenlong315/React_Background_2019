/* 因时间获取后是一串数字需转换时间样式模块 */

export function formateDate(time) {
  if (!time) return ''
  let date = new Date(time)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() +
    ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}