"use strict";
(() => {
var exports = {};
exports.id = 754;
exports.ids = [754];
exports.modules = {

/***/ 93:
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 29:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ deletePost)
});

// EXTERNAL MODULE: external "@auth0/nextjs-auth0"
var nextjs_auth0_ = __webpack_require__(93);
// EXTERNAL MODULE: external "mongodb"
var external_mongodb_ = __webpack_require__(8013);
// EXTERNAL MODULE: ./utils/db.js
var utils_db = __webpack_require__(5690);
;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
;// CONCATENATED MODULE: ./src/pages/api/deletePost.js




/* harmony default export */ const deletePost = ((0,nextjs_auth0_.withApiAuthRequired)(async function handler(req, res) {
    try {
        const { user  } = await (0,nextjs_auth0_.getSession)(req, res);
        const client = await (0,utils_db/* connectDb */.Q)();
        const db = client.db(process.env.MONGODB_NAME);
        const userProfile = await db.collection("users").findOne({
            auth0Id: user.sub
        });
        const { postId  } = req.body;
        await db.collection("posts").deleteOne({
            userId: userProfile._id,
            _id: new external_mongodb_.ObjectId(postId)
        });
        res.status(200).json({
            success: "true"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    } finally{
        (0,utils_db/* disconnectDb */.s)();
    }
}));


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
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(29));
module.exports = __webpack_exports__;

})();