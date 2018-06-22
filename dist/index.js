"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchImages = switchImages;
exports.switchCase = switchCase;
exports.capture = capture;
exports.SwitchWitch = void 0;

var _fromEvent = require("rxjs/observable/fromEvent");

var _operators = require("rxjs/operators");

function $$(selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector));
}

function cartesianProduct(callback, a, b) {
  return a.reduce((acc, v1) => acc.concat(b.map(v2 => callback(v1, v2))), []);
}

class SwitchWitch {
  constructor(breakpoint) {
    Object.defineProperty(this, "_breakpoint", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    this._breakpoint = breakpoint;
  }

  isMobile() {
    return window.innerWidth < this._breakpoint;
  }

  onLayoutChange(callback) {
    (0, _fromEvent.fromEvent)(window, 'resize').pipe((0, _operators.scan)(acc => [acc[1], this.isMobile()], [this.isMobile(), this.isMobile()]), (0, _operators.filter)(acc => acc[0] ? !acc[1] : acc[1])).subscribe(acc => callback(acc[1]));
  }

}

exports.SwitchWitch = SwitchWitch;

function switchImages(isMobile) {
  const selectors = cartesianProduct((suffix, extension) => `img[src$='${suffix}.${extension}']`, ['_pc', '_sp'], ['jpg', 'jpeg', 'png', 'gif', 'tiff']).concat(['[style^="background-image:"]']);
  selectors.filter(selector => $$(selector).length !== 0).map(selector => {
    const isImgTag = /^img/.test(selector);
    return $$(selector).map(element => {
      const src = isImgTag ? element.getAttribute('src') || '' : element.getAttribute('style') || '';
      const currentSuffix = isMobile ? '_sp' : '_pc';
      const replacement = src.replace(/(_pc|_sp)\.(.+)$/, `${currentSuffix}.$2`);
      return element.setAttribute(isImgTag ? 'src' : 'style', replacement);
    });
  });
}

function switchCase(cases, expression) {
  const filtered = cases.filter(([comparator]) => comparator(expression));
  return filtered.length ? filtered[0][1] : false;
}

function capture(x, callback = x => x) {
  console.log(x);
  callback(x);
  return x;
}