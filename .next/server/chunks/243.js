"use strict";
exports.id = 243;
exports.ids = [243];
exports.modules = {

/***/ 202:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ AppLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var _auth0_nextjs_auth0_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6153);
/* harmony import */ var _auth0_nextjs_auth0_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4563);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7197);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Logo_Logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9184);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5692);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _context_postsContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8416);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__, _Logo_Logo__WEBPACK_IMPORTED_MODULE_6__]);
([_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__, _Logo_Logo__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function AppLayout({ children, availableTokens, posts: postsFromSSR, postid, postCreated }) {
    const { user } = (0,_auth0_nextjs_auth0_client__WEBPACK_IMPORTED_MODULE_1__.useUser)();
    const { setPostsFromSSR, posts, getPosts, noMorePosts } = (0,react__WEBPACK_IMPORTED_MODULE_8__.useContext)(_context_postsContext__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z);
    // console.log(posts);
    (0,react__WEBPACK_IMPORTED_MODULE_8__.useEffect)(()=>{
        setPostsFromSSR(postsFromSSR);
        if (postid) {
            const exists = postsFromSSR.find((post)=>post._id === postid);
            if (!exists) {
                getPosts({
                    getNewerPosts: true,
                    lastPostDate: postCreated
                });
            }
        }
    }, [
        postsFromSSR,
        setPostsFromSSR,
        postid,
        postCreated,
        getPosts
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "grid grid-cols-[300px_1fr] h-screen max-h-screen",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-col text-white overflow-hidden",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "bg-slate-800 px-2 ",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Logo_Logo__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {}),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_7__.Button, {
                                variant: "contained",
                                fullWidth: true,
                                sx: {
                                    marginTop: "30px",
                                    backgroundColor: "green !important",
                                    "&:hover": {
                                        backgroundColor: "darkgreen !important",
                                        textDecoration: "none"
                                    },
                                    font: "inherit"
                                },
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                    style: {
                                        textDecoration: "none"
                                    },
                                    href: "/post/new",
                                    children: "New Post"
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                href: "/token-topup",
                                className: "flex justify-center mt-2 text-center ",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FontAwesomeIcon, {
                                        icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faCoins,
                                        className: "text-yellow-500 w-[15px]"
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "pl-1",
                                        children: [
                                            availableTokens,
                                            " token available"
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "px-4 flex-1 overflow-auto scrollbar-hide bg-gradient-to-b from-slate-800 to-cyan-800",
                        children: [
                            posts?.map((post, index)=>{
                                const truncatedTitle = post.title.slice(0, 50);
                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                    href: `/post/${post._id}`,
                                    className: `py-1  block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer border border-white/0 rounded-sm ${postid === post._id ? "bg-white/30 border-white" : ""}`,
                                    children: truncatedTitle
                                }, index);
                            }),
                            !noMorePosts && posts.length > 5 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                onClick: ()=>{
                                    getPosts({
                                        lastPostDate: posts[posts.length - 1].created
                                    });
                                },
                                className: "hover:underline text-sm text-slate-400 text-center cursor-pointer mt-4",
                                children: "Load more posts"
                            })
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "bg-cyan-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2",
                        children: !!user ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "min-w-[50px]",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                        src: user.picture,
                                        alt: user.name,
                                        height: 50,
                                        width: 50,
                                        priority: true,
                                        className: "rounded-full"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "font-bold",
                                            children: user.email
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                            href: "/api/auth/logout",
                                            className: "text-sm",
                                            children: "logout"
                                        })
                                    ]
                                })
                            ]
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                            href: "/api/auth/login",
                            children: "Login"
                        })
                    })
                ]
            }),
            children
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 617:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ connectDb)
/* harmony export */ });
/* unused harmony export disconnectDb */
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


/***/ }),

/***/ 3373:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ getAppProps)
/* harmony export */ });
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(93);
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(617);


const getAppProps = async (context)=>{
    const userSession = await (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__.getSession)(context.req, context.res);
    const client = await (0,_db__WEBPACK_IMPORTED_MODULE_1__/* .connectDb */ .Q)();
    const db = client.db(process.env.MONGODB_NAME);
    const user = await db.collection("users").findOne({
        auth0Id: userSession.user.sub
    });
    if (!user) {
        return {
            availableToken: 0,
            posts: []
        };
    }
    const posts = await db.collection("posts").find({
        userId: user._id
    }).limit(3).sort({
        created: -1
    }).toArray();
    return {
        availableTokens: user.availableTokens,
        posts: posts?.map((post)=>({
                _id: post._id.toString(),
                created: post.created.toString(),
                userId: post.userId.toString(),
                postContent: post.postContent,
                title: post.title,
                metaDescription: post.metaDescription,
                topic: post.topic
            })),
        postid: context.params?.postid || null
    };
};


/***/ })

};
;