// @flow

const { SwitchWitch, switchCase } = require('../dist')

describe('SwitchWitch', () => {
	const breakpoint = 768
	const width = { pc: 1000, sp: 350 }
	const sww = new SwitchWitch(breakpoint)
	
	describe('isMobile()', () => {
		test('isMobile() === true', () => {
			window.innerWidth = width.pc
			expect(sww.isMobile()).toBeFalsy()
		})

		test('isMobile() === false', () => {
			window.innerWidth = width.sp
			expect(sww.isMobile()).toBeTruthy()
		})
	})

	describe('onLayoutChange()', () => {
		const getModifiedLayoutStatus = () => {
			return new Promise(resolve => {
				sww.onLayoutChange(isMobile => resolve(isMobile))
			})
		}
		const resizeWindow = (from, to, delay = 500) => {
			window.innerWidth = from
			setTimeout(() => {
				window.innerWidth = to
				window.dispatchEvent(new window.Event('resize'))
			}, delay)
		}

		test('PC -> SP', async () => {
			resizeWindow(width.pc, width.sp)
			const isMobile = await getModifiedLayoutStatus()
			expect(isMobile).toBeTruthy()
		})

		test('SP -> PC', async () => {
			resizeWindow(width.sp, width.pc)
			const isMobile = await getModifiedLayoutStatus()
			expect(isMobile).toBeFalsy()
		})
	})
})

describe('switchCase()', () => {
	test('example ', () =>  {
		const result = switchCase([
			[ x => x <= 10, 'x <= 10' ],
			[ x => x <= 50, 'x <= 50' ],
			[ x => x <= 100, 'x <= 100' ],
			[ _ => true, 'not match' ]
		], 100)
		expect(result).toBe('x <= 100')
	})
})