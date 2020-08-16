<template>
	<view class="Dizhou-cont">
		<view class="Dizhou">江苏疫情</view>
		<view class="tips">7:00 - 10:00 为更新高峰，数据如有滞后请谅解</view>
		<!-- 表格 -->
		<view class="myCharts">
			<view class="table-cont">
				<block v-for="(item,index) in tables" :key="index">
					<text>{{item}}</text>
				</block>
			</view>
		</view>
		<view>
			<block v-for="(item,index) in  datas" :key="index">
				<view class="table-datas">
					<text>{{item.address}}</text>
					<text>{{item.newly}}</text>
					<text>{{item.accumulate}}</text>
					<text>{{item.cure}}</text>
					<text>{{item.death}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	let moment = require('../../../node_modules/_moment@2.27.0@moment')
	moment.locale('zh-cn')
	//表格数据处理的类
	let Tablelist = require('../../../config/tablelist.js')
	export default{
		props:{
			tabledata:Array
		},
		data(){
			return{
				tables:[
					"地区",
					"新增确诊",
					"累计确诊",
					"治愈",
					"死亡"
				],
				datas:[]
			}
		},
		watch:{
			async tabledata(newvalue,oldvalue){
				let newdig = newvalue[0].data
				let newcure = newvalue[1].data
				let newdeath = newvalue[2].data
				let now = moment().format('YYYY-MM-DD')
				let timeday = []
				timeday.push(now)
				let newdisgarr = timeday.map((val) => {
					let tabledays = newdig.filter(item => {
						return moment(item.time).format('YYYY-MM-DD') == val
					})
					return tabledays
				})
				let objlist = newdisgarr[0].map(item => {
					let arrlist = []
					for(let key in item.diadata){
						arrlist.push(item.diadata[key])
					}
					return arrlist
				})
				//境外输入
				let Abroad = await new Tablelist(objlist,0,newdig,newcure,newdeath,'境外输入').table()
				this.datas.push(Abroad)
				let Nanjing = await new Tablelist(objlist,1,newdig,newcure,newdeath,'南京').table()
				this.datas.push(Nanjing)
				let Wuxi = await new Tablelist(objlist,2,newdig,newcure,newdeath,'无锡').table()
				this.datas.push(Wuxi)
				let Xuzhou = await new Tablelist(objlist,3,newdig,newcure,newdeath,'徐州').table()
				this.datas.push(Xuzhou)
				let Changzhou = await new Tablelist(objlist,4,newdig,newcure,newdeath,'常州').table()
				this.datas.push(Changzhou)
				let Suzhou = await new Tablelist(objlist,5,newdig,newcure,newdeath,'苏州').table()
				this.datas.push(Suzhou)
				let Nantong = await new Tablelist(objlist,6,newdig,newcure,newdeath,'南通').table()
				this.datas.push(Nantong)
				let Lianyungang = await new Tablelist(objlist,7,newdig,newcure,newdeath,'连云港').table()
				this.datas.push(Lianyungang)
				let Huaian = await new Tablelist(objlist,8,newdig,newcure,newdeath,'淮安').table()
				this.datas.push(Huaian)
				let Yancheng = await new Tablelist(objlist,9,newdig,newcure,newdeath,'盐城').table()
				this.datas.push(Yancheng)
				let Yangzhou = await new Tablelist(objlist,10,newdig,newcure,newdeath,'扬州').table()
				this.datas.push(Yangzhou)
				let Zhenjiang = await new Tablelist(objlist,11,newdig,newcure,newdeath,'镇江').table()
				this.datas.push(Zhenjiang)
				let Taizhou = await new Tablelist(objlist,12,newdig,newcure,newdeath,'泰州').table()
				this.datas.push(Taizhou)
			}
		}
	}
</script>

<style scoped>
	.myCharts{
		width:100%;
	}
	.Dizhou{
		font-size:30upx;
		font-weight: bold;
	}
	.tips{
		font-size: 25upx;
		height:50upx;
		line-height:50upx;
		color:#737373;
	}
	.table-cont{
		display: flex;
		height:70upx;
		align-items: center;
		justify-content: space-between;
		font-size: 25upx;
	}
	.table-cont text{
		height:70upx;
		line-height: 70upx;
		text-align: center;
		border-right:1px solid white;
	}
	.table-cont text:nth-child(1){
		background: #f2f5f7;
		text-align: left;
		flex:2;
		padding-left:10upx;
	}
	.table-cont text:nth-child(2){
		background: #e8effc;
		color:#005dff;
		flex:1;
	}
	.table-cont text:nth-child(3){
		background: #fdeeee;
		color:#f55253;
		flex:1;
	}
	.table-cont text:nth-child(4){
		background: #e9f7ec;
		color:#178b50;
		flex:1;
	}
	.table-cont text:nth-child(5){
		background: #f2f2f2;
		color:#66666c;
		flex:1;
		border-right: 0;
	}
	.table-datas text{
		display:block;
		height:70upx;
		line-height: 70upx;
		text-align: center;
	}
	.table-datas{
		font-size: 27upx;
		display: flex;
		height:70upx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 0.5rpx solid #f2f2f2;
	}
	.table-datas text:nth-child(1){
		text-align: left;
		flex:2;
		padding-left:10upx;
	}
	.table-datas text:nth-child(2){
		flex:1;
	}
	.table-datas text:nth-child(3){
		flex:1;
	}
	.table-datas text:nth-child(4){
		flex:1;
	}
	.table-datas text:nth-child(5){
		flex:1;
	}
</style>
