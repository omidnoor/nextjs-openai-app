"use strict";
(() => {
var exports = {};
exports.id = 282;
exports.ids = [282];
exports.modules = {

/***/ 93:
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 6090:
/***/ ((module) => {

module.exports = import("stripe");;

/***/ }),

/***/ 2579:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93);
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5690);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6090);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([stripe__WEBPACK_IMPORTED_MODULE_2__]);
stripe__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const stripe = (0,stripe__WEBPACK_IMPORTED_MODULE_2__["default"])(process.env.STRIPE_SECRET_KEY);
async function handler(req, res) {
    try {
        const { user } = await (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__.getSession)(req, res);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const lineItems = [
            {
                price: process.env.STRIPE_PRODUCT_PRICE_ID,
                quantity: 1
            }
        ];
        const protocol =  false ? 0 : "https://";
        const host = req.headers.host;
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: [
                "card"
            ],
            line_items: lineItems,
            mode: "payment",
            success_url: `${protocol}${host}/success`,
            cancel_url: `${protocol}${host}/success`,
            payment_intent_data: {
                metadata: {
                    sub: user.sub
                }
            },
            metadata: {
                sub: user.sub
            }
        });
        res.status(200).json({
            session: checkoutSession
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally{
        await (0,_utils_db__WEBPACK_IMPORTED_MODULE_1__/* .disconnectDb */ .s)();
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5690:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ connectDb),
/* harmony export */   s: () => (/* binding */ disconnectDb)
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8013);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;
let cachedClient = null;
async function connectDb() {
    if (cachedClient) {
        return cachedClient;
    }
    const client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri);
    cachedClient = client;
    await client.connect();
    return client;
}
function disconnectDb() {
    if (cachedClient) {
        cachedClient.close();
        cachedClient = null;
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2579));
module.exports = __webpack_exports__;

})();