(function () {
    let html = document.documentElement;
    if (html.className.search(/no-js/) != -1) {
        while (true) {
            alert("你可能正在使用原始人浏览器,请使用现代浏览器\r\nhttps://www.microsoft.com/zh-cn/edge")
        }
    }
})();