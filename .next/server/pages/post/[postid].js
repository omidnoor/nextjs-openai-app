"use strict";
(() => {
var exports = {};
exports.id = 799;
exports.ids = [799];
exports.modules = {

/***/ 746:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Post),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _components_AppLayout_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(202);
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93);
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(617);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8013);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4563);
/* harmony import */ var _utils_getAppProps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3373);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _context_postsContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8416);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_AppLayout_AppLayout__WEBPACK_IMPORTED_MODULE_1__, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__]);
([_components_AppLayout_AppLayout__WEBPACK_IMPORTED_MODULE_1__, _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












function Post({ postContent , title , metaDescription , keywords , postId  }) {
    const [confirmation, setConfirmation] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(false);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)("");
    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_9__.useState)("");
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_10__.useRouter)();
    const { removePost  } = (0,react__WEBPACK_IMPORTED_MODULE_9__.useContext)(_context_postsContext__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z);
    console.log(postId);
    const handleDelete = async ()=>{
        setLoading(true);
        try {
            const response = await fetch("/api/deletePost/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId
                })
            });
            const json = await response.json();
            if (json.success) {
                setMessage("Post deleted successfully!");
                removePost(postId);
                router.replace(`/post/new`);
            }
            setError("");
        } catch (error) {
            setError("Something went wrong!");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "overflow-auto h-full ",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-screen-sm mx-auto px-4",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm",
                    children: "SEO title and meta description"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "p-4 my-2 border border-stone-200 rounded-md",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "text-blue-600 text-2xl font-bold",
                            children: title
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mt-2 ",
                            children: metaDescription
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm",
                    children: "Keywords"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "flex flex-wrap pt-2 gap-1 ",
                    children: keywords.split(",").map((keyword, index)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "p-2 rounded-full bg-slate-800 text-white ",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_5__.FontAwesomeIcon, {
                                    icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faHashtag
                                }),
                                " ",
                                keyword
                            ]
                        }, index))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm",
                    children: "Blog Post"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    dangerouslySetInnerHTML: {
                        __html: postContent || ""
                    }
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "my-4",
                    children: [
                        !confirmation && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {
                            variant: "contained",
                            fullWidth: true,
                            sx: {
                                marginTop: "30px",
                                backgroundColor: "#bf404e !important",
                                "&:hover": {
                                    backgroundColor: "#a65966 !important",
                                    textDecoration: "none"
                                },
                                font: "inherit"
                            },
                            onClick: ()=>setConfirmation(true),
                            children: "Delete Post"
                        }),
                        !!confirmation && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "flex flex-col justify-center items-center ",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "p-2 bg-red-300 text-center",
                                    children: "Are you sure you want to delete this post? This action is irreversible"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex items-center h-full w-full gap-4",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {
                                            variant: "outlined",
                                            fullWidth: true,
                                            sx: {
                                                // backgroundColor: "#bf404e !important",
                                                "&:hover": {
                                                    backgroundColor: "#2d2dd2 !important",
                                                    color: "white",
                                                    textDecoration: "none"
                                                },
                                                font: "inherit"
                                            },
                                            onClick: ()=>setConfirmation(false),
                                            children: "Cancel"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_8__.Button, {
                                            variant: "contained",
                                            fullWidth: true,
                                            sx: {
                                                backgroundColor: "#bf404e !important",
                                                "&:hover": {
                                                    backgroundColor: "#a65966 !important",
                                                    textDecoration: "none"
                                                },
                                                font: "inherit"
                                            },
                                            onClick: ()=>handleDelete(),
                                            children: "Confirm"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
}
Post.getLayout = function getLayout(page, pageProps) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AppLayout_AppLayout__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
        ...pageProps,
        children: page
    });
};
const getServerSideProps = (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_2__.withPageAuthRequired)({
    async getServerSideProps (context) {
        const { posts , availableTokens , postId  } = await (0,_utils_getAppProps__WEBPACK_IMPORTED_MODULE_7__/* .getAppProps */ .z)(context);
        // console.log(posts);
        const userSession = await (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_2__.getSession)(context.req, context.res);
        const client = await (0,_utils_db__WEBPACK_IMPORTED_MODULE_3__/* .connectDb */ .Q)();
        const db = client.db(process.env.MONGODB_NAME);
        const user = await db.collection("users").findOne({
            auth0Id: userSession.user.sub
        });
        const post = await db.collection("posts").findOne({
            _id: new mongodb__WEBPACK_IMPORTED_MODULE_4__.ObjectId(context.params.postId),
            userId: user._id
        });
        if (!post) {
            return {
                redirect: {
                    destination: "/post/new",
                    permanent: false
                }
            };
        }
        return {
            props: {
                postContent: post.postContent,
                title: post.title,
                metaDescription: post.metaDescription,
                keywords: post.keywords,
                availableTokens,
                posts,
                postCreated: post.created.toString(),
                postId
            }
        };
    }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 93:
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ 6153:
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0/client");

/***/ }),

/***/ 7197:
/***/ ((module) => {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = require("@mui/material");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 3918:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 4563:
/***/ ((module) => {

module.exports = import("@fortawesome/free-solid-svg-icons");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [893,636,61,416,184,243], () => (__webpack_exec__(746)));
module.exports = __webpack_exports__;

})();