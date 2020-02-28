const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product.ejs', {
        pageTitle: 'Add Product',
        path: 'admin/add-product.ejs',
        activeAddProduct: true,
        productCSS: true,
        editig: false
    });
}

exports.postAddProduct = (req, res, next) => {

    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const imageUrl = req.body.imageUrl;
    const desc = req.body.description;

    const product = new Product(productName, productPrice, desc, imageUrl, null, req.user._id);

    product.save()
        .then(result => {
            Product.getAllProducts()
                .then(products => {
                    res.render('admin/products.ejs', {
                        datas: products,
                        pageTitle: 'Product-List',
                        path: 'admin/product-list.ejs'
                    })
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

exports.getProductList = (req, res, next) => {
    Product.getAllProducts()
        .then(products => {
            res.render('admin/products.ejs', {
                datas: products,
                pageTitle: 'Product-List',
                path: 'admin/product-list.ejs'
            })
        }).catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.getProductById(prodId)
        .then(product => {
            res.render('admin/edit-product.ejs', {
                pageTitle: 'Edit Product',
                path: 'admin/edit-product',
                productForEdit: product
            });
        })
        .catch(err => console.log(err));
}


exports.postEditData = (req, res, next) => {
    const updatedProductName = req.body.productName;
    const updatedProductPrice = req.body.productPrice;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const prodId = req.body.productId;
    const userId = req.user._id;

    const product = new Product(updatedProductName, updatedProductPrice, updatedDesc, updatedImageUrl, prodId, userId);

    product.productName = updatedProductName;
    product.productPrice = updatedProductPrice;
    product.imageUrl = updatedImageUrl;
    product.desc = updatedDesc;


    product.save()
        .then(result => {
            Product.getAllProducts()
                .then(products => {
                    res.render('admin/products.ejs', {
                        datas: products,
                        pageTitle: 'Product-List',
                        path: 'admin/product-list.ejs'
                    })
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

}


exports.deleteData = (req, res, next) => {
    Product.deleteProductById(req.params.productId)
        .then(() => {
            Product.getAllProducts()
                .then(products => {
                    res.render('admin/products.ejs', {
                        datas: products,
                        pageTitle: 'Product-List',
                        path: 'admin/product-list.ejs'
                    })
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}