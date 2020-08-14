<template>
	<view class="Dizhou-cont">
		<view class="Dizhou">各州市确诊数</view>
		<view class="myCharts">
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart = "touchPie" style="width:650upx;height:700upx;"></canvas>
		</view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
let jiangsu = require('config/jiangsu.json');
var canvaMap = null;
export default {
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1
		};
	},
	mounted() {
		this.cWidth=uni.upx2px(650);
		this.cHeight=uni.upx2px(700);
		this.getServerData();
	},
	methods: {
		getServerData() {
			let cMap = jiangsu.features;
			this.showMap('canvasPie', cMap);
		},
		showMap(canvasId, chartData) {
			canvaMap=new uCharts({
			  $this:this,
			  canvasId: canvasId,
			  type: 'map',
			  fontSize:9,
			  padding:[10,10,10,10],
			  legend:{
			    show:false,
				position:'left',
				padding:2,
				itmGap:2,
				margin:1
			  },
			  background:'#FFFFFF',
			  pixelRatio:this.pixelRatio,
			  series: chartData,
			  dataLabel:true,
			  width: this.cWidth*this.pixelRatio,
			  height: this.cHeight*this.pixelRatio,
			  extra: {
			    map: {
			      border:true,
			      borderWidth:1,
			      borderColor:'#666666',
			      fillOpacity:0.6
			    }
			  }
			});
		},
		touchPie(e){
			canvaMap.showToolTip(e,{
				format:function(item){
					return item.properties.name + ': 确诊' + item.properties.subFeatureIndex
				}
			})
		}
	}
};
</script>

<style scoped>
.myCharts {
	width: 650upx;
	height: 700upx;
	margin: auto;
	overflow: hidden;
}
.charts {
	width: 650upx;
	height: 700upx;
}
.Dizhou-cont{
	margin:20upx 0;
}
.Dizhou{
	font-size:30upx;
	font-weight:bold;
}
</style>
