"use strict";
(() => {
var exports = {};
exports.id = 230;
exports.ids = [230];
exports.modules = {

/***/ 93:
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ 8013:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 3362:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ generatePost)
});

// EXTERNAL MODULE: external "@auth0/nextjs-auth0"
var nextjs_auth0_ = __webpack_require__(93);
;// CONCATENATED MODULE: external "openai"
const external_openai_namespaceObject = require("openai");
// EXTERNAL MODULE: ./utils/db.js
var utils_db = __webpack_require__(5690);
;// CONCATENATED MODULE: ./src/pages/api/generatePost.js



/* harmony default export */ const generatePost = ((0,nextjs_auth0_.withApiAuthRequired)(async function handler(req, res) {
    try {
        const { user  } = await (0,nextjs_auth0_.getSession)(req, res);
        const client = await (0,utils_db/* connectDb */.Q)();
        const db = client.db(process.env.MONGODB_NAME);
        const userDb = await db.collection("users").findOne({
            auth0Id: user.sub
        });
        if (!userDb?.availableTokens) {
            return res.status(403).json({
                error: "Unauthorized"
            });
        }
        const { topic , keywords  } = req.body;
        if (!topic || !keywords) {
            res.status(422).json({
                message: "Please provide topic and keywords"
            });
        }
        if (topic.length > 300 || keywords.length > 300) {
            res.status(422).json({
                message: "Topic and keywords must be less than 300 characters"
            });
        }
        const config = new external_openai_namespaceObject.Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });
        const openai = new external_openai_namespaceObject.OpenAIApi(config);
        //   const topic = "Top 10 tips for cats owners";
        //   const keywords =
        //     "first-time cats owners, common cats health issues, best cats breeds, why cats are funny, common cats instics";
        // const response = await openai.createCompletion({
        //   model: "text-davinci-003",
        //   temperature: 1,
        //   max_tokens: 3600,
        //   prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
        //       The content should be formatted in SEO-friendly HTML.
        //       The response must also include appropriate HTML title and meta description content.
        //       The return format must be stringified JSON in the following format:
        //       {
        //         "postContent": post content here
        //         "title": title goes here
        //         "metaDescription": meta description goes here
        //       }`,
        // });
        console.log("Before calling OpenAI API");
        const postContentResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            messages: [
                {
                    role: "system",
                    content: `You are a blog post generator. Your task is to create SEO-friendly blog posts with proper HTML formatting. Use heading tags like <h1>, <h2>, etc., for titles, and other HTML tags like <p>, <strong>, <ul>, <ol>, <li>, and <i> for formatting the content.`
                },
                {
                    role: "user",
                    content: `generate me a blog post`
                },
                {
                    role: "assistant",
                    content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. The content should be formatted in SEO-friendly HTML. limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, ul, ol, li, i. use heading tags for titles.`
                }
            ]
        });
        console.log("After calling OpenAI API");
        const postContent = postContentResponse.data.choices[0]?.message.content || "";
        const titleResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 1,
            messages: [
                {
                    role: "system",
                    content: `You are a blog post generator`
                },
                {
                    role: "user",
                    content: `generate me a blog post`
                },
                {
                    role: "assistant",
                    content: postContent
                },
                {
                    role: "user",
                    content: `generate an appropriate title tag text for the above blog post`
                }
            ]
        });
        const title = titleResponse.data.choices[0]?.message.content || "";
        const metaDescriptionResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 1,
            messages: [
                {
                    role: "system",
                    content: `You are a blog post generator`
                },
                {
                    role: "user",
                    content: `generate me a blog post`
                },
                {
                    role: "assistant",
                    content: postContent
                },
                {
                    role: "user",
                    content: `generate SEO-fiendly meta description content for the aboveblog post`
                }
            ]
        });
        const metaDescription = metaDescriptionResponse.data.choices[0]?.message.content || "";
        // console.log("response: ", postContent);
        // console.log("response: ", title);
        // console.log("response: ", metaDescription);
        await db.collection("users").updateOne({
            auth0: user.sub
        }, {
            $inc: {
                availableToken: -1
            }
        });
        const post = await db.collection("posts").insertOne({
            postContent: postContent || "",
            title: title || "",
            metaDescription: metaDescription || "",
            topic,
            keywords,
            userId: userDb._id,
            created: new Date()
        });
        res.status(200).json({
            postId: post.insertedId
        });
    // const postText = response.data.choices[0]?.text.split("\n").join("");
    // console.log(postText);
    // console.log(JSON.parse(postText).postContent);
    // const postContent = JSON.parse(postText).postContent;
    // const title = JSON.parse(postText).title;
    // const metaDescription = JSON.parse(postText).metaDescription;
    // res.status(200).json({ postContent });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    } finally{
        await (0,utils_db/* disconnectDb */.s)();
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
var __webpack_exports__ = (__webpack_exec__(3362));
module.exports = __webpack_exports__;

})();