exports.id = 703;
exports.ids = [703];
exports.modules = {

/***/ 9303:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5608));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 7495));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 8022));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 2146));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5333))

/***/ }),

/***/ 6500:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 9571, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 2987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 4282, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 6926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 6505, 23))

/***/ }),

/***/ 523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ page)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./app/context/CartContext.js
var CartContext = __webpack_require__(2146);
;// CONCATENATED MODULE: ./app/components/CartProduct.jsx



const CartProduct = ({ product })=>{
    // const { itemQuantity } = useContext(CartContext);
    const { state, dispatch } = (0,CartContext.useCart)();
    const { cart } = state;
    // const itemQuantities = useCart().calculateItemQuantities(cart)
    // console.log(itemQuantity(product.price))
    // const addQuantity = () => {
    //     product.qty++
    // }
    const incrementQuantity = ()=>{
        // Dispatch an action to increment the quantity of the item
        dispatch({
            type: "INCREMENT_QTY",
            payload: {
                id: product.product.id
            }
        });
        calculateItemPrice();
    };
    const decrementQuantity = ()=>{
        dispatch({
            type: "DECREMENT_QTY",
            payload: {
                itemId: product.product.id
            }
        });
        calculateItemPrice();
    };
    const calculateItemPrice = ()=>{
        dispatch({
            type: "CALCULATE_PRICE",
            payload: {
                priceId: product.product.id
            }
        });
    };
    console.log(product.product.title);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex items-center gap-3 border-t-2 py-3",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                className: "h-16 w-16",
                src: product.product.image
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col justify-center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        children: product.product.title
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex gap-4",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex gap-2 border-solid-gray-950 border-2 px-1",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "cursor-pointer",
                                        onClick: decrementQuantity,
                                        children: "-"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        children: product.qty
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "cursor-pointer",
                                        onClick: incrementQuantity,
                                        children: "+"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                className: "font-thin",
                                children: [
                                    "$ ",
                                    product.product.price
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                children: [
                                    "$ ",
                                    product.totalPrice
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_CartProduct = (CartProduct);

// EXTERNAL MODULE: ./app/context/AuthContext.js
var AuthContext = __webpack_require__(7495);
// EXTERNAL MODULE: ./app/components/Navbar.jsx
var Navbar = __webpack_require__(5333);
// EXTERNAL MODULE: ./node_modules/@stripe/stripe-js/dist/stripe.js
var stripe = __webpack_require__(4041);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 46 modules
var axios = __webpack_require__(3258);
// EXTERNAL MODULE: ./app/firebase.js
var firebase = __webpack_require__(4642);
;// CONCATENATED MODULE: ./app/cart/page.jsx
/* __next_internal_client_entry_do_not_use__ default auto */ 








const publishableKey = "pk_test_51N3XyOBoZZlr23EQzDm4iuW4wXlmC2u8HNvUzihPC5MbFnCbozaDNR2JDdPHUa9K8nAzeHm1FvxhjtMvKmdO2bVe0083As07bY";
const stripePromise = (0,stripe/* loadStripe */.J)(publishableKey);
const Cart = ()=>{
    const { state, grandTotal } = (0,CartContext.useCart)();
    const { user, googleSignIn, logOut } = (0,AuthContext.UserAuth)();
    // const { cart } = state;
    // const { totalQuantity } = useCart();
    // console.log(totalQuantity)
    // console.log(user.uid)
    // let id = user.id
    // let order = state.cart
    const createCheckOutSession = async ()=>{
        const stripe = await stripePromise;
        const checkoutSession = await axios/* default */.Z.post("/api/create-stripe-session", {
            items: state.cart
        });
        //redirect user/customer to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });
        if (result.error) alert(result.error.message);
    };
    const handleClick = ()=>{
        createCheckOutSession();
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "my-24 m-6",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                children: "This is your shopping cart"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                        className: "flex flex-col gap-6 my-6",
                        children: state.cart.map((product)=>/*#__PURE__*/ jsx_runtime_.jsx(components_CartProduct, {
                                id: product.id,
                                product: product
                            }))
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                        className: "mb-6",
                        children: [
                            "Total: $",
                            grandTotal
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        className: "cursor-pointer bg-black text-white py-2 px-6",
                        role: "link",
                        onClick: handleClick,
                        children: "Check out"
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const page = (Cart);


/***/ }),

/***/ 5333:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1440);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7495);
/* harmony import */ var _context_CartContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2146);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(418);
/* harmony import */ var _cart_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(523);
/* __next_internal_client_entry_do_not_use__ default auto */ 







const Navbar = ()=>{
    const { user, googleSignIn, logOut } = (0,_context_AuthContext__WEBPACK_IMPORTED_MODULE_3__.UserAuth)();
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
    const { clickHandler } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_CartContext__WEBPACK_IMPORTED_MODULE_4__.CartContext);
    const { state } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_CartContext__WEBPACK_IMPORTED_MODULE_4__.CartContext);
    // const itemCount = state.cart.reduce((count, item) => count + item.quantity, 0);
    const handleSignIn = async ()=>{
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };
    const handleSignOut = async ()=>{
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const checkAuth = async ()=>{
            await new Promise((resolve)=>setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuth();
    }, [
        user
    ]);
    // let display = (user.displayName)
    // console.log(display)
    // console.log(display.split(''))
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "p-2 w-full flex items-center justify-between fixed top-0 bg-gray-500 text-white z-20",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
                className: "flex",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                    className: "p-2 cursor-pointer",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                        href: "/",
                        children: "Bargain Depot"
                    })
                })
            }),
            loading ? null : !user ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex gap-10 items-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: clickHandler,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                            href: "/cart",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-xl cursor-pointer relative",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_6__/* .RiShoppingCartLine */ .YLQ, {}),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "absolute p-2 -right-1 -bottom-2 bg-red-600 h-3.5 w-3.5 rounded-full flex items-center justify-center",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-sm",
                                            children: state.cart.length
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: "cursor-pointer bg-rose-400 p-1.5 rounded",
                        onClick: handleSignIn,
                        children: "Login"
                    })
                ]
            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex gap-5 items-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: clickHandler,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                            href: "/cart",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "text-xl cursor-pointer relative",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_6__/* .RiShoppingCartLine */ .YLQ, {}),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "absolute p-2 -right-1 -bottom-2 bg-red-600 h-3.5 w-3.5 rounded-full flex items-center justify-center",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "text-sm",
                                            children: state.cart.length
                                        })
                                    })
                                ]
                            })
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            children: [
                                "welcome, ",
                                user.displayName.split("")[0]
                            ]
                        })
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            className: "cursor-pointer bg-rose-400 p-1.5 rounded",
                            onClick: handleSignOut,
                            children: "Log Out"
                        })
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);


/***/ }),

/***/ 7495:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthContextProvider: () => (/* binding */ AuthContextProvider),
/* harmony export */   UserAuth: () => (/* binding */ UserAuth)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8241);
/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4642);
/* __next_internal_client_entry_do_not_use__ UserAuth,AuthContextProvider auto */ 



const AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const UserAuth = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);
};
const AuthContextProvider = ({ children })=>{
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const googleSignIn = ()=>{
        const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_2__/* .GoogleAuthProvider */ .hJ();
        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__/* .signInWithPopup */ .rh)(_firebase__WEBPACK_IMPORTED_MODULE_3__/* .auth */ .I8, provider);
    };
    const logOut = ()=>{
        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__/* .signOut */ .w7)(_firebase__WEBPACK_IMPORTED_MODULE_3__/* .auth */ .I8);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__/* .onAuthStateChanged */ .Aj)(_firebase__WEBPACK_IMPORTED_MODULE_3__/* .auth */ .I8, (currentUser)=>{
            setUser(currentUser);
        });
        return ()=>unsubscribe();
    }, [
        user
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(AuthContext.Provider, {
        value: {
            user,
            googleSignIn,
            logOut
        },
        children: children
    });
};


/***/ }),

/***/ 2146:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CartContext: () => (/* binding */ CartContext),
/* harmony export */   CartProvider: () => (/* binding */ CartProvider),
/* harmony export */   CartState: () => (/* binding */ CartState),
/* harmony export */   useCart: () => (/* binding */ useCart)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ CartState,CartProvider,useCart,CartContext auto */ 

const CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
//Create a reducer funtion to handle cart actions
const cartReducer = (state, action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [
                    ...state.cart,
                    {
                        ...action.payload,
                        qty: 1,
                        totalPrice: action.payload.product.price
                    }
                ]
            };
        // case 'UPDATE_CART':
        //     return { ...state, cart: action.payload }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item)=>item.product.id !== action.payload.id)
            };
        case "INCREMENT_QTY":
            const { id } = action.payload;
            const updatedCart = state.cart.map((item)=>item.product.id === id ? {
                    ...item,
                    qty: item.qty + 1
                } : item);
            return {
                ...state,
                cart: updatedCart
            };
        case "DECREMENT_QTY":
            const { itemId } = action.payload;
            const updatedCartDecrement = state.cart.map((item)=>{
                if (item.product.id === itemId) {
                    const updatedQuantity = item.qty - 1;
                    if (updatedQuantity <= 0) {
                        // If quantity reaches 0, remove the item
                        return null;
                    } else {
                        return {
                            ...item,
                            qty: updatedQuantity
                        };
                    }
                }
                return item;
            });
            return {
                ...state,
                cart: updatedCartDecrement.filter(Boolean)
            };
        // case 'DECREMENT_QTY':
        //     const { itemId } = action.payload;
        //     const updatedCartDecrement = state.cart.map((item) =>
        //         item.product.id === itemId ? { ...item, qty: item.qty - 1 } : item
        //     );
        //     return { ...state, cart: updatedCartDecrement };
        case "CALCULATE_PRICE":
            const { priceId } = action.payload;
            const updatedPrice = state.cart.map((item)=>item.product.id === priceId ? {
                    ...item,
                    totalPrice: item.product.price * item.qty
                } : item);
            return {
                ...state,
                cart: updatedPrice
            };
        default:
            return state;
    }
};
const calculateGrandTotal = (cart1)=>{
    let sum = 0;
    for(let i = 0; i < cart1.length; i++){
        sum += cart1[i].totalPrice;
    }
    return sum.toFixed(2);
};
//Create CartProvider component
const CartProvider = ({ children })=>{
    const [state, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(cartReducer, {
        cart: []
    });
    console.log(state.cart);
    const grandTotal = calculateGrandTotal(state.cart);
    //function for changing state on button click 
    let cartActive = false;
    // Get total quantity
    const totalQuantity = state.cart.reduce((total, item)=>total + item.quantity, 0);
    // Create a function to get the quantity of a specific item
    // const itemQuantity = (state, id) => {
    //     let quantity = 0;
    //     for (const item of state) {
    //         if (item.price === itemPrice) {
    //             quantity++;
    //         }
    //     }
    // }
    // const itemQuantity = (price) => {
    //     state.cart.filter((cartItem) => cartItem.price === price).length;
    // }
    // This function takes the cart state as an argument and calculates the quantity of each item in the cart.
    function calculateItemQuantities(cart1) {
        const itemQuantities = {};
        // Loop through the items in the cart
        for (const item of cart1){
            if (item.id in itemQuantities) {
                // If the item is already in the quantities object, increment its count
                itemQuantities[item.id] += 1;
            } else {
                // If the item is not in the quantities object, initialize it with a count of 1
                itemQuantities[item.id] = 1;
            }
        }
        return itemQuantities;
    }
    // const itemQuantity = () => {
    //     return "Hello"
    // }
    const clickHandler = ()=>{
        cartActive = !cartActive;
        console.log("clicked!");
        console.log(cartActive);
    };
    //function for displaying counter on cart logo
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CartContext.Provider, {
        value: {
            state,
            dispatch,
            cartActive,
            clickHandler,
            totalQuantity,
            calculateItemQuantities,
            grandTotal
        },
        children: children
    });
};
//Create custom hook to access cart context
const useCart = ()=>{
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
const CartState = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(cart);
};



/***/ }),

/***/ 8022:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductProvider: () => (/* binding */ ProductProvider),
/* harmony export */   useProductContext: () => (/* binding */ useProductContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3258);
/* __next_internal_client_entry_do_not_use__ useProductContext,ProductProvider auto */ 


const ProductContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();
const useProductContext = ()=>{
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ProductContext);
};
const ProductProvider = ({ children })=>{
    const [products, setProducts] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const fetchProducts = async ()=>{
            const { data } = await axios__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z.get("https://fakestoreapi.com/products");
            console.log(data);
            setProducts(data);
        };
        fetchProducts();
    }, []);
    // const getProducts = () => {
    //     fetch('https://api.storerestapi.com/products')
    //         .then(response => response.json())
    //         .then(json => console.log(json))
    // }
    // getProducts()
    // fetchProducts
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ProductContext.Provider, {
        value: {
            products
        },
        children: children
    });
} // export default ProductProvider;
;


/***/ }),

/***/ 4642:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I8: () => (/* binding */ auth)
/* harmony export */ });
/* unused harmony exports firestore, saveOrderToFirestore */
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2856);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8241);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1522);
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5087);






// import { firestore } from '@firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyAlEYqf5S5RQAxPQ_MibgLDGkShyUrI1KI",
    authDomain: "test-project-94c92.firebaseapp.com",
    projectId: "test-project-94c92",
    storageBucket: "test-project-94c92.appspot.com",
    messagingSenderId: "181256789630",
    appId: "1:181256789630:web:5661552a04f5615677c22f",
    measurementId: "G-KG7ZTDLBDD"
};
const saveOrderToFirestore = async (userId, orderDetails)=>{
    try {
        const orderRef = await firestore.collection("orders").add({
            userId,
            createdAt: new Date(),
            ...orderDetails
        });
        console.log("Order saved with ID:", orderRef.id);
        return orderRef.id; // Optionally, you can return the order ID
    } catch (error) {
        console.error("Error saving order:", error);
        throw error; // Propagate the error for handling in the calling code
    }
};
// Initialize Firebase
const app = (0,_firebase_app__WEBPACK_IMPORTED_MODULE_3__/* .initializeApp */ .ZF)(firebaseConfig);
const firestore = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__/* .getFirestore */ .ad)(app);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__/* .getAuth */ .v0)(app);
// export const auth = getAuth(app);



/***/ }),

/***/ 5608:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
;// CONCATENATED MODULE: ./app/components/Banner.jsx


const Banner = ()=>{
    return /*#__PURE__*/ _jsx("div", {
        className: "w-full h-auto pb-[56.25%] bg-cover overlay bg-[url('../public/banner.jpg')]",
        children: /*#__PURE__*/ _jsx("div", {
            className: "pb-[53.6%] w-full overlay bg-black absolute top-0 opacity-30",
            children: /*#__PURE__*/ _jsx("h1", {
                children: "Fasion Now"
            })
        })
    });
};
/* harmony default export */ const components_Banner = ((/* unused pure expression or super */ null && (Banner)));

// EXTERNAL MODULE: ./app/context/ProductContext.js
var ProductContext = __webpack_require__(8022);
// EXTERNAL MODULE: ./app/context/CartContext.js
var CartContext = __webpack_require__(2146);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(2451);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/react-icons/bs/index.esm.js
var index_esm = __webpack_require__(930);
// EXTERNAL MODULE: ./node_modules/@stripe/stripe-js/dist/stripe.js
var stripe = __webpack_require__(4041);
// EXTERNAL MODULE: ./node_modules/firebase/auth/dist/index.mjs + 3 modules
var dist = __webpack_require__(8241);
;// CONCATENATED MODULE: ./app/components/ProductCard.jsx










const ProductCard = ({ product })=>{
    // const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    // const stripePromise = loadStripe(publishableKey);
    // const createCheckOutSession = async () => {
    //     const stripe = await stripePromise;
    //     const checkoutSession = await axios.post('/api/create-stripe-session', {
    //         item: item,
    //     });
    //     const result = await stripe.redirectToCheckout({
    //         sessionId: checkoutSession.data.id,
    //     });
    //     if (result.error) {
    //         alert(result.error.message);
    //     }
    // };
    // const { cart } = useCartContext()
    const { state, dispatch } = (0,CartContext.useCart)();
    const { cart } = state;
    const { products } = (0,ProductContext.useProductContext)();
    const inCart = cart.find((item)=>item.product.id === product.id);
    // console.log(inCart)
    const removeFromCart = ()=>{
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: product
        });
    };
    const addToCart = (product)=>{
        dispatch({
            type: "ADD_TO_CART",
            payload: product
        });
    };
    // const addToCart = (product) => {
    //     const updatedCart = [...cart];
    //     const itemIndex = updatedCart.findIndex((item) => item.id === product.id);
    //     console.log(product.id)
    //     if (itemIndex !== -1) {
    //         // Product already in the cart, update the quantity
    //         updatedCart[itemIndex].quantity += 1;
    //     } else {
    //         // Product not in the cart, add a new item
    //         updatedCart.push({ ...product, quantity: 1 });
    //     }
    //     // Update the shopping cart context with the updated cart
    //     dispatch({ type: 'UPDATE_CART', payload: updatedCart });
    // }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "w-full h-full flex justify-center items-center",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "w-[200px] mx-auto flex justify-center items-center group-hover:scale-110 transition duration-300",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                // layout='fill'
                                width: "100",
                                height: "100",
                                src: product.image,
                                alt: "product photo"
                            })
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "absolute top-3 -right-40 group-hover:right-5 flex flex-col justify-center gap-2 items-center opacity-0 group-hover:opacity-100 transition-all duration-30",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                className: inCart ? "bg-blue-400 text-white text-xl h-11 w-11" : "bg-rose-400 text-white text-xl h-11 w-11 ",
                                onClick: ()=>{
                                    if (inCart) {
                                        removeFromCart({
                                            product
                                        });
                                    } else {
                                        addToCart({
                                            product
                                        });
                                    }
                                },
                                children: inCart ? "-" : "+"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                className: "shadow-md p-2 w-11 h-11 cursor-pointer flex justify-center items-center",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(index_esm/* BsFillEyeFill */.rnh, {})
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "text-sm capitalize text-gray-500 mb-1",
                        children: product.category
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: product.title
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        children: [
                            "$",
                            product.price
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_ProductCard = (ProductCard);

;// CONCATENATED MODULE: ./app/page.js
/* __next_internal_client_entry_do_not_use__ default auto */ 





function Home() {
    const { products } = (0,ProductContext.useProductContext)();
    // const { cart } = useCartContext()
    // const getProducts = () => {
    //   fetch('https://api.storerestapi.com/products')
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    // }
    // getProducts()
    // const fetchProducts = async () => {
    //   const { data } = await axios.get(
    //     'https://fakestoreapi.com/products'
    //   );
    //   console.log(data)
    // }
    // fetchProducts()
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
            className: "container mx-auto my-20",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                    className: "text-center mb-10 text-xl",
                    children: "Our Products"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0",
                    children: products && products.map((product)=>/*#__PURE__*/ jsx_runtime_.jsx(components_ProductCard, {
                            id: product.id,
                            product: product
                        }))
                })
            ]
        })
    });
}


/***/ }),

/***/ 5437:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app/layout.js","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var layout_js_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(6697);
var layout_js_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(layout_js_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(7272);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1363);
;// CONCATENATED MODULE: ./app/components/Navbar.jsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/andresmalagon/Code/portfolio-projects/ecommerce-app/app/components/Navbar.jsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const Navbar = (__default__);
;// CONCATENATED MODULE: ./app/context/AuthContext.js

const AuthContext_proxy = (0,module_proxy.createProxy)(String.raw`/Users/andresmalagon/Code/portfolio-projects/ecommerce-app/app/context/AuthContext.js`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: AuthContext_esModule, $$typeof: AuthContext_$$typeof } = AuthContext_proxy;
const AuthContext_default_ = AuthContext_proxy.default;

const e0 = AuthContext_proxy["UserAuth"];

const e1 = AuthContext_proxy["AuthContextProvider"];

;// CONCATENATED MODULE: ./app/context/ProductContext.js

const ProductContext_proxy = (0,module_proxy.createProxy)(String.raw`/Users/andresmalagon/Code/portfolio-projects/ecommerce-app/app/context/ProductContext.js`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: ProductContext_esModule, $$typeof: ProductContext_$$typeof } = ProductContext_proxy;
const ProductContext_default_ = ProductContext_proxy.default;

const ProductContext_e0 = ProductContext_proxy["useProductContext"];

const ProductContext_e1 = ProductContext_proxy["ProductProvider"];

;// CONCATENATED MODULE: ./app/context/CartContext.js

const CartContext_proxy = (0,module_proxy.createProxy)(String.raw`/Users/andresmalagon/Code/portfolio-projects/ecommerce-app/app/context/CartContext.js`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: CartContext_esModule, $$typeof: CartContext_$$typeof } = CartContext_proxy;
const CartContext_default_ = CartContext_proxy.default;

const CartContext_e0 = CartContext_proxy["CartState"];

const CartContext_e1 = CartContext_proxy["CartProvider"];

const e2 = CartContext_proxy["useCart"];

const e3 = CartContext_proxy["CartContext"];

// EXTERNAL MODULE: ./app/page.js
var page = __webpack_require__(2114);
;// CONCATENATED MODULE: ./app/layout.js








// const [clicked, setClicked] = useState(false)
const metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            className: (layout_js_import_Inter_arguments_subsets_latin_variableName_inter_default()).className,
            children: /*#__PURE__*/ jsx_runtime_.jsx(e1, {
                children: /*#__PURE__*/ jsx_runtime_.jsx(CartContext_e1, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(ProductContext_e1, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Navbar, {}),
                            children
                        ]
                    })
                })
            })
        })
    });
}


/***/ }),

/***/ 2114:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/andresmalagon/Code/portfolio-projects/ecommerce-app/app/page.js`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 7481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"16x16"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 7272:
/***/ (() => {



/***/ })

};
;