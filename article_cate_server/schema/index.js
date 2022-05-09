const joi = require('joi');

const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number()
// 校验规则对象 - 添加分类
exports.add_cate_schema = {
  body: {
    name,
    alias,
  },
}

exports.delete_cate_schema = {
    params: {
      id
    },
  }