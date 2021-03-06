/*
	4.1版静态首页程序库
	创建人：Jeffrey
	修改时间：2016-06-15
*/

//省份相关数据
var base_provinces = new Array();
var i_prov = 0;
base_provinces[i_prov++] = new Array("100","bj","北京");
base_provinces[i_prov++] = new Array("200","gd","广东");
base_provinces[i_prov++] = new Array("210","sh","上海");
base_provinces[i_prov++] = new Array("220","tj","天津");
base_provinces[i_prov++] = new Array("230","cq","重庆");
base_provinces[i_prov++] = new Array("240","ln","辽宁");
base_provinces[i_prov++] = new Array("250","js","江苏");
base_provinces[i_prov++] = new Array("270","hb","湖北");
base_provinces[i_prov++] = new Array("280","sc","四川");
base_provinces[i_prov++] = new Array("290","sn","陕西");
base_provinces[i_prov++] = new Array("311","he","河北");
base_provinces[i_prov++] = new Array("351","sx","山西");
base_provinces[i_prov++] = new Array("371","ha","河南");
base_provinces[i_prov++] = new Array("431","jl","吉林");
base_provinces[i_prov++] = new Array("451","hl","黑龙江");
base_provinces[i_prov++] = new Array("471","nm","内蒙古");
base_provinces[i_prov++] = new Array("531","sd","山东");
base_provinces[i_prov++] = new Array("551","ah","安徽");
base_provinces[i_prov++] = new Array("571","zj","浙江");
base_provinces[i_prov++] = new Array("591","fj","福建");
base_provinces[i_prov++] = new Array("731","hn","湖南");
base_provinces[i_prov++] = new Array("771","gx","广西");
base_provinces[i_prov++] = new Array("791","jx","江西");
base_provinces[i_prov++] = new Array("851","gz","贵州");
base_provinces[i_prov++] = new Array("871","yn","云南");
base_provinces[i_prov++] = new Array("891","xz","西藏");
base_provinces[i_prov++] = new Array("898","hi","海南");
base_provinces[i_prov++] = new Array("931","gs","甘肃");
base_provinces[i_prov++] = new Array("951","nx","宁夏");
base_provinces[i_prov++] = new Array("971","qh","青海");
base_provinces[i_prov++] = new Array("991","xj","新疆");
base_provinces[i_prov++] = new Array("000","","集团");
var default_prov = new Array("210","sh","上海");

//根据省份名称(北京)、省份三位识别码(100)、省份两位简称(bj)，返回省份三位识别码
function getProvCode(sim){
	var pname = "";
	for(var i=0;i<=31;i++){
		if(base_provinces[i][0] == sim || base_provinces[i][1] == sim || base_provinces[i][2] == sim){
			pname = base_provinces[i][0];
			break;
		}
	}
	return pname;
}

//根据省份名称(北京)、省份三位识别码(100)、省份两位简称(bj)，返回省份两位简称
function getProvBrief(sim){
	var pname = "";
	for(var i=0;i<=31;i++){
		if(base_provinces[i][0] == sim || base_provinces[i][1] == sim || base_provinces[i][2] == sim){
			pname = base_provinces[i][1];
			break;
		}
	}
	return pname;
}

//根据省份名称(北京)、省份三位识别码(100)、省份两位简称(bj)，返回省份名称
function getProvName(sim){
	var pname = "";
	for(var i=0;i<=31;i++){
		if(base_provinces[i][0] == sim || base_provinces[i][1] == sim || base_provinces[i][2] == sim){
			pname = base_provinces[i][2];
			break;
		}
	}
	return pname;
}


//根据省份名称(北京)、省份三位识别码(100)、省份两位简称(bj)，返回省份三位识别码
function getProvNum(sim){
	var pnum = "";
	for(var i=0;i<=31;i++){
		if(base_provinces[i][0] == sim || base_provinces[i][1] == sim || base_provinces[i][2] == sim){
			pnum = base_provinces[i][0];
			break;
		}
	}
	return pnum;
}


// 根据cookie返回归属省市,如果cookie中不存在归属省市,则返回000|000.
function getProvCity() {
    var rv = "100|100";
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (2 <= arr.length && "CmLocation" == arr[0]) {
            rv = arr[1];
            break;
        }
    }
    return rv;
}


// 快捷服务区

var notonline = ",";//未上线的省份用“,”包围起来组成字符串，如：“,qh,zj,”。首尾的“,”不可省略
var cmcurprov = "sh";//插码默认省，正常默认值不会被使用

var cz_pinfo_status = 0;//未获得
var cz_pinfo_last = '';

//动态获取省份相关信息
function fun_pinfo() {
	fun_pinfo2(false);
}

function fun_pinfo2(needShowWait){
	var pho = document.getElementById("cz_pho").value;
	
	if(/^\d+$/.test(pho)){
		if(pho.length>=3){
			var sph = "";
			var checkb = false;
			if(pho.length>=7){
				sph = pho.substring(0,7);
				checkb = (isPhoneNumber(sph+"1234")==0);
			} else if(pho.length==11){
				sph = pho;
				checkb = (isPhoneNumber(sph)==0);
			} else {
				sph = pho.substring(0,3);
				checkb = (isPhoneNumber(sph+"12345678")==0);
			}
			if(checkb){
				fun_hiddenerr();
				if((pho.length==7 || pho.length==11) && cz_pinfo_last != pho.substring(0,7)){
					cz_pinfo_status = 0;
				}
				if((pho.length==7 || pho.length==11) && cz_pinfo_status == 0){
					//执行
					cz_pinfo_last=pho.substring(0,7);
					var wrong = function(){
						fun_showerr("已断开,请重试");
					}
					var tid = null;
					if(needShowWait){
						fun_showerr("请稍候...");
						tid = window.setTimeout(wrong, 5000);
					}
					//Ajax请求服务器，获得结果（是否正确获得信息,省URL或错误代码）
					var resfun= function(rst){
						var rs = rst.split(" ");
						if(rs[0]=="Y"){
							var bif = getProvBrief(rs[1]);
							var nomsg = "归属省未开通该项业务";
							nomsg = "非本省号码";

							var acurl = $(".chongzhi .czjf a").attr("href");
							if(acurl==null || acurl==""){//正常不会被执行
								clearTO(tid);
								cz_pinfo_status=0;
								fun_showerr(nomsg);
							} else {

								if(location.pathname.toLowerCase().indexOf(bif)!=-1){
									document.getElementById("cz_form").action=acurl;
									cmcurprov = getProvCity();
									cz_pinfo_status=1;//已获得
									clearTO(tid);
									fun_hiddenerr();

								}
								else{
									clearTO(tid);
									cz_pinfo_status=0;
									fun_showerr(nomsg);
								}
							}
							
						} else if (rs[0]=="N"){
							clearTO(tid);
							cz_pinfo_status=0;
							fun_showerr("请输入正确的移动号码");
						}
					}

					//执行Ajax
					var majax = false;
					if (window.XMLHttpRequest) {
						majax = new XMLHttpRequest();
					} else if (window.ActiveXObject) {
						majax = new ActiveXObject("Microsoft.XMLHTTP");
					}
					if (majax) {
						try{
							majax.open("GET", "/service/prov/prov.jsp?phone=" + pho.substring(0,7) + "1234",false);
							majax.onreadystatechange = function() {
								if (majax.readyState == 4) {
									if(majax.status == 200){
										resfun(majax.responseText);
									}else{
										clearTO(tid);
										cz_pinfo_status=0;
										if(needShowWait){
											fun_showerr("已断开,请重试");
										}
									}
								}
							}
							majax.send(null);
						}catch(te){
							cz_pinfo_status=0;
							if(needShowWait){
								fun_showerr("已断开,请重试");
							}
						}
					} else {
						clearTO(tid);
						if(needShowWait){
							alert("您的浏览器不支持Ajax实现!");
						}
					}
				}
			} else {
				fun_showerr("请输入正确的移动号码");
			}
		} else {
			fun_hiddenerr();
		}
	} else if (pho.length>0){
		fun_showerr("请输入正确的移动号码");
	} else {
		fun_hiddenerr();
	}
}


function fun_czsubmit2(){
	//fun_chama("INDEX_LJCZ_ZS");
	var pho = document.getElementById("cz_pho").value;
	
	if (pho == "请输入手机号码") {
		$("#cz_pho").css("color","#ff0000");
		$("#cz_pho").css("font-family","微软雅黑");
		return;
	} 
	
	if(isPhoneNumber(pho) != 0){
		fun_showerr("请输入正确的移动号码");
		fun_chama("INDEX_LJCZ_SB");
		return;
	}

	//Add Cookie
	setCookie("czonehis", pho);

	var sum = document.getElementById("cz_val").value;
	if(sum!=30 && sum != 50 && sum!=100 && sum!=300 && sum!=500 && sum!=0){//正常不会被执行
		fun_showerr("请重新选择金额");
		fun_chama("INDEX_LJCZ_SB");
		return;
	}
	if (!fun_iserrblock()) {
		if (cz_pinfo_status==1) {
			cz_pinfo_status = 0;
			fun_chama("INDEX_LJCZ_" + cmcurprov);
			fun_chama2();
			document.getElementById("cz_form").submit();
		}
		else if(cz_pinfo_status==0) {
			fun_pinfo2(true);
			if(cz_pinfo_status == 1){
				cz_pinfo_status = 0;
				fun_chama("INDEX_LJCZ_" + cmcurprov);
				fun_chama2();
				document.getElementById("cz_form").submit();
			}
			else {
				fun_chama("INDEX_LJCZ_SB");
			}
		}
	}else{
		fun_chama("INDEX_LJCZ_SB");
	}
}


//插码函数，避免异常
function fun_chama(sign){
	try{
		if (typeof(_tag)!= 'undefined'){
			_tag.dcsMultiTrack('WT.event', sign);
		}
	}catch(t){}
}

//分号码、金额插码
function fun_chama2(){
	try{
		var amountobj = document.getElementById("cz_val");
		var mobileNoobj = document.getElementById("cz_pho");
		if (typeof(_tag)!= 'undefined'){
			_tag.dcsMultiTrack('WT.INDEX_mobile',mobileNoobj.value,'WT.INDEX_money',amountobj.value);
		}
	}catch(t){}
}

//初始化手机号码框
function fun_initpho(){
	var pho = getCookie("czonehis");
	if(pho!=null && isPhoneNumber(pho) == 0){
		document.getElementById("cz_pho").value=pho;
	}
}

function fun_showerr(str){
	setInnerText(document.getElementById("cz_div_notice"),str);
	fun_showdiv("cz_div_notice");
}

function fun_hiddenerr(){
	fun_hiddendiv("cz_div_notice");
}

function fun_iserrblock(){
	return (document.getElementById("cz_div_notice").style.display=="block");
}

function fun_tocamountdis(){
	var o = document.getElementById("cz_amall");
	if(o.style.display=="block"){
		o.style.display="none"
	} else {
		o.style.display="block"
	}
}

//清除定时任务
function clearTO(tid){
	try{
		window.clearTimeout(tid);
	}catch(e){}
}

function setInnerText(obj,str){
	while (obj.childNodes.length != 0) {
		obj.removeChild(obj.childNodes[0]);
	}
	
	obj.appendChild(document.createTextNode(str));
}

function fun_showfs(){
	fun_showdiv("cz_fs");
}

function fun_hidfs(){
	fun_hiddendiv("cz_fs");
}

function fun_showdiv(oid){
	var o = document.getElementById(oid);
	if(o){
		o.style.display = "block";
	}
}

function fun_hiddendiv(oid){
	var o = document.getElementById(oid);
	if(o){
		o.style.display = "none";
	}
}

function fun_update_samount(amount){
	// setInnerText(document.getElementById("cz_amdis"),"充值"+amount + "元");
	
	if (amount == 0) {
		document.getElementById("cz_val").value = "";
	}
	else {
		document.getElementById("cz_val").value = amount;
	}
	

	$("#cz0").attr("class","");
	$("#cz30").attr("class","");
	$("#cz50").attr("class","");
	$("#cz100").attr("class","");
	$("#cz300").attr("class","");
	$("#cz500").attr("class","");
	var czsubmit_src = "";
    $(".czsubmit span").html(czsubmit_src);
	
	
	if(amount == 0){ $("#cz0").attr("class","on");rebate("0");}
	if(amount == 30){ $("#cz30").attr("class","on");rebate("30");}
	if(amount == 50) {$("#cz50").attr("class","on");rebate("50");}
	if(amount == 100){ $("#cz100").attr("class","on");rebate("100");}
	if(amount == 300){ $("#cz300").attr("class","on");rebate("300");}
	if(amount == 500){ $("#cz500").attr("class","on");rebate("500");}

}


function rebate(money){
	var jsonURL = './depositprompt'+getProvNum(previewProv)+'.json';
					
	$.getJSON(jsonURL,function(data){
		var czsubmit_src = "";
		for(var i = 0;i<data['data'].length;i++){
			if(money==data['data'][i].money_sum){
				czsubmit_src = $('<span/>').html(data['data'][i].special_offer).text();
				break;
			}
		}
		$(".czjf span").html(czsubmit_src);
	});
	
}






/**
 * Created by stt on 2015/12/10 0010.
 */
$(function () {
    //主广告轮播（移动端）
    if (isMobile()) {
        $('#carousel-example-captions').hammer().on('swipeleft swipeleftup swipeleftdown', function () {
            $(this).carousel('next');
        });
        $('#carousel-example-captions').hammer().on('swiperight swiperightup swiperightdown', function () {
            $(this).carousel('prev');
        });
    }
    //4G专区图片晃动
    if ($(document.body).outerWidth(true) > 768) {
        $(".fourg .row section img").mouseover(function () {
            $(this).animate({right: "10px"}, 250);
        }).mouseout(function () {
            $(this).animate({right: "0px"}, 250);
        });
        //买手机区图片晃动
        $(".buyphone .row img").mouseover(function () {
            $(this).animate({right: "10px"}, 250);
        }).mouseout(function () {
            $(this).animate({right: "0px"}, 250);
        });
        //业务推荐去图片晃动
        $(".ywtj .row section img").mouseover(function () {
            $(this).animate({right: "10px"}, 250);
        }).mouseout(function () {
            $(this).animate({right: "0px"}, 250);
        });
    }
    //辅助需求导航区窄屏幕伸缩效果

    $(".index-help .row h2 a").click(function () {
        if ($(this).parent().siblings(".linkgroup").is(":hidden")) {
            $(this).parent().siblings(".linkgroup").show();
            $(this).html("×");
        } else {
            $(this).parent().siblings(".linkgroup").hide();
            $(this).html("+");
        }
        return false;
    });

    //公告滚动

    (function () {
        var ul = $(".indexgg ul");
        var interval = null;
        var timeOut = null;
        //向右运动
        var funcRight = function () {
            $(".indexgg ul li:first").appendTo(ul);

        }
        //向左运动
        var funcLeft = function () {
            $(".indexgg ul li:last").prependTo(ul);
        }

        function do_move() {
            if (interval) {
                clearInterval(interval);
            }
            interval = setInterval(funcRight, 4000);
        }

        function stop_move() {
            clearInterval(interval);
            interval = null;
        }

        do_move();


        if (!isMobile()) {
            $(".qhbtn").on({
                "mouseover": function () {
                    stop_move();
                },
                "mouseout": function () {
                    do_move();
                }
            });

            ul.on({
                "mouseover": function () {
                    clearInterval(interval);
                },
                "mouseout": function () {
                    if (interval) {
                        clearInterval(interval);
                    }
                    interval = setInterval(funcRight, 4000);
                }
            });
            $(".qhbtn .left").click(function () {
                if (interval) {
                    clearInterval(interval);
                }
                funcLeft();
            });
            $(".qhbtn .right").click(function () {
                if (interval) {
                    clearInterval(interval);
                }
                funcRight();
            });

        } else {
            $('.qhbtn .left').hammer().on('tap', function () {
                if (interval) {
                    clearInterval(interval);
                }
                if (timeOut) {
                    clearTimeout(timeOut);
                }
                funcLeft();
                timeOut = setTimeout(do_move);
            });
            $('.qhbtn .right').hammer().on('tap', function () {
                if (interval) {
                    clearInterval(interval);
                }
                if (timeOut) {
                    clearTimeout(timeOut);
                }

                funcRight();
                timeOut = setTimeout(do_move);
            });
        }

    }());

    //优惠促销轮播图

    (function () {
        var g_bMoveLeft = true;//控制左右移动
        var g_oTimer = null;//移动定时器
        var g_oTimerOut = null;//无缝移动定时器

        var g_bPause = true;//控制是否连续运动还是每个图片停顿
        var g_iPauseTime = 4000;//默认运动间隔
        var g_iSpeed = 5;//每次移动像素
        var g_distance = parseInt($(".indexbox").outerWidth(true));//滚动距离
        var g_imageDsitance = parseInt($(".indexbox").first().outerWidth(true));//单个图片div宽度


        //初始化--图片翻倍 相对定位 增加最外层宽度
        var allImages = $(".yhgundong").children().clone(true);//图片复制
        $(".yhgundong").append(allImages);
        var length = $(".yhgundong").children().length;//图片总长度
        $(".yhgundong").css({"position": "absolute", "left": "0px", "width": length * g_distance});
        $(window).resize(function () {
            $(".yhgundong").css({"position": "absolute", "left": "0px", "width": length * g_distance});

        });


        //开始运动函数
        function startMove(bLeft) {
            g_bMoveLeft = bLeft;

            if (g_oTimer) {
                clearInterval(g_oTimer);
            }
            if (g_oTimerOut) {
                clearTimeout(g_oTimerOut);
            }

            g_oTimer = setInterval(doMove, 5);
        }


        //停止运动函数
        function stopMove() {
            clearInterval(g_oTimer);
            g_oTimer = null;
        }

        //pc端添加事件
        if (!isMobile()) {
            $(".yhnext").hide();
            $(".yhpre").hide();
            $(".yhgundong div").on({
                "mouseover": function () {
                    stopMove();
                },
                "mouseout": function () {
                    startMove(g_bMoveLeft);
                }
            });
            $(".yhnext").show();
            $(".yhpre").show();

            $(".yhpre").click(function () {
                startMove(false);
            });
            $(".yhnext").click(function () {
                startMove(true);
            });
        }

        startMove(false);
        if (isMobile()) {
            //滑动
            $('.yhgundong').hammer().on('swipeleft', function () {
                startMove(false);
            });
            $('.yhgundong').hammer().on('swiperight', function () {
                startMove(true);
            });

            //左右按钮触摸
            $('.yhnext').hammer().on('tap', function () {
                startMove(true);
            });
            $('.yhpre').hammer().on('tap', function () {
                startMove(false);
            });

            //左右拖动
            var downX = 0;
            var downLeft = 0;
            var touchCenter = 0;
            var downTime = 0;
            $('.yhgundong').hammer().on('panstart', function (ev) {
                downTime = Date.now();
                stopMove();
                ev.preventDefault();
                downX = Math.ceil(ev.gesture.changedPointers[0].clientX);
                downLeft = parseInt($(this).css("left"));
                $('.yhgundong').hammer().on('panmove', function (e) {

                    var touchCenter = Math.ceil(e.gesture.changedPointers[0].clientX);
                    $(".yhgundong").css("left", downLeft + touchCenter - downX);
                    if (parseInt($(".yhgundong").css("left")) <= -length * g_distance / 2) {
                        $(".yhgundong").css("left", 0);
                    }
                    if (parseInt($(".yhgundong").css("left")) >= 0) {
                        $(".yhgundong").css("left", -length * g_distance / 2);
                    }

                });
                $('.yhgundong').hammer().on('panend', function (e) {
                    var touchCenter = Math.ceil(e.gesture.changedPointers[0].clientX);
                    if (touchCenter > downX) {
                        startMove(true);
                    } else {
                        startMove(false);
                    }

                });

            });
        }

        //运动函数执行一次left改变g_iSpeed
        function doMove() {
            var scrollElement = $(".yhgundong");
            var left = parseInt($(".yhgundong").css("left"));

            $(window).resize(function () {
                g_imageDsitance = parseInt($(".indexbox").first().outerWidth(true));//单个图片div宽度
            });

            if (g_bMoveLeft) {

                left += g_iSpeed;
                if (left >= 0) {
                    left -= length * g_distance / 2;
                }

            } else {
                left -= g_iSpeed;
                if (left <= -length * g_distance / 2) {

                    left += length * g_distance / 2;

                }
            }

            if (g_bPause) {

                if (Math.abs(left - Math.round(left / g_imageDsitance) * g_imageDsitance) < Math.ceil(g_iSpeed / 2)) {
                    stopMove();
                    g_oTimerOut = setTimeout
                    (
                        function () {
                            startMove(g_bMoveLeft);
                        }, g_iPauseTime
                    );

                    left = Math.round(left / g_imageDsitance) * g_imageDsitance;
                }
            }


            $(".yhgundong").css("left", left);
        }

    }());


    //快速显示title
    $.fn.extend({
        showTitle: function () {
            var x = 10, y = 20;
            this.mouseover(function (e) {
                this.myTitle = this.title;
                this.title = "";
                var showDiv = "<div id='showDiv' style='z-index:9999;position: absolute;border: solid 1px #dfdfdf;background-color: white;padding: 0px 2px;-moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;'>" + this.myTitle + "</div>";
                $("body").append(showDiv);
                $("#showDiv").css({
                    "top": (e.pageY + y) + "px",
                    "left": (e.pageX + x) + "px"
                }).show("fast");
            }).mouseout(function () {
                this.title = this.myTitle;
                $("#showDiv").remove();
            }).mousemove(function (e) {
                $("#showDiv").css({
                    "top": (e.pageY + y) + "px",
                    "left": (e.pageX + x) + "px"
                });
            });
        }
    });
    if (!isMobile()) {
        //手机区title显示
        $(".lianjie3 img").showTitle();
        //业务推荐title显示
        $(".ywtj .row img").showTitle();
        //4G专区title显示
        $(".fourg .row img").showTitle();
        //主广告轮播图 title
        $(".banner img").showTitle();
        $(".banner ol li").showTitle();
        //优惠促销区title
        $(".yhcx img").showTitle();
        //主广告title
        $(".indexgg .row li a").showTitle();
    }

    //插码
    function tagFun(target) {
        if (typeof(_tag) != 'undefined') {
            _tag.dcsMultiTrack('WT.event', target);
        }
    }


    //在线客服
    $(".rfu div").hover(function(){
        $(this).animate({left:-84+"px"},500);
    },function(){
        $(this).animate({left:-20+"px"},500);
    });

    //文件调查
    $(document).ready(function (){
        $(".rfu2 div").hover(function(){
            $(this).animate({left:-108+"px"},500);
        },function(){
            $(this).animate({left:-20+"px"},500);
        })
    });

    if(isMobile()){
        $("#rfu2").css("display","none");
        $("#rfu").css("display","none");
    }
});




/**
 * Created by stt on 2016/1/20 0020.
 */
//动态加载js，无阻塞加载js

function loadScript(url,callback){
    var script = document.createElement("script");
    script.type = "text/javascript";
    if(script.readyState){
        script.onreadystatechange = function(){
            if(script.readyState=="loaded"||script.readyState=="complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    }else{
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);

}


//判断手机终端
//判断是否是移动设备
function isMobile() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true;
    }
    else {
        return false;
    }
}


// 判断字符串是否是手机号码
// 0是手机号码 1不是11位数字 2号码前缀不正确
/* 用于检验手机号的位数以及检验此手机中是否为中国移动的手机号 */
/* 由于存在携号转网的情况 允许3个运营商的全部号段（试点中）*/
// 移动号码段列表:134,135,136,137,138,139,147,150,151,152,157,158,159,170,172,178,182,183,184,187,188,
// 联通号码段列表:130,131,132,145,155,156,170,171,175,176,185,186,
// 电信号码段列表:133,153,170,173,177,180,181,189,
function isPhoneNumber(phone) {
    var rv = 0;

    var mbphnoM = /^(13[4-9])|^(147)|^(150)|^(151)|^(152)|^(157)|^(158)|^(159)|^(170)|^(172)|^(178)|^(182)|^(183)|^(184)|^(187)|^(188)/;
    var mbphnoU = /^(130)|^(131)|^(132)|^(145)|^(155)|^(156)|^(170)|^(171)|^(175)|^(176)|^(185)|^(186)/;
    var mbphnoT = /^(133)|^(153)|^(170)|^(173)|^(177)|^(180)|^(181)|^(189)/;

    var num11 = /^\d{11}$/; //11位数字;

    if (null != phone && "" != phone && num11.exec(phone)) {

        if (mbphnoM.exec(phone) || mbphnoU.exec(phone) || mbphnoT.exec(phone)) {
            rv = 0;
        }
        else {
            rv = 2;
        }
    }
    else {
        rv = 1;
    }

    return rv;
}



// Create a cookie with the specified name and value.
function setCookie(sName, sValue) {

    // Expires the cookie in one month
    var date = new Date();
    date.setMonth(date.getMonth() + 1);

    if (window.location.hostname == 'www.10086.cn' || window.location.hostname == '10086.cn') {
        document.cookie = sName + "=" + escape(sValue) + "; expires=" + date.toUTCString() + "; domain=10086.cn; path=/";
    }
    else {
        document.cookie = sName + "=" + escape(sValue) + "; expires=" + date.toUTCString() + "; path=/";
    }

}

// Retrieve the value of the cookie with the specified name.
function getCookie(sName) {
    // cookies are separated by semicolons
    var aCookie = document.cookie.split("; ");
    var aCrumb = null;
    for (var i=0; i < aCookie.length; i++) {
        // a name/value pair (a crumb) is separated by an equal sign
        aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) {
            return unescape(aCrumb[1]);
        }
    }
    // a cookie with the requested name does not exist
    return null;
}

// Delete the cookie with the specified name.
function delCookie(sName) {

    if (window.location.hostname == 'www.10086.cn' || window.location.hostname == '10086.cn') {
        document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT; domain=10086.cn; path=/";
    }
    else {
        document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT; path=/";
    }


}




var cur_prov_code = "";
function initProvCodeByIp() {
	cur_prov_code = "";
	var XMLHttpRequestObject = false;
	if (window.XMLHttpRequest) {
		XMLHttpRequestObject = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (XMLHttpRequestObject) {
		XMLHttpRequestObject.open("GET", "/service/ip/ip.jsp",false);
		XMLHttpRequestObject.onreadystatechange = function() {
			if (XMLHttpRequestObject.readyState == 4
				&& XMLHttpRequestObject.status == 200) {
				cur_prov_code = getProvCode(XMLHttpRequestObject.responseText.substring(0,3));
			}
		}
		XMLHttpRequestObject.send(null);
	}
}
function initProvCodeByCookie(){
	cur_prov_code = "";
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for ( var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if ("CmProvid" == arr[0]) {
			cur_prov_code = getProvCode(arr[1]);
			break;
		}
	}
}
function initProvCodeByUrl(){
	cur_prov_code = "";
	var curl = document.URL;
	for(var i=0;i<=30;i++){
		if(curl.indexOf("/" + base_provinces[i][1] + "/") != -1){
			cur_prov_code = base_provinces[i][1];
			break;
		}
	}
}

//根据URL获取当前登录省份两位简称
function getCurProvCodeByUrl(){
	initProvCodeByUrl();
	return getProvCode(cur_prov_code);
}

//根据Cookie获取当前登录省份两位简称
function getCurProvCodeByCookie(){
	initProvCodeByCookie();
	return getProvCode(cur_prov_code);
}

//根据IP获取当前登录省份两位简称
function getCurProvCodeByIp(){
	initProvCodeByIp();
	return getProvCode(cur_prov_code);
}

//初始化省份数据
function initProvCode(){
	initProvCodeByUrl();//第一步：按URL地址初始化
	if(getProvCode(cur_prov_code) == "000"){
		initProvCodeByCookie();//第二步：按Cookie初始化
	}
	if(getProvCode(cur_prov_code) == "000"){
		initProvCodeByIp();//第三步：按IP初始化
	}
}


//获取当前登录省份三位代码
function getCurProvCode(){
	initProvCode();
	return getProvCode(cur_prov_code);
}

//获取当前登录省份两位简称
function getCurProvBrief(){
	initProvCode();
	return getProvBrief(cur_prov_code);
}

//获取当前登录省份名称
function getCurProvName(){
	initProvCode();
	return getProvName(cur_prov_code);
}

//获取当前登录省份三位代码，默认北京
function getCurProvCode2(){
	var rv = "";
	initProvCode();
	if(getProvCode(cur_prov_code) == "000"){
		rv = default_prov[0];
	} else {
		rv = getProvCode(cur_prov_code);
	}
	return rv;
}

//获取当前登录省份两位简称，默认北京
function getCurProvBrief2(){
	var rv = "";
	initProvCode();
	if(getProvCode(cur_prov_code) == "000"){
		rv = default_prov[1];
	} else {
		rv = getProvBrief(cur_prov_code);
	}
	return rv;
}

//获取当前登录省份名称，默认北京
function getCurProvName2(){
	var rv = "";
	initProvCode();
	if(getProvCode(cur_prov_code) == "000"){
		rv = default_prov[2];
	} else {
		rv = getProvName(cur_prov_code);
	}
	return rv;
}


/**
 * Created by stt on 2015/12/16 0016.
 */
//判断横屏竖屏幕

if(isMobile()){
    (function(){
        var supportOrientation=(typeof window.orientation == "number" && typeof window.onorientationchange == "object");

        var updateOrientation=function(){
            if(supportOrientation){
                updateOrientation=function(){
                    var orientation=window.orientation;
                    switch(orientation){
                        case 90:
                        case -90:
                            orientation="landscape";
                            break;
                        default:
                            orientation="portrait";
                    }
                    if(orientation=="landscape"){

                        if($(window).outerWidth(true)>768){
                            $('.btns a').css({width: "85px", left: "50%"});
                        }else{
                            $('.btns a').css({ width: "100%",left: "0%"});
                        }
                    }else{
                        $('.btns a').css({ width: "100%",left: "0%"});
                    }

                    //$(".yhgundong").css({"position": "absolute", "left": "0px", "width": length * g_distance});
                };
            }else{
                updateOrientation=function(){
                    var orientation=(window.innerWidth > window.innerHeight)? "landscape":"portrait";
                    if(orientation=="landscape"){

                        if($(window).outerWidth(true)>768){
                            $('.btns a').css({width: "85px", left: "50%"});
                        }else{
                            $('.btns a').css({ width: "100%",left: "0%"});
                        }

                    }else{

                        $('.btns a').css({ width: "100%",left: "0%"});
                    }

                    //$(".yhgundong").css({"position": "absolute", "left": "0px", "width": length * g_distance});
                };
            }
            updateOrientation();
        };

        var init=function(){
            updateOrientation();
            if(supportOrientation){
                window.addEventListener("orientationchange",updateOrientation,false);
            }else{
                // window.setInterval(updateOrientation,5000);
                updateOrientation();
            }
        };

        if (typeof document.addEventListener != "undefined") {
            window.addEventListener("DOMContentLoaded",init,false);
        } else {
            document.attachEvent("DOMContentLoaded",init);
        }
        $(window).resize(function () {
            init();
        });

    })();
}

// 插码函数
function wtFunction() {
	if(typeof(_tag)!= 'undefined') {
		_tag.dcsMultiTrack('WT.event',$(this).attr("wtCode"));
	}
}

// 动态设置各个区域的插码内容

// 直达移动商城
var CmLocation = getProvCity();
if (!isMobile()) {
    var $shopT = $(".shopclass h1 a");
    $shopT.attr("wtCode","INDEX_ZDH_ZDYDSC_"+CmLocation+"");
    $shopT.on("click",wtFunction);

    for (var i = 1; i < 6; i++) {
        var $shopA = $(".shopclass ul li").eq(i - 1).find("a");

        if(i==1){
            $shopA.attr("wtCode","INDEX_ZDH_L_BUYSJ_"+CmLocation+"");
			$shopA.on("click",wtFunction);
        }else if(i==2){
            $shopA.attr("wtCode","INDEX_ZDH_L_BTC_"+CmLocation+"");
            $shopA.on("click",wtFunction);
        }else if(i==3){
            $shopA.attr("wtCode","INDEX_ZDH_L_BYW_"+CmLocation+"");
            $shopA.on("click",wtFunction);
        }else if(i==4){
            $shopA.attr("wtCode","INDEX_ZDH_L_TPJ_"+CmLocation+"");
            $shopA.on("click",wtFunction);
        }else{
            $shopA.attr("wtCode","INDEX_ZDH_L_GRZX_"+CmLocation+"");
            $shopA.on("click",wtFunction);
        }
    }
}



// 主广告区
for (var i = 0; i < $(".banner .carousel-inner a").length; i++) {
    $(".banner .carousel-inner a:eq(" + i + ")").attr("wtCode","INDEX_AD_"+i+"_"+CmLocation);
    $(".banner .carousel-inner a:eq(" + i + ")").on("click",wtFunction);
}




// 快捷服务区

    var cz_sbtn = document.getElementById("cz_sbtn");
    if (!document.all || document.documentMode >= 8) {
        cz_sbtn.onclick = function () {
            fun_czsubmit2();
        };
    } else {
        cz_sbtn.onclick = function () {
            fun_czsubmit2();
        };
    }

	$(".czjf a").attr("wtCode","INDEX_CZJF_" + CmLocation);
	$(".czjf a").click(wtFunction);

    var styleContent = "";

    for (var i = 0; i < 12; i++) {
        styleContent += ".quickbtn .btns a.q" + i + "{background:url(" + $(".quickbtn .btns a:eq(" + i + ")").attr("smallIcon") + ") no-repeat center 15px;}";
        styleContent += ".quickbtn .btns a.q" + i + ":hover{background:url(" + $(".quickbtn .btns a:eq(" + i + ")").attr("bigIcon") + ") no-repeat center 15px;}";
    }

    var doc = document;
    var style = doc.createElement("style");
    style.setAttribute("type", "text/css");

    if (style.styleSheet) {// IE
        style.styleSheet.cssText = styleContent;
    } else {
        var cssText = doc.createTextNode(styleContent);
        style.appendChild(cssText);
    }

    var heads = doc.getElementsByTagName("head");
    if (heads.length)
        heads[0].appendChild(style);
    else
        doc.documentElement.appendChild(style);


    for (var i = 0; i < 6; i++) {


        var liService = document.getElementById("kjfw_" + i + "");
        var btntype = $(".quickbtn .btns a:eq(" + i + ")").attr("btntype");
        if (btntype != 0) {
            var divMark = document.createElement("div");
            divMark.className = "xtip";

            liService.appendChild(divMark);

            switch (btntype) {
                case '1':
                    divMark.innerHTML = "惠";
                    break;
                case '2':
                    divMark.innerHTML = "促";
                    break;
                case '3':
                    divMark.innerHTML = "折";
                    break;
                case '4':
                    divMark.innerHTML = "新";
                    break;
                case '5':
                    divMark.innerHTML = "抢";
                    break;
                case '6':
                    divMark.innerHTML = "热";
                    break;
                case '7':
                    divMark.innerHTML = "秒";
                    break;
                case '8':
                    divMark.innerHTML = "降";
                    break;
                case '9':
                    divMark.innerHTML = "荐";
                    break;
                default:
                    divMark.innerHTML = "送";
            }
        }


    }
    
    

	var pArr = null;
    pArr = $("#insselect").attr("jelist").split(",");
    var insselect = document.getElementById("insselect");
    var jelistlength = 0;
    if (pArr[pArr.length - 1] != "") {
        jelistlength = pArr.length;
    } else {
        jelistlength = pArr.length - 1;
    }

    for (var k = 0; k < jelistlength; k++) {
        var ahref = document.createElement("a");
        if (k == 1) {
            ahref.className = "on";
            document.getElementById("cz_val").value = pArr[k];

            rebate('' + pArr[k] + '');
        }
        ahref.id = "cz" + pArr[k] + "";
        if (!document.all || document.documentMode >= 8) {
            ahref.setAttribute("onclick", "fun_update_samount(" + (pArr[k]) + ");");
        } else {

            ahref.cz_val = pArr[k];
            ahref.onclick = function () {
                if (window.event) {
                    var myObj = window.event.srcElement
                    fun_update_samount(myObj.cz_val);
                }
            };
        }
        ahref.innerHTML = "" + pArr[k] + "元";
        ahref.href = "javascript:void(0);"
        insselect.appendChild(ahref);
    }
    
	var jrother = $("#insselect").attr("jrother");
    if ((jrother.indexOf("http") == 0) || (jrother.indexOf("https") == 0) || (jrother.indexOf("ftp") == 0)) {
        var insselect = document.getElementById("insselect");
        var ahref = document.createElement("a");
        ahref.id = "cz0";
        if (!document.all || document.documentMode >= 8) {
            ahref.setAttribute("onclick", "fun_update_samount(0);");
        } else {
            ahref.onclick = function () {
                fun_update_samount(0);
            };
        }
        ahref.innerHTML = "其他";
        ahref.href = jrother;
        insselect.appendChild(ahref);
    }

    
var tempKJSatus = 0;

$(document).ready(function () {

    // 初始url
    $('#kuaijiefuwu_0').attr("wtCode","INDEX_HFCX_"+CmLocation);
    $('#kuaijiefuwu_1').attr("href",$("#kuaijiefuwu_1").attr("btnhref"));
    $('#kuaijiefuwu_1').attr("wtCode","INDEX_LLCX_"+CmLocation);
	$('#kuaijiefuwu_1').click(wtFunction);
    $('#kuaijiefuwu_2').attr("href",$("#kuaijiefuwu_2").attr("btnhref"));
    $('#kuaijiefuwu_2').attr("wtCode","INDEX_ZFZQ_"+CmLocation);
	$('#kuaijiefuwu_2').click(wtFunction);
    $('#kuaijiefuwu_3').attr("href",$("#kuaijiefuwu_3").attr("btnhref"));
    $('#kuaijiefuwu_3').attr("wtCode","INDEX_JFDH_"+CmLocation);
	$('#kuaijiefuwu_3').click(wtFunction);
    $('#kuaijiefuwu_4').attr("href",$("#kuaijiefuwu_4").attr("btnhref"));
    $('#kuaijiefuwu_4').attr("wtCode","INDEX_YHCX_"+CmLocation);
	$('#kuaijiefuwu_4').click(wtFunction);
    $('#kuaijiefuwu_5').attr("href",$("#kuaijiefuwu_5").attr("btnhref"));
    $('#kuaijiefuwu_5').attr("wtCode","INDEX_YWBL_"+CmLocation);


    $('#kuaijiefuwu_0').click(function () {
		
		if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event',$(this).attr("wtCode"));}

        if (tempKJSatus == 0) {
            $('.btns a').html("");
            $('.xtip').hide();
            if (!isMobile()) {
                $('.btns a').animate({width: "0px", left: "100%"}, 250, function () {
                    bbn()
                });
                $('.btns a').animate({width: "85px", left: "50%"}, 250, function () {
                    tempKJSatus = 1;
                });
            } else {
                if ($(window).outerWidth(true) > 768) {
                    $('.btns a').animate({width: "0px", left: "100%"}, 250, function () {
                        bbn()
                    });
                    $('.btns a').animate({width: "85px", left: "50%"}, 250, function () {
                        tempKJSatus = 1;
                    });
                } else {
                    $('.btns a').animate({width: "0px", left: "50%"}, 250, function () {
                        bbn();
                    });
                    $('.btns a').animate({width: "100%", left: "0%"}, 250, function () {
                        tempKJSatus = 1;
                    });

                }
                //$('.btns a').animate({ width: "0px",left: "50%"}, 250,function(){bbn();});
                //$('.btns a').animate({ width: "100%",left: "0%"}, 250,function(){tempKJSatus=1;});
            }
	        setTimeout(function () {
	            $('#kuaijiefuwu_0').html($("#kuaijiefuwu_6").attr("btncontent")).attr("href",$("#kuaijiefuwu_6").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_1').html($("#kuaijiefuwu_7").attr("btncontent")).attr("href",$("#kuaijiefuwu_7").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_2').html($("#kuaijiefuwu_8").attr("btncontent")).attr("href",$("#kuaijiefuwu_8").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_3').html($("#kuaijiefuwu_9").attr("btncontent")).attr("href",$("#kuaijiefuwu_9").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_4').html($("#kuaijiefuwu_10").attr("btncontent")).attr("href",$("#kuaijiefuwu_10").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_5').html($("#kuaijiefuwu_11").attr("btncontent")).css('overflow', 'visible');
	        }, 500);

        }
    });


    $('#kuaijiefuwu_5').click(function () {

		if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event',$(this).attr("wtCode"));}

        if (tempKJSatus == 1) {
            $('.btns a').html("");

            if (!isMobile()) {
                $('.btns a').animate({width: "0px", left: "100%"}, 250, function () {
                    ccn();
                });
                $('.btns a').animate({width: "85px", left: "50%"}, 250, function () {
                    tempKJSatus = 0;
                });
            } else {
                if ($(window).outerWidth(true) > 768) {
                    $('.btns a').animate({width: "0px", left: "100%"}, 250, function () {
                        ccn();
                    });
                    $('.btns a').animate({width: "85px", left: "50%"}, 250, function () {
                        tempKJSatus = 0;
                    });
                } else {
                    $('.btns a').animate({width: "0px", left: "50%"}, 250, function () {
                        ccn();
                    });
                    $('.btns a').animate({width: "100%", left: "0%"}, 250, function () {
                        tempKJSatus = 0;
                    });

                }


            }

	        setTimeout(function () {
	            $('#kuaijiefuwu_0').html($("#kuaijiefuwu_0").attr("btncontent")).css('overflow', 'visible');
	            $('#kuaijiefuwu_1').html($("#kuaijiefuwu_1").attr("btncontent")).attr("href",$("#kuaijiefuwu_1").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_2').html($("#kuaijiefuwu_2").attr("btncontent")).attr("href",$("#kuaijiefuwu_2").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_3').html($("#kuaijiefuwu_3").attr("btncontent")).attr("href",$("#kuaijiefuwu_3").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_4').html($("#kuaijiefuwu_4").attr("btncontent")).attr("href",$("#kuaijiefuwu_4").attr("btnhref")).css('overflow', 'visible');
	            $('#kuaijiefuwu_5').html($("#kuaijiefuwu_5").attr("btncontent")).attr("href",$("#kuaijiefuwu_5").attr("btnhref")).css('overflow', 'visible');
	            $('.xtip').show();
	        }, 500);

        }
    });

});

function bbn() {
    var strprovcity = getProvCity(); // 获得省市代码

    $("#kuaijiefuwu_0").removeClass("q0").addClass("q6");
    $("#kuaijiefuwu_0").attr("target", "_blank");
    $("#kuaijiefuwu_0").attr("wtCode","INDEX_HFCX_YECX_" + strprovcity);
    $("#kuaijiefuwu_0").attr("href", "#");
    $("#kuaijiefuwu_1").removeClass("q1").addClass("q7");
    $("#kuaijiefuwu_1").attr("wtCode","INDEX_HFCX_TCYL_" + strprovcity);
    $("#kuaijiefuwu_1").attr("href", "#");
    $("#kuaijiefuwu_2").removeClass("q2").addClass("q8");
    $("#kuaijiefuwu_2").attr("wtCode","INDEX_HFCX_ZDCX_" + strprovcity);
    $("#kuaijiefuwu_2").attr("href", "#");
    $("#kuaijiefuwu_3").removeClass("q3").addClass("q9");
    $("#kuaijiefuwu_3").attr("wtCode","INDEX_HFCX_XDCX_" + strprovcity);
    $("#kuaijiefuwu_3").attr("href", "#");
    $("#kuaijiefuwu_4").removeClass("q4").addClass("q10");
    $("#kuaijiefuwu_4").attr("wtCode","INDEX_HFCX_DGYW_" + strprovcity);
    $("#kuaijiefuwu_4").attr("href", "#");
    $("#kuaijiefuwu_5").removeClass("q5").addClass("q11");
    $("#kuaijiefuwu_5").attr("wtCode","INDEX_HFCX_FH_" + strprovcity);
    $("#kuaijiefuwu_5").attr("target","");
    $("#kuaijiefuwu_5").attr("href", "javascript:void(0);");
}

function ccn() {
    var strprovcity = getProvCity(); // 获得省市代码

    $("#kuaijiefuwu_0").removeClass("q6").addClass("q0");
    $("#kuaijiefuwu_0").attr("wtCode","INDEX_HFCX_" + strprovcity);
    $("#kuaijiefuwu_0").attr("target","");
    $("#kuaijiefuwu_0").attr("href", "javascript:void(0);");
    $("#kuaijiefuwu_1").removeClass("q7").addClass("q1");
    $("#kuaijiefuwu_1").attr("wtCode","INDEX_LLCX_" + strprovcity);
    $("#kuaijiefuwu_1").attr("href", "#");
    $("#kuaijiefuwu_2").removeClass("q8").addClass("q2");
    $("#kuaijiefuwu_2").attr("wtCode","INDEX_ZFZQ_" + strprovcity);
    $("#kuaijiefuwu_2").attr("href", "#");
    $("#kuaijiefuwu_3").removeClass("q9").addClass("q3");
    $("#kuaijiefuwu_3").attr("wtCode","INDEX_JFDH_" + strprovcity);
    $("#kuaijiefuwu_3").attr("href", "#");
    $("#kuaijiefuwu_4").removeClass("q10").addClass("q4");
    $("#kuaijiefuwu_4").attr("wtCode","INDEX_YHCX_" + strprovcity);
    $("#kuaijiefuwu_4").attr("href", "#");
    $("#kuaijiefuwu_5").removeClass("q11").addClass("q5");
    $("#kuaijiefuwu_5").attr("wtCode","INDEX_YWBL_" + strprovcity);
    $("#kuaijiefuwu_5").attr("target", "_blank");
    $("#kuaijiefuwu_5").attr("href", "#");
}






// 优惠促销区
for (var i = 0; i < $("#yhgundong .indexbox").length; i++) {
    $("#yhgundong .indexbox:eq(" + i + ") a").attr("wtCode","INDEX_YHCX_"+(i+1)+"_"+CmLocation);
    $("#yhgundong .indexbox:eq(" + i + ") a").on("click",wtFunction);
}



// 4G专区json
if (window.location.href.indexOf("/xj/") == -1) {
    $(".fourg .indextitle a").attr("wtCode","INDEX_4G_CKGD_"+CmLocation);
	$(".fourg .indextitle a").on("click",wtFunction);

    $(".fourg .titlepic a").attr("wtCode","INDEX_4G_LEFT_"+CmLocation);
	$(".fourg .titlepic a").on("click",wtFunction);
    
    for (var i = 2; i < 8; i++) {
        $("#indexboxcon_" + (i - 1) + " .lianjie1").attr("wtCode","INDEX_4G_ZQ_" + (i-1) + "_"+CmLocation);
		$("#indexboxcon_" + (i - 1) + " .lianjie1").on("click",wtFunction);

        $("#indexboxcon_" + (i - 1) + " .lianjie2").attr("wtCode","INDEX_4G_ZQ_" + (i-1) + "_"+CmLocation);
		$("#indexboxcon_" + (i - 1) + " .lianjie2").on("click",wtFunction);
    }
}
else {
    $(".fourg").hide();
}




// 买手机区
$(".buyphone .indextitle a").attr("wtCode","INDEX_MSJ_CKGD_"+CmLocation);
$(".buyphone .indextitle a").on("click",wtFunction);

// 准备自动同步价格所需数据
var bSyncPrice = false; // 是否存在必须要同步的价格信息
var arrSyncList = new Array(); // 需要同步的价格区域列表
var goodsSkuId = ""; // 价格查询参数
arrSyncList[0] = false;


for (var i = 0; i < $(".buyphone .indexbox").length; i++) {

	var cmPrice = $(".buyphone .indexbox:eq(" + i + ") .price p").html();
	var indexOne,indexTwo,indexThree,indexFour;

	if(cmPrice != null && 0 <= cmPrice.indexOf(":")) {

		indexOne = cmPrice.indexOf(":");
		indexTwo = cmPrice.indexOf(",");

		if (0 <= indexOne && indexOne < indexTwo) {
			
			indexThree = cmPrice.indexOf(":",indexTwo);
			indexFour = cmPrice.indexOf(">");

			if (0 <= indexThree && indexThree < indexFour) {
				goodsSkuId += encodeURIComponent("goodsId:" + cmPrice.substring(indexOne+1,indexTwo) + ",skuId:" + cmPrice.substring(indexThree+1,indexFour)) + "_";
				
				arrSyncList[i] = true;
				bSyncPrice = true;
			}
			else {
				goodsSkuId += "_"
				arrSyncList[i] = false;
			}
		}
		else {
			goodsSkuId += "_"
			arrSyncList[i] = false;
		}
	}
	else {
		goodsSkuId += "_"
		arrSyncList[i] = false;
	}
	
}

function drawPrice(jsonData) {
	
	
	var i;
	
	for (i=0;i<4;i++) {
		
		if (arrSyncList[i]) {
			$(".buyphone .indexbox:eq(" + (i) + ") .price p").html(jsonData.priceData[i].cmPriceInterface);
		}
	}
	

	
}


if (bSyncPrice) { // 同步价格数据
	
		var hostname = "www1.10086.cn";

		var ajaxurlTable;
		ajaxurlTable = "http://" + hostname + "/service/homepageprice/homepageprice.jsp?mcmsPrice=" + goodsSkuId;

		$.ajax({
		url: ajaxurlTable,
		dataType: "jsonp",
		jsonpCallback: "jsoncallback",
		success:
			function(jsonData){
				
				drawPrice(jsonData);
	  
			}
	  
		});


	
}


for (var i = 0; i < $(".buyphone .indexbox").length; i++) {

	$(".buyphone .indexbox:eq(" + (i) + ") a").attr("wtCode","INDEX_MSJ_SJ" + i + "_"+CmLocation);
	$(".buyphone .indexbox:eq(" + (i) + ") a").on("click",wtFunction);


}



// 业务推荐区
$(".ywtj .indextitle a").attr("wtCode","INDEX_YWTJ_CKGD_"+CmLocation);
$(".ywtj .indextitle a").on("click",wtFunction);
$(".ywtj .titlepic a").attr("wtCode","INDEX_YWTJ_LEFT_"+CmLocation);
$(".ywtj .titlepic a").on("click",wtFunction);

for (var i = 0; i < (".ywtj .indexbox").length; i++) {
    $("#ywtj_" + (i + 1) + " .lianjie1").attr("wtCode","INDEX_YWTJ_" + (i+1) + "_"+CmLocation);
	$("#ywtj_" + (i + 1) + " .lianjie1").on("click",wtFunction);
    
	$("#ywtj_" + (i + 1) + " .lianjie2").attr("wtCode","INDEX_YWTJ_" + (i+1) + "_"+CmLocation);
	$("#ywtj_" + (i + 1) + " .lianjie2").on("click",wtFunction);

}



// 公告区
for (var i = 0; i < $(".indexgg ul li").length; i++) {
    if (i == 0) {
    	$(".indexgg ul li:eq(" + i + ") a").attr("wtCode","INDEX_GG_Z1_"+CmLocation);
    }
    else if (i == 1) {
    	$(".indexgg ul li:eq(" + i + ") a").attr("wtCode","INDEX_GG_Z2_"+CmLocation);
    }
    else if (i == 2) {
    	$(".indexgg ul li:eq(" + i + ") a").attr("wtCode","INDEX_GG_y1_"+CmLocation);
    }
    else {
    	$(".indexgg ul li:eq(" + i + ") a").attr("wtCode","INDEX_GG_y2_"+CmLocation);
    }
	$(".indexgg ul li:eq(" + i + ") a").on("click",wtFunction);
}



// 紧急公告区
if (0 < $(".jjgg a").html().length) {
    $(".jjgg a").attr("wtCode","INDEX_JJGG");
    $(".jjgg a").on("click",wtFunction);
    $(".jjgg").css("display", "block");
}



// 辅助需求导航区
for (var i = 0; i < $(".index-help .help_list").length; i++) {
	
	var hostimg = null;
	
	hostimg = $(".index-help .help_list:eq(" + i + ") h2").attr("hotimg");

    if (hostimg != "" && hostimg != "null") {
        var HotImg = $('<img>');
        HotImg.attr("class", "serviceHotImg");
        HotImg.attr("src",$(".index-help .help_list:eq(" + i + ") h2").attr("hotimg"));
        $(".index-help .help_list:eq(" + i + ") h2 span").append(HotImg);
    }
    for (var j = 0; j < $(".index-help .help_list:eq(" + i + ") .linkgroup a").length; j++) {

        $(".index-help .help_list:eq(" + i + ") .linkgroup a:eq(" + (j) + ")").attr("wtCode","INDEX_SE_FZXQ" + (i+1) + "_" + (j+1) + "_"+CmLocation);
		$(".index-help .help_list:eq(" + i + ") .linkgroup a:eq(" + (j) + ")").on("click",wtFunction);

        hostimg = $(".index-help .help_list:eq(" + i + ") .linkgroup a:eq(" + (j) + ")").attr("hotimg");
		if (hostimg != "" && hostimg != "null") {
         	var HotImg = $('<img>');
            HotImg.attr("class", "serviceHotImg");
            HotImg.attr("src",$(".index-help .help_list:eq(" + i + ") .linkgroup a:eq(" + (j) + ")").attr("hotimg"));
            $(".index-help .help_list:eq(" + i + ") .linkgroup a:eq(" + (j) + ")").append(HotImg);
        }
    }
}




// 在线客服区
$("#rfu .cjwt a").attr("wtCode","INDEX_ZXKF_ZXZX_"+CmLocation);
$("#rfu .cjwt a").on("click",wtFunction);
$("#rfu .zxzx a").attr("wtCode","INDEX_ZXKF_CJWT_"+CmLocation);
$("#rfu .zxzx a").on("click",wtFunction);
$("#rfu .tsjy a").attr("wtCode","INDEX_ZXKF_TSJY_"+CmLocation);
$("#rfu .tsjy a").on("click",wtFunction);





$("img.lazy").lazyload();







