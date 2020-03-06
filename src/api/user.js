import request from '@/plugin/axios'

export default {
	userlist: function (data) {
	  return request({
	    url: '/userinfo',
	    method: 'get',
	    data
	  })
	},
	rolelist: function (data) {
	  return request({
	    url: '/userinfo/create',
	    method: 'get',
	    data
	  })
	},
	createuserinfo: function (data) {
	  return request({
	    url: '/userinfo',
	    method: 'post',
	    data
	  })
	},
	getuser: function (data) {
	  return request({
	    url: `/userinfo/${data.id}/edit`,
	    method: 'get',
	    data
	  })
	},
	edituser: function (data) {
	  return request({
	    url: `/userinfo/${data.id}`,
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
	deleteuser: function (data) {
	  return request({
	    url: `/userinfo/${data.id}`,
	    method: 'delete',
	    data
	  })
	},
}


