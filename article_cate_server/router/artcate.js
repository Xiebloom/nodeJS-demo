const router = require('express').Router()
const artcate_handler = require('../router_handler/artcate')
const expressJoi = require('../expressJoi')
const schemas = require('../schema')

router.get('/', artcate_handler.homePage)

router.get('/cates', artcate_handler.getArticleCates)

router.post('/addcates', expressJoi(schemas.add_cate_schema), artcate_handler.addArticleCates)

router.get('/deletecate/:id', expressJoi(schemas.delete_cate_schema), artcate_handler.deleteCateById)

router.get('/cates/:id', artcate_handler.getArticleById)

module.exports = router