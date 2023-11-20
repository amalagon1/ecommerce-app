import React from 'react'
import { BsCheckCircleFill } from 'react-icons/bs'


const page = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <main className="max-w-screen-lg mx-auto my-14">
                <div className="flex flex-col p-10 bg-white">
                    <div className="flex items-center space-x-2 mb-5">
                        <BsCheckCircleFill className="text-green-500 text-3xl" />
                        <h1 className="text-3xl">
                            Thank you, your order has been placed!
                        </h1>
                    </div>
                    <p>Thank you for shopping with us. We'll send a confirmation once the item has been shipped. If you would like to check the status of your order(s) please click the link below.</p>
                    <button className="mt-8">Got to my orders</button>
                </div>

            </main>

        </div>
    )
}

export default page
