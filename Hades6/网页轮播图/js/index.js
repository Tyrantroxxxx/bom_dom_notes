    window.addEventListener('load', function() {
        //鼠标经过显示左右箭头
        var arrow_l = document.querySelector('.arrow-l');
        var arrow_r = document.querySelector('.arrow-r');
        var focus = document.querySelector('.focus');
        focus.addEventListener('mouseenter', function() {
            arrow_l.style.display = 'block';
            arrow_r.style.display = 'block';
            //鼠标经过停止自动播放，timer不用之后赋值为null以免报错
            clearInterval(timer);
            timer = null;
        })
        focus.addEventListener('mouseleave', function() {
                arrow_l.style.display = 'none';
                arrow_r.style.display = 'none';
                //重新开始定时器
                timer = setInterval(function() {
                    //手动调用点击事件
                    arrow_r.click();
                }, 2000);
            })
            //动态生成小圆圈 创建节点createElement('li');插入节点ol.appendChild('li');
        var ul = focus.querySelector('ul');
        var ol = focus.querySelector('.circle');
        var focusWidth = focus.offsetWidth;
        for (var i = 0; i < ul.children.length; i++) {
            var li = document.createElement('li');
            //给每个li添加index类名并且赋值为索引号
            li.setAttribute('index', i);
            ol.appendChild(li);
            //小圆圈变色 (排他)
            li.addEventListener('click', function() {
                //清除所有liの类名
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                this.className = 'current';
                //ul移动距离 = ul.childrenの索引号*li中imgのwidth
                //点击li移动ul
                //↓ index= li的索引号
                var index = this.getAttribute('index');
                //*******bug修复***********
                //赋值点击的索引号给num 以及circle,num&circle也是索引号原理
                num = index;
                circle = index;
                animate(ul, -index * focusWidth);
            })
        }
        ol.children[0].className = 'current';
        //使用cloneNode(trure)深克隆Clone第一张图片 放到ul最后,不影响上方ul.length生成小圆圈个数
        var first = ul.children[0].cloneNode(true);
        ul.appendChild(first);
        //点击右侧按钮 图片滚动一张
        var num = 0;
        //申明circle变量，使右侧按钮一点击circle++ 左侧按钮也要使用 所以全局变量
        var circle = 0;
        var flag = true
            //****flag节流阀*****防止用户点击过快
            //右侧按钮做法↓↓↓↓↓↓↓↓↓↓
        arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false; //关闭节流阀
                //到最后一张的时候直接切换成第一张

                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                circle++;
                //小圆圈排他变色
                //如果circle ==4 就是走到我们cloneのli了,复原
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circleChange();

            }
        })


        //左侧按钮做法↓↓↓↓↓↓↓↓↓↓
        arrow_l.addEventListener('click', function() {
            //到最后一张的时候直接切换成第一张

            if (flag) {
                flag = false
                if (num == 0) {
                    num = ul.children.length - 1;
                    ul.style.left = -num * focusWidth + 'px';
                }
                num--;
                //添加function回调函数，动画执行完毕后才使flag=true使箭头可点击
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                circle--;

                //如果circle <0 current要应用到第四个小圆圈上
                if (circle < 0) {
                    circle = ol.children.length - 1;
                }
                circleChange();
            }
        });

        function circleChange() {
            //小圆圈排他变色
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
        //定时器自动播放
        var timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);
    })