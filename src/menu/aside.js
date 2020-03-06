// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '列表',
    icon: 'folder-o',
    children: [
      { path: '/musiclist', title: '音乐列表' }
    ]
  },
  {
    title: '系统管理',
    icon: 'folder-o',
    children: [
      { path: '/user', title: '用户管理' },
      { path: '/role', title: '角色管理' },
      { path: '/power', title: '权限管理' }
    ]
  }
]
