// @flow

import { fromEvent } from 'rxjs/observable/fromEvent'
import { scan, filter } from 'rxjs/operators'

function $$(selector: string): HTMLElement[] {
  return Array.prototype.slice.call(document.querySelectorAll(selector))
}

function cartesianProduct<T>(
  callback: (v1: T, v2: T) => T,
  a: T[],
  b: T[]
): T[] {
  return a.reduce((acc, v1) => (
    acc.concat(b.map(v2 => callback(v1, v2)))
  ), [])
}

export class SwitchWitch {
  _breakpoint: number
  
  constructor(breakpoint: number) {
    this._breakpoint = breakpoint
  }
  isMobile(): boolean {
    return window.innerWidth < this._breakpoint
  }
  onLayoutChange(callback: boolean => any): void {
    fromEvent(window, 'resize').pipe(
      scan(acc => [ acc[1], this.isMobile() ], [ this.isMobile(), this.isMobile() ]),
      filter(acc => (acc[0] ? !acc[1] : acc[1]))
    )
    .subscribe(acc => callback(acc[1]))
  }
}

export function switchImages(isMobile: boolean): void {
  const selectors = cartesianProduct(
      (suffix, extension) => `img[src$='${suffix}.${extension}']`,
      [ '_pc', '_sp' ],
      [ 'jpg', 'jpeg', 'png', 'gif', 'tiff' ]
    )
    .concat([ '[style^="background-image:"]' ])
  
  selectors
    .filter(selector => $$(selector).length !== 0)
    .map(selector => {
      const isImgTag = /^img/.test(selector)
      return $$(selector).map(element => {
        const src = isImgTag
          ? element.getAttribute('src') || ''
          : element.getAttribute('style') || ''
        
        const currentSuffix = isMobile ? '_sp' : '_pc'
        const replacement = src.replace(/(_pc|_sp)\.(.+)$/, `${currentSuffix}.$2`)

        return element.setAttribute(isImgTag ? 'src' : 'style', replacement)
      })
    })
}

export function switchCase<T, U>(
  cases: [
    [ T => boolean, U ]
  ],
  expression: T
): U | boolean {
  const filtered = cases
    .filter(([ comparator ]) => comparator(expression))
  return filtered.length ? filtered[0][1] : false
}

export function capture<T>(x: T, callback: (T => any) = x => x): T {
  console.log(x)
  callback(x)
  return x
}
