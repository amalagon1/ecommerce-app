const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items } = req.body;

    console.log(items);

    // const redirectURL =
    //     process.env.NODE_ENV === 'development'
    //         ? 'http://localhost:3000'
    //         : 'https://stripe-checkout-next-js-demo.vercel.app';

    const transformedItems = items.map(item => ({
        description: item.description,
        quantity: item.qty,
        price_data: {
            currency: 'usd',
            unit_amount: item.product.price * 100,
            product_data: {
                name: item.product.title,
                images: [item.product.image]
            },
        }
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/`,
        metadata: {
            images: JSON.stringify(items.map(item => item.image))
        }
        // success_url: redirectURL + '?status=success',
        // cancel_url: redirectURL + '?status=cancel',

    });
    res.status(200).json({ id: session.id })
    // res.json({ id: session.id });
};

// export default CreateStripeSession;