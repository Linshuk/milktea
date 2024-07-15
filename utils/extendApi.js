/****
 * 1、封装一下界面交互函数
 *    showToast
 *    showModal
 *    showLoading
 * 2、本地存储
 */

const toast = ({title = '数据加载中...',icon = 'none',duration=500,mask=true} = {}) =>{
  wx.showToast({
    title,
    icon,
    duration,
    mask
  })
}

const modal = (options = {}) => {
  return new Promise((resolve) => {
    const defaultOpt = {
      title: '提示',
      content: '您确定执行该操作吗？',
      confirmColor: '#f3514f'
    }

   const opts =  Object.assign({},defaultOpt,options)
    wx.showModal({
      ...opts,
      complete: (res) => {
        if (res.cancel) {
          resolve(false)
        }
    
        if (res.confirm) {
          resolve(true)
        }
      }
    })
  })


}




module.exports = {toast,modal}
// export {toast}














