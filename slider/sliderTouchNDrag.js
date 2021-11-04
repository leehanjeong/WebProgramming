// 플러그인 등록합니다.
$.fn.imageSlider = function (object) {
    // 변수를 선언합니다.
    var width = object.width || 460;
    var height = object.height || 300;
    var current = 0;
    var k = this;
    console.log(width);
    // 함수를 선언합니다.
    var moveTo = function () {
//        $(this).find('.images').animate({
        $(k).find('.images').animate({
//        $('.images').animate({
            left: -current * width
        }, 1000);
    };
    // 슬라이더 내부의 이미지 개수를 확인합니다.
    var imageLength = $(this).find('.image').length;
    // 슬라이더 버튼을 추가합니다.
    for (var i = 0; i < imageLength; i++) {
        $('<button></button>')
            .attr('data-position', i)
            .text(i)
            .click(function () {
                current = $(this).attr('data-position');
                moveTo();
            })
            .insertBefore(this);
    }
    // 슬라이더 스타일을 설정합니다.
    console.log(this) // this는 slider, slider2임
    $(this).css({
        position: 'relative',
        width: width,
        height: height,
        overflow: 'hidden'
    });
    $(this).find('.images').css({
        position: 'absolute',
        width: width * imageLength,
    });
    $(this).find('.image').css({
        margin: 0,
        padding: 0,
        width: width,
        height: height,
        display: 'block',
        float: 'left'
    });
    var image_isclick = false;
    var image_initpos = 0;
    var image_moving = 0;
    var image_origin = 0;
    var myWidth = 0;
    var init = true;
    var initX;

    $(this).find('.images').on({
        "touchstart mousedown": function(e) {
            e.preventDefault();
            image_isclick = true;
            image_origin = $(this).offset().left;
            image_moving = 0;
            if(init) { init = false; initX =$(this).offset().left; }
            //myWidth = this.getBoundingClientRect().width;
        },
        "touchstart": function(e) {
            console.log(this)
            image_initpos = e.originalEvent.touches[0].screenX;
        },
        "mousedown": function(e) {
            image_initpos = e.pageX;
        },
        "touchmove": function(e) {
            e.preventDefault();
            if(image_isclick) {
                image_moving = e.originalEvent.touches[0].screenX - image_initpos;
                console.log(e.originalEvent.touches[0].screenX);
                console.log(image_initpos);
                console.log(image_origin);
                console.log(image_moving);
                $(this).css('left', (image_origin + image_moving));
                //$(this).animate({left: image_origin + image_moving}, 0.001);
                //$(this).css('transform', 'translateX('+(image_origin+image_moving)+'px)');
                console.log('move');
            }
        },
        "mousemove": function(e) { 
            if(image_isclick) {
                image_moving = e.pageX - image_initpos;
                $(this).css('left', (image_origin + image_moving));
                //$(this).animate({left: image_origin + image_moving}, 0.001);
                //$(this).css('transform', 'translateX('+(image_origin+image_moving)+'px)');
            }
        },
        "touchend mouseup": function(e) {

            image_isclick = false;
            // if(image_moving < 0) {
            //     current = Math.min(current + 1, imageLength-1);
            // }
            // else {
            //     current = Math.max(current - 1, 0);
            // }
            // moveTo();
            //end_pixel = (initX + (imageLength-1) * width) * (-1);
            // if($(this).offset().left > 0) {
            //     $(this).css('transform', 'translateX(0px)');
            // }
            // else if($(this).offset().left < -3852) {
            //     $(this).css('transform', 'translateX(-3852px)');
            // }
            // else {
            //     let t = (image_origin+image_moving-initX)/width;
            //     t = width * ((image_moving < 0) ? Math.floor(t) : Math.ceil(t));
            //     $(this).css('transform', 'translateX(' +(t)+ 'px)');
            // }

            if(current==0 && image_moving > 0) {
                current = 0;
                moveTo();
                console.log('end1');
            }
            else if(current==4 && image_moving<0) {
                current = 4;
                moveTo();
                console.log('end2');
            }
            else {
                if(image_moving < 0) {
                    current += 1;
                    moveTo();
                    console.log('end3');
                }
                else if(image_moving > 0) {
                    current -= 1;
                    moveTo();
                    console.log('end4');
                }
                else {
                    moveTo();
                    console.log('end5');
                }
                // let moved_pixel = (image_origin - image_moving - initX) / myWidth;
                // moved_pixel = myWidth * ((image_moving > 0) ? Math.floor(moved_pixel) : Math.ceil(moved_pixel));
                // $(this).css('transform', 'translateX('+(moved_pixel)+'px)');
            }
        }
    })
    // 3초마다 슬라이더를 이동시킵니다.
    // setInterval(function () {
    //     current = current + 1;
    //     current = current % imageLength;
    //     moveTo();
    // }, 3000);
};
