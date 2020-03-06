import request from '@/plugin/axios'

export default {
	permissionlist: function (data) {
	  return request({
	    url: '/permission',
	    method: 'get',
	    data
	  })
	},
	onepermissionlist: function (data) {
	  return request({
	    url: '/permission/create',
	    method: 'get',
	    data
	  })
	},
	createpermission: function (data) {
	  return request({
	    url: '/permission',
	    method: 'post',
	    data
	  })
	},
	getpermission: function (data) {
	  return request({
	    url: `/permission/${data.id}/edit`,
	    method: 'get',
	    data
	  })
	},
	editpermission: function (data) {
	  return request({
	    url: `/permission/${data.id}`,
	    method: 'put',
	    data
	  })
	},
	editpwd: function (data) {
	  return request({
	    url: `/userinfo/uppassword`,
	    method: 'post',
	    data
	  })
	},
	deletepermission: function (data) {
	  return request({
	    url: `/permission/${data.id}`,
	    method: 'delete',
	    data
	  })
	},
}


