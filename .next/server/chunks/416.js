"use strict";
exports.id = 416;
exports.ids = [416];
exports.modules = {

/***/ 8416:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   o: () => (/* binding */ PostsProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const PostsContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostsContext);
function postReducer(state, action) {
    switch(action.type){
        case "ADD_POST":
            {
                const newPosts = [
                    ...state
                ];
                action.posts.forEach((post)=>{
                    const exists = newPosts.find((p)=>p._id === post._id);
                    if (!exists) {
                        newPosts.push(post);
                    }
                });
                return newPosts;
            }
        case "DELETE_POST":
            {
                const newPosts = [];
                state.forEach((post)=>{
                    if (post._id !== action.postid) {
                        newPosts.push(post);
                    }
                });
                return newPosts;
            }
        default:
            return state;
    }
}
const PostsProvider = ({ children })=>{
    const [posts, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(postReducer, []);
    const [noMorePosts, setNoMorePosts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const setPostsFromSSR = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((postsFromSSR = [])=>{
        dispatch({
            type: "ADD_POST",
            posts: postsFromSSR
        });
    }, []);
    const getPosts = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ({ lastPostDate, getNewerPosts = false })=>{
        const result = await fetch(`/api/getPosts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lastPostDate,
                getNewerPosts
            })
        });
        // console.log(getNewerPosts);
        const json = await result.json();
        const postsResult = json.posts || [];
        // console.log(postsResult);
        if (postsResult.length < 5) {
            setNoMorePosts(true);
        }
        dispatch({
            type: "ADD_POST",
            posts: postsResult
        });
    }, []);
    const removePost = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((postid)=>{
        dispatch({
            type: "DELETE_POST",
            postid
        });
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(PostsContext.Provider, {
        value: {
            posts,
            setPostsFromSSR,
            getPosts,
            noMorePosts,
            removePost
        },
        children: children
    });
};


/***/ })

};
;