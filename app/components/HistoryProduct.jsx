import React from 'react'

const HistoryProduct = ({ order, cart, total, date }) => {


    console.log(order)

    // const calculateGrandTotal = (order) => {
    //     let sum = 0
    //     for (let i = 0; i < order.length; i++) {
    //         sum += order[i].totalPrice
    //         console.log(sum)
    //     }

    //     return sum.toFixed(2)
    // }



    // function calculateGrandTotal(order) {
    //     console.log(order.reduce((total, item) => total + item.totalPrice, 0));
    // }




    return (

        <div className="border-t-2 py-3">
            <div>Date ordered: {date}</div>
            {Object.values(cart).map((item) => (
                <div >
                    <img
                        className="h-16 w-16"
                        src={item.product.image}></img>
                    <p key={item.productId}>{item.product.title}</p>
                    {/* <p>Total: {item.totalPrice}</p> */}
                </div>
            ))}
            <p className="my-5">Total: ${total}</p>
        </div>

    )
}

export default HistoryProduct
