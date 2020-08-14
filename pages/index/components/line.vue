<template>
	<view class="Dizhou-cont">
		<view class="Dizhou">江苏疫情新增趋势</view>
		<view class="myCharts">
			<canvas canvas-id="canvasLine" id="canvasLine" class="charts" @touchstart = "touchLine" @touchend="touchEndLine" style="width:700upx;height:500upx;"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	let linedata = require('config/data.json');
	var canvaLine = null;
	var lastMoveTime = null; //最后执行移动的时间戳
	export default{
		data(){
			return{
				cWidth: '',
				cHeight: '',
				pixelRatio: 1
			}
		},
		mounted() {
			this.cWidth=uni.upx2px(700);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods:{
			getServerData(){
				let lineDatas = linedata.data.lineA.chartData;
				let LineA = {categories:[],series:[]};
				LineA.categories = lineDatas.categories;
				LineA.series = lineDatas.series;
				//第二根线为虚线的设置
				LineA.series[1].lineType = 'dash';
				LineA.series[1].dashLength = 10;
				this.showLine('canvasLine',LineA)
			},
			showLine(canvasId,chartData){
				canvaLine=new uCharts({
					$this:this,
					canvasId: canvasId,
					type: 'line',
					colors:['#facc14','#f04864','#8543e0','#90ed7d'],
					fontSize:11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0
					},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:this.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#CCCCCC',
						gridType:'dash',
						dashLength:2,
						axisLine:false
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:2
						
					},
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					extra: {
						line:{
							type: 'straight',
							width:1
						}
					}
				});
			},
			touchLine(e){
				lastMoveTime = Date.now()
			},
			touchEndLine(e){
				canvaLine.touchLegend(e);
				canvaLine.showToolTip(e,{
					format:function(item,category){
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style scoped>
	.charts{
		width:700upx;
		height:500upx;
	}
	.myCharts{
		width:700upx;
		height:500upx;
	}
	.Dizhou-cont{
		margin:20upx 0;
	}
	.Dizhou{
		font-size: 30upx;
		font-weight: bold;
	}
</style>
