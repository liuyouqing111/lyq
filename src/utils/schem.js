class Schema {
	requied() {
		return (w, filed, ctx) => {
			console.log(w, filed)
			if (!ctx.request[w][filed] || ctx.request[w][filed] === '') {
				throw new Error(`${filed}不能为空`)
			}
		}
	}
	min(num) {
		return (w, filed, ctx) => {
			if (ctx.request[w][filed].length < num) {
				throw new Error(`${filed}必须大于或等于${num}个字符`)
			}
		}
	}
	max(num) {
		return (w, filed, ctx) => {
			if (ctx.request[w][filed].length > num) {
				throw new Error(`${filed}必须小于或等于${num}个字符`)
			}
		}
	}

	test(zz) {
		return (w, filed, ctx) => {
			if (!zz.test(ctx.request[w][filed])) {
				throw new Error(`${filed}格式错误`)
			}
		}
	}
}

module.exports = new Schema()
