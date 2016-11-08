// $(function(){
// 	function nodeLunbo(obj,lunbo,left,right,imgBox,){
$(function(){
	var lunbo=$(".twofore")[0];
	var left=$(".lunbo-left");
	var right=$(".lunbo-right");
	var imgBox=$("#a")[0];
	var width=parseInt(getStyle($(".img-lis")[0],"width"));
	var t=setInterval(move,1500);
var n=1;
	function move(){
		animate(imgBox,{left:-width*n},1000,function(){
			for(var i=1;i<=n;i++){
				// imgBox[1,2,3,4];
				//       [2,3,4,1]

				var imgfirst=getFirst(imgBox);
			imgBox.appendChild(imgfirst);
		
			}
				imgBox.style.left="0px";
		});
	}
	

	lunbo.onmouseover=function(){
		clearInterval(t);
	}

	lunbo.onmouseout=function(){
		t=setInterval(move,1500);
	}

	left.onclick=function(){
		// for (var i=0;i<=n;i++){
				var last=getLast(imgBox);
		var first=getFirst(imgBox);
		insertBefore(last,first);
		imgBox.style.left=-width+"px";
		animate(imgBox,{left:0},1000);
		// }
	
	}

	right.onclick=function(){
		move();
	}


// nodeLunbo($(".twofore")[0])
// nodeLunbo($(".lunbo")[1])

})
	// }
// })







