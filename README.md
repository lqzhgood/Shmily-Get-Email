## 说明

请先阅读 https://github.com/lqzhgood/Shmily

此工具是将 Email 转换为 `Shmily-Msg` 格式的工具

## 使用

    0. 安装 node 环境 [http://lqzhgood.github.io/Shmily/guide/setup-runtime/nodejs.html]
    1. 通过 Foxmail 下载并导出 Email 放置到 `input` 文件夹
    2. 修改 `config.js`
        - STATIC_URL_WHILE_LIST
            会将 Email 中的资源文件(如图片)本地化, 如某链接不需要, 请加入白名单
        - MSG_BEFORE
            Email 内容处理前置钩子函数
        - MSG_AFTER
             Email 内容处理后置钩子函数
    3. 执行 `node index.js`
    4. `dist` 获取 数据文件 和 资源文件

### 重要

由于 2021/02/12 时并没有很好用来解析 `.eml` 的库，各种库对于编码都没有很好地处理，找了两个库来分别解析，取各自所长。<br/>
两个库都没有对中文进行很好的处理 所以需要手动进行一下操作<br/>

-   所有 .eml 文件编码需要是 `utf-8` <br/>
-   因为以上原因 文件 body 里面的 charset=xxxxx --> 要替换为 charset=utf-8
    -   `Content-Type: text/plain; charset=utf-8`
    -   `charset="gbk"`

`eml-format-master` 这个库由于长时间没人打理，下载下来手动进行了现有(2021 年 2 月 13 日，0:09:31 前) PR 的 merger。<br/>

### 吐槽

邮件体标准也是无力吐槽... 头部竟然可以不要 `Date` 收件人啥的也可以不要。。。 <br />
一定记得自行核对结果
