/**
 * 控制切换当前网页浏览的部分
 */

/**
 * 切换当前浏览的部分
 * 
 * @param {string} sectionId 当前要显示的部分的id
 */
function change(sectionId) {
    // 隐藏当前原本显示的部分
    $("#main #" + window.nowSectionId).fadeOut("fast", function () {
        $("#main #" + window.nowSectionId).attr("style", "display:none !important");
        // 显示当前现在要显示的部分
        $("#main #" + sectionId).fadeIn("fast");
        window.nowSectionId = sectionId;
    });

    // 关闭切换界面
    controlFrame();
}

/**
 * 打开/关闭切换界面
 */
function controlFrame() {
    // 关闭提示如何切换的信息
    $(".alert").alert("close");

    // 打开/关闭切换界面
    $("#controlFrame").fadeToggle(500, function () {
        if ($("#controlFrame").attr("style") != "") {
            $("#controlFrame").attr("style", "display:none !important");
        }
    });
}