"use strict";
(() => {
var exports = {};
exports.id = 374;
exports.ids = [374];
exports.modules = {

/***/ 730:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils/node.js");

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 8174:
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),

/***/ 757:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderkind_PAGES_API_page_2Fapi_2Fcreate_stripe_session_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fcreate_stripe_session_js_middlewareConfigBase64_e30_3D_),
  routeModule: () => (/* binding */ routeModule)
});

// NAMESPACE OBJECT: ./pages/api/create-stripe-session.js
var create_stripe_session_namespaceObject = {};
__webpack_require__.r(create_stripe_session_namespaceObject);
__webpack_require__.d(create_stripe_session_namespaceObject, {
  "default": () => (create_stripe_session)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages-api/module.js
var pages_api_module = __webpack_require__(6429);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(7153);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7305);
;// CONCATENATED MODULE: ./pages/api/create-stripe-session.js
const stripe = __webpack_require__(8174)(process.env.STRIPE_SECRET_KEY);
/* harmony default export */ const create_stripe_session = (async (req, res)=>{
    const { items } = req.body;
    console.log(items);
    // const redirectURL =
    //     process.env.NODE_ENV === 'development'
    //         ? 'http://localhost:3000'
    //         : 'https://stripe-checkout-next-js-demo.vercel.app';
    const transformedItems = items.map((item)=>({
            description: item.description,
            quantity: item.qty,
            price_data: {
                currency: "usd",
                unit_amount: item.product.price * 100,
                product_data: {
                    name: item.product.title,
                    images: [
                        item.product.image
                    ]
                }
            }
        }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types: [
            "card"
        ],
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/`,
        metadata: {
            images: JSON.stringify(items.map((item)=>item.image))
        }
    });
    res.status(200).json({
        id: session.id
    });
// res.json({ id: session.id });
}); // export default CreateStripeSession;

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fcreate-stripe-session&preferredRegion=&absolutePagePath=private-next-pages%2Fapi%2Fcreate-stripe-session.js&middlewareConfigBase64=e30%3D!
// @ts-ignore this need to be imported from next/dist to be external



const PagesAPIRouteModule = pages_api_module.PagesAPIRouteModule;
// Import the userland code.
// @ts-expect-error - replaced by webpack/turbopack loader

// Re-export the handler (should be the default export).
/* harmony default export */ const next_route_loaderkind_PAGES_API_page_2Fapi_2Fcreate_stripe_session_preferredRegion_absolutePagePath_private_next_pages_2Fapi_2Fcreate_stripe_session_js_middlewareConfigBase64_e30_3D_ = ((0,helpers/* hoist */.l)(create_stripe_session_namespaceObject, "default"));
// Re-export config.
const config = (0,helpers/* hoist */.l)(create_stripe_session_namespaceObject, "config");
// Create and export the route module that will be consumed.
const routeModule = new PagesAPIRouteModule({
    definition: {
        kind: route_kind/* RouteKind */.x.PAGES_API,
        page: "/api/create-stripe-session",
        pathname: "/api/create-stripe-session",
        // The following aren't used in production.
        bundlePath: "",
        filename: ""
    },
    userland: create_stripe_session_namespaceObject
});

//# sourceMappingURL=pages-api.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [172], () => (__webpack_exec__(757)));
module.exports = __webpack_exports__;

})();