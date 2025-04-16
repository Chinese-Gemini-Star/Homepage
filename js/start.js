/**
 * 初始化页面内容
 */
$(function () {
    // 控制台输出彩蛋
    egg();

    // 载入网页界面
    rotate(showFrame);
});

/**
 * 旋转方块1周
 * 
 * @param {function} next 旋转动画结束后调用的函数
 */
function rotate(next) {
    let angle = 0;
    let intervalId = setInterval(function () { // 注册线程进行旋转
        angle += 5;
        $("#start img").rotate(angle);

        if (angle == 360) { // 完成旋转
            clearInterval(intervalId); // 取消掉当前的进程
            next(); // 调用回调函数
        }
    }, 25);
}

/**
 * 显示网页界面
 */
function showFrame() {
    // 左上的三角形归位
    $("#start #left_corner").animate({
        margin: "0",
        top: "7%",
        left: "7%",
    }, 1000);
    // 右下的三角形归位
    $("#start #right_corner").animate({
        bottom: "7%",
        right: "7%",
    }, 1000);
    $("#start").animate({
        "z-index": -1,
    }, 1000);

    // 隐藏加载界面的背景
    $(".background").fadeOut(1000, function () {
        // 显示主界面
        $("#main").fadeIn(500, function () {
            // 初始显示个人介绍部分
            $("#main #introduction").fadeIn("fast");
            window.nowSectionId = "introduction";
            // 显示切换按钮
            $("#controlButton").fadeIn("fast");

            // 提示可以点击按钮切换
            $(".alert").fadeIn("fast");
        });
    });
}

/**
 * 控制台输出彩蛋
 */
function egg() {
    console.log("别看了,呜呜呜,我是个前端菜鸡");
}