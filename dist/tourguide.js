(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TourGuide"] = factory();
	else
		root["TourGuide"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/tourguide.js":
/*!**************************!*\
  !*** ./src/tourguide.js ***!
  \**************************/
/*! exports provided: TourGuide, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TourGuide\", function() { return TourGuide; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\nTourGuide: a highlighting/instructions plugin for JS.\nDeveloped by Alvaro Montoro. More info: https://github.com/alvaromontoro/TourGuide\n**/\nvar TourGuide = function TourGuide(options) {\n  var _this = this;\n\n  _classCallCheck(this, TourGuide);\n\n  _defineProperty(this, \"hideSpotlight\", function () {\n    _this.frame.style.display = 'none';\n    var body = document.querySelector('body');\n    body.classList.remove('hideScrollY');\n  });\n\n  _defineProperty(this, \"showSpotlight\", function () {\n    var body = document.querySelector('body');\n    _this.frame.style.display = 'block';\n    body.classList.add('hideScrollY');\n  });\n\n  _defineProperty(this, \"start\", function () {\n    if (_this.hasSteps()) {\n      _this.showSpotlight();\n\n      _this.goToFirstStep();\n    }\n  });\n\n  _defineProperty(this, \"stop\", function () {\n    _this.hideSpotlight();\n  });\n\n  _defineProperty(this, \"goToStep\", function (step) {\n    if (_this.hasSteps()) {\n      if (!isNaN(step) && step > -1 && step < _this.steps.length) {\n        _this.spot.classList.remove('spjs-step-' + _this.current, 'spjs-step-square', 'spjs-step-round');\n\n        _this.current = step;\n        var el = document.querySelector(_this.steps[step].selector);\n\n        if (el) {\n          var elRect = el.getBoundingClientRect();\n          _this.spot.style.width = elRect.width + 20 + 'px';\n          _this.spot.style.height = elRect.height + 20 + 'px';\n          _this.spot.style.top = elRect.top + elRect.height / 2 + 'px';\n          _this.spot.style.left = elRect.left + elRect.width / 2 + 'px';\n\n          _this.spot.classList.add('spjs-step-' + step); // to allow user styling specific to each step\n\n\n          _this.textContent.textContent = _this.steps[step].text;\n          if (_this.previousButton) _this.previousButton.style.display = _this.current == 0 ? 'none' : 'inline-block';\n          if (_this.steps[step].shape) _this.spot.classList.add('spjs-step-' + _this.steps[step].shape);\n        }\n      }\n    }\n  });\n\n  _defineProperty(this, \"goToFirstStep\", function () {\n    _this.goToStep(0);\n  });\n\n  _defineProperty(this, \"goToNextStep\", function () {\n    if (_this.current == _this.steps.length - 1) {\n      _this.stop();\n    }\n\n    if (_this.current < _this.steps.length) {\n      _this.goToStep(_this.current + 1);\n    }\n  });\n\n  _defineProperty(this, \"goToPreviousStep\", function () {\n    if (_this.current > 0) {\n      _this.goToStep(_this.current - 1);\n    }\n  });\n\n  _defineProperty(this, \"hasSteps\", function () {\n    return _this.init != '' && _this.steps.length > 0;\n  });\n\n  _defineProperty(this, \"getCurrentElementSelector\", function () {\n    return _this.steps[_this.current].selector;\n  });\n\n  _defineProperty(this, \"getCurrentElement\", function () {\n    return document.querySelector(_this.getCurrentElementSelector());\n  });\n\n  _defineProperty(this, \"getText\", function () {\n    return _this.steps[_this.current].text;\n  });\n\n  _defineProperty(this, \"getStep\", function () {\n    return _this.current + 1;\n  });\n\n  _defineProperty(this, \"getTotalSteps\", function () {\n    return _this.steps.length + 1;\n  });\n\n  this.init = '';\n  this.shape = 'round';\n  this.color = 'rgba(0,0,0,0.4)';\n  this.skip = true;\n  this.skipText = 'Skip presentation';\n  this.previous = true;\n  this.previousText = 'Previous';\n  this.next = true;\n  this.nextText = 'Next';\n  this.timer = 0;\n  this.current = 0;\n  this.steps = [];\n  this.initTrigger = false;\n  this.frame = null;\n  this.spot = null;\n  this.text = null;\n  this.textContent = null;\n  this.previousButton = null;\n  this.nextButton = null; // extend the options that can be customized\n\n  if (options) {\n    if (options.init) {\n      this.init = options.init;\n    }\n\n    if (options.shape) {\n      this.shape = options.shape == 'square' ? 'square' : 'round';\n    }\n\n    if (options.hasOwnProperty('skip')) {\n      this.skip = options.skip == true;\n    }\n\n    if (options.hasOwnProperty('previous')) {\n      this.previous = options.previous == true;\n    }\n\n    if (options.hasOwnProperty('next')) {\n      this.next = options.next == true;\n    }\n\n    if (options.hasOwnProperty('initTrigger')) {\n      this.initTrigger = options.initTrigger == true;\n    }\n\n    if (options.skipText) {\n      this.skipText = options.skipText;\n    }\n\n    if (options.previousText) {\n      this.previousText = options.previousText;\n    }\n\n    if (options.nextText) {\n      this.nextText = options.nextText;\n    }\n\n    if (options.steps) {\n      this.steps = options.steps;\n    }\n\n    if (options.color) {\n      this.color = options.color;\n    }\n  } // create a list of selectors for the elements to get the spotlight (if none exists yet)\n\n\n  if (this.init != '' && !this.hasSteps()) {\n    var el = this.init;\n\n    while (el) {\n      var elObj = document.querySelector(el);\n      this.steps.push({\n        selector: el,\n        text: elObj.dataset.spText || '',\n        shape: elObj.dataset.spShape || ''\n      });\n      el = document.querySelector(el).dataset.spNext;\n    }\n  } // remove html structure if already existing\n\n\n  var oldSpInst = document.querySelector('#spjs-frame');\n\n  if (oldSpInst) {\n    document.querySelector('body').removeChild(oldSpInst);\n  } // create the html structure needed for the spotlight\n\n\n  var spInst = document.createElement('div');\n  spInst.id = 'spjs-frame';\n  var spSpot = document.createElement('div');\n  spSpot.id = 'spjs-spot';\n  spSpot.classList.add('spjs-' + this.shape);\n  spSpot.style.color = this.color;\n  var spText = document.createElement('div');\n  spText.id = 'spjs-text';\n  var spTextContent = document.createElement('span');\n  spTextContent.id = 'spjs-textContent';\n  spText.appendChild(spTextContent);\n\n  if (this.skip) {\n    var spSkip = document.createElement('span');\n    spSkip.innerHTML = this.skipText;\n    spSkip.id = 'spjs-skip';\n    spSkip.addEventListener('click', this.stop);\n    spInst.appendChild(spSkip);\n  }\n\n  if (this.previous) {\n    var spPrev = document.createElement('span');\n    spPrev.innerHTML = this.previousText;\n    spPrev.addEventListener('click', this.goToPreviousStep);\n    spText.appendChild(spPrev);\n    this.previousButton = spPrev;\n  }\n\n  if (this.next) {\n    var spNext = document.createElement('span');\n    spNext.innerHTML = this.nextText;\n    spNext.addEventListener('click', this.goToNextStep);\n    spText.appendChild(spNext);\n    this.nextButton = spNext;\n  }\n\n  spSpot.appendChild(spText);\n  spInst.appendChild(spSpot);\n  document.querySelector('body').appendChild(spInst);\n  this.frame = spInst;\n  this.spot = spSpot;\n  this.text = spText;\n  this.textContent = spTextContent; // if window is resized of scrolled, recalculate\n\n  var $this = this;\n  window.addEventListener('resize', function () {\n    $this.goToStep($this.current);\n  });\n  window.addEventListener('scroll', function () {\n    $this.goToStep($this.current);\n  }); // make the plugin initialize automatically on click of first element\n\n  if (this.initTrigger) {\n    document.querySelector(this.init).addEventListener('click', this.start);\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (TourGuide);\n\n//# sourceURL=webpack://TourGuide/./src/tourguide.js?");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./src/tourguide.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/tourguide.js */\"./src/tourguide.js\");\n\n\n//# sourceURL=webpack://TourGuide/multi_./src/tourguide.js?");

/***/ })

/******/ })["TourGuide"];
});