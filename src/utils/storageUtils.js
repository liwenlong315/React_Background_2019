import store from 'store'

//1。保存user
export function saveUser(user){
  store.set('USER-KEY',user)
}
//2.读取保存的user
export function getUser(){
    return store.get('USER-KEY')||{}
}
//3.删除保存
export function removeUser(){
    store.remove('user')
}