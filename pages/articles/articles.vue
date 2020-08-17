<template>
	<view>
		<view class="news-cont">
			<view class="news-title">{{newscontent[0].titles}}</view>
			<view class="news-author">
				<view class="news-views">
					<text>{{newscontent[0].authors}}</text>
					<text>{{newscontent[0].times}}</text>
				</view>
			</view>
			<view class="news-article">
				<rich-text :nodes="newscontent[0].content"></rich-text>
			</view>
		</view>
		<!-- <home-load v-if="loading"></home-load> -->
	</view>
</template>

<script>
	let Dbadd = require('../../config/dbbase.js')
	export default {
		data() {
			return {
				newscontent:[]
			}
		},
		// 接收上一个页面跳转携带的值
		onLoad(e) {
			this.newsFun(e.articleId)
		},
		methods: {
			async newsFun(id){
				let obj = {articleId:id}
				let newscontent = await new Dbadd('article').pullSelect(obj)
				this.newscontent = newscontent.data
			}
		}
	}
</script>

<style scoped>
.news-cont{
	margin:30upx 15upx 120upx 15upx;
}
.news-title{
	font-size:40upx;
}
.news-author text{
	display:block;
	font-size: 29upx;
}
.news-author image{
	width:58upx;
	height:60upx;
}
.news-author{
	display:flex;
	align-items: center;
	justify-content: space-between;
	height:80upx;
}
.news-views{
	display: flex;
	align-items: center;
}
.news-author text:nth-child(1){
	color:#576b95;
	padding-right:20upx;
}
.news-author text:nth-child(2){
	color:rgba(0,0,0,0.3)
}
.news-article{
	padding-top: 50upx;
}
</style>
