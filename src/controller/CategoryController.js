const Category = require('../models/Category');

class CategoryController {
    
    getAll(req, res) {
        Category.find({})
            .then ((categories)=> res.send(categories))
            .catch(() => res.status(404).send('Không tìm thấy danh sách danh mục.'));
    }

    getById(req, res) {
        Category.findOne({_id: req.params.id})
        .then((category) => {
           res.send(category);
        })
        .catch(()=>{
            res.status(404).send('Không tìm thấy danh mục.')
        })
    }

    create(req, res) { 
        const category = new Category(req.body);
        try {
            category.save();
            res.send(category);
        } catch (error) {
            res.status(500).send('Xảy ra lỗi trong quá trình tạo danh mục.')
        }  
    }

    update(req, res) {
        Category.findOne({_id: req.params.id})
        .then((category) => {
            Category.updateOne({_id: category._id}, req.body)
            .then(()=>{
                res.status(200).send('Cập nhật danh mục thành công.');
            })
            .catch((err)=>{
                res.status(500).send('Có lỗi xảy ra trong quá trình cập nhật danh mục.');
            })
        })
        .catch(()=>{
            res.status(404).send('Không tìm thấy danh mục.')
        })
    }

    delete(req, res) {
        Category.findOne({_id: req.params.id})
        .then((category)=> {
            Category.updateOne({_id: category._id}, req.body)
            .then(()=>{
                res.status(200).send('Xóa danh mục thành công.');
            })
            .catch((err)=> {
                res.status(500).send('Có lỗi khi xóa danh mục.');
            });
        })
        .catch(()=> {
            res.status(404).send('Không tìm thấy danh mục.');
        })
    }

    async destroy (req, res) {
        try {
            const result = await Category.deleteOne({_id: req.params.id});
            if (result.deletedCount===0) {
                res.status(404).send('Không tìm thấy danh mục.');
            }
            else {
                res.status(200).send('Xóa vĩnh viễn danh mục thành công.');
            }
        } catch (error) {
            res.status(500).send('Có lỗi khi xóa danh mục');
        }
    }
}


module.exports  = new CategoryController;