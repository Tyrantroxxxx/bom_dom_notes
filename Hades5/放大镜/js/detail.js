//等页面html css都加载完毕后执行js代码
window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');

    //1.鼠标经过preview_img的时候显示和隐藏mask&big
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        //2.遮挡层跟随鼠标
    preview_img.addEventListener('mousemove', function(e) {
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            //3.鼠标在mask遮挡层的中间位置
            var maskX = x - mask.offsetWidth / 2;
            var maskY = y - mask.offsetHeight / 2;
            var maskMax = preview_img.offsetWidth - mask.offsetWidth;
            //4.如果maskX<0，停在0的位置，限制mask活动范围
            if (maskX <= 0) {
                maskX = 0;
            } else if (maskX >= maskMax) {
                maskX = maskMax;
            }
            if (maskY <= 0) {
                maskY = 0;
            } else if (maskY >= maskMax) {
                maskY = maskMax;
            }
            mask.style.left = maskX + 'px';
            mask.style.top = maskY + 'px';
            var bigImg = document.querySelector('.bigImg');
            //big最大移动距离↓
            var bigMax = bigImg.offsetWidth - big.offsetWidth;

            var bigX = maskX * bigMax / maskMax;
            var bigY = maskY * bigMax / maskMax;
            bigImg.style.left = -bigX + 'px';
            bigImg.style.top = -bigY + 'px';
        })
        //遮挡层移动距离maskX maskY
        //遮挡层最大移动距离 maskMax


})