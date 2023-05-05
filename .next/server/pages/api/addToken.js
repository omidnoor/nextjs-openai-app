"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/addToken";
exports.ids = ["pages/api/addToken"];
exports.modules = {

/***/ "@auth0/nextjs-auth0":
/*!**************************************!*\
  !*** external "@auth0/nextjs-auth0" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "stripe":
/*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
/***/ ((module) => {

module.exports = import("stripe");;

/***/ }),

/***/ "(api)/./src/pages/api/addToken.js":
/*!***********************************!*\
  !*** ./src/pages/api/addToken.js ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth0/nextjs-auth0 */ \"@auth0/nextjs-auth0\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/db */ \"(api)/./utils/db.js\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! stripe */ \"stripe\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([stripe__WEBPACK_IMPORTED_MODULE_2__]);\nstripe__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst stripe = (0,stripe__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(process.env.STRIPE_SECRET_KEY);\nasync function handler(req, res) {\n    try {\n        const { user  } = await (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__.getSession)(req, res);\n        if (!user) {\n            return res.status(401).json({\n                message: \"Unauthorized\"\n            });\n        }\n        const lineItems = [\n            {\n                price: process.env.STRIPE_PRODUCT_PRICE_ID,\n                quantity: 1\n            }\n        ];\n        const protocol =  true ? \"http://\" : 0;\n        const host = req.headers.host;\n        const checkoutSession = await stripe.checkout.sessions.create({\n            payment_method_types: [\n                \"card\"\n            ],\n            line_items: lineItems,\n            mode: \"payment\",\n            success_url: `${protocol}${host}/success`,\n            cancel_url: `${protocol}${host}/success`,\n            payment_intent_data: {\n                metadata: {\n                    sub: user.sub\n                }\n            },\n            metadata: {\n                sub: user.sub\n            }\n        });\n        res.status(200).json({\n            session: checkoutSession\n        });\n    } catch (error) {\n        res.status(500).json({\n            message: error.message\n        });\n    } finally{\n        await (0,_utils_db__WEBPACK_IMPORTED_MODULE_1__.disconnectDb)();\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2FkZFRva2VuLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQWlEO0FBQ1c7QUFDNUI7QUFFaEMsTUFBTUksU0FBU0Qsa0RBQVVBLENBQUNFLFFBQVFDLEdBQUcsQ0FBQ0MsaUJBQWlCO0FBRXhDLGVBQWVDLFFBQVFDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQzlDLElBQUk7UUFDRixNQUFNLEVBQUVDLEtBQUksRUFBRSxHQUFHLE1BQU1YLCtEQUFVQSxDQUFDUyxLQUFLQztRQUN2QyxJQUFJLENBQUNDLE1BQU07WUFDVCxPQUFPRCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQWU7UUFDeEQsQ0FBQztRQUNELE1BQU1DLFlBQVk7WUFDaEI7Z0JBQ0VDLE9BQU9YLFFBQVFDLEdBQUcsQ0FBQ1csdUJBQXVCO2dCQUMxQ0MsVUFBVTtZQUNaO1NBQ0Q7UUFFRCxNQUFNQyxXQUNKZCxLQUFzQyxHQUFHLFlBQVksQ0FBVTtRQUVqRSxNQUFNZSxPQUFPWCxJQUFJWSxPQUFPLENBQUNELElBQUk7UUFFN0IsTUFBTUUsa0JBQWtCLE1BQU1sQixPQUFPbUIsUUFBUSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sQ0FBQztZQUM1REMsc0JBQXNCO2dCQUFDO2FBQU87WUFDOUJDLFlBQVlaO1lBQ1phLE1BQU07WUFDTkMsYUFBYSxDQUFDLEVBQUVWLFNBQVMsRUFBRUMsS0FBSyxRQUFRLENBQUM7WUFDekNVLFlBQVksQ0FBQyxFQUFFWCxTQUFTLEVBQUVDLEtBQUssUUFBUSxDQUFDO1lBQ3hDVyxxQkFBcUI7Z0JBQ25CQyxVQUFVO29CQUNSQyxLQUFLdEIsS0FBS3NCLEdBQUc7Z0JBQ2Y7WUFDRjtZQUNBRCxVQUFVO2dCQUNSQyxLQUFLdEIsS0FBS3NCLEdBQUc7WUFDZjtRQUNGO1FBRUF2QixJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVxQixTQUFTWjtRQUFnQjtJQUNsRCxFQUFFLE9BQU9hLE9BQU87UUFDZHpCLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsU0FBU3FCLE1BQU1yQixPQUFPO1FBQUM7SUFDaEQsU0FBVTtRQUNSLE1BQU1aLHVEQUFZQTtJQUNwQjtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXh0anMtb3BlbmFpLXN0YXJ0ZXIvLi9zcmMvcGFnZXMvYXBpL2FkZFRva2VuLmpzPzU5M2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2Vzc2lvbiB9IGZyb20gXCJAYXV0aDAvbmV4dGpzLWF1dGgwXCI7XHJcbmltcG9ydCB7IGNvbm5lY3REYiwgZGlzY29ubmVjdERiIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2RiXCI7XHJcbmltcG9ydCBzdHJpcGVJbml0IGZyb20gXCJzdHJpcGVcIjtcclxuXHJcbmNvbnN0IHN0cmlwZSA9IHN0cmlwZUluaXQocHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVkpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHVzZXIgfSA9IGF3YWl0IGdldFNlc3Npb24ocmVxLCByZXMpO1xyXG4gICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6IFwiVW5hdXRob3JpemVkXCIgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBsaW5lSXRlbXMgPSBbXHJcbiAgICAgIHtcclxuICAgICAgICBwcmljZTogcHJvY2Vzcy5lbnYuU1RSSVBFX1BST0RVQ1RfUFJJQ0VfSUQsXHJcbiAgICAgICAgcXVhbnRpdHk6IDEsXHJcbiAgICAgIH0sXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IHByb3RvY29sID1cclxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwiZGV2ZWxvcG1lbnRcIiA/IFwiaHR0cDovL1wiIDogXCJodHRwczovL1wiO1xyXG5cclxuICAgIGNvbnN0IGhvc3QgPSByZXEuaGVhZGVycy5ob3N0O1xyXG5cclxuICAgIGNvbnN0IGNoZWNrb3V0U2Vzc2lvbiA9IGF3YWl0IHN0cmlwZS5jaGVja291dC5zZXNzaW9ucy5jcmVhdGUoe1xyXG4gICAgICBwYXltZW50X21ldGhvZF90eXBlczogW1wiY2FyZFwiXSxcclxuICAgICAgbGluZV9pdGVtczogbGluZUl0ZW1zLFxyXG4gICAgICBtb2RlOiBcInBheW1lbnRcIixcclxuICAgICAgc3VjY2Vzc191cmw6IGAke3Byb3RvY29sfSR7aG9zdH0vc3VjY2Vzc2AsXHJcbiAgICAgIGNhbmNlbF91cmw6IGAke3Byb3RvY29sfSR7aG9zdH0vc3VjY2Vzc2AsXHJcbiAgICAgIHBheW1lbnRfaW50ZW50X2RhdGE6IHtcclxuICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgc3ViOiB1c2VyLnN1YixcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgIHN1YjogdXNlci5zdWIsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHNlc3Npb246IGNoZWNrb3V0U2Vzc2lvbiB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBhd2FpdCBkaXNjb25uZWN0RGIoKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbImdldFNlc3Npb24iLCJjb25uZWN0RGIiLCJkaXNjb25uZWN0RGIiLCJzdHJpcGVJbml0Iiwic3RyaXBlIiwicHJvY2VzcyIsImVudiIsIlNUUklQRV9TRUNSRVRfS0VZIiwiaGFuZGxlciIsInJlcSIsInJlcyIsInVzZXIiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImxpbmVJdGVtcyIsInByaWNlIiwiU1RSSVBFX1BST0RVQ1RfUFJJQ0VfSUQiLCJxdWFudGl0eSIsInByb3RvY29sIiwiaG9zdCIsImhlYWRlcnMiLCJjaGVja291dFNlc3Npb24iLCJjaGVja291dCIsInNlc3Npb25zIiwiY3JlYXRlIiwicGF5bWVudF9tZXRob2RfdHlwZXMiLCJsaW5lX2l0ZW1zIiwibW9kZSIsInN1Y2Nlc3NfdXJsIiwiY2FuY2VsX3VybCIsInBheW1lbnRfaW50ZW50X2RhdGEiLCJtZXRhZGF0YSIsInN1YiIsInNlc3Npb24iLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/addToken.js\n");

/***/ }),

/***/ "(api)/./utils/db.js":
/*!*********************!*\
  !*** ./utils/db.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"connectDb\": () => (/* binding */ connectDb),\n/* harmony export */   \"disconnectDb\": () => (/* binding */ disconnectDb)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nif (!process.env.MONGODB_URI) {\n    throw new Error('Invalid/Missing environment variable: \"MONGODB_URI\"');\n}\nconst uri = process.env.MONGODB_URI;\nlet cachedClient = null;\nasync function connectDb() {\n    if (cachedClient) {\n        return cachedClient;\n    }\n    const client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri);\n    cachedClient = client;\n    await client.connect();\n    return client;\n}\nfunction disconnectDb() {\n    if (cachedClient) {\n        cachedClient.close();\n        cachedClient = null;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9kYi5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXNDO0FBRXRDLElBQUksQ0FBQ0MsUUFBUUMsR0FBRyxDQUFDQyxXQUFXLEVBQUU7SUFDNUIsTUFBTSxJQUFJQyxNQUFNLHVEQUF1RDtBQUN6RSxDQUFDO0FBRUQsTUFBTUMsTUFBTUosUUFBUUMsR0FBRyxDQUFDQyxXQUFXO0FBRW5DLElBQUlHLGVBQWUsSUFBSTtBQUVoQixlQUFlQyxZQUFZO0lBQ2hDLElBQUlELGNBQWM7UUFDaEIsT0FBT0E7SUFDVCxDQUFDO0lBRUQsTUFBTUUsU0FBUyxJQUFJUixnREFBV0EsQ0FBQ0s7SUFDL0JDLGVBQWVFO0lBQ2YsTUFBTUEsT0FBT0MsT0FBTztJQUVwQixPQUFPRDtBQUNULENBQUM7QUFFTSxTQUFTRSxlQUFlO0lBQzdCLElBQUlKLGNBQWM7UUFDaEJBLGFBQWFLLEtBQUs7UUFDbEJMLGVBQWUsSUFBSTtJQUNyQixDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHRqcy1vcGVuYWktc3RhcnRlci8uL3V0aWxzL2RiLmpzPzdjYjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tIFwibW9uZ29kYlwiO1xyXG5cclxuaWYgKCFwcm9jZXNzLmVudi5NT05HT0RCX1VSSSkge1xyXG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZC9NaXNzaW5nIGVudmlyb25tZW50IHZhcmlhYmxlOiBcIk1PTkdPREJfVVJJXCInKTtcclxufVxyXG5cclxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XHJcblxyXG5sZXQgY2FjaGVkQ2xpZW50ID0gbnVsbDtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0RGIoKSB7XHJcbiAgaWYgKGNhY2hlZENsaWVudCkge1xyXG4gICAgcmV0dXJuIGNhY2hlZENsaWVudDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmkpO1xyXG4gIGNhY2hlZENsaWVudCA9IGNsaWVudDtcclxuICBhd2FpdCBjbGllbnQuY29ubmVjdCgpO1xyXG5cclxuICByZXR1cm4gY2xpZW50O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzY29ubmVjdERiKCkge1xyXG4gIGlmIChjYWNoZWRDbGllbnQpIHtcclxuICAgIGNhY2hlZENsaWVudC5jbG9zZSgpO1xyXG4gICAgY2FjaGVkQ2xpZW50ID0gbnVsbDtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiRXJyb3IiLCJ1cmkiLCJjYWNoZWRDbGllbnQiLCJjb25uZWN0RGIiLCJjbGllbnQiLCJjb25uZWN0IiwiZGlzY29ubmVjdERiIiwiY2xvc2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/db.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/addToken.js"));
module.exports = __webpack_exports__;

})();