<template>
  <d2-container>
  	<div class="d2-mt d2-mb">
  		<el-button type="primary" @click="add_user">添加角色</el-button>
  	</div>
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
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
        prop="role_name"
        label="角色"
	    width="120">
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
		          @click.native.prevent="edit_pwd(scope.$index)"
		          type="primary"
		          size="small">
				  修改密码
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
	  title="添加用户"
	  :visible.sync="dialogVisible"
	  width="30%">
	  <el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="选择角色">
		    <el-select v-model="form.role_id" placeholder="请选择">
			    <el-option
			      v-for="item in rolelist"
			      :key="item.id"
			      :label="item.role_name"
			      :value="item.id">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="用户名">
		    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱">
		    <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
		  </el-form-item>
		  <template v-if='form.edit'>
			  <el-form-item label="密码">
			    <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码">
			    <el-input type="password" placeholder="请输入确认密码" v-model="form.repassword"></el-input>
			  </el-form-item>
		  </template>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="confim_user">确 定</el-button>
	  </span>
	</el-dialog>
	<el-dialog
	  title="确定删除吗"
	  :visible.sync="dialogVisible2"
	  width="30%">
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible2 = false">取 消</el-button>
	    <el-button type="primary" @click="delete_user">确 定</el-button>
	  </span>
	</el-dialog>
	<el-dialog
	  title="修改密码"
	  :visible.sync="dialogVisible3"
	  width="30%">
	  <span>{{form.username}}</span>
	  <el-form ref="form" :model="form" label-width="80px">
		  <el-form-item label="密码">
		    <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码">
		    <el-input type="password" placeholder="请输入确认密码" v-model="form.repassword"></el-input>
		  </el-form-item>
	  </el-form>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible3 = false">取 消</el-button>
	    <el-button type="primary" @click="editpwd">确 定</el-button>
	  </span>
	</el-dialog>
  </d2-container>
</template>

<script>

import user from '@api/user'

export default {
  name: 'systemuser',
  data (){
  	return {
  		rolelist: [],
		userlist: [],
		dialogVisible: false,
		dialogVisible2: false,
		dialogVisible3: false,
		form: {
			edit: true,
			role_id: '',
			username: '',
			email: '',
			password: '',
			repassword: '',
		},
		form2: {
			edit: true,
			role_id: '',
			username: '',
			email: '',
			password: '',
			repassword: '',
		}
  	}
  },
  mounted () {
  	this.getrolelist()
  	this.getuserlist()
  },
  methods: {
  	getrolelist(){
  		user.rolelist().then(res=>{
  			this.rolelist = res
  		})
  	},
  	getuserlist(){
  		user.userlist().then((res)=>{
  			this.userlist = res
  		})
  	},
  	edit_user(index){
  		this.form = this.userlist[index]
  		this.form.edit = false
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
  		console.log(form)
  		if(form.id){
  			user.edituser(form).then((res)=>{
  				this.$message({
					message: "修改成功",
					type: 'success'
				});
				this.handleClose()
				this.getuserlist()
  			})
  		}else{
  			user.createuserinfo(form).then((res)=>{
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
  	delete_user(){
  		user.deleteuser(this.form).then((res)=>{
  			this.$message({
				message: "删除成功",
				type: 'success'
			});
			this.handleClose2()
			this.getuserlist()
  		})
  	},
  	handleClose3(){
  		this.dialogVisible3 = false
  		this.form = JSON.parse(JSON.stringify(this.form2))
  	},
  	edit_pwd(index){
		this.form = this.userlist[index]
  		this.dialogVisible3 = true
  	},
  	editpwd(){
  		user.editpwd(this.form).then((res)=>{
  			this.$message({
				message: "修改成功",
				type: 'success'
			});
			this.handleClose3()
  		})
  	},
  }
}
</script>

