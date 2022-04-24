# 学习内容
## 1 npm publish demo
### 1.1 npm 包的规范
### 1.2 npm publish 的方法
## 2 express demo
### 2.1 静态资源获取
### 2.2 express 路由

##  3 数据库
### 3.1 用到的包
```
npm i mysql
```
### 3.2 连接 mysql 并测试是否正常工作

## 4 session
### 4.1 搭建环境
- 托管静态页面，配合路由，完成跳转
- 存取 session 功能
- 

- ? 为什么有时候是 urlended，有时候是 json ？

## 5 JWT
- TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
- TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
- TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
- TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
- TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
- TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
