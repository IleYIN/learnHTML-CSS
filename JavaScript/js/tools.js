/* 
           speed 正负值应该由函数内部来处理
           attr 要执行的动画样式 比如left top width height
           callback 回调函数 动画执行完毕以后执行
       */
function move(obj, attr, target, speed, callback) {

    //关闭上一个定时器
    clearInterval(obj.timer);

    /* 判断速度的正负值 */
    var current = parseInt(getStyle(obj, attr));
    if (current > target) {
        speed = -speed;
    }


    //向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
    obj.timer = setInterval(function () {
        // console.log(getStyle(obj,attr)); 如果不一开始给设置好left和top 很有可能默认是auto！！！就无法获取数值了！！！

        var oldValue = parseInt(getStyle(obj, attr));
        // console.log(oldValue);


        //获取box1的原来的left值
        // var oldValue = obj.offsetLeft;
        //有可能修改各种，不止offsetLeft，比如height，故用更常用的之前定义过的getSytle
        var newValue = oldValue + speed;

        if ((speed > 0 && newValue > target) || (speed < 0 && newValue < target)) {
            newValue = target;
        }
        // console.log(newValue);


        /* 
            obj.style.left = newValue + "px";
            attr是变量，不能用. 要用[]
        */
        obj.style[attr] = newValue + "px";


        //元素移到target 时停止动画
        if (newValue === target) {
            clearInterval(obj.timer);
            // if (callback != null) {
            //     callback();
            // }
            callback && callback();
        }
    }, 30);

}



function getStyle(obj, name) {
    // getComputedStyle(obj, null).name;//cannot write like this, name is a variable

    if (window.getComputedStyle) {
        /*
            if browser has this method,
            here we use window.getComputedStyle which is an attribute
            not use getComputedStyle which is a variable, if variable is not found, it will raise un error
        */

        return getComputedStyle(obj, null)[name];
    } else {
        return obj.currentStyle[name];
    }

    //or 
    // return window.getComputedStyle ? getComputedStyle(obj, null)[name] : obj.currentStyle[name];
}

//定义一个函数，用来向一个元素中添加指定的class属性值
/* 
    参数：obj 要添加class属性的元素
 */
function addClass(obj, cn) {
    //检查是否含有cn
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}

//判断一个元素中是否含有指定的class属性值
function hasClass(obj, cn) {
    //不能写等于 要用含有 用正则表达式
    // return obj.className == cn;

    //  \b表示独立词汇
    // var reg = /\bb2\b/;

    //动态写出正则表达式
    var reg = new RegExp("\\b" + cn + "\\b");
    // alert(reg);
    return reg.test(obj.className);
}

// 删除一个元素中的指定的class属性
function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    obj.className = obj.className.replace(reg, "");
}

/* 
    toggleClass可以用来切换一个类
    如果元素中具有该类,则删除
    如果元素中没有该类,则添加
 */
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}