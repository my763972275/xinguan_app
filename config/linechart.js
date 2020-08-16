// 折线图的疫情数据
let moment = require('../node_modules/_moment@2.27.0@moment')
moment.locale('zh-cn')
class linechart{
	// catedays日期 newdiag 确诊 | 治愈 | 死亡 
	constructor(catedays,newdiag) {
	    this.catedays = catedays
		this.newdiag = newdiag
	}
	
	lineChartData(){
		return new Promise((resolve,reject) => {
			// 根据日期筛选当天的新增确诊 || 治愈 || 死亡的数据
			let mapdays = this.catedays.map(val => {
				let days = this.newdiag.filter(item => {
					return moment(item.time).format('MM-DD') == val
				})
				return days
			})
			let maparr = [0,1,2,3,4,5]
			let maplist = maparr.map(itemarr => {
				let disgarr = mapdays[itemarr].map(item => {
					return item.diadata
				})
				let arrlist = []
				disgarr.forEach(item => {
					for(let key in item){
						arrlist.push(item[key])
					}
				})
				let numdata = 0;
				arrlist.forEach(item => {
					numdata += item
				})
				return numdata
			})
			resolve(maplist)
		})
	}
}

module.exports = linechart