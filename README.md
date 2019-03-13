# taobao

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 生成挂架屏json
webpack --config ./webpack.skeleton.conf.js

# 骨架屏注入
node skeleton.js

#注意，作为模板的html文件，需要在被写入内容的位置添加<!--vue-ssr-outlet-->占位符，本例子在div#app里写入：

<div id="app">
 <!--vue-ssr-outlet-->
</div>
```
# 效果演示

[查看demo请戳这里](http://index.kiwifruits.cn/taobao/)（请用chrome手机模式预览，配置网络浏览器）

## 请在谷歌网络浏览器下预览，解决axios跨域问题请在后端配置   windows谷歌浏览器属性目标后添加 --user-data-dir="c:\ChromeDebug" --test-type --disable-web-security
## 请在谷歌网络浏览器下预览，解决axios跨域问题请在后端配置   mac 命令行打开谷歌浏览器open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=自定义存储位置
###部分截图事例

<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/1.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/2.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/3.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/4.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/5.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/6.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/7.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/8.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/9.png" width="365" height="619"/>
<img src="https://github.com/wkiwi/taobao/blob/master/static/img/demo/10.png" width="365" height="619"/>


