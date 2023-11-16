/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/worker.js":
/*!***********************!*\
  !*** ./src/worker.js ***!
  \***********************/
/***/ (() => {

eval("self.onmessage = function (message) {\r\n    const arr = message.data;\r\n    const start = Date.now();\r\n    for (let i = 0; i < arr.length; i++) {\r\n      for (let j = 0; j < arr.length; j++) {\r\n        if (arr[j] > arr[j + 1]) {\r\n          let temp = arr[j];\r\n          arr[j] = arr[j + 1];\r\n          arr[j + 1] = temp;\r\n        }\r\n      }\r\n    }\r\n    const end = Date.now();\r\n    const time = end - start;\r\n    self.postMessage(time);\r\n  }\n\n//# sourceURL=webpack://ts-webpack/./src/worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/worker.js"]();
/******/ 	
/******/ })()
;