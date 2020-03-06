import cookies from './util.cookies'
import storage from './util.storage'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  storage,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

util.getmenu = function (_this) {
  let menu = util.storage.get('menu');
  if(menu){
    let menulist = [
      { path: '/index', title: '首页', icon: 'home' },
      // {
      //   title: '列表',
      //   icon: 'folder-o',
      //   children: [
      //     { path: '/musiclist', title: '音乐列表' }
      //   ]
      // },
      // {
      //   title: '系统管理',
      //   icon: 'folder-o',
      //   children: [
      //     { path: '/user', title: '用户管理' },
      //     { path: '/role', title: '角色管理' },
      //     { path: '/power', title: '权限管理' }
      //   ]
      // }
    ]
    menulist = menulist.concat(menu|| [])
    try{
      // 设置顶栏菜单
      _this.commit('d2admin/menu/headerSet', menulist)
      // 设置侧边栏菜单
      _this.commit('d2admin/menu/asideSet', menulist)
      // 初始化菜单搜索功能
      _this.commit('d2admin/search/init', menulist)
    }catch(e){console.log(e)}
  }
}

export default util
