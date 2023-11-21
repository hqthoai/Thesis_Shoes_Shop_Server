const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

const ProductController = {
    
    getAll: (req, res) => {
        Product.find({})
        .then ((products)=> res.status(200).json(products))
        .catch(() => res.status(404).json('Không tìm thấy danh sách sản phẩm.'));
    },

    getById: (req, res) => {
        Product.findOne({_id: req.params.id})
        .then((product) => {
           res.status(200).json(product);
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy sản phẩm.')
        })
    },

    getLatest: async (req, res) => {
        try {
            const products = await Product.find()
            .limit(5)
            .sort();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json ('Có lỗi xảy ra!')   
        }
    },
    createMany: async (req, res) => {
        try {
            const products = req.body; // Nhận danh sách sản phẩm từ JSON
        
            // Lưu các sản phẩm vào cơ sở dữ liệu
            const createdProducts = await Product.insertMany(products);
        
            res.status(200).json(createdProducts);
          } catch (error) {
            res.status(500).json({ error: 'Lỗi server' });
          }
    },

    create: (req, res) => { 
        const fileData = req.file;
        
        const productData = {...req.body, images:fileData?.path};
        try {
            const product = new Product(productData);
            product.save();
            res.status(201).json(product);
        } catch (error) {
            if (fileData)
                cloudinary.uploader.destroy(fileData.filename);
            res.status(500).json(`Xảy ra lỗi trong quá trình tạo sản phẩm :  ${err}`)
        }  
    },

    update: (req, res) => {
        Product.findOne({_id: req.params.id})
        .then((product) => {
            const fileData = req.file;
            const productData = {...req.body, images:fileData?.path};
            Product.updateOne({_id: product._id}, productData)
            .then(()=>{
                res.status(200).json('Cập nhật sản phẩm thành công.');
            })
            .catch((err)=>{
                res.status(500).json('Có lỗi xảy ra trong quá trình cập nhật sản phẩm.');
            })
        })
        .catch(()=>{
            res.status(404).json('Không tìm thấy sản phẩm.')
        })
    },

    delete: (req, res) => {
        Product.findOne({_id: req.params.id})
        .then((product)=> {
            Product.updateOne({_id: product._id}, req.body)
            .then(()=>{
                res.status(204).json('Xóa sản phẩm thành công.');
            })
            .catch((err)=> {
                res.status(500).json('Có lỗi khi xóa sản phẩm.');
            });
        })
        .catch(()=> {
            res.status(404).json('Không tìm thấy sản phẩm.');
        })
    },
    
    extractPublicIdFromURL: (imageURL)  => {
        const urlParts = imageURL.split('/');
        const fileName = urlParts[urlParts.length - 2]+ '/' + urlParts[urlParts.length - 1];
        const publicId = fileName.split('.')[0];
        return publicId;
    },

    destroy: async (req, res) => {
        try {
            const result = await Product.findOneAndDelete({_id: req.params.id});
            if (!result) {
                res.status(404).json('Không tìm thấy sản phẩm.');
            }
            else {
                const publicId = ProductController.extractPublicIdFromURL(result.images);
                
                cloudinary.uploader.destroy(publicId, (error, result) => {
                    if (error) {
                    console.error(error);
                    return res.status(500).json(`Xảy ra lỗi trong quá trình xóa sản phẩm: ${error}`);
                    }
                    res.status(204).json('Xóa vĩnh viễn sản phẩm thành công.');
                });
            }
        } catch (err) {
            res.status(500).json(`Xảy ra lỗi trong quá trình xóa sản phẩm :  ${err}`)
        }
    }
}

module.exports = ProductController;