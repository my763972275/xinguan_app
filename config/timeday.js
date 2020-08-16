//计算最晚的时间
let moment = require('../node_modules/_moment@2.27.0@moment')
moment.locale('zh-cn')
let timeDay = function(arrtimes){
	let dayarr = arrtimes.map((item)=>{
		return new Date(item).getTime()
	})
	let iMin = Math.max(...dayarr)
	let day = moment(iMin).format('YYYY-MM-DD HH:mm:ss')
	return day
}
export {timeDay}