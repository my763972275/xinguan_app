var card = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
var phone = /^1[3456789]\d{9}$/
let check = function(obj){
	let {
		names,
		tel,
		idCard,
		gender,
		birth,
		city,
		province,
		address,
		lodge,
		sympotom
	} = obj
	return new Promise((resolve,reject) => {
		//姓名
		if(names == ''){
			let tip = '请填写姓名！'
			resolve(tip)
			return false
		}
		//手机号码
		if(!phone.test(tel)){
			let tip = '请填写正确的手机号码！'
			resolve(tip)
			return false
		}
		//身份证号码
		if(!card.test(idCard)){
			let tip = '请填写正确的身份证号码！'
			resolve(tip)
			return false
		}
		//性别
		if(gender == -1){
			let tip = '请选择性别！'
			resolve(tip)
			return false
		}
		//出生日期
		if(birth == ''){
			let tip = '请选择出生日期！'
			resolve(tip)
			return false
		}
		//户籍
		if(city == ''){
			let tip = '请选择户籍所在地！'
			resolve(tip)
			return false
		}
		//居住省市
		if(province == ''){
			let tip = '请选择居住省市！'
			resolve(tip)
			return false
		}
		//居住省市
		if(address == ''){
			let tip = '请输入详细地址！'
			resolve(tip)
			return false
		}
		//
		if(lodge == -1){
			let tip = '请选择是否常居住江苏！'
			resolve(tip)
			return false
		}
		//
		if(sympotom == ''){
			let tip = '请选择出现症状！'
			resolve(tip)
			return false
		}
		let tip = 'SUCCESS'
		resolve(tip)
	})
}

export {check}