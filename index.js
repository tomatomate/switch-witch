const Observable = require('rxjs/Observable')
const $$ = selector => Array.prototype.slice.call(document.querySelectorAll(selector))
const product = (callback, array1, array2) => (
	array1.reduce((prev, data1) => (
		prev.concat(array2.map(data2 => callback(data1, data2)))
	), [])
)

class SwitchWitch {
	constructor(breakpoint) {
		this.breakpoint = breakpoint
	}
	isMobile() {
		return window.innerWidth < this.breakpoint
	}
	onLayoutChange(callback) {
		Observable.fromEvent(window, 'resize')
			.scan(acc => [ acc[1], this.isMobile() ], [ this.isMobile(), this.isMobile() ])
			.filter(acc => (acc[0] ? !acc[1] : acc[1]))
			.subscribe(acc => callback(acc[1]))
	}
}

module.exports = {
	SwitchWitch,
	switchImages: isMobile => {
		const suffixes = [ '_pc', '_sp' ]
		const extensions = [ 'jpg', 'jpeg', 'png', 'gif', 'tiff' ]
		const selectors =
			product((x, y) => (
				`img[src$='${x}.${y}']`
			), suffixes, extensions)
			.concat([ '[style^="background-image:"]' ])
		
		const suffix = isMobile ? '_sp' : '_pc'
		const resultElements = selectors
			.filter(selector => $$(selector).length !== 0)
			.map(selector => {
				const isImgTag = /^img/.test(selector)
				$$(selector).map(element => {
					const src = isImgTag
						? element.getAttribute('src')
						: element.getAttribute('style')
					
					const replacement = src.replace(/(_pc|_sp)\.(.+)$/, `${suffix}.$2`)

					return element.setAttribute(isImgTag ? 'src' : 'style', replacement)
				})
			})

		return resultElements
	}
}