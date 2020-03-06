<template>
  <d2-container>
  	<div class="d2-mt d2-mb">
  		<el-button type="primary" @click="add_user">添加权限</el-button>
  	</div>
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column
        prop="pid"
        label="父级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
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
	  title="权限编辑"
	  :visible.sync="dialogVisible"
	  width="30%">
	  <el-form ref="form" :model="form" label-width="80px">
	  	  <el-form-item label="选择菜单">
		    <el-select v-model="form.pid" placeholder="请选择">
			    <el-option
			      v-for="item in permissionlist"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="菜单名称">
		    <el-input placeholder="请输入菜单名称" v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="前端路由">
		    <el-input placeholder="请输入前端路由" v-model="form.url"></el-input>
		  </el-form-item>
		  <el-form-item label="排序">
		    <el-input placeholder="请输入排序" v-model="form.sort"></el-input>
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
  </d2-container>
</template>

<script>

import user from '@api/permission'

export default {
  name: 'systempower',
  data (){
  	return {
		userlist: [],
		permissionlist: [],
		dialogVisible: false,
		dialogVisible2: false,
		form: {
			pid: '',
			name: '',
			sort: '',
			url: '',
		},
		form2: {
			pid: '',
			name: '',
			sort: '',
			url: '',
		}
  	}
  },
  mounted () {
  	this.getpermissionlist()
  	this.getuserlist()
  },
  methods: {
  	getpermissionlist(){
  		user.onepermissionlist().then((res)=>{
  			this.permissionlist = res
  		})
  	},
  	getuserlist(){
  		user.permissionlist().then((res)=>{
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
  			user.editpermission(form).then((res)=>{
  				this.$message({
					message: "修改成功",
					type: 'success'
				});
				this.handleClose()
				this.getuserlist()
				this.getpermissionlist()
  			})
  		}else{
  			user.createpermission(form).then((res)=>{
  				this.$message({
					message: "创建成功",
					type: 'success'
				});
				this.handleClose()
				this.getuserlist()
				this.getpermissionlist()
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
  		user.deletepermission(this.form).then((res)=>{
  			this.$message({
				message: "删除成功",
				type: 'success'
			});
			this.handleClose2()
			this.getuserlist()
			this.getpermissionlist()
  		})
  	},
  }
}
</script>

