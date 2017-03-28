$(function(){
            var orgNum = $('.auto-img').length;
            var oneWid = $('.auto-img').outerWidth();
            var orgWid = orgNum*oneWid;
            var showTime = 3000;
            var selectNum = 0;
            if(orgNum > 1) {//false
                $('.auto-mover').append($($('.auto-img')[0]).clone());
                $('.auto-mover').width((orgNum + 1) * oneWid);

                if ($('.auto-mover').css('transform') === 'none') {//初始化transform
                    $(".auto-mover").css('transform', 'translateX(0)');
                }

                {//初始化控页圆点
                    var roll = $('.roll')[0].outerHTML,rolls='';
                    var a,b;
                    for(var i=0;i<orgNum;i++){
                        rolls += roll.replace('selectnum="0"','selectnum="'+i+'"');
                    }
                    $('.roll-box')[0].innerHTML = rolls;

                    $($('.roll')[0]).addClass("roll-ative");//默认选中第一个
                }

                var tomove = function () {

                    var arrive = 0-$('.auto-mover').css('transform').split(',')[4].split("px")[0];//当前位置
                    selectNum = arrive / oneWid + 1;
                    selectNum = ((selectNum - 0) === (orgNum - 0)) ? 0 : selectNum;
                    toRoll(selectNum);

                    if (arrive === (orgNum-1)*oneWid && selectNum === 0) {
                        var gova = -orgWid + 'px';
                        $('.auto-mover').css('transition', 'transform 1s').css('transform', 'translateX('+gova+')');
                        autoMove = setTimeout(tomove, showTime);
                        return false;
                    }

                    var going = -selectNum*oneWid + 'px';
                    if(arrive>=orgWid){
                        $('.auto-mover').css('transition', 'transform 0s').css('transform', 'translateX(0)');
                        return tomove();
                    }

                    $(".auto-mover").css('transition', 'transform 1s').css('transform', 'translateX('+going+')');

                    autoMove = setTimeout(tomove, showTime);
                };
                var autoMove = setTimeout(tomove, showTime);

                $('.auto-content').on('mouseover', function () {
                    clearInterval(autoMove);
                });

                $('.auto-content').on('mouseout', function () {
                    autoMove = setTimeout(tomove, showTime);
                });

                $(".roll").on('mouseover', rollmove);

                function rollmove(){
                    $(".auto-mover").unbind('mouseover');
                    clearInterval(autoMove);

                    var arrive = 0-$('.auto-mover').css('transform').split(',')[4].split("px")[0];//当前位置
                    var going = -$(this).attr("selectnum")*oneWid + 'px';
                    if(arrive>=orgWid){
                        $('.auto-mover').css('transition', 'transform 0s').css('transform', 'translateX(0)');
                        return rollmove.call(this);
                    }else{
                        $(".auto-mover").css('transition', 'transform 1s').css('transform', 'translateX('+going+')');//animate({left: going}, "slow")
                        toRoll($(this).attr("selectnum")-0);
                    }
                }

                $('.roll').on('mouseout', function () {
                    autoMove = setTimeout(tomove, showTime);
                });

                function toRoll(selectNum){
                    $('.roll-ative').removeClass("roll-ative");//清除选中圆点
                    $($('.roll')[selectNum]).addClass("roll-ative");//选中指定圆点
                }
            }
        });
