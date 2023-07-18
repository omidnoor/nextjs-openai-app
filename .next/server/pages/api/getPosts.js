"use strict";
(() => {
var exports = {};
exports.id = 164;
exports.ids = [164];
exports.modules = {

/***/ 93:
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 537:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93);
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5690);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__.withApiAuthRequired)(async function handler(req, res) {
    try {
        const { user: { sub } } = await (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__.getSession)(req, res);
        const client = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_1__/* .connectDb */ .Q)();
        const db = client.db(process.env.MONGODB_NAME);
        const userProfile = await db.collection("users").findOne({
            auth0Id: sub
        });
        const { lastPostDate, getNewerPosts } = req.body;
        // console.log(getNewerPosts);
        const posts = await db.collection("posts").find({
            userId: userProfile._id,
            created: {
                [getNewerPosts ? "$gt" : "$lt"]: new Date(lastPostDate)
            }
        }).limit(getNewerPosts ? 0 : 5).sort({
            created: -1
        }).toArray();
        // console.log(lastPostDate);
        res.status(200).json({
            posts
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally{
        (0,_utils_db__WEBPACK_IMPORTED_MODULE_1__/* .disconnectDb */ .s)();
    }
}));


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
var __webpack_exports__ = (__webpack_exec__(537));
module.exports = __webpack_exports__;

})();