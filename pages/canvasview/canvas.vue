<template>
	<view>
		<!-- 画布 -->
		<view class="canvas-view" :class="[hideing === 0?'active':'hidden']">
			<canvas style="width:300px;height:520px;" canvas-id="firstCanvas"></canvas>
		</view>
		<!-- 保存按钮 -->
		<view class="preview" v-if="loading == false">
			<button plain="true" hover-class="none" @click="save">保存图片</button>
		</view>
		<view class="loading-view" v-if="loading">
			<view class="loading-flex">
				<view>正在为您请求最新数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				keepimg:'',
				loading:true,
				hidden:0
			}
		},
		onLoad(e) {
			let obj = JSON.parse(e.obj)
			this.canvasView(obj)
		},
		methods:{
			async canvasView(obj){
				// 创建canvas上下文
				var context = wx.createCanvasContext('firstCanvas')
				// 绘制一个背景图片
				await this.backImg(context)
				// 绘制标题文本
				await this.title(context)
				// 绘制白色背景
				await this.whiteBack(context)
				// 绘制统计截止日期
				await this.deadline(context,obj.statimes)
				// 绘制确诊治愈死亡
				await this.statics(context,obj)
				// 绘制地图
				await this.mapImg(context)
				// 绘制二维码图片
				await this.qrCode(context)
				context.draw(true,setTimeout(() => {
					this.showImg()
				},1500));
			},
			//绘制背景图片
			backImg(context){
				return new Promise((resolve,reject) =>{
					context.drawImage('/static/images/brodcasterbg.png',0,0,300,520)
					resolve('SUCCESS')
				})
			},
			//绘制标题文本
			title(context){
				return new Promise((resolve,reject) => {
					let str = '江苏疫情实时播报'
					context.setFillStyle('rgb(255,255,255)')
					context.setFontSize('20')
					context.fillText(str,(300 - context.measureText(str).width) /2,50)
					
					resolve('SUCCESS')
				})
			},
			//绘制白色背景
			whiteBack(context){
				return new Promise((resolve,reject) => {
					context.rect(25,80,250,310)
					context.setFillStyle('rgb(255,255,255)')
					context.fill()
					resolve('SUCCESS')
				})
			},
			deadline(context,statimes){
				return new Promise((resolve,reject) => {
					let string = `统计截止日期:${statimes}`
					context.setFillStyle('rgb(102,0,0)')
					context.setFontSize('12')
					context.fillText(string,30,100)
					
					resolve('SUCCESS')
				}) 
			},
			statics(context,obj){
				return new Promise((resolve,reject) =>{
					let dianum = obj.dia
					let diatext = '累积确诊'
					let curenum = obj.cure
					let curetext = '累积治愈'
					let deathnum = obj.death
					let deathtext = '累积死亡'
					context.setFillStyle('rgb(255,140,26)')
					context.setFontSize('14')
					let diawidth = context.measureText(diatext).width
					let dianumwidth = context.measureText(dianum).width
					let curewidth = context.measureText(curenum).width
					let deathwidth = context.measureText(deathnum).width
					//纯文本
					context.fillText(diatext,30,160)
					context.fillText(curetext,122,160)
					context.fillText(deathtext,214,160)
					context.fillText(dianum,(diawidth - dianumwidth)/2+30,140)
					context.fillText(curenum,(diawidth - curewidth)/2+122,140)
					context.fillText(deathnum,(diawidth - deathwidth)/2+214,140)
					resolve('SUCCESS')
				})
			},
			mapImg(context){
				return new Promise((resolve,reject) => {
					context.drawImage('/static/images/map.png',25,170,250,210)
					resolve('SUCCESS')
				})
			},
			qrCode(context){
				return new Promise((resolve,reject) => {
					context.drawImage('/static/images/code.png',10,450,50,50)
					resolve('SUCCESS')
				})
			},
			//导出canvas画布生成的图片
			showImg(){
				wx.canvasToTempFilePath({
					canvasId:'firstCanvas',
					success:(res) =>{
						this.keepimg = res.tempFilePath
						this.loading = false;
						this.hidden = 1;
					},
					fail:(err) => {
						console.log('绘制失败！')
						console.log(err)
					}
						
				})
			},
			//保存图片按钮
			save(){
				wx.saveImageToPhotosAlbum({
					filePath:this.keepimg,
					success:(res) =>{
						console.log('保存成功')
						wx.showToast({
							title:'保存成功',
							icon:'none',
							duration:1500
						})
					},
					fail:(err) => {
						console.log('保存失败！')
						wx.showModal({
							content:'点击右上角设置里允许保存',
							showCancel:false,
							confirmText:'我知道了',
							success:(res) => {
								console.log('ok')
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	page{
		background:#f6f6f6;
	}
	.canvas-view{
		width:300px;
		height:520px;
		margin:20rpx auto 0 auto;
	}
	.preview button{
		border:none !important;
		color:white;
		font-size:30upx;
		background:#0036d6;
		width:300upx;
		height:70upx;
		line-height:70upx;
	}
	.preview{
		display:flex;
		justify-content: space-between;
		padding-top:20upx;
	}
	.loading-view{
		position:fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		z-index:9999;
		overflow: hidden;
		background: #f5f5f5;
	}
	.loading-flex{
		display: flex;
		align-items: center;
		justify-content: center;
		width:100%;
		height:100%;
		font-size:26upx;
	}
	.active{
		position:fixed;
		left:-1000upx;
		top:0;
	}
	.hidden{
		display:block;
	}
</style>
