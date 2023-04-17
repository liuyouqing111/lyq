class Schema {
	requied() {
		return (value, filed) => {
			if (!value || value === '') {
				throw new Error(`${filed}不能为空`)
			}
		}
	}
	srting() {
		return (value, filed) => {
			if (typeof value !== 'string') {
				throw new Error(`${filed}必须为字符`)
			}
		}
	}
	number() {
		return (value, filed) => {
			if (typeof value !== 'number') {
				throw new Error(`${filed}必须为数字`)
			}
		}
	}
	min(num) {
		return (value, filed) => {
			if (value.length < num) {
				throw new Error(`${filed}必须大于或等于${num}个字符`)
			}
		}
	}
	max(num) {
		return (value, filed) => {
			if (value.length > num) {
				throw new Error(`${filed}必须小于或等于${num}个字符`)
			}
		}
	}

	test(test) {
		return (value, filed) => {
			if (!test.test(value)) {
				throw new Error(`${filed}格式错误`)
			}
		}
	}
}

module.exports = new Schema()
