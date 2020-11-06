/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["TourGuide"] = factory();
	else
		root["TourGuide"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tourguide.scss":
/*!****************************!*\
  !*** ./src/tourguide.scss ***!
  \****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://TourGuide/./src/tourguide.scss?");

/***/ }),

/***/ "./src/tourguide.ts":
/*!**************************!*\
  !*** ./src/tourguide.ts ***!
  \**************************/
/*! namespace exports */
/*! export TourGuide [provided] [used in main] [usage prevents renaming] */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TourGuide\": () => /* binding */ TourGuide,\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _tourguide_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tourguide.scss */ \"./src/tourguide.scss\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n/**\nTourGuide: a highlighting/instructions plugin for JS.\nDeveloped by Alvaro Montoro. More info: https://github.com/alvaromontoro/TourGuide\n**/\n\nvar TourGuide = /** @class */ (function () {\n    function TourGuide(options) {\n        var _this = this;\n        var _a;\n        this.defaultOptions = {\n            color: 'rgba(0,0,0,0.4)',\n            current: 0,\n            frame: null,\n            init: '',\n            initTrigger: false,\n            next: true,\n            nextText: 'Next',\n            previous: true,\n            previousText: 'Previous',\n            nextButton: null,\n            previousButton: null,\n            shape: 'round',\n            skip: true,\n            skipText: 'Skip presentation',\n            spot: null,\n            steps: [],\n            text: null,\n            textContent: null,\n            timer: 0\n        };\n        this.hideSpotlight = function () {\n            _this.options.frame.style.display = 'none';\n            var body = document.querySelector('body');\n            body.classList.remove('hideScrollY');\n        };\n        this.showSpotlight = function () {\n            var body = document.querySelector('body');\n            _this.options.frame.style.display = 'block';\n            body.classList.add('hideScrollY');\n        };\n        /** start with the first step of the instructions */\n        this.start = function () {\n            if (_this.hasSteps()) {\n                _this.showSpotlight();\n                _this.goToFirstStep();\n            }\n        };\n        /** end the instructions: hide everything */\n        this.stop = function () {\n            _this.hideSpotlight();\n        };\n        /** go to the specified step in the instructions */\n        this.goToStep = function (step) {\n            var _a;\n            if (_this.hasSteps()) {\n                if (!isNaN(step) && step > -1 && step < ((_a = _this.options.steps) === null || _a === void 0 ? void 0 : _a.length)) {\n                    _this.options.spot.classList.remove('spjs-step-' + _this.options.current, 'spjs-step-square', 'spjs-step-round');\n                    _this.options.current = step;\n                    var el = document.querySelector(_this.options.steps[step].selector);\n                    if (el) {\n                        var elRect = el.getBoundingClientRect();\n                        _this.options.spot.style.width = elRect.width + 20 + 'px';\n                        _this.options.spot.style.height = elRect.height + 20 + 'px';\n                        _this.options.spot.style.top = elRect.top + elRect.height / 2 + 'px';\n                        _this.options.spot.style.left = elRect.left + elRect.width / 2 + 'px';\n                        _this.options.spot.classList.add('spjs-step-' + step); // to allow user styling specific to each step\n                        _this.options.textContent = _this.options.steps[step].text;\n                        if (_this.options.previousButton) {\n                            _this.options.previousButton.style.display =\n                                _this.options.current == 0 ? 'none' : 'inline-block';\n                        }\n                        if (_this.options.steps[step].shape) {\n                            _this.options.spot.classList.add('spjs-step-' + _this.options.steps[step].shape);\n                        }\n                    }\n                }\n            }\n        };\n        /** go to the first step of the instructions */\n        this.goToFirstStep = function () {\n            _this.goToStep(0);\n        };\n        /** go to the next step of the instructions */\n        this.goToNextStep = function () {\n            if (_this.options.current == _this.options.steps.length - 1) {\n                _this.stop();\n            }\n            if (_this.options.current < _this.options.steps.length) {\n                _this.goToStep(_this.options.current + 1);\n            }\n        };\n        /** go to the next step of the instructions */\n        this.goToPreviousStep = function () {\n            if (_this.options.current > 0) {\n                _this.goToStep(_this.options.current - 1);\n            }\n        };\n        /** indicates if the instructions have any steps to show (as a whole) */\n        this.hasSteps = function () { return _this.options.init != '' && _this.options.steps.length > 0; };\n        /** returns the identifier of the current element */\n        this.getCurrentElementSelector = function () { return _this.options.steps[_this.options.current].selector; };\n        /** returns the currently highlighted element */\n        this.getCurrentElement = function () { return document.querySelector(_this.getCurrentElementSelector()); };\n        /** returns the text of the currently highlighted element */\n        this.getText = function () { return _this.options.steps[_this.options.current].text; };\n        /** returns the current step */\n        this.getStep = function () { return _this.options.current + 1; };\n        /** returns the total number of steps */\n        this.getTotalSteps = function () { return _this.options.steps.length; };\n        this.options = __assign(__assign({}, this.defaultOptions), options);\n        // create a list of selectors for the elements to get the spotlight (if none exists yet)\n        if (this.options.init !== '' && !this.hasSteps()) {\n            var element = this.options.init;\n            while (element) {\n                var elementObj = document.querySelector(element);\n                if (elementObj instanceof HTMLElement) {\n                    (_a = this.options.steps) === null || _a === void 0 ? void 0 : _a.push({\n                        selector: element,\n                        shape: elementObj.dataset.spShape || '',\n                        text: elementObj.dataset.spText || ''\n                    });\n                    element = elementObj.dataset.spNext;\n                }\n            }\n        }\n        // remove html structure if already existing\n        var oldSpInst = document.querySelector('#spjs-frame');\n        if (oldSpInst) {\n            document.querySelector('body').removeChild(oldSpInst);\n        }\n        // create the html structure needed for the spotlight\n        var spInst = document.createElement('div');\n        spInst.id = 'spjs-frame';\n        var spSpot = document.createElement('div');\n        spSpot.id = 'spjs-spot';\n        spSpot.classList.add('spjs-' + this.options.shape);\n        spSpot.style.color = this.options.color;\n        var spText = document.createElement('div');\n        spText.id = 'spjs-text';\n        var spTextContent = document.createElement('span');\n        spTextContent.id = 'spjs-textContent';\n        spText.appendChild(spTextContent);\n        if (this.options.skip) {\n            var spSkip = document.createElement('span');\n            spSkip.innerHTML = this.options.skipText;\n            spSkip.id = 'spjs-skip';\n            spSkip.addEventListener('click', this.stop);\n            spInst.appendChild(spSkip);\n        }\n        if (this.options.previous) {\n            var spPrev = document.createElement('button');\n            spPrev.innerHTML = this.options.previousText;\n            spPrev.addEventListener('click', this.goToPreviousStep);\n            spText.appendChild(spPrev);\n            this.options.previousButton = spPrev;\n        }\n        if (this.options.next) {\n            var spNext = document.createElement('button');\n            spNext.innerHTML = this.options.nextText;\n            spNext.addEventListener('click', this.goToNextStep);\n            spText.appendChild(spNext);\n            this.options.nextButton = spNext;\n        }\n        spSpot.appendChild(spText);\n        spInst.appendChild(spSpot);\n        document.querySelector('body').appendChild(spInst);\n        this.options.frame = spInst;\n        this.options.spot = spSpot;\n        this.options.text = spText;\n        this.options.textContent = spTextContent;\n        // if window is resized of scrolled, recalculate\n        var $this = this;\n        window.addEventListener('resize', function () {\n            $this.goToStep($this.options.current);\n        });\n        window.addEventListener('scroll', function () {\n            $this.goToStep($this.options.current);\n        });\n        // make the plugin initialize automatically on click of first element\n        if (this.options.initTrigger) {\n            document.querySelector(this.options.init).addEventListener('click', this.start);\n        }\n    }\n    return TourGuide;\n}());\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourGuide);\n\n\n//# sourceURL=webpack://TourGuide/./src/tourguide.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/tourguide.ts");
/******/ })()
.TourGuide;
});