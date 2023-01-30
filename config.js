const path = require('path');

module.exports = {
    myKeyWords: ['goEmailKeyWord@key.com'], // right go number
    herKeyWords: ['comeEmailKeyWord@key.com'], // left come number
    otherWhileKeyWords: ['service@tencent.com'], // left come number

    // 不处理的 url 白名单
    STATIC_URL_WHILE_LIST: [
        'https://keep-sharing.google.com/share?note=1THTeZ1itZYj4Fiy_XU53fQimAUWgVr2aAE7obhHXpoAoyI3VYhkjHJXLxv03ZaFjsUQp&amp',
        'https://www.google.',
        'http://cn.mail.yahoo.com',
        'http://keep.google.com',
        'http://cn.mail.yahoo.com/',
        'http://www.hunanpta.com/html/zkzdy/',
        '//W3C//DTD',
        '//EN',
        'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd',
        'http://www.w3.org/1999/xhtml',
        'http://www.google.com/m/privacy',
        'http://m.google.com/static/tos_en-US.html',
        'http://m.google.com/latitude',
        'http://m.google.com/tospage?hl=zh_cn',
        'https://www.google.com/latitude/history/dashboard?hl=zh_cn',
        'http://www.google.com/m/privacy?hl=zh_cn',
        'https://www.google.com/latitude?hl=zh_cn',
        'http://fanyu.jczacm.com/jump/jump.php?FgEKXhIuMUMFJxwQL0EzFj1UMRsDOz0WAR5SFipUVwUENDUfAkEwUz9UDwY8JCVSLx0kDBAiWgkHNCJfLiczGzwiBEEsDjUSADcSGhIxMkorNyYRLicrFFUFDxoDDQc5ChdbV0JAFxIVCE5fW0pSVVUSEx9bUkNRU0RAFBoSCywTDk5WRQYLPB0HDhZbFh5ADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_01.gif',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_02.gif',
        'http://fanyu.jczacm.com/jump/jump.php?FgEKXhIuMUMFJxwQL0EzFj1UMRsDOz0WAR5SFipUVwUENDUfAkEwUz9UDwY8JCVSLx0kDBAiWgkHNCJfLiczGzwiBEEsDjUSADcSGhIxMkorNyYRLicrFFUFDxoDDQc5ChdbV0JAFxIVCE5fW0pSVVUSEx9bUkNRU0RAFBoSCywTDk5WRQYLPB0HDhZbFh5ADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_03.gif',
        'http://fanyu.jczacm.com/jump/jump.php?AhASChwIXkFAFxIVCE5fW0pSVVUBERwTE05WRR4HCh9bUEJQVEtQV0VQIwIXTRAJDg__',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_04.gif',
        'http://fanyu.jczacm.com/jump/jump.php?AhASChwIXkBAFwMKXkJWVENRRQcHEBhbWktfV0VABAEJFgNbU1ULAhoKXkBXVUReVUdQVTMXEl0FDB4_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_05.gif',
        'http://fanyu.jczacm.com/jump/jump.php?FgEKXhIuMUMFJxwQL0EzFj1UMRsDOz0WAR5SFipUVwUENDUfAkEwUz9UDwY8JCVSLx0kDBAiWgkHNCJfLiczGzwiBEEsDjUSADcSGhIxMkorNyYRLicrFFUFDxoDDQc5ChdbV0JAFxIVCE5fW0pSVVUSEx9bUkNRU0RAFBoSCywTDk5WRQYLPB0HDhZbFh5ADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_06.jpg',
        'http://fanyu.jczacm.com/jump/jump.php?FgEKXhIuMUMFJxwQL0EzFj1UMRsDOz0WAR5SFipUVwUENDUfAkEwUz9UDwY8JCVSLx0kDBAiWgkHNCJfLiczGzwiBEEsDjUSADcSGhIxMkorNyYRLicrFFUFDxoDDQc5ChdbV0JAFxIVCE5fW0pSVVUSEx9bUkNRU0RAFBoSCywTDk5WRQYLPB0HDhZbFh5ADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_07.jpg',
        'http://fanyu.jczacm.com/jump/jump.php?FgEKXhIuMUMFJxwQL0EzFj1UMRsDOz0WAR5SFipUVwUENDUfAkEwUz9UDwY8JCVSLx0kDBAiWgkHNCJfLiczGzwiBEEsDjUSADcSGhIxMkorNyYRLicrFFUFDxoDDQc5ChdbV0JAFxIVCE5fW0pSVVUSEx9bUkNRU0RAFBoSCywTDk5WRQYLPB0HDhZbFh5ADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_08.jpg',
        'http://fanyu.jczacm.com/jump/jump.php?FgEKXhIuMUMFJxwQL0EzFj1UMRsDOz0WAR5SFipUVwUENDUfAkEwUz9UDwY8JCVSLx0kDBAiWgkHNCJfLiczGzwiBEEsDjUSADcSGhIxMkorNyYRLicrFFUFDxoDDQc5ChdbV0JAFxIVCE5fW0pSVVUSEx9bUkNRU0RAFBoSCywTDk5WRQYLPB0HDhZbFh5ADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_09.jpg',
        'http://fanyu.jczacm.com/jump/jump.php?FgEKXhIuMUMFJxwQL0EzFj1UMRsDOz0WAR5SFipUVwUENDUfAkEwUz9UDwY8JCVSLx0kDBAiWgkHNCJfLiczGzwiBEEsDjUSADcSGhIxMkorNyYRLicrFFUFDxoDDQc5ChdbV0JAFxIVCE5fW0pSVVUSEx9bUkNRU0RAFBoSCywTDk5WRQYLPB0HDhZbFh5ADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_10.jpg',
        'http://fanyu.jczacm.com/jump/jump.php?FgEKXhIuMUMFJxwQL0EzFj1UMRsDOz0WAR5SFipUVwUENDUfAkEwUz9UDwY8JCVSLx0kDBAiWgkHNCJfLiczGzwiBEEsDjUSADcSGhIxMkorNyYRLicrFFUFDxoDDQc5ChdbV0JAFxIVCE5fW0pSVVUSEx9bUkNRU0RAFBoSCywTDk5WRQYLPB0HDhZbFh5ADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'http://curmar.ecaiwang.com/20150227/66142500869395zbra/images/7tlk_11.jpg',
        'http://fanyu.jczacm.com/jump/open.php?FwMKXkJWVENRRQcHEBhbWktfV0VADhIPD05VUkVRW0VSVUUmEgJIABwLRQADDRcSCh4DXkJSUUVTUUpfVkU_',
        'https://www.google.com/calendar/render?mode=day&date=20150527T143924',
        'https://www.google.com/calendar/render?mode=day&date=20150527T144000',
        'https://www.google.com/latitude?tab=sharingrequest&amp',
        'http://tangaken.bokee.com/photo/view.fcgi?id=7699518&amp',
    ],

    // 一定要用  `` 包裹字符
    MSG_BEFORE: [
        {
            from: `http://mail.qq.com/viewfcard.html?link=http://res.mail.qq.com/zh_CN/greetingcard/card/b90.swf&from=`,
            to: 'http://res.mail.qq.com/zh_CN/greetingcard/flash/sr/03/sr0303.swf',
        },
        {
            from: `http://mail.qq.com/viewfcard.html?link=http://res.mail.qq.com/zh_CN/greetingcard/flash/sr/03/sr0303.swf&from=`,
            to: 'http://res.mail.qq.com/zh_CN/greetingcard/flash/sr/03/sr0303.swf',
        },
        {
            md5: '498561ff5d8f705935b05fa9ca9f2ea0',
            from: 'newicon/fj_max/fu_mov.gif',
            to: 'https://rescdn.qqmail.com/zh_CN/htmledition/images/xdisk/ico_mid/fu_mov.gif',
        },

        // qq show
        { md5: '9cd093a339d8b9c770327deba2e75c63', fn: replaceQQShow },
        { md5: 'b4cbffa602b3ffb9b6396e2f3678aca5', fn: replaceQQShow },
        { md5: 'e67e70f1ff42f34fa72e2db76e9cdaeb', fn: replaceQQShow },
        { md5: '40d9a34204ab013094eec27eba62f762', fn: replaceQQShow },
        { md5: 'b4295ebae9caa26ee69f0312659c5273', fn: replaceQQShow },
        { md5: '0c91d211d031a80b5de3e6c0c3d7d615', fn: replaceQQShow },
        { md5: 'b99e9980e12dd628f863d9b6ac993725', fn: replaceQQShow },
        { md5: '395184659d9b5128083af2d80c7c8084', fn: replaceQQShow },
        { md5: 'e8e02500c904f9a24cb293be4a976bec', fn: replaceQQShow },
        { md5: '59500c223c7749fa197d7a925a9dccf0', fn: replaceQQShow },
        { md5: 'afebf3db1d25fe2bc595e4a70afba5ae', fn: replaceQQShow },
        { md5: '23b3179efdbb3a638bdd288789a66caa', fn: replaceQQShow },
        { md5: 'dd537c0475d1efe2b1be8d4bd5ac58c0', fn: replaceQQShow },
        { md5: '74d0db76068177619c424beb36df1b93', fn: replaceQQShow },
        { md5: 'd3f89c68a54b9d43a753c7f6664cc600', fn: replaceQQShow },
        // flower
        { md5: '4b86da9227edbc69ab51316fce738cb7', fn: replaceFlowerMail },
        { md5: '266034c3575e9538c27a228f9f63b8bc', fn: replaceFlowerMail },
        { md5: 'b3c9985d2e33fb5928e6b9b26a3bf004', fn: replaceFlowerMail },
        { md5: '77953055d58e958ec1fbcab22409dd7d', fn: replaceFlowerMail },
        { md5: 'af9e75f87f0480187a02292c4a552b9f', fn: replaceFlowerMail },
        {
            md5: '4a11d7b1964b210c76562ecce7479101',
            fn: (res1, res2) => {
                res1.date = 1270090465 * 1000;
                return { res1, res2 };
            },
        },
    ],
    MSG_AFTER: [
        {
            md5: '8db4a11d4298a48b522aa62dbe28f29d',
            fn: msg => {
                msg.$Email.attachments.push({
                    name: 'Cursors.rar',
                    originName: 'Cursors.rar',
                    url: `unknown`,
                    ext: '.rar',
                    size: '5.33M',
                });
            },
        },
    ],

    // 如无必要 请勿修改
    WEB_PUBLIC_DIR: './data/Email',
    DIST_WEB_DIR: path.join(__dirname, './dist/data/Email'),
    EXTRA_ATTACHMENTS: ['.swf'],
};

function replaceFlowerMail(res1, res2) {
    const code = res1.html.match(/__show_prm\s?=\s?"(.+)"/m)[1];
    res1.html = `<iframe src="./static/msg/source/Email/flower_mail/index.html?${code}" width="670px" height="370px" scrolling="no" frameborder="0"></iframe>`;
    return { res1, res2 };
}

function replaceQQShow(res1, res2) {
    const code = res1.html.match(/__show_prm\s?=\s?"(.+)"/m)[1];
    res1.html = `<iframe src="./static/msg/source/Email/qq_show/index.html?${unescape(
        code,
    )}" width="670px" height="440px" scrolling="no" frameborder="0"></iframe>`;
    return { res1, res2 };
}
