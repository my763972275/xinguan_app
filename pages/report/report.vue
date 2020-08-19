<template>
	<view>
		<view v-if="display">
			<view class="report-cont" v-if="!isLogin">
				<!-- 基本信息 -->
				<view class="title">基本信息</view>
				<view class="information">
					<text>* 姓名</text>
					<input type="text" v-model="names" placeholder="你的姓名" placeholder-style="color:#bdbdc5" />
				</view>
				<view class="information">
					<text>*手机号</text>
					<input type="text" v-model="tel" placeholder="你的手机号" placeholder-style="color:#bdbdc5" />
				</view>
				<view class="information">
					<text>*身份证号码</text>
					<view class="discern-cont">
						<view class="discern-inpu"><input type="text" v-model="idCard" placeholder="你的身份证号" placeholder-style="color:#bdbdc5" /></view>
						<view class="discern-img" @click="IDCard"><image src="../../static/images/scan.png" mode="widthFix"></image></view>
					</view>
				</view>
				<view class="information">
					<text>*性别</text>
					<view class="discern-cont">
						<view class="discern-inpu"><input type="text" v-model="gender[index]" disabled placeholder="请选择你的性别" placeholder-style="color:#bdbdc5" /></view>
						<view class="discern-right">
							<picker :value="index" :range="gender" @change="bindPickerChange"><view class="uni-input">选择</view></picker>
						</view>
					</view>
				</view>
				<!-- 出生日期 -->
				<view class="information">
					<text>* 出生日期</text>
					<view class="discern-cont">
						<view class="discern-inpu"><input type="text" v-model="date" disabled placeholder="请选择出生日期" placeholder-style="color:#bdbdc5" /></view>
						<view class="discern-right">
							<picker :value="date" :start="startDate" :end="endDate" @change="bindDateChange" mode="date"><view class="uni-input">选择</view></picker>
						</view>
					</view>
				</view>
				<!-- 户籍所在地 -->
				<view class="information">
					<text>* 户籍所在地</text>
					<view class="discern-cont">
						<view class="discern-inpu"><input type="text" v-model="city" disabled placeholder="请选择户籍所在地" placeholder-style="color:#bdbdc5" /></view>
						<view class="discern-right">
							<picker :value="city" @change="bindcityChange" mode="region"><view class="uni-input">选择</view></picker>
						</view>
					</view>
				</view>
				<!-- 居住省市 -->
				<view class="information">
					<text>* 居住省/市</text>
					<view class="discern-cont">
						<view class="discern-inpu"><input type="text" v-model="province" disabled placeholder="请选择省/市" placeholder-style="color:#bdbdc5" /></view>
						<view class="discern-right">
							<picker :value="province" @change="provinceChange" mode="region"><view class="uni-input">选择</view></picker>
						</view>
					</view>
				</view>
				<!-- 详细地址 -->
				<view class="information">
					<text>* 详细地址</text>
					<input type="text" v-model="address" placeholder="请输入详细地址" placeholder-style="color:#bdbdc5" />
				</view>
				<!--  -->
				<view class="title distance">是否常居住在江苏</view>
				<view class="trip">
					<radio-group @change="radioChange">
						<label class="trip-cont" v-for="(item, index) in items" :key="item.value">
							<view><radio :value="item.value" :checked="index === current"></radio></view>
							<view>{{ item.name }}</view>
						</label>
					</radio-group>
				</view>
				<!-- 是否有如下状态 -->
				<view class="title distance">是否有如下状态</view>
				<view class="trip">
					<block v-for="(item, index) in state" :key="index">
						<view class="trip-flex" @click="radioBtn(index, item.value)">
							<view class="trip-listing">
								<image v-if="item.selection == 'hide'" src="../../static/images/unselected.png"></image>
								<image v-else src="../../static/images/selected.png"></image>
							</view>
							<view>{{ item.name }}</view>
						</view>
					</block>
				</view>
				<view class="Submit">
					<checkbox-group @change="btnChange">
						<label for="" class="trip-cont trip-bottom" v-for="item in Submitdata" :key="item.value">
							<view><checkbox class="check-sub" :value="item.value" :checked="item.checked"></checkbox></view>
							<view>{{ item.name }}</view>
						</label>
					</checkbox-group>
					<button class="Submit-button" @click="submit" :disabled="isDisabled == 0 ? true : false">提交</button>
				</view>
			</view>
			<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
			<view class="wx-button" v-if="isLogin"><button plain="true" open-type="getUserInfo" @getuserinfo="geUserInfo">去登陆</button></view>
		</view>
		<view class="tipsdata" v-if="already">
			<image mode="widthFix" src="../../static/images/success.png"></image>
			<text>{{ tipsdata }}</text>
		</view>
	</view>
</template>

<script>
import { check } from '../../config/check.js';
let Dbadd = require('../../config/dbbase.js');
// 处理图片上传的类
let Upload = require('../../config/upload.js')
let Errdatas = require('../../config/errdata.js')
import HMmessages from '@/components/HM-messages/HM-messages.vue';
export default {
	components: {
		HMmessages
	},
	data() {
		return {
			tipsdata: '上报成功',
			already: false,
			display: false,
			names: '',
			tel: '',
			idCard: '',
			gender: ['男', '女'], //性别
			index: -1,
			date: '',
			city: '',
			province: '',
			address: '',
			items: [
				{
					value: 1,
					name: '是,在江苏居住半年以上'
				},
				{
					value: 2,
					name: '否,我是临时来江苏的'
				}
			],
			current: -1,
			state: [
				{
					value: 1,
					name: '正常',
					selection: 'hide'
				},
				{
					value: 2,
					name: '发热37℃以下',
					selection: 'hide'
				},
				{
					value: 3,
					name: '发热37℃以上',
					selection: 'hide'
				},
				{
					value: 4,
					name: '干咳',
					selection: 'hide'
				},
				{
					value: 5,
					name: '乏力',
					selection: 'hide'
				}
			],
			sympotom: [],
			Submitdata: [
				{
					value: 1,
					name: '我已阅读本申报所列事项，并保证以上申报内容正确属实',
					checked: false
				}
			],
			isLogin: true,
			agree: [] //最终用户是否勾选同意
		};
	},
	created() {
		let setdata = wx.getStorageSync('usermen');
		if (!setdata) {
			// 没有用户信息
			this.display = true;
			this.isLogin = true;
		} else {
			// 有用户信息
			this.reported(setdata.openid);
		}
	},
	methods: {
		bindPickerChange(e) {
			//性别
			this.index = e.target.value;
		},
		bindDateChange(e) {
			//出生日期
			this.date = e.target.value;
		},
		bindcityChange(e) {
			//地址选择
			this.getAddress(e.detail.value, 1);
		},
		provinceChange(e) {
			//所在省选择
			this.getAddress(e.detail.value, 2);
		},
		// 户籍所在地和省市区公共方法
		getAddress(values, city) {
			var str = '';
			values.forEach(item => {
				str += item + ',';
			});
			// 去掉最后一个逗号
			if (str.length > 0) {
				if (city == 1) {
					this.city = str.substr(0, str.length - 1);
				} else {
					this.province = str.substr(0, str.length - 1);
				}
			}
		},
		// 是否常居住在江苏
		radioChange(e) {
			this.current = e.detail.value;
		},
		radioBtn(index, value) {
			if (value == 1) {
				this.$set(this.state[index], 'selection', 'show');
				this.$set(this.state[1], 'selection', 'hide');
				this.$set(this.state[2], 'selection', 'hide');
				this.$set(this.state[3], 'selection', 'hide');
				this.$set(this.state[4], 'selection', 'hide');
				return false;
			}
			if (value == 2) {
				this.$set(this.state[index], 'selection', 'show');
				this.$set(this.state[0], 'selection', 'hide');
				this.$set(this.state[2], 'selection', 'hide');
				return false;
			}
			if (value == 3) {
				this.$set(this.state[index], 'selection', 'show');
				this.$set(this.state[0], 'selection', 'hide');
				this.$set(this.state[1], 'selection', 'hide');
				return false;
			}
			if (value == 4 || value == 5) {
				this.$set(this.state[index], 'selection', 'show');
				this.$set(this.state[0], 'selection', 'hide');
				return false;
			}
		},
		stateSelect() {
			let findarr = this.state.filter(item => {
				return item.selection == 'show';
			});
			// console.log(findarr);
			this.sympotom = findarr.map(item => {
				return item.name;
			});
		},
		//用户是否勾选同意
		btnChange(e) {
			this.agree = e.detail.value;
		},
		//提交
		submit() {
			let obj = {
				names: this.names,
				tel: this.tel,
				idCard: this.idCard,
				gender: this.index,
				birth: this.date,
				city: this.city,
				province: this.province,
				address: this.address,
				lodge: this.current,
				sympotom: this.sympotom
			};
			// console.log(obj)
			//表单校验
			check(obj).then(res => {
				if (res == 'SUCCESS') {
					uni.showToast({
						text: '上传中',
						icon: 'loading',
						mask: true
					});
					//提交成功
					this.btnBase(obj);
				} else {
					let icon = 'danger';
					this.tips(res, icon);
				}
			});
		},
		// 提交数据到集合
		async btnBase(obj) {
			try {
				await new Dbadd('report', obj).pullAdd();
				uni.hideToast();
				this.already = true;
				this.display = false;
			} catch (e) {
				uni.hideToast();
				let icon = 'error';
				this.tips('提交失败', icon);
			}
		},
		// 提示
		tips(tip, icon) {
			// this.HMmessages.show(tip,{icon:icon,iconColor:"#fff",fontColor:"#fff",background:"rgba(255,0,0,0.8)"})
			this.HMmessages.show(tip, { icon: icon, iconColor: '#fff', fontColor: '#fff', background: 'rgba(255,0,0,0.8)' });
		},
		//登录
		async geUserInfo(e) {
			uni.showToast({
				title: '正在登录',
				icon: 'loading',
				mask: true
			});
			// 登录之前先查询之前是否登录过
			const names = e.detail.userInfo;
			try {
				let va = await new Dbadd('users').pullGet();
				if (va.data.length == 0) {
					// 没有登陆过
					this.query(names);
				} else {
					// 登陆过
					this.storage(va);
				}
			} catch (e) {
				uni.hideToast();
				this.tips('登录失败', 'danger');
			}
		},
		// 查询登录状态
		async query(names) {
			try {
				await new Dbadd('users', names).pullAdd();
				let va = await new Dbadd('users').pullGet();
				this.storage(va);
			} catch (e) {
				uni.hideToast();
				this.tips('登录失败', 'danger');
			}
		},
		// 拉取已登录的用户信息并存储到本地
		storage(va) {
			this.reported(va.data[0]._openid);
			let nameobj = {
				avatarUrl: va.data[0].avatarUrl,
				nickName: va.data[0].nickName,
				openid: va.data[0]._openid
			};
			uni.setStorageSync('usermen', nameobj);
		},
		// 查询该用户之前是否提交到疫情报告
		async reported(opi) {
			try {
				let obj = { _openid: opi };
				let useropenid = await new Dbadd('report').pullSelect(obj);
				if (useropenid.data.length == 0) {
					// 以前没有提交过
					this.isLogin = false;
					this.already = false;
					this.display = true;
				} else {
					// 以前提交过
					this.already = true;
					this.display = false;
				}
			} catch (e) {
				this.tips('服务器错误！', 'danger');
			}
		},
		//上传本低相册或拍照身份证照片
		async IDCard() {
			// 得到图片的临时连接地址
			let imgUrl = await new Upload().upLoadImg()
			uni.showToast({
				text:'识别中',
				icon:'loading',
				mask:true
			})
			let cloudImg = await new Upload().collectionImg(imgUrl)
			let httpImg = await new Upload().httpImg(cloudImg)
			try{
				let result = await new Upload().AIcloud(httpImg)
				uni.hideToast()
				this.idResult(result)
			}catch(e){
				uni.hideToast()
				throw new Errdatas().errlist()
			}
		},
		// 身份证识别的结果
		idResult(resu){
			let {IdNum,Name,Sex,Birth,Address} = resu.result
			this.names = Name;
			this.idCard = IdNum;
			this.date = Birth;
			this.address = Address;
			this.index = (Sex == '男' ? 0:1)
		}
	},
	computed: {
		radioSelected() {
			return this.stateSelect();
		},
		//提交按钮是否禁用
		isDisabled() {
			return this.agree.length;
		}
	}
};
</script>

<style scoped>
.report-cont {
	margin: 30upx 17upx;
}
.title {
	font-size: 35upx;
	font-weight: bold;
}
input {
	height: 70upx;
	padding-left: 20upx;
}
.information {
	font-size: 30rpx;
	margin: 20rpx 0;
	border-bottom: 1rpx solid #f1f1f1;
}
.discern-img image {
	width: 45rpx;
	height: 45rpx;
}
.discern-cont {
	display: flex;
	justify-content: space-between;
}
.discern-inpu {
	width: 100%;
}
.discern-Gender {
	display: flex;
	height: 70rpx;
	justify-content: space-between;
	align-items: center;
}
.discern-left {
	padding-left: 20upx;
}
.discern-right {
	color: #4d92e0;
	width: 100rpx;
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.distance {
	margin-top: 30rpx;
}
.trip {
	font-size: 30rpx;
}
.trip-cont {
	display: flex;
	align-items: center;
	border-bottom: 1rpx solid #f1f1f1;
	height: 100rpx;
}
.trip-flex {
	display: flex;
	align-items: center;
	height: 100rpx;
	border-bottom: 1rpx solid #f1f1f1;
}
.trip-listing {
	width: 50rpx;
	height: 50rpx;
	padding-right: 10rpx;
}
.trip-listing image {
	width: 50rpx;
	height: 50rpx;
}
.Submit {
	font-size: 20rpx;
}
.check-sub {
	transform: scale(0.8, 0.8);
}
.trip-bottom {
	border: none !important;
}
.Submit-button {
	background: #07c160;
	color: white;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	font-size: 30rpx;
	border-radius: 10rpx;
}
.disabled {
	background: #c0c0c0;
}
.wx-button button {
	border: none;
	font-size: 30rpx;
	background: #07c160;
	color: white;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 400rpx;
}
.wx-button {
	padding-top: 400rpx;
}
.tipsdata image {
	width: 140rpx;
	height: 140rpx;
	display: block;
	padding-bottom: 20rpx;
}
.tipsdata {
	font-size: 30rpx;
	width: 140rpx;
	margin: 0 auto;
	text-align: center;
	padding-top: 400rpx;
}
</style>
