"use strict";
(() => {
var exports = {};
exports.id = 105;
exports.ids = [105];
exports.modules = {

/***/ 8915:
/***/ ((module) => {

module.exports = require("@webdeveducation/next-verify-stripe");

/***/ }),

/***/ 2799:
/***/ ((module) => {

module.exports = require("micro-cors");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 6090:
/***/ ((module) => {

module.exports = import("stripe");;

/***/ }),

/***/ 7806:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var micro_cors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2799);
/* harmony import */ var micro_cors__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(micro_cors__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6090);
/* harmony import */ var _webdeveducation_next_verify_stripe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8915);
/* harmony import */ var _webdeveducation_next_verify_stripe__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_webdeveducation_next_verify_stripe__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5690);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([stripe__WEBPACK_IMPORTED_MODULE_1__]);
stripe__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const cors = micro_cors__WEBPACK_IMPORTED_MODULE_0___default()({
    methods: [
        "POST",
        "HEAD"
    ]
});
const config = {
    api: {
        bodyParser: false
    }
};
const stripe = (0,stripe__WEBPACK_IMPORTED_MODULE_1__["default"])(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const handler = async (req, res)=>{
    if (req.method === "POST") {
        let event;
        try {
            const result = await _webdeveducation_next_verify_stripe__WEBPACK_IMPORTED_MODULE_2___default()({
                req,
                stripe,
                endpointSecret
            });
            if (result) {
                event = result;
            } else {
                console.log("verifyStripe did not return an event object");
                res.status(500).json({
                    error: "Failed to verify webhook"
                });
                return;
            }
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                error: "Failed to verify webhook"
            });
            return;
        }
        switch(event.type){
            case "payment_intent.succeeded":
                {
                    const client = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .connectDb */ .Q)();
                    const db = client.db(process.env.MONGODB_NAME);
                    const paymentIntent = event.data.object;
                    const auth0Id = paymentIntent.metadata.sub;
                    const users = await db.collection("users").updateOne({
                        auth0Id
                    }, {
                        $inc: {
                            availableTokens: 10
                        },
                        $setOnInsert: {
                            auth0Id
                        }
                    }, {
                        upsert: true
                    });
                    break; // Add a break statement to avoid falling through to the default case
                }
            default:
                console.log("Unhandled event: ", event.type);
        }
        (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .disconnectDb */ .s)();
        res.status(200).json({
            received: true
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cors(handler));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5690:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Q": () => (/* binding */ connectDb),
/* harmony export */   "s": () => (/* binding */ disconnectDb)
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
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(7806));
module.exports = __webpack_exports__;

})();