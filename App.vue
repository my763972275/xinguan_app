<script>
	export default {
		onLaunch: function() {
			if(!wx.cloud){
				console.log('微信版本太低，不能用云开发')
			}else{
				wx.cloud.init({
					env:'xinguan-7b04y',
					traceUser:true
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
