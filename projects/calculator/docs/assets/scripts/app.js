/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Calculator = __webpack_require__(1);

var _Calculator2 = _interopRequireDefault(_Calculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Calculator2.default();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calculator = function () {
    function Calculator() {
        _classCallCheck(this, Calculator);

        this.screen = document.getElementById('screen-content');
        this.btnContainer = document.getElementById('main-btns');
        this.currentExpression = '';
        this.history = [];
        this.events();
    }

    _createClass(Calculator, [{
        key: 'events',
        value: function events() {
            var _this = this;

            this.btnContainer.addEventListener('click', function (event) {
                _this.handleInput(event.target.value);
            });
        }
    }, {
        key: 'handleInput',
        value: function handleInput(value) {
            switch (value) {
                case 'c':
                    this.clear();
                    break;
                case 'ce':
                    this.clearEntry();
                    break;
                case '=':
                    this.evaluateExpression();
                    break;
                default:
                    this.buildExpression(value);
                    break;
            }
        }
    }, {
        key: 'buildExpression',
        value: function buildExpression(value) {
            // the value being stored in the expression string is a symbol add spaces on either side
            //  formatting for readability and maintaining the ability to eval the string
            if (!/\d|[.]/.test(value)) {
                this.currentExpression += ' ' + value + ' ';
            } else {
                this.currentExpression += value;
            }
            // call the update screen function as we build the expression to give user feedback
            this.updateScreen(this.currentExpression);
        }
    }, {
        key: 'evaluateExpression',
        value: function evaluateExpression() {
            // evalute the string to find the answer to the equation
            var answer = eval(this.currentExpression);
            // pass the value to show answer so we can display the final equation on the front-end
            this.showAnser(answer);
            // set the current expression to the answer to allow for further mathematical manipulation of the resulting value
            this.setExpression(answer);
        }
    }, {
        key: 'setExpression',
        value: function setExpression() {
            var answer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this.currentExpression = answer;
        }
    }, {
        key: 'updateScreen',
        value: function updateScreen() {
            var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentExpression;

            // set the text content of the calculator's screen
            this.screen.textContent = input;
        }
    }, {
        key: 'showAnser',
        value: function showAnser(value) {
            // create a formatted version of the answer, if the there are more than 6 decimal places round down
            var formatted = value.toString().length > 7 ? value.toFixed(6) : value;
            // display answer with equals sign on front-end
            this.screen.textContent += ' = ' + formatted;
            // set history to store the final value and expression to allow for hisotry log
            this.setHistory(formatted);
        }
    }, {
        key: 'setHistory',
        value: function setHistory() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            var history = {
                expression: this.currentExpression += ' = ' + value,
                value: value
            };
            // store the current value and expression in case we want to go back to it via clear entry
            this.history.push(history);
            console.log(this.history);
        }
    }, {
        key: 'clear',
        value: function clear() {
            // clear the text content of teh screen and the values stored int eh current expression
            this.screen.textContent = '';
            this.setExpression();
        }
    }, {
        key: 'clearEntry',
        value: function clearEntry() {
            // if we have more than 1 number 
            if (this.currentExpression.length > 1) {
                var expression = this.currentExpression;
                // find the last number or symbol surrounded by spaces
                var i = expression.search(/\d{1}$| \W $/g);
                //  and cut it off our current expression
                this.currentExpression = expression.slice(0, i);
                this.updateScreen();
                // otherwise we have 1 number and can simply clear it
            } else {
                this.currentExpression = '';
                this.updateScreen();
            }
        }
    }]);

    return Calculator;
}();

exports.default = Calculator;

/***/ })
/******/ ]);