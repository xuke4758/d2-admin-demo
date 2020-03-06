import request from '@/plugin/axios'

export default {
	rolelist: function (data) {
	  return request({
	    url: '/role',
	    method: 'get',
	    data
	  })
	},
	newrole: function (data) {
	  return request({
	    url: '/role',
	    method: 'post',
	    data
	  })
	},
	getrole: function (data) {
	  return request({
	    url: `/role/${data.id}/edit`,
	    method: 'get',
	    data
	  })
	},
	editrole: function (data) {
	  return request({
	    url: `/role/${data.id}`,
	    method: 'put',
	    data
	  })
	},
	deleterole: function (data) {
	  return request({
	    url: `/role/${data.id}`,
	    method: 'delete',
	    data
	  })
	},
	roleuppermission: function (data) {
	  return request({
	    url: `/role/uppermission`,
	    method: 'post',
	    data
	  })
	},
}


