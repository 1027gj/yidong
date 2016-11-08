//可信网站标识使用
function KNET_change(eleId){ 
	var str= document.getElementById(eleId).href; 
	var str1 =str.substring(0,(str.length-6)); 
	str1+=KNET_RndNum(6); 
	document.getElementById(eleId).href=str1; 
} 
function KNET_RndNum(k){ 
	var rnd=""; 
	for (var i=0;i < k;i++) 
	rnd+=Math.floor(Math.random()*10); 
	return rnd; 
} 
$(document).ready(function(){		
    var link=document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("id", "cssTail");
    link.setAttribute("href", "/sx_tail/foot.css");
    //如果是IE8浏览器，动态修改样式表文件
	var userAgent = navigator.userAgent;
	var isOpera = userAgent.indexOf("Opera")>-1;
	if(userAgent.indexOf("compatible")>-1&&userAgent.indexOf("MSIE")>-1&&!isOpera){
	  var browser = navigator.appName;
	  var b_version = navigator.appVersion;
	  var version = b_version.split(";");
	  var trim_Version = version[1].replace(/[ ]/g, "");
	  if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
		  $(link).attr("href", "/sx_tail/ie8Tail.css");
	  } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
		  $(link).attr("href", "/sx_tail/ie8Tail.css");
	  } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
		  $(link).attr("href", "/sx_tail/ie8Tail.css");
	  }
	}
    var heads = document.getElementsByTagName("head");
    if(heads.length){
		heads[0].appendChild(link);
	} else{
		document.documentElement.appendChild(link);
	}

	  var linksJson = eval('[{"name":"新闻中心","href":"http://www.10086.cn/aboutus/news/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"诚聘英才","href":"http://job.10086.cn/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"采购信息","href":"http://b2b.10086.cn/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"企业合作","href":"http://www.10086.cn/aboutus/hezuo/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"联系我们","href":"http://www.10086.cn/web_notice/contact/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"站点导航","href":"http://www.10086.cn/web_notice/navigation/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"中国移动研究院","href":"http://labs.chinamobile.com/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"中国移动设计院","href":"http://www.cmdi.chinamobile.com/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"网站地图","href":"http://www.sx.10086.cn/sitemap","editable":"3","responsible":"0","isEdit":"0","highLight":"0"}]');
	    
		var footer = document.getElementById("sx_tail");
		
		
	var divFooter = document.createElement("section");
	divFooter.className = "footcon container";
	footer.appendChild(divFooter);

	var footerCon1 = document.createElement("div");
	footerCon1.className = "hidden-xs";
	divFooter.appendChild(footerCon1);
	//添加第一行内容
	for(var i=0;i<linksJson.length;i++){
		if("sx"!="xz" && linksJson[i].responsible == 1)continue;

			var a = document.createElement("a");
			a.href=linksJson[i].href;
			a.innerHTML=linksJson[i].name;

			//弹出新窗口
			if(linksJson[i].name == '中国移动研究院' || linksJson[i].name == '中国移动设计院'){
				a.target = '_blank';
			}
			if("sx"=="hl" && linksJson[i].name =="网站地图"){
					a.href = "http://www.hl.10086.cn/resource/pub-page/map.html";
			}
			if("sx"=="cq" && linksJson[i].name =="网站地图"){
					a.href = "http://service.cq.10086.cn/svcquery/webSite2014.html";
			}
			if("sx"=="fj" && linksJson[i].name =="网站地图"){
					a.href = "http://www.fj.10086.cn/siteinfo/sitemap/index.html";
			}
			if("sx"=="xz" && linksJson[i].name =="网站地图"){
					a.href = "http://xz.10086.cn/service/operate/wtywdht.jsp";
			}
			if("sx"=="zj" && linksJson[i].name =="网站地图"){
					a.href = "http://www.zj.10086.cn/sitemap/";
			}

	footerCon1.appendChild(a);

	if(i != linksJson.length - 1){
		var span = document.createElement("span");
		span.innerHTML="&nbsp;|&nbsp;";
		footerCon1.appendChild(span);
	}

	}
	//西藏添加“天上西藏”
	
	if("sx"=="xz"){
		var spanLink1 = document.createElement("span");
		spanLink1.innerHTML="&nbsp;|&nbsp;";
		footerCon1.appendChild(spanLink1);
		var tianshang=document.createElement("a");
		tianshang.href="http://www.ctibet.cn/";
		tianshang.target="_blank";
		tianshang.innerHTML="天上西藏";
		footerCon1.appendChild(tianshang);
	}
	//添加“友情链接”
	var spanLink = document.createElement("span");
	spanLink.innerHTML="&nbsp;|&nbsp;";
	footerCon1.appendChild(spanLink);
	var aLink = document.createElement("a");
	aLink.href="http://www.10086.cn/web_notice/links/";
	aLink.innerHTML="友情链接";
	footerCon1.appendChild(aLink);

	var footerCon2 = document.createElement("div");
	footerCon2.className = "hidden-xs";
	divFooter.appendChild(footerCon2);

	var spanFooter1 = document.createElement("span");
	spanFooter1.innerHTML = "&nbsp;";
	footerCon2.appendChild(spanFooter1);

	var footConTxt1 = document.createElement("span");
	footConTxt1.innerHTML = "掌上营业厅：";
	footerCon2.appendChild(footConTxt1);

	var footConA1 = document.createElement("a");
	footConA1.href = "http://wap.10086.cn";
	footConA1.innerHTML = "wap.10086.cn";
	footerCon2.appendChild(footConA1);

	var footConTxt2 = document.createElement("span");
	footConTxt2.innerHTML = "&nbsp;语音自助服务：10086  短信营业厅：10086&nbsp;";
	footerCon2.appendChild(footConTxt2);

	var footConA2 = document.createElement("a");
	footConA2.href = "http://www.10086.cn/support/channel/self_service/";
	footConA2.innerHTML = "自助终端";
	footerCon2.appendChild(footConA2);

	var spanFooter2 = document.createElement("span");
	spanFooter2.innerHTML = "&nbsp;";
	footerCon2.appendChild(spanFooter2);

	var footConA3 = document.createElement("a");
	footConA3.href = "http://www.10086.cn/support/channel/Entity1/";
	footConA3.innerHTML = "营业厅";
	footerCon2.appendChild(footConA3);

	var spanFooter3 = document.createElement("span");
	spanFooter3.innerHTML = "&nbsp;";
	footerCon2.appendChild(spanFooter3);

	var footConA4 = document.createElement("a");
	footConA4.href = "http://www.10086.cn/cmccclient/index.htm";
	footConA4.innerHTML = "手机营业厅下载";
	footerCon2.appendChild(footConA4);
	//添加经营许可证
	var footerCon3 = document.createElement("div");
	footerCon3.className = "xuke";
	footerCon3.innerHTML = "Copyright&copy;1999-2016&nbsp;&nbsp;中国移动&nbsp;&nbsp;版权所有";
	divFooter.appendChild(footerCon3);

	var footerCon4 = document.createElement("div");
	footerCon4.className = "row hidden-xs";
	divFooter.appendChild(footerCon4);
	var divPermTxt = document.createElement("div");
	divPermTxt.className = "col-xs-12 col-sm-6 col-md-6 col-lg-6 text1";
	divPermTxt.innerHTML = "中华人民共和国增值电信业务经营许可证&nbsp;&nbsp;";
	footerCon4.appendChild(divPermTxt);
	var divPermCode = document.createElement("div");
	divPermCode.className = "col-xs-12 col-sm-6 col-md-6 col-lg-6 text2";
	divPermCode.innerHTML = "经营许可证编号：A2.B1.B2-20100001";
	footerCon4.appendChild(divPermCode);

	var footerCon5 = document.createElement("div");
	footerCon5.className = "row hidden-xs";

	//添加可信网站标识
	var KXWZYZ = document.createElement("div");
	KXWZYZ.setAttribute("id","KXWZ");
	KXWZYZ.className = "col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right";
	footerCon5.appendChild(KXWZYZ);
	if("sx" == "xj"){
		var spanXJGS =document.createElement("span");
		spanXJGS.id = "XJGS";
		var spanXJGSContext = document.createElement("span");
		spanXJGSContext.className = "xjgsContext";
		var aXJGS = document.createElement("a");
		aXJGS.href = "http://120.205.6.54:8088/ei/Ei!certificate.action?id=81828384497f068c014a623730be000a";
		aXJGS.tabindex ="-1";
		aXJGS.target="_blank";
		aXJGS.style.display="inline-block";
		var imgXJGS = document.createElement("img");
		imgXJGS.src="http://120.205.6.54:8088/ei/Ei!readEiImgByMemory.action";
		imgXJGS.width = 43;
		imgXJGS.height = 59;
		imgXJGS.style.border="none";
		imgXJGS.oncontextmenu="return false";

		aXJGS.appendChild(imgXJGS);
		spanXJGSContext.appendChild(aXJGS);
		spanXJGS.appendChild(spanXJGSContext);
		KXWZYZ.appendChild(spanXJGS);
	}
	var aKXYZ = document.createElement("a");
	aKXYZ.setAttribute("id","urlknet");
	aKXYZ.href = "https://ss.knet.cn/verifyseal.dll?sn=e130905110100423008ilb000000&pa=500267";
	aKXYZ.tabindex ="-1";
	aKXYZ.target = "_blank";
	KXWZYZ.appendChild(aKXYZ);

	var imgKXYZ = document.createElement("img");
	imgKXYZ.alt = "&#x53EF;&#x4FE1;&#x7F51;&#x7AD9;";
	//imgKXYZ.style.border="true";     //ie下提示参数无效
	imgKXYZ.name = "KNET_seal";
	imgKXYZ.src = "/sx_tail/images/knetSealLogo.png";
	imgKXYZ.width = 128;
	imgKXYZ.height = 47;
	imgKXYZ.oncontextmenu="return false";
	imgKXYZ.setAttribute("onclick","KNET_change('urlknet')");
	aKXYZ.appendChild(imgKXYZ);

	var divGovtxt = document.createElement("div");
	divGovtxt.className = "col-xs-6 col-sm-6 col-md-6 col-lg-6 govtxt	";
	var pGov = document.createElement("p");
	pGov.className="gov";
	pGov.innerHTML="<a href='http://www.miibeian.gov.cn/'>京ICP备05002571号</a>";
	divGovtxt.appendChild(pGov);
	footerCon5.appendChild(divGovtxt);

	divFooter.appendChild(footerCon5);
});