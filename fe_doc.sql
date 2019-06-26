-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: 
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!50606 SET @OLD_INNODB_STATS_AUTO_RECALC=@@INNODB_STATS_AUTO_RECALC */;
/*!50606 SET GLOBAL INNODB_STATS_AUTO_RECALC=OFF */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `fe_doc`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `fe_doc` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `fe_doc`;

--
-- Table structure for table `fe_article`
--

DROP TABLE IF EXISTS `fe_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fe_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `article_name` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` timestamp(6) NOT NULL,
  `modify_time` timestamp(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  `md` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fe_article`
--

LOCK TABLES `fe_article` WRITE;
/*!40000 ALTER TABLE `fe_article` DISABLE KEYS */;
INSERT INTO `fe_article` VALUES (58,'<h1><a id=\"_0\"></a>都是发大水发</h1>\n','111','2019-05-29 08:06:52.000000','2019-06-20 08:18:03.000000',1,'# 都是发大水发'),(60,'<p>萨达撒大所多撒das</p>\n<h1><a id=\"_1\"></a>都是废话等级考试复合大师</h1>\n','33','2019-05-29 08:37:03.000000','2019-05-31 10:12:04.000000',1,'萨达撒大所多撒das \n# 都是废话等级考试复合大师'),(61,NULL,'44','2019-05-29 08:37:20.000000','2019-06-18 11:08:26.864212',1,NULL),(64,'<h1><a id=\"44444444_0\"></a>44444444</h1>\n','44','2019-05-30 04:01:26.000000','2019-05-30 04:01:40.000000',1,'# 44444444'),(65,NULL,'55','2019-05-30 04:02:22.000000','2019-06-18 11:08:26.864212',1,NULL),(66,'<h1><a id=\"666_0\"></a>666</h1>\n','66','2019-05-30 04:03:54.000000','2019-05-30 04:04:02.000000',1,'# 666'),(68,'<h1><a id=\"3231321312_0\"></a>3231321312</h1>\n','77','2019-05-30 06:49:36.000000','2019-05-30 06:49:42.000000',1,'# 3231321312'),(69,'<h1><a id=\"woshiceshi_0\"></a>woshiceshi</h1>\n<h2><a id=\"435534_2\"></a>435534</h2>\n<blockquote>\n<p>31232132131</p>\n</blockquote>\n<blockquote>\n<p>dasdsad</p>\n</blockquote>\n','1234','2019-05-30 06:51:20.000000','2019-05-30 07:17:10.000000',1,'# woshiceshi\n\n## 435534\n\n> 31232132131\n\n> dasdsad'),(70,'<h1><a id=\"dadhasdsad_0\"></a>dadhasdsad</h1>\n','231414','2019-05-30 06:57:21.000000','2019-05-30 06:57:26.000000',1,'# dadhasdsad'),(71,'<h3><a id=\"1111111_0\"></a>1111111</h3>\n','2334','2019-05-31 07:35:33.000000','2019-05-31 07:36:22.000000',1,'### 1111111'),(72,'<h1><a id=\"2323_0\"></a>2323</h1>\n<h3><a id=\"first_2\"></a>测试流程first</h3>\n','2323','2019-05-31 07:38:36.000000','2019-06-20 02:19:05.000000',1,'# 2323 \n\n### 测试流程first'),(73,'','47657','2019-05-31 07:47:27.000000','2019-05-31 07:47:29.000000',1,''),(75,NULL,'测试23213213214124124124','2019-06-18 11:03:06.000000','2019-06-18 11:08:26.864212',1,NULL),(76,'<p>我们知道<code>webpack</code>本身只能解析js文件，但是我们的项目中肯定会有<code>html</code>,<code>css</code>,<code>图片</code>等其他文件类型，这个时候我们就需要<code>loader</code>帮我们把这些文件转化成<code>webpack</code>能够处理的有效模块。</p>\n<h2><a id=\"loader_2\"></a>什么是loader?</h2>\n<blockquote>\n<p><code>loader</code> 用于对模块的源代码进行转换。<code>loader</code> 可以使你在 <code>import</code> 或&quot;加载&quot;模块时预处理文件。因此，<code>loader</code> 类似于其他构建工具中“任务(<code>task</code>)”，并提供了处理前端构建步骤的强大方法。K 可以将文件从不同的语言（如 <code>TypeScript</code>）转换为 <code>JavaScript</code>，或将内联图像转换为 <code>data URL</code>。<code>loader</code> 甚至允许你直接在 <code>JavaScript</code> 模块中 <code>import</code> CSS文件！</p>\n</blockquote>\n<p><code>loader</code>本身就是一个函数，接收源代码为入参，输出编译过之后代码。</p>\n<h2><a id=\"loader_7\"></a>使用loader</h2>\n<p>最常使用的是在<code>webpack.config.js</code>里指定loader<br />\n<strong>webpack.config.js</strong></p>\n<pre><code class=\"lang-\">module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\n          { loader: \'style-loader\' },\n          {\n            loader: \'css-loader\',\n            options: {\n              modules: true\n            }\n          }\n        ]\n      }\n    ]\n  }\n</code></pre>\n<p><code>test</code>设置文件匹配规则</p>\n<p><code>use</code>指定使用loader</p>\n<p><code>options</code>为使用loader的配置项</p>\n<p><strong>注意：loader的执行顺序是从右向左依次执行</strong></p>\n<h2><a id=\"loader_35\"></a>常用的loader</h2>\n<p>ok，我们来看下常用的一些loader使用</p>\n<h3><a id=\"es6_37\"></a>解析es6</h3>\n<p>使用<code>babel-loader</code>，它依赖<code>babel</code>，所以需要配置文件<code>.babelrc</code></p>\n<p>而对ES6的解析，我们只需要在<code>.babelrc</code>加上如下配置即可：</p>\n<pre><code class=\"lang-\">{\n  &quot;presets&quot;: [\n    &quot;@babel/preset-env&quot;\n  ]\n}\n</code></pre>\n<p>接着配置下<code>webpack.config.js</code></p>\n<pre><code class=\"lang-\">  module: {\n    rule: [\n      {\n        test: /\\.js$/,\n        use: [\'babel-loader\'],\n        exclude: \'/node_modules/\'\n      }\n    ]\n  }\n</code></pre>\n<h3><a id=\"JSX_63\"></a>解析JSX</h3>\n<p>也是使用<code>babel-loader</code><br><br />\n首先要在<code>.babelrc</code>增加react的解析配置：</p>\n<pre><code class=\"lang-\">{\n  &quot;presets&quot;: [\n    &quot;@babel/preset-env&quot;,\n    &quot;@babel/preset-react&quot;\n  ]\n}\n</code></pre>\n<p><code>webpack.config.js</code>同上</p>\n<h3><a id=\"css_76\"></a>解析css</h3>\n<p>使用<code>css-loader</code>和<code>style-loader</code><br><br />\n<code>css-loader</code>用于加载.css文件，并且转换成commonJs对象<br><br />\n<code>style-loader</code>将样式通过<code>&lt;style&gt;</code>标签插入到<code>head</code>中<br><br />\n我们先安装一下</p>\n<p>配置<code>webpack.config.js</code></p>\n<pre><code class=\"lang-\">  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\'style-loader\', \'css-loader\']\n      }\n    ]\n  }\n</code></pre>\n<h3><a id=\"lesssass_94\"></a>解析less和sass</h3>\n<p><code>less</code>使用<code>less-loader</code><br><br />\n<code>sass</code>使用<code>sass-loader</code></p>\n<p>这两个loader都是先将文件转换成css，然后通过css-loader和style-loader输出到页面</p>\n<p>webpack.config.js</p>\n<pre><code class=\"lang-\">  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\'style-loader\', \'css-loader\', \'less-loader\']\n      }\n    ]\n  }\n</code></pre>\n<h3><a id=\"_114\"></a>解析图片</h3>\n<p><strong>1.file-loader</strong><br />\nwebpack.config.js</p>\n<pre><code class=\"lang-\">  module: {\n    rules: [\n      {\n        test: /\\.(png|svg|jpg|gif)$/,\n        use: [\'file-loader\']\n      }\n    ]\n  }\n</code></pre>\n<p><strong>2.url-loader</strong><br />\n<code>url-loader</code>功能和<code>file-loader</code>差不多，多了一个小资源转base64的功能</p>\n<p>webpack.config.js</p>\n<pre><code class=\"lang-\">  module: {\n    rules: [\n      {\n        test: /\\.(png|svg|jpg|gif)$/,\n        use: [{\n            loader: \'url-loader\',\n            options: {\n                limit: 10240\n            }\n        }]\n      }\n    ]\n  }\n</code></pre>\n<p><code>limit</code>就是对转换尺寸的限制。</p>\n<h3><a id=\"_150\"></a>链接文章</h3>\n<p><a href=\"https://juejin.im/post/5cf8a80df265da1bb67a0894\" target=\"_blank\">webpack学习之路（四）webpack-hot-middleware实现热更新</a></p>\n<p><a href=\"https://juejin.im/post/5cf882a9f265da1b695d4e33\" target=\"_blank\">webpack学习之路（三）webpack-dev-middleware</a></p>\n<p><a href=\"https://juejin.im/post/5cf72b17f265da1b7f296c51\" target=\"_blank\">webpack学习之路（二）webpack-dev-server实现热更新</a></p>\n<p><a href=\"https://juejin.im/post/5cf510f451882502f25ed78c\" target=\"_blank\">webpack学习之路（一）基础配置</a></p>\n<p>I am moving forward.</p>\n','测试','2019-06-20 02:17:32.000000','2019-06-20 02:18:13.000000',25,'我们知道`webpack`本身只能解析js文件，但是我们的项目中肯定会有`html`,`css`,`图片`等其他文件类型，这个时候我们就需要`loader`帮我们把这些文件转化成`webpack`能够处理的有效模块。\n\n## 什么是loader?\n> `loader` 用于对模块的源代码进行转换。`loader` 可以使你在 `import` 或\"加载\"模块时预处理文件。因此，`loader` 类似于其他构建工具中“任务(`task`)”，并提供了处理前端构建步骤的强大方法。K 可以将文件从不同的语言（如 `TypeScript`）转换为 `JavaScript`，或将内联图像转换为 `data URL`。`loader` 甚至允许你直接在 `JavaScript` 模块中 `import` CSS文件！\n\n`loader`本身就是一个函数，接收源代码为入参，输出编译过之后代码。\n\n## 使用loader\n最常使用的是在`webpack.config.js`里指定loader\n**webpack.config.js**\n```\nmodule: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\n          { loader: \'style-loader\' },\n          {\n            loader: \'css-loader\',\n            options: {\n              modules: true\n            }\n          }\n        ]\n      }\n    ]\n  }\n```\n`test`设置文件匹配规则\n\n`use`指定使用loader\n\n`options`为使用loader的配置项\n\n**注意：loader的执行顺序是从右向左依次执行**\n## 常用的loader\nok，我们来看下常用的一些loader使用\n### 解析es6\n使用`babel-loader`，它依赖`babel`，所以需要配置文件`.babelrc`\n\n而对ES6的解析，我们只需要在`.babelrc`加上如下配置即可：\n```\n{\n  \"presets\": [\n    \"@babel/preset-env\"\n  ]\n}\n```\n\n接着配置下`webpack.config.js`\n\n```\n  module: {\n    rule: [\n      {\n        test: /\\.js$/,\n        use: [\'babel-loader\'],\n        exclude: \'/node_modules/\'\n      }\n    ]\n  }\n```\n\n### 解析JSX\n也是使用`babel-loader`<br>\n首先要在`.babelrc`增加react的解析配置：\n```\n{\n  \"presets\": [\n    \"@babel/preset-env\",\n    \"@babel/preset-react\"\n  ]\n}\n```\n`webpack.config.js`同上\n\n### 解析css\n使用`css-loader`和`style-loader`<br>\n`css-loader`用于加载.css文件，并且转换成commonJs对象<br>\n`style-loader`将样式通过`<style>`标签插入到`head`中<br>\n我们先安装一下\n\n配置`webpack.config.js`\n\n```\n  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\'style-loader\', \'css-loader\']\n      }\n    ]\n  }\n```\n### 解析less和sass\n`less`使用`less-loader`<br>\n`sass`使用`sass-loader`\n\n这两个loader都是先将文件转换成css，然后通过css-loader和style-loader输出到页面\n\nwebpack.config.js\n\n```\n  module: {\n    rules: [\n      {\n        test: /\\.css$/,\n        use: [\'style-loader\', \'css-loader\', \'less-loader\']\n      }\n    ]\n  }\n```\n\n\n### 解析图片\n**1.file-loader**\nwebpack.config.js\n\n```\n  module: {\n    rules: [\n      {\n        test: /\\.(png|svg|jpg|gif)$/,\n        use: [\'file-loader\']\n      }\n    ]\n  }\n```\n**2.url-loader**\n`url-loader`功能和`file-loader`差不多，多了一个小资源转base64的功能\n\nwebpack.config.js\n\n```\n  module: {\n    rules: [\n      {\n        test: /\\.(png|svg|jpg|gif)$/,\n        use: [{\n            loader: \'url-loader\',\n            options: {\n                limit: 10240\n            }\n        }]\n      }\n    ]\n  }\n```\n`limit`就是对转换尺寸的限制。\n\n### 链接文章\n\n[webpack学习之路（四）webpack-hot-middleware实现热更新](https://juejin.im/post/5cf8a80df265da1bb67a0894)\n\n[webpack学习之路（三）webpack-dev-middleware](https://juejin.im/post/5cf882a9f265da1b695d4e33)\n\n[webpack学习之路（二）webpack-dev-server实现热更新](https://juejin.im/post/5cf72b17f265da1b7f296c51)\n\n[webpack学习之路（一）基础配置](https://juejin.im/post/5cf510f451882502f25ed78c)\n\n\nI am moving forward.'),(77,'<h1><a id=\"_0\"></a>打砂机肯定是考拉建档立卡撒娇的刻录机撒宽带连接啊</h1>\n','测试事实上','2019-06-20 06:39:24.000000','2019-06-20 06:39:35.000000',28,'# 打砂机肯定是考拉建档立卡撒娇的刻录机撒宽带连接啊'),(78,'<h1><a id=\"_0\"></a>碎大石</h1>\n<h1><a id=\"___1\"></a>碎大石# 碎大石# 碎大石</h1>\n<h1><a id=\"__2\"></a>碎大石# 碎大石</h1>\n<h1><a id=\"__5\"></a>碎大石# 碎大石</h1>\n<h1><a id=\"__7\"></a>碎大石# 碎大石</h1>\n','范德萨女','2019-06-20 06:41:01.000000','2019-06-20 06:42:02.000000',28,'# 碎大石\n# 碎大石# 碎大石# 碎大石\n# 碎大石# 碎大石\n\n\n# 碎大石# 碎大石\n\n# 碎大石# 碎大石'),(79,NULL,'更广泛的','2019-06-20 06:42:13.000000','2019-06-20 06:42:13.000000',28,NULL),(80,NULL,'的萨达撒达到','2019-06-20 07:17:06.000000','2019-06-20 07:17:06.000000',28,NULL),(81,'','fsfdsfdsfdsfds','2019-06-20 07:18:33.000000','2019-06-20 07:19:35.000000',28,''),(82,'','感叹号','2019-06-20 07:19:48.000000','2019-06-20 07:19:50.000000',28,''),(83,'<h1><a id=\"_0\"></a>发郭德纲的</h1>\n','粉色的辅导费','2019-06-20 07:19:57.000000','2019-06-20 07:20:03.000000',28,'# 发郭德纲的'),(85,NULL,'的萨达萨达','2019-06-20 07:56:03.000000','2019-06-20 07:56:03.000000',28,NULL),(86,NULL,'大时代','2019-06-20 07:58:32.000000','2019-06-20 07:58:32.000000',28,NULL),(87,'<h1><a id=\"fsdfsdfsfsdf_0\"></a>fsdfsdfsfsdf</h1>\n','达大厦','2019-06-20 08:17:57.000000','2019-06-20 08:22:50.000000',28,'# fsdfsdfsfsdf'),(88,NULL,'dsadada','2019-06-20 08:18:58.000000','2019-06-20 08:18:58.000000',28,NULL),(89,NULL,'dasdsadsada','2019-06-20 08:23:04.000000','2019-06-20 08:23:04.000000',28,NULL),(90,NULL,'eds','2019-06-20 08:25:13.000000','2019-06-20 08:25:13.000000',28,NULL),(91,'<h1><a id=\"fsfsdvcxcvcxvcxv_0\"></a>fsfsdvcxcvcxvcxv</h1>\n','2124234','2019-06-20 08:27:52.000000','2019-06-20 08:28:02.000000',28,'# fsfsdvcxcvcxvcxv'),(92,'<p>sfdsffd</p>\n','fsdfsdfsdfsdfsdf','2019-06-20 08:31:22.000000','2019-06-20 08:31:26.000000',28,'sfdsffd');
/*!40000 ALTER TABLE `fe_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fe_cate_first`
--

DROP TABLE IF EXISTS `fe_cate_first`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fe_cate_first` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `label` varchar(45) DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fe_cate_first`
--

LOCK TABLES `fe_cate_first` WRITE;
/*!40000 ALTER TABLE `fe_cate_first` DISABLE KEYS */;
INSERT INTO `fe_cate_first` VALUES (1,'金融','金融','jinrong',NULL,NULL),(2,'商城','商城','sc',NULL,NULL),(3,'业务','业务','yw',NULL,NULL),(9,'ceshi','ceshi','eds','2019-06-20 16:25:13',28),(10,'dda','dda','2124234','2019-06-20 16:27:52',28);
/*!40000 ALTER TABLE `fe_cate_first` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fe_cate_second`
--

DROP TABLE IF EXISTS `fe_cate_second`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fe_cate_second` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL,
  `create_time` datetime(6) DEFAULT NULL,
  `modify_time` datetime(6) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  `article_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fe_cate_second`
--

LOCK TABLES `fe_cate_second` WRITE;
/*!40000 ALTER TABLE `fe_cate_second` DISABLE KEYS */;
INSERT INTO `fe_cate_second` VALUES (54,1,'2019-05-29 16:06:52.000000',NULL,'111','1',58),(56,1,'2019-05-29 16:37:03.000000',NULL,'33','1',60),(57,1,'2019-05-29 16:37:20.000000',NULL,'44','1',61),(60,3,'2019-05-30 12:01:26.000000',NULL,'44','1',64),(61,3,'2019-05-30 12:02:22.000000',NULL,'55','1',65),(62,3,'2019-05-30 12:03:54.000000',NULL,'66','1',66),(64,3,'2019-05-30 14:49:36.000000',NULL,'77','1',68),(65,1,'2019-05-30 14:51:20.000000',NULL,'1234','1',69),(66,2,'2019-05-30 14:57:21.000000',NULL,'231414','1',70),(67,1,'2019-05-31 15:35:33.000000',NULL,'2334','1',71),(68,1,'2019-05-31 15:38:36.000000',NULL,'2323','1',72),(69,1,'2019-05-31 15:47:27.000000',NULL,'47657','1',73),(71,1,'2019-06-20 10:17:32.000000',NULL,'测试','25',76),(72,3,'2019-06-20 14:39:24.000000',NULL,'测试事实上','28',77),(73,2,'2019-06-20 14:41:01.000000',NULL,'范德萨女','28',78),(74,3,'2019-06-20 14:42:13.000000',NULL,'更广泛的','28',79),(75,3,'2019-06-20 15:17:06.000000',NULL,'的萨达撒达到','28',80),(76,3,'2019-06-20 15:18:33.000000',NULL,'fsfdsfdsfdsfds','28',81),(77,3,'2019-06-20 15:19:48.000000',NULL,'感叹号','28',82),(78,1,'2019-06-20 15:19:57.000000',NULL,'粉色的辅导费','28',83),(80,4,'2019-06-20 15:56:03.000000',NULL,'的萨达萨达','28',85),(81,5,'2019-06-20 15:58:32.000000',NULL,'大时代','28',86),(82,6,'2019-06-20 16:17:57.000000',NULL,'达大厦','28',87),(83,7,'2019-06-20 16:18:58.000000',NULL,'dsadada','28',88),(84,8,'2019-06-20 16:23:04.000000',NULL,'dasdsadsada','28',89),(85,9,'2019-06-20 16:25:13.000000',NULL,'eds','28',90),(86,10,'2019-06-20 16:27:52.000000',NULL,'2124234','28',91),(87,10,'2019-06-20 16:31:22.000000',NULL,'fsdfsdfsdfsdfsdf','28',92);
/*!40000 ALTER TABLE `fe_cate_second` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fe_category`
--

DROP TABLE IF EXISTS `fe_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fe_category` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(45) NOT NULL,
  `parent_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `type_name_UNIQUE` (`type_name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fe_category`
--

LOCK TABLES `fe_category` WRITE;
/*!40000 ALTER TABLE `fe_category` DISABLE KEYS */;
INSERT INTO `fe_category` VALUES (1,'家用电器',0),(2,'电脑办公',0),(3,'大家电',1),(4,'生活电器',1),(5,'平板电视',3),(6,'空调',3),(7,'电风扇',4),(8,'饮水机',4),(9,'电脑整机',2),(10,'电脑配件',2),(11,'笔记本',9),(12,'超极本',9),(13,'游戏本',9),(14,'CPU',10),(15,'主机',10);
/*!40000 ALTER TABLE `fe_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fe_collect`
--

DROP TABLE IF EXISTS `fe_collect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fe_collect` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fe_collect`
--

LOCK TABLES `fe_collect` WRITE;
/*!40000 ALTER TABLE `fe_collect` DISABLE KEYS */;
INSERT INTO `fe_collect` VALUES (1,64,1,'2019-06-20 14:27:37'),(3,72,28,'2019-06-20 14:29:17');
/*!40000 ALTER TABLE `fe_collect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fe_history`
--

DROP TABLE IF EXISTS `fe_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fe_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL DEFAULT 'unname',
  `modify_time` datetime(6) NOT NULL,
  `operation` varchar(45) NOT NULL DEFAULT 'edit',
  `article_name` varchar(45) DEFAULT 'name',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fe_history`
--

LOCK TABLES `fe_history` WRITE;
/*!40000 ALTER TABLE `fe_history` DISABLE KEYS */;
INSERT INTO `fe_history` VALUES (1,16,1,'大力','2019-10-10 00:00:00.000000','edit','name'),(2,16,2,'大力2号','2018-10-10 00:00:00.000000','edit','name'),(3,16,1,'daly_2','2019-05-28 17:52:41.000000','edit','name'),(4,2,1,'daly_2','2019-05-28 17:53:16.000000','create','name'),(5,2,1,'daly_2','2019-05-28 17:53:19.000000','edit','name'),(6,2,1,'daly_3','2019-05-28 18:07:55.000000','edit','name'),(7,21,1,'daly','2019-05-29 14:42:36.000000','edit','name'),(8,22,1,'daly','2019-05-29 14:42:36.000000','edit','name'),(9,23,1,'daly','2019-05-29 14:43:20.000000','edit','name'),(10,24,1,'daly','2019-05-29 14:46:10.000000','edit','name'),(11,25,1,'daly','2019-05-29 14:49:59.000000','collect','name'),(12,26,1,'daly','2019-05-29 14:52:17.000000','edit','name'),(13,27,1,'daly','2019-05-29 14:52:54.000000','edit','name'),(14,28,1,'daly','2019-05-29 14:53:20.000000','edit','name'),(15,29,1,'daly','2019-05-29 14:53:48.000000','cancel','name'),(16,30,1,'daly','2019-05-29 14:54:34.000000','edit','name'),(17,31,1,'daly','2019-05-29 14:55:02.000000','edit','name'),(18,32,1,'daly','2019-05-29 14:56:16.000000','edit','name'),(19,33,1,'daly','2019-05-29 14:56:34.000000','edit','name'),(20,34,1,'daly','2019-05-29 14:56:49.000000','edit','name'),(21,35,1,'daly','2019-05-29 14:58:07.000000','edit','name'),(22,36,1,'daly','2019-05-29 14:58:22.000000','edit','name'),(23,37,1,'daly','2019-05-29 15:00:16.000000','edit','name'),(24,38,1,'daly','2019-05-29 15:00:24.000000','edit','name'),(25,39,1,'daly','2019-05-29 15:05:29.000000','edit','name'),(26,40,1,'daly','2019-05-29 15:05:47.000000','edit','name'),(27,41,1,'daly','2019-05-29 15:06:19.000000','edit','name'),(28,42,1,'daly','2019-05-29 15:06:53.000000','edit','name'),(29,43,1,'daly','2019-05-29 15:11:43.000000','edit','name'),(30,44,1,'daly','2019-05-29 15:27:41.000000','edit','name'),(31,45,1,'daly','2019-05-29 15:31:15.000000','edit','name'),(32,46,1,'daly','2019-05-29 15:32:10.000000','edit','name'),(33,47,1,'daly','2019-05-29 15:32:46.000000','edit','name'),(34,48,1,'daly','2019-05-29 15:33:30.000000','edit','name'),(35,49,1,'daly','2019-05-29 15:34:19.000000','edit','name'),(36,50,1,'daly','2019-05-29 15:35:53.000000','edit','name'),(37,51,1,'daly','2019-05-29 15:37:51.000000','edit','name'),(38,52,1,'daly','2019-05-29 15:38:26.000000','edit','name'),(39,53,1,'daly','2019-05-29 15:39:24.000000','edit','name'),(40,54,1,'daly','2019-05-29 15:39:53.000000','edit','name'),(41,55,1,'daly','2019-05-29 15:41:27.000000','edit','name'),(42,56,1,'daly','2019-05-29 15:44:11.000000','edit','name'),(43,57,1,'daly','2019-05-29 15:46:30.000000','edit','name'),(44,58,1,'daly','2019-05-29 16:06:52.000000','edit','name'),(45,59,1,'daly','2019-05-29 16:07:36.000000','edit','name'),(46,60,1,'daly','2019-05-29 16:37:03.000000','edit','name'),(47,61,1,'daly','2019-05-29 16:37:20.000000','edit','name'),(48,62,1,'daly','2019-05-29 16:37:27.000000','edit','name'),(49,63,1,'daly','2019-05-30 11:28:22.000000','edit','name'),(50,64,222,'daly','2019-05-30 12:01:26.000000','edit','name'),(51,65,1,'daly','2019-05-30 12:02:22.000000','edit','name'),(52,66,1,'daly','2019-05-30 12:03:54.000000','edit','name'),(53,67,1,'daly','2019-05-30 14:34:11.000000','edit','name'),(54,68,222,'daly','2019-05-30 14:49:36.000000','edit','name'),(55,69,1,'daly','2019-05-30 14:51:20.000000','edit','name'),(56,70,1,'daly','2019-05-30 14:57:21.000000','edit','name'),(57,60,1,'daly_3','2019-05-30 15:16:38.000000','edit','name'),(58,69,1,'daly_3','2019-05-30 15:16:54.000000','edit','name'),(59,69,1,'daly_3','2019-05-30 15:17:10.000000','edit','name'),(60,71,1,'daly','2019-05-31 15:35:33.000000','edit','name'),(61,71,1,'daly_3','2019-05-31 15:36:22.000000','edit','name'),(62,72,1,'daly','2019-05-31 15:38:36.000000','edit','name'),(63,72,1,'daly_3','2019-05-31 15:44:01.000000','edit','name'),(64,73,1,'daly','2019-05-31 15:47:27.000000','edit','name'),(65,73,1,'daly_3','2019-05-31 15:47:29.000000','edit','name'),(66,74,1,'daly','2019-05-31 15:50:19.000000','edit','name'),(67,74,1,'daly_3','2019-05-31 15:54:51.000000','edit','name'),(68,60,1,'daly_3','2019-05-31 18:12:04.000000','edit','name'),(69,76,25,'daly','2019-06-20 10:17:32.000000','edit','name'),(70,76,25,'daly_3','2019-06-20 10:18:13.000000','edit','name'),(71,72,25,'daly_3','2019-06-20 10:19:05.000000','edit','name'),(72,58,28,'unname','2019-06-20 14:34:02.000000','collect','111'),(73,58,28,'unname','2019-06-20 14:36:04.000000','collect','111'),(74,58,28,'unname','2019-06-20 14:36:09.000000','collect','111'),(75,58,28,'unname','2019-06-20 14:36:37.000000','collect','111'),(76,58,28,'unname','2019-06-20 14:36:38.000000','cancel','111'),(77,58,28,'unname','2019-06-20 14:36:39.000000','collect','111'),(78,58,28,'unname','2019-06-20 14:36:39.000000','cancel','111'),(79,77,28,'daly','2019-06-20 14:39:24.000000','edit','name'),(80,77,28,'daly_3','2019-06-20 14:39:35.000000','edit','name'),(81,78,28,'daly','2019-06-20 14:41:01.000000','edit','name'),(82,78,28,'daly_3','2019-06-20 14:42:02.000000','edit','name'),(83,79,28,'daly','2019-06-20 14:42:13.000000','edit','name'),(84,80,28,'daly','2019-06-20 15:17:06.000000','edit','name'),(85,81,28,'daly','2019-06-20 15:18:33.000000','edit','name'),(86,81,28,'daly_3','2019-06-20 15:19:35.000000','edit','name'),(87,82,28,'daly','2019-06-20 15:19:48.000000','edit','name'),(88,82,28,'daly_3','2019-06-20 15:19:50.000000','edit','name'),(89,83,28,'daly','2019-06-20 15:19:57.000000','edit','name'),(90,83,28,'daly_3','2019-06-20 15:20:03.000000','edit','name'),(91,84,28,'daly','2019-06-20 15:21:23.000000','edit','name'),(92,84,28,'daly_3','2019-06-20 15:21:27.000000','edit','name'),(93,85,28,'daly','2019-06-20 15:56:03.000000','edit','name'),(94,86,28,'daly','2019-06-20 15:58:32.000000','edit','name'),(95,87,28,'daly','2019-06-20 16:17:57.000000','edit','name'),(96,58,28,'daly_3','2019-06-20 16:18:03.000000','edit','name'),(97,88,28,'daly','2019-06-20 16:18:58.000000','edit','name'),(98,87,28,'daly_3','2019-06-20 16:19:05.000000','edit','name'),(99,87,28,'daly_3','2019-06-20 16:22:50.000000','edit','name'),(100,89,28,'daly','2019-06-20 16:23:04.000000','edit','name'),(101,90,28,'daly','2019-06-20 16:25:13.000000','edit','name'),(102,91,28,'daly','2019-06-20 16:27:52.000000','edit','name'),(103,91,28,'daly_3','2019-06-20 16:28:02.000000','edit','name'),(104,92,28,'daly','2019-06-20 16:31:22.000000','edit','name'),(105,92,28,'daly_3','2019-06-20 16:31:26.000000','edit','name');
/*!40000 ALTER TABLE `fe_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fe_jurisdiction`
--

DROP TABLE IF EXISTS `fe_jurisdiction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fe_jurisdiction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `is_master` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fe_jurisdiction`
--

LOCK TABLES `fe_jurisdiction` WRITE;
/*!40000 ALTER TABLE `fe_jurisdiction` DISABLE KEYS */;
/*!40000 ALTER TABLE `fe_jurisdiction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fe_user`
--

DROP TABLE IF EXISTS `fe_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `fe_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `reg_time` datetime(6) DEFAULT NULL,
  `password` tinytext,
  `phone` int(11) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `character` varchar(45) NOT NULL DEFAULT 'user',
  `host` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fe_user`
--

LOCK TABLES `fe_user` WRITE;
/*!40000 ALTER TABLE `fe_user` DISABLE KEYS */;
INSERT INTO `fe_user` VALUES (1,'daly','2019-10-10 10:00:00.000000','123',NULL,NULL,'user',NULL),(2,'test2',NULL,'111111',NULL,'121212','user',NULL),(3,'test1',NULL,'qwe',NULL,'qwe','user',NULL),(4,'test1',NULL,'qwe',NULL,'qwe','user',NULL),(5,'test2',NULL,'qwe',NULL,'qwe','user',NULL),(6,'test2',NULL,'qwe',NULL,'qwe','user',NULL),(7,'3test',NULL,'12',NULL,'12','user',NULL),(8,'daly33333',NULL,'1',NULL,'a@qi.com','user',NULL),(9,'daly3333333',NULL,'122',NULL,'321321321','user',NULL),(10,'2312321',NULL,'11',NULL,'321321321321','user',NULL),(11,'34324',NULL,'3',NULL,'42432432','user',NULL),(12,'ds',NULL,'sdd',NULL,'asdsada','user',NULL),(13,'fgdc',NULL,'s',NULL,'t5gfg','user',NULL),(14,'dsads',NULL,'ff',NULL,'222','user',NULL),(15,'lk,',NULL,',j',NULL,',m','user',NULL),(16,'3',NULL,'3',NULL,'3','user',NULL),(17,'9',NULL,'d',NULL,'d','user',NULL),(18,'d',NULL,'d',NULL,'d','user',NULL),(19,'e',NULL,'e',NULL,'e','user',NULL),(20,'c',NULL,'c',NULL,'c','user',NULL),(21,'we',NULL,'wqe',NULL,'ewq','user',NULL),(22,'daly0619',NULL,'20190619',NULL,'20190619@qq.com','user',NULL),(23,'daly2019061901','2019-06-19 16:40:13.000000','2019061901',NULL,'2019061901@qq.com','user','172.16.4.152'),(24,'daly2019061902','2019-06-19 16:40:49.000000','2019061902',NULL,'2019061902@qq.com','user','172.16.4.152'),(25,'daly2019061903','2019-06-19 16:46:52.000000','2019061903',NULL,'2019061903@qq.com','user','172.16.4.152'),(26,'da','2019-06-20 14:22:42.000000','dsadsadsdas',NULL,'122480667@qq.com','user','172.16.4.152'),(27,'erererer','2019-06-20 14:23:32.000000','rerwerwrewr',NULL,'rwerwe@qq.com','user','172.16.4.152'),(28,'wewewr','2019-06-20 14:24:24.000000','rrewrewrwer',NULL,'ewewew@dda.com','user','172.16.4.152');
/*!40000 ALTER TABLE `fe_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!50606 SET GLOBAL INNODB_STATS_AUTO_RECALC=@OLD_INNODB_STATS_AUTO_RECALC */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-24 18:20:11
