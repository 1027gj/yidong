	// 调兼容用的。



	// 功能  要实现IE低版本里面适配getClass
	// 集合  类数组  数组形式访问和操作

	function getClass(classname,obj){
		// 没有传值的时候用  或
		// 参数初始化
		var obj=obj||document;
		// IE  里面
		// w3c规范里面   FF   chrome
		if(obj.getElementsByClassName){
			return obj.getElementsByClassName(classname);
		}else{
			var arr=[];
			// 拿到的是一个结果集
			var objs=obj.getElementsByTagName('*');
			for(var i=0;i<objs.length;i++){

				var dom=checkClass(classname,objs[i]);
            //定义变量dom
    		if(dom==true){

					arr.push(objs[i])
					
				}
			}

			return arr;
		}
	}



	 function checkClass(val,obj){
	    //接受传入的实参
	    var str=obj.className;
	    //将obj里的所有类名赋值给str
	    var brr=str.split(" ");
	    //将字符串转化为数组
	    for(var j=0;j<brr.length;j++){
	        //遍历该数组
	           if(brr[j]==val){
	            //判断该数组里的某个值是不是所需的类名
	            return true;
	           }
	    }
	     return false;
	 }

 

	// 获取和设置内容兼容性函数

	function operateText(obj,val){
		if(val!=undefined){
			if(obj.innerText){
				return obj.innerText=val;
			}else{
				return obj.textContent=val;
			}	
			}else{
				if(obj.innerText){
					return obj.innerText;
				}else{
					return obj.textContent;
				}
			}
		
	}




	// 获取样式
	function getStyle(obj,style){
		if(obj.currentStyle){
			return obj.currentStyle[style];
		}else{
			return getComputedStyle(obj,null)[style];
		}
	}






		// $函数  帮助我们获取元素
function $(val,obj){
	if(typeof val=='string'){
		var obj=obj||document;
		// val=".one";
		val.replace(/^\s*|\s*$/g,"");
		if(val.charAt(0)=="#"){
			return document.getElementById(val.slice(1));
		}else if(val.charAt(0)=="."){
			return getClass(val.slice(1),obj);
		// 测试符不符合标签
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}/.test(val)){
			return obj.getElementsByTagName(val);
		}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>$/.test(val)){
          return document.createElement(val.slice(1,-1))
        }
	}else if(typeof val=='function'){
		window.onload=function(){
			val();
		}
			
	}
	
}







function getChilds(obj,type){
	// 初始化类型
	var type=type||"no";
	var kids=obj.childNodes;
	var arr=[];
	for(var i=0;i<kids.length;i++){
		if(type=="no"){
			if(kids[i].nodeType=="1"){
				arr.push(kids[i]);
			}
		}else if(type=="yes"){
			if(kids[i].nodeType=="1"||kids[i].nodeType==3&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				arr.push(kids[i]);
			}
		}
	}
	return arr;
}





// 拿到第一个子节点
function getFirst(obj,type){
	// 初始化类型
	var type=type||"no";
	return getChilds(obj,type)[0];

}



// 拿到最后一个子节点
function getLast(obj,type){
	// 初始化类型
	var type=type||"no";
	var childs=getChilds(obj,type);
	return childs[childs.length-1];

}



// 拿到第N个节点
function getNub(obj,n,type){
	// 初始化类型
	var type=type||"no";
	var childs=getChilds(obj,type);
	if(n>childs.length||n<1){
		return false;
	}
	return childs[n-1];

}



// 取兄弟节点
// obj.nextSibling
// obj.previousSibling
function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling;
	if(next===null){
		return false;
	}
	if(type=="no"){
		while(next.nodeType=="3"||next.nodeType=="8"){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}else if(type=="yes"){
		while(next.nodeType=="3"&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType=="8"){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}






// 取上一个兄弟节点
function getPrevious(obj,type){
	var type=type||"no";
	var next=obj.previousSibling;
	if(next===null){
		return false;
	}
	if(type=="no"){
		while(next.nodeType=="3"||next.nodeType=="8"){
			next=next.previousSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}else if(type=="yes"){
		while(next.nodeType=="3"&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType=="8"){
			next=next.previousSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}





// 追加到页面中

// 插入之前
function insertBefore(obj,beforeObj){
	var parent=beforeObj.parentNode;
	parent.insertBefore(obj,beforeObj);
}



// 插入之后
function insertAfter(obj,afterObj){
	var parent=afterObj.parentNode;
	var next=getNext(afterObj,"yes");
	if(!next){
		parent.appendChild(obj);
	}else{
		parent.insertBefore(obj,next);
	}
}




// 添加删除事件
function addEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.attachEvent("on"+event,fun);
	}else{
		obj.addEventListener(event,fun,false);
	}
}

function removeEvent(obj,event,fun){
	if(obj.detachEvent){
		obj.detachEvent("on"+event,fun);
	}else{
		obj.removeEventListener(event,fun,false);
	}
}




function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		obj.attachEvent("onmousewheel",scrollFun);
	}else{
		obj.addEventListener("mousewheel",scrollFun,false);
		obj.addEventListener("DOMMouseScroll",scrollFun,false);
	}
	function scrollFun(e){
		var e=e||window.event;
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;
		}
		var nub=e.wheelDelta||e.detail;
		if(nub==120||nub==-3){
			up.call(obj);
		}else if(nub==-120||nub==3){
			down.call(obj);
		}
	}
}






//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/