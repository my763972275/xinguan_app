// 操作数据库的增删改查
const db = wx.cloud.database()

class Dbadd{
	constructor(collect){
		this.collect = collect
	}
	
	//get请求数据库
	pullGet(){
		return new Promise((resolve,reject)=>{
			const base = db.collection(this.collect)
			base.get()
			.then((res) => {
				resolve(res)
			})
			.catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = Dbadd