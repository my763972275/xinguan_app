// 计算确诊 || 治愈 || 死亡总人数
class theSum {
	constructor(val) {
	    this.value = val
	}
	
	//uniapp类里的静态方法不生效:static
	Total(){
		return new Promise((resolve,reject) =>{
			//抽出diadata和时间重组一个数组
			let disgarr = this.value.map((item) => {
				let data = item.diadata
				let times = item.time
				return {data,times}
			})
			//取出value值
			let objlist = disgarr.map((item)=>{
				return Object.values(item.data)
			})
			//合并返回的value值为一个数组
			let arrlist = []
			objlist.forEach((item) =>{
				arrlist.push(...item)
			})
			//计算arrlist里的数字总和
			let numdata = 0;
			arrlist.forEach( item => {
				numdata += item
			})
			//取出上传时间
			let statime = disgarr.map((item) =>{
				let times = item.times
				return times
			})
			let result = {statime,numdata}
			resolve(result)
		})
	}
}

module.exports = theSum