window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    //获得focus宽度
    var w = focus.offsetWidth;
    var index = 0;
    //定时器自动轮播图片↓↓↓↓↓↓↓↓↓↓↓无缝滚动
    var timer = setInterval(function() {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';

    }, 2000);
    //过渡完成后再执行判断条件 index3跳转到pic1
    ul.addEventListener('transitionend', function() {
        if (index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            ul.style.transition = 'none';
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)';
        };
        //小圆点特效 obj.classList.add('abc')←''中不需要+.  remove
        //动画特效结束后小圆点才变化 所以写在transitonend内部
        //ol中带有current类名的选取出来 并去除
        ol.querySelector('li.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    //手指拖动轮播图↓↓↓↓↓↓↓↓↓↓↓
    //申明手指坐标
    var startX = 0;
    //申明手指移动距离
    var moveX = 0;
    //如果用户点下又松开 申明变量flag
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        //手指初始坐标
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    ul.addEventListener('touchmove', function(e) {
        //手指移动距离 = 手指移动后的坐标- 手指初始坐标
        moveX = e.targetTouches[0].pageX - startX;
        //盒子要移动的位置
        var translatex = -index * w + moveX;
        //取消过度效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        //阻止滚动屏幕默认行为
        e.preventDefault();
    });
    ul.addEventListener('touchend', function() {
        //如果用户手指移动过，才去判断
        if (flag) {
            //如果移动距离moveX>50px则播放上/下一张,<50则回弹
            if (Math.abs(moveX) > 50) {
                //如果右滑，播放上一张 moveX是正的
                //如果左滑，播放下一张 moveX是负的
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * w;
                //需要过度效果
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            };
        }
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';

        }, 2000);
    });


    //返回顶部模块制作
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= nav.offsetHeight) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    });
})