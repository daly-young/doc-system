# Daly-Doc文档系统

## 技术栈
`Vue-cli3` + `elementUI` + `Egg` + `MySql`

## 功能
* 文档的增删改查
* 目录的增加
* 用户注册登录
* 用户文章收藏
* 用户操作记录

## Quick Start
```
// 前端静态
cd document-front
npm i
npm run serve

// node服务
cd ../document-server
npm i
npm run dev
```

## 部署到线上
**1.前端静态，修改打包输出路径**

`vue.config.js`

```
outputDir: '需要的位置',
```

**2.配置nginx,指向打包输出目录**

**3.配置nginx，设置接口代理**

**4.node服务，数据库连接配置**

`config/config.pro.js`

```
config.mysql = {
	// 单数据库信息配置
	client: { 
		host: 'localhost',
		// 端口号
		port: '3306',
		// 用户名
		user: 'root',
		// 数据库名
		database: 'xxx',
		// 密码
		password: '123456',
	},
};
```

5.启动node服务

```
cd document-server
npm start
```



