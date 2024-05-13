/**
 * 事件相关工具类
 */
let EventUtil = {
    /**
     * 绑定事件处理函数
     * 
     * @param {Element} element 要绑定事件监听的元素 
     * @param {string} type 事件类型
     * @param {function} handler 处理函数
     */
    addHandler: function (element, type, handler) {
        if (element.addEventListener)
            element.addEventListener(type, handler, false);
        else if (element.attachEvent)
            element.attachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },

    /**
     * 删除事件处理函数
     * 
     * @param {Element} element 要删除事件监听的元素 
     * @param {string} type 事件类型
     * @param {function} handler 处理函数
     */
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener)
            element.removeEventListener(type, handler, false);
        else if (element.detachEvent)
            element.detachEvent("on" + type, handler);
        else
            element["on" + type] = handler;
    },

    /**
     * 监听触摸事件的方向
     * @param {Element} target 要绑定监听的目标元素
     * @param {boolean} isPreventDefault 是否屏蔽掉触摸滑动的默认行为(例如页面的上下滚动,缩放等)
     * @param {function} upCallback 向上滑动的监听回调(若不关心,可以不传,或传false)
     * @param {function} rightCallback 向右滑动的监听回调(若不关心,可以不传,或传false)
     * @param {function} downCallback 向下滑动的监听回调(若不关心,可以不传,或传false)
     * @param {function} leftCallback 向左滑动的监听回调(若不关心,可以不传,或传false)
     */
    listenTouchDirection: function (target, isPreventDefault, upCallback, rightCallback, downCallback, leftCallback) {
        let startX;
        let startY;
        // 触摸相关事件统一回调函数
        function handleTouchEvent(event) {
            switch (event.type) {
                case "touchstart": // 开始触摸
                    startX = event.touches[0].pageX;
                    startY = event.touches[0].pageY;
                    break;
                case "touchend": // 触摸结束
                    let spanX = event.changedTouches[0].pageX - startX;
                    let spanY = event.changedTouches[0].pageY - startY;

                    if (Math.abs(spanX) > Math.abs(spanY)) { // 认定为水平方向滑动
                        if (spanX > 30) { // 认定为向右
                            if (rightCallback)
                                rightCallback();
                        } else if (spanX < -30) { // 认定为向左
                            if (leftCallback)
                                leftCallback();
                        }
                    } else { // 认定为垂直方向滑动
                        if (spanY > 30) { // 认定为向下
                            if (downCallback)
                                downCallback();
                        } else if (spanY < -30) { // 认定为向上
                            if (upCallback)
                                upCallback();
                        }
                    }
                    break;
                case "touchmove": // 触摸滑动
                    if (isPreventDefault)
                        // 阻止默认行为
                        event.preventDefault();
                    break;
            }
        }
        // 为三个滑动相关的事件绑定回调函数
        this.addHandler(target, "touchstart", handleTouchEvent);
        this.addHandler(target, "touchend", handleTouchEvent);
        this.addHandler(target, "touchmove", handleTouchEvent);

        // 移除三个滑动相关的事件的闭包
        this.removeAll = function () {
            this.removeHandler(target, "touchstart", handleTouchEvent);
            this.removeHandler(target, "touchend", handleTouchEvent);
            this.removeHandler(target, "touchmove", handleTouchEvent);
        }
    },
};