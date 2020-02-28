const Product = require('../models/product');



exports.getHomePage = (req, res, next) => {
    //console.log(adminData.data);
    res.render('homePage/shop.ejs', {
        pageTitle: 'Home',
        path: 'homePage/shop.ejs'
    });
}



exports.getProductsPage = (req, res, next) => {

    Product.getAllProducts()
        .then(products =>
            res.render('shop/product-list', {
                datas: products,
                pageTitle: 'Product-List',
                path: 'users/products'
            })
        )
        .catch(err => console.log(err));
}


exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    console.log(productId)

    Product.getProductById(productId)
        .then(product => {
            console.log(product);
            res.render('shop/product-details', {
                data: product,
                pageTitle: 'Details',
                path: 'users/products'
            })
        })
        .catch(err => console.log(err));
}


exports.postCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.getProductById(productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err));
}


exports.getCart = (req, res, next) => {

    req.user.getCart()
        .then(items => {
            res.render('shop/cart', {
                path: 'user/cart',
                pageTitle: 'Cart',
                cart: items
            })
        })
        .catch(err => console.log(err));
}


exports.deleteFromCart = (req, res, next) => {
    const id = req.body.productId;
    req.user.deleteItemFromCart(id);
    res.redirect('/cart');
}

exports.postOrder = (req, res, next) => {
    req.user.addOrder()
        .then(result => {
            res.redirect('/order')
        })
        .catch(err => console.log(err));
}

exports.getOrder = (req, res, next) => {
    req.user.getOrder()
        .then(orders => {
            res.render('shop/order', {
                path: 'user/order',
                pageTitle: 'Your Orders',
                orders: orders
            })
        })
        .catch(err => console.log(err));
}


// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkOut')
// }