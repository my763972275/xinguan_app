// 处理上传图片
class Upload{
	constructor(arg='1') {
	    this.arg = arg
	}
	
	// 上传本地相册的图片
	upLoadImg(){
		return new Promise((resolve,reject) => {
			wx.chooseImage({
				count:1,
				sizeType:['original','compressed'],
				sourceType:['album','camera'],
				success:(res) => {
					// const tempFilePaths = res.tempFilePaths
					resolve(res.tempFilePaths[0])
				},
				fail:(err) => {
					reject(err)
				}
		    })
		})
	}
	
	// 上传图片到云存储
	collectionImg(img){
		return new Promise((resolve,reject) => {
			// 为防止同名文件产生覆盖，更改图片命名
			const index = img.lastIndexOf('.');
			const imgUrl = img.slice(index)
			// 时间戳、随机数
			const cloudPath = `${Date.now()}-${Math.floor(Math.random(0,1)*10000000)}${imgUrl}`
			wx.cloud.uploadFile({
				cloudPath:'AIimg/' + cloudPath,
				filePath:img,
			}).then(res => {
				resolve(res.fileID)
			}).catch(error => {
				reject(error)
			})
		})
	}
	
	// 换取https的图片地址
	httpImg(fid){
		return new Promise((resolve,reject) => {
			wx.cloud.getTempFileURL({
				fileList:[{
					fileID:fid
				}]
			}).then(res => {
				resolve(res.fileList[0].tempFileURL)
			}).catch(error => {
				reject(error)
			})
		})
	}
	
	// 调用身份证识别的云函数
	AIcloud(cloudimg){
		return new Promise((resolve,reject) => {
			wx.cloud.callFunction({
				name:'xinguan-card',
				data:{cardurl:cloudimg},
			}).then(res => {
				resolve(res)
				// console.log(res)
			}).catch(error => {
				reject(error)
			})
		})
	}
}

module.exports = Upload