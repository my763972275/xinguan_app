<template>
	<view>
		<view class="report-cont">
			<!-- 基本信息 -->
			<view class="title">基本信息</view>
			<view class="information">
				<text>* 姓名</text>
				<input type="text" v-model="names" placeholder="你的姓名" placeholder-style="color:#bdbdc5">
			</view>
			<view class="information">
				<text>*手机号</text>
				<input type="text" v-model="tel" placeholder="你的手机号" placeholder-style="color:#bdbdc5">
			</view>
			<view class="information">
				<text>*身份证号码</text>
				<view class="discern-cont">
					<view class="discern-inpu">
						<input type="text" v-model="idCard" placeholder="你的身份证号" placeholder-style="color:#bdbdc5">
						</view>
					<view class="discern-img">
						<image src="../../static/images/scan.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="information">
				<text>*性别</text>
				<view class="discern-cont">
					<view class="discern-inpu">
						<input type="text" v-model="gender[index]" disabled placeholder="请选择你的性别" placeholder-style="color:#bdbdc5">
						</view>
					<view class="discern-right">
						<picker :value="index" :range="gender" @change="bindPickerChange">
							<view class="uni-input">选择</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- 出生日期 -->
			<view class="information">
				<text>*出生日期</text>
				<view class="discern-cont">
					<view class="discern-inpu">
						<input type="text" v-model="gender[index]" disabled placeholder="请选择出生日期" placeholder-style="color:#bdbdc5">
						</view>
					<view class="discern-right">
						<picker :value="date" :start="startDate" :end="endDate"  @change="bindDateChange" mode="date">
							<view class="uni-input">选择</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- 户籍所在地 -->
			<view class="information">
				<text>* 户籍所在地</text>
				<view class="discern-cont">
					<view class="discern-inpu">
						<input type="text" v-model="city" disabled placeholder="请选择户籍所在地" placeholder-style="color:#bdbdc5">
						</view>
					<view class="discern-right">
						<picker :value="city" @change="bindcityChange" mode="region">
							<view class="uni-input">选择</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- 居住省市 -->
			<view class="information">
				<text>* 居住省/市</text>
				<view class="discern-cont">
					<view class="discern-inpu">
						<input type="text" v-model="province" disabled placeholder="请选择省/市" placeholder-style="color:#bdbdc5">
						</view>
					<view class="discern-right">
						<picker :value="province" @change="provinceChange" mode="region">
							<view class="uni-input">选择</view>
						</picker>
					</view>
				</view>
			</view>
			<!-- 详细地址 -->
			<view class="information">
				<text>* 详细地址</text>
				<input type="text" v-model="address" placeholder="请输入详细地址" placeholder-style="color:#bdbdc5">
			</view>
			<!--  -->
			<view class="title distance">是否常居住在江苏</view>
			<view class="trip">
				<radio-group @change="radioChange">
					<label class="trip-cont" v-for="(item,index) in  items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current"></radio>
							
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				names:'',
				tel:'',
				idCard:'',
				gender:['男','女'],  //性别
				index:-1,
				date:'',
				city:'',
				province:'',
				address:'',
				items:[
					{
						value:1,
						name:'是,在江苏居住半年以上'
					},
					{
						value:2,
						name:'否,我是临时来江苏的'
					}
				],
				current:-1
			}
		},
		methods:{
			bindPickerChange(e){
				//性别
				this.index = e.target.value
				
			},
			bindDateChange(e){
				this.date = e.target.value
			},
			bindcityChange(e){
				this.getAddress(e.detail.value,1)
			},
			// 户籍所在地和省市区公共方法
			getAddress(values,city){
				var str = ''
				values.forEach(item => {
					str += item + ','
				})
				// 去掉最后一个逗号
				if(str.length > 0){
					if(city == 1){
						this.city = str.substr(0,str.length-1)
					}else{
						this.province = str.substr(0,str.length-1)
					}
				}
			},
			provinceChange(e){
				this.getAddress(e.detail.value,2)
			},
			radioChange(e){
				this.current = e.detail.value
			}
				
		}
	}
</script>

<style scoped>
.report-cont{
	margin:30upx 17upx;
}
.title{
	font-size:35upx;
	font-weight:bold;
}
input{
	height:70upx;
	padding-left:20upx;
}
.information{
	font-size:30rpx;
	margin:20rpx 0;
	border-bottom:1rpx solid #F1F1F1;
}
.discern-img image{
	width:45rpx;
	height:45rpx;
}
.discern-cont{
	display:flex;
	justify-content: space-between;
}
.discern-inpu{
	width:100%;
}
.discern-Gender{
	display:flex;
	height:70rpx;
	justify-content: space-between;
	align-items: center;
}
.discern-left{
	padding-left:20upx;
}
.discern-right{
	color:#4d92e0;
	width:100rpx;
	height:70rpx;
	display:flex;
	align-items: center;
	justify-content: flex-end;
}
.distance{
	margin-top:30rpx;
}
.trip{
	font-size:30rpx;
}
.trip-cont{
	display:flex;
	align-items: center;
	border-bottom:1rpx solid #F1F1F1;
	height:100rpx;
}
.trip-flex{
	display:flex;
	align-items: center;
	height:100rpx;
	border-bottom:1rpx solid #F1F1F1;
}
.trip-listing{
	width:50rpx;
	height:50rpx;
	padding-right:10rpx;
}
.trip-listing image{
	width:50rpx;
	height:50rpx;
}
.Submit{
	font-size:20rpx;
}
.check-sub{
	transform: scale(0.8,0.8);
}
.trip-bottom{
	border:none !important;
}
.Submit-button{
	background:#07c160;
	color:white;
	height:80rpx;
	line-height:80rpx;
	text-align: center;
	font-size:30rpx;
	border-radius:10rpx;
}
.wx-button button{
	border:none;
	font-size:30rpx;
	background:#07c160;
	color:white;
	display:flex;
	align-items: center;
	justify-content: center;
	width:400rpx;
}
.wx-button{
	padding-top:400rpx;
}
.tipsdata image{
	width:140rpx;
	height:140rpx;
	display:block;
	padding-bottom:20rpx;
}
.tipsdata{
	font-size:30rpx;
	width:140rpx;
	margin:0 auto;
	text-align: center;
	padding-top:400rpx;
}
</style>
