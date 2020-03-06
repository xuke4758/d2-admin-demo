<template>
  <d2-container>
     <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <div class="d2-mt d2-mb">
		<el-pagination
		  background
		  layout="prev, pager, next" 
		  @current-change="handleCurrentChange"
		  :page-size="4"
		  :total="totalPage">
		</el-pagination>
    </div>
  </d2-container>
</template>

<script>
export default {
  	name: 'musiclist',
  	mounted (){
  		this.getData()
  	},
  	methods: {
  		handleCurrentChange(e){
  			//e 当前页数
  			this.num = e
  			this.getData()
  		},
  		//获取数据
  		getData(){
  			this.loading = true;
  			setTimeout(()=>{
  				this.tableData = this[`tableData${this.num}`]
  				this.loading = false;
  			}, 800)
  		},
  	},
  	data() {
        return {
        	//当前页数
        	num: 1,
        	//加载状态
        	loading: true,
        	//一共多少条
        	totalPage: 12,
        	//展示的列表数据
        	tableData: [],
        	//第一页数据
			tableData1: [{
				date: '2016-05-02',
				name: '王小虎1',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎1',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎1',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎1',
				address: '上海市普陀区金沙江路 1516 弄'
			}],
			//第一页数据
			tableData2: [{
				date: '2017-05-02',
				name: '王小虎2',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2017-05-04',
				name: '王小虎2',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2017-05-01',
				name: '王小虎2',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2017-05-03',
				name: '王小虎2',
				address: '上海市普陀区金沙江路 1516 弄'
			}],
			//第一页数据
			tableData3: [{
				date: '2018-05-02',
				name: '王小虎3',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2018-05-04',
				name: '王小虎3',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2018-05-01',
				name: '王小虎3',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2018-05-03',
				name: '王小虎3',
				address: '上海市普陀区金沙江路 1516 弄'
			}]
        }
    }
}
</script>
