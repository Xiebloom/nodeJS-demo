const express = require('express');
const router = express.Router();
const routerHandler = require('../router_handler/my')
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema');
const expressJoi = require('@escook/express-joi')

router.get('/info', expressJoi(update_userinfo_schema), routerHandler.getUserInfo)
router.post('/updatepwd', expressJoi(update_password_schema), routerHandler.updatePwd)
router.post('/update/avatar', expressJoi(update_avatar_schema), routerHandler.updateAvatar)

module.exports = router