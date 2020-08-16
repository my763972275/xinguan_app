//表格的数据
class Tablelist{
	//objlist:当天的新增确诊
	//num数组下标
	//diagnosis:确诊
	//curing:治愈
	//death:死亡
	//city:城市
	constructor(objlist,num,diagnosis,curing,death,city) {
	    this.objlist = objlist;
		this.num = num;
		this.diagnosis = diagnosis;
		this.curing = curing;
		this.city = city;
		this.death = death;
	}
	
	table(){
		return new Promise((resolve,reject) => {
			// 新增确诊
			let newlying = []
			this.objlist.forEach((item) => {
				newlying.push(item[this.num])
			})
			let newlydata = 0;
			newlying.forEach(item => {
				newlydata += item;
			})
			// 累积确诊求和
			let accumulate = this.diagnosis.map(item => {
				let arrlist =[]
				for(let key in item.diadata){
					arrlist.push(item.diadata[key])
				}
				return arrlist
			})
			let mulateing = []
			accumulate.forEach(item => {
				mulateing.push(item[this.num])
			})
			let mulatedata = 0;
			mulateing.forEach(item => {
				mulatedata += item
			})
			// 累积治愈求和
			let cureaccumulate = this.curing.map(item => {
				let arrlist =[]
				for(let key in item.diadata){
					arrlist.push(item.diadata[key])
				}
				return arrlist
			})
			let cureArr = []
			cureaccumulate.forEach(item => {
				cureArr.push(item[this.num])
			})
			let curedata = 0;
			cureArr.forEach(item => {
				curedata += item
			})
			// 累积死亡求和
			let deathaccumulate = this.death.map(item => {
				let arrlist =[]
				for(let key in item.diadata){
					arrlist.push(item.diadata[key])
				}
				return arrlist
			})
			let deathArr = []
			deathaccumulate.forEach(item => {
				deathArr.push(item[this.num])
			})
			let deathdata = 0;
			deathArr.forEach(item => {
				deathdata += item
			})
			
			//组成一个对象返回回去
			let tableobj = {
				'address':this.city,
				'newly':newlydata,
				'accumulate':mulatedata,
				'cure':curedata,
				'death':deathdata
			}
		    resolve(tableobj)
		})
	}
}

module.exports = Tablelist