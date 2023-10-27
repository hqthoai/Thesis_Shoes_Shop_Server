const Product = require('../models/Product');

class ProductController {
    
    getAll(req, res) {
        Product.find({})
        .then ((products)=> res.send(products))
        .catch(() => res.status(404).send('Không tìm thấy danh sách sản phẩm.'));
    }

    getById(req, res) {
        Product.findOne({_id: req.params.id})
        .then((product) => {
           res.send(product);
        })
        .catch(()=>{
            res.status(404).send('Không tìm thấy sản phẩm.')
        })
    }

    create(req, res) { 
        const product = new Product(req.body);
        try {
            product.save();
            res.send(product);
        } catch (error) {
            throw Error(`Xảy ra lỗi trong quá trình tạo sản phẩm :  ${err}`)
        }  
    }

    update(req, res) {
        Product.findOne({_id: req.params.id})
        .then((product) => {
            Product.updateOne({_id: product._id}, req.body)
            .then(()=>{
                res.status(200).send('Cập nhật sản phẩm thành công.');
            })
            .catch((err)=>{
                res.status(500).send('Có lỗi xảy ra trong quá trình cập nhật sản phẩm.');
            })
        })
        .catch(()=>{
            res.status(404).send('Không tìm thấy sản phẩm.')
        })
    }

    delete(req, res) {
        Product.findOne({_id: req.params.id})
        .then((product)=> {
            Product.updateOne({_id: product._id}, req.body)
            .then(()=>{
                res.status(200).send('Xóa sản phẩm thành công.');
            })
            .catch((err)=> {
                res.status(500).send('Có lỗi khi xóa sản phẩm.');
            });
        })
        .catch(()=> {
            res.status(404).send('Không tìm thấy sản phẩm.');
        })
    }

    async destroy (req, res) {
        try {
            const result = await Product.deleteOne({_id: req.params.id});
            if (result.deletedCount===0) {
                res.status(404).send('Không tìm thấy sản phẩm.');
            }
            else {
                res.status(200).send('Xóa vĩnh viễn sản phẩm thành công.');
            }
        } catch (error) {
            throw Error(`Xảy ra lỗi trong quá trình xóa sản phẩm :  ${err}`)
        }
    }

}

module.exports  = new ProductController;