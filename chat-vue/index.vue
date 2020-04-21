new Vue({
	template: '<div>Hi {{ name }}'
})

new Vue({
		render(h) {
			return h('div', this.name)
		}
})
