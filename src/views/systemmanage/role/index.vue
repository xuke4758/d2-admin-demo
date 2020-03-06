<template>
  <d2-container>
  	<div class="d2-mt d2-mb">
  		<el-button type="primary" @click="add_user">添加角色</el-button>
  	</div>
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column
        prop="role_name"
        label="角色名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updated_at"
        label="更新时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="500">
      </el-table-column>
      <el-table-column
	      label="操作"
	      width="120">
	      <template slot-scope="scope">
	        <div class="d2-text-center">
				<el-button
		          @click.native.prevent="edit_user(scope.$index)"
		          type="primary"
		          size="small">
				  修改信息
		        </el-button>
	        </div>
	        <div class="d2-text-center d2-mt">
				<el-button
		          @click.native.prevent="edit_power(scope.$index)"
		          type="primary"
		          size="small">
				  修改权限
		        </el-button>
	        </div>
	        <div class="d2-text-center d2-mt">
				<el-button
		          @click.native.prevent="del_user(scope.$index)"
		          type="primary"
		          size="small">
				  删除
		        </el-button>
	        </div>
	        <!-- <div class="d2-text-center">
				<el-button
		          @click.native.prevent="dialog_add_dt(scope.$index, userlist)"
		          :type="scope.row.is_bd_btn_type"
		          size="small">
				  {{scope.row.is_bd_str}}
		        </el-button>
	        </div> -->
	        <!-- <div class="d2-mt d2-text-center">
		        <el-button
		          v-if='scope.row.status == 2'
		          @click.native.prevent="dialog_delete_user(scope.$index, userlist)"
		          type="warning"
		          size="small">
				  恢复普通用户
		        </el-button>
	        </div> -->
	      </template>
	    </el-table-column>
    </el-table>

    <el-dialog
	  title="角色编辑"
	  :visible.sync="dialogVisible"
	  width="30%">
	  <el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="角色名称">
		    <el-input placeholder="请输入角色名称" v-model="form.role_name"></el-input>
		  </el-form-item>
		  <el-form-item label="描述">
		    <el-input placeholder="请输入角色描述" type="textarea" :rows="3" v-model="form.description"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="handleClose">取 消</el-button>
	    <el-button type="primary" @click="confim_user">确 定</el-button>
	  </span>
	</el-dialog>
	<el-dialog
	  title="确定删除吗"
	  :visible.sync="dialogVisible2"
	  width="30%">
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="handleClose2">取 消</el-button>
	    <el-button type="primary" @click="delete_user">确 定</el-button>
	  </span>
	</el-dialog>
	<el-dialog
	  title="修改权限"
	  :visible.sync="dialogVisible3"
	  width="70%">
	  <div v-if="loading_show" class="">加载中</div>
	  <div v-else>
	  	<!-- <el-form-item label="菜单列表"> -->
  		<el-table id='menutab'
		    :data="menu"
	    	border
		    style="width: 100%">
		    <el-table-column
		      label="主菜单"
		      width="150">
		      	<template slot-scope="scope">
					<el-checkbox @change='menuchange(scope.row)' :label="scope.row.name" v-model='scope.row.status'></el-checkbox>
				</template>
		    </el-table-column>
	    	<el-table-column
		      label="子菜单"
		      width="600">
		      	<template slot-scope="scope">
		      		<template v-for='(item, index) in scope.row.permission'>
						<el-checkbox @change='menuchange(scope.row.permission[index])' :label="item.name" v-model='item.status'></el-checkbox>
		      		</template>
				</template>
		    </el-table-column>
		</el-table>
	  </div>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="handleClose3">取 消</el-button>
	    <el-button type="primary" @click="confim_permission_user">确 定</el-button>
	  </span>
	</el-dialog>
  </d2-container>
</template>

<script>

import user from '@api/role'

export default {
  name: 'systemuser',
  data (){
  	return {
  		menu: [],
		userlist: [],
		dialogVisible: false,
		dialogVisible2: false,
		dialogVisible3: false,
		form: {
			role_name: '',
			description: '',
		},
		form2: {
			role_name: '',
			description: '',
		},
		loading_show: true,
  	}
  },
  mounted () {
  	this.getuserlist()
  },
  methods: {
  	confim_permission_user(){
  		let form = this.form,
  			menu = this.menu,
  			data = []
  		for(let i in menu){
  			if(menu[i].status){
  				data.push(menu[i].id)
  			}
  			for(let j in menu[i].permission){
	  			if(menu[i].permission[j].status){
	  				data.push(menu[i].permission[j].id)
	  			}
  			}
  		}
  		form.data = data
  		user.roleuppermission(form).then((res)=>{
  			this.$message({
				message: "修改成功",
				type: 'success'
			});
			this.handleClose3()
			this.getuserlist()
  		})
  	},
  	menuchange(row){
		let menu = this.menu,
			status = row.status
		if(row.parent){
			for(let i in menu[row.index].permission){
				menu[row.index].permission[i].status = status
			}
		}else if(row.children){
			let n = 0;
			for(let i in menu[row.parentindex].permission){
				if(menu[row.parentindex].permission[i].status){
					n = 1
				}
			}
		menu[row.parentindex].status = !!n
		}
	},
  	edit_power(index){
  		this.loading_show = true
  		this.dialogVisible3 = true
  		this.form = this.userlist[index]
  		this.menu = []
  		user.getrole({
  			id: this.form.id
  		}).then((res)=>{
  			this.loading_show = false
  			let menu = res.permissionData
  			for(let i in menu){
  				menu[i].parent = 1
  				menu[i].index = i
  				menu[i].status = !!menu[i].status
  				for(let j in menu[i].permission){
					menu[i].permission[j].children = 1;
					menu[i].permission[j].parentindex = i;
					menu[i].permission[j].index = i;
  					menu[i].permission[j].status = !!menu[i].permission[j].status
  				}
  			}
  			this.menu = menu
  			// this.allPermissionData = res.allPermissionData
  			// this.permissionData = res.permissionData
  		})
  	},
  	getuserlist(){
  		user.rolelist().then((res)=>{
  			this.userlist = res
  		})
  	},
  	edit_user(index){
  		this.form = this.userlist[index]
  		this.dialogVisible = true
  	},
  	handleClose(){
  		this.dialogVisible = false
  		this.form = JSON.parse(JSON.stringify(this.form2))
  	},
  	add_user(){
  		this.handleClose()
  		this.dialogVisible = true
  	},
  	confim_user(){
  		let form = this.form
  		if(form.id){
  			user.editrole(form).then((res)=>{
  				this.$message({
					message: "修改成功",
					type: 'success'
				});
				this.handleClose()
				this.getuserlist()
  			})
  		}else{
  			user.newrole(form).then((res)=>{
  				this.$message({
					message: "创建成功",
					type: 'success'
				});
				this.handleClose()
				this.getuserlist()
  				//
  			})
  		}
  	},
  	del_user(index){
		this.form = this.userlist[index]
  		this.dialogVisible2 = true
  	},
  	handleClose2(){
  		this.dialogVisible2 = false
  		this.form = JSON.parse(JSON.stringify(this.form2))
  	},
  	handleClose3(){
  		this.dialogVisible3 = false
  		this.form = JSON.parse(JSON.stringify(this.form2))
  	},
  	delete_user(){
  		user.deleterole(this.form).then((res)=>{
  			this.$message({
				message: "删除成功",
				type: 'success'
			});
			this.handleClose2()
			this.getuserlist()
  		})
  	},
  }
}
</script>

