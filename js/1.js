
window.onload=function(){



	var box=$('.ll')[0];
	var img=$('.banner-img');
	var lis=$('.Yuan-li');
	var width=parseInt(getStyle(box,'width'));
	var left=$('#left');
	var right=$('#right');
	var n=0;
	var next=0;
	var flag=true;
	var t=setInterval(move,4000);
	function move(){
		if(!flag){
			return;
		}
		flag=false;
		next=n+1;
		if(next>=img.length){
			next=0;
		}
		img[next].style.left=width+'px';
		animate(img[n],{left:-width},700);
		animate(img[next],{left:0},700,function(){
			flag=true;
		});

		for(var i=0;i<lis.length;i++){
			lis[i].style.background='gray';
		}
		lis[next].style.background='#E8268B';




		n=next;
	}




	right.onclick=function(){
		move();
	}


	left.onclick=function(){
		if(!flag){
			return;
		}
		flag=false;
		next=n-1;
		if(next<0){
			next=img.length-1;
		}
		img[next].style.left=-width+'px';
		animate(img[n],{left:width},700);
		animate(img[next],{left:0},700,function(){
			flag=true;
		});
		for(var i=0;i<lis.length;i++){
			lis[i].style.background='gray';
		}
		lis[next].style.background='#E8268B';
		n=next;
	}

	box.onmouseover=function(){

		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(move,4000);
	}



	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		lis[i].onclick=function(){
			if(this.index>n){
				if(!flag){
					return;
				}
				flag=false;
				img[this.index].style.left=width+'px';
				animate(img[n],{left:-width},700);
				animate(img[this.index],{left:0},700,function(){
			flag=true;
		});
				for(var i=0;i<lis.length;i++){
				lis[i].style.background='gray';
				}
				lis[this.index].style.background='#E8268B';
			}else if(this.index<n){
				if(!flag){
					return;
				}
				flag=false;
				img[this.index].style.left=-width+'px';
				animate(img[n],{left:width},700);
				animate(img[this.index],{left:0},700,function(){
			flag=true;
		});
				for(var i=0;i<lis.length;i++){
					lis[i].style.background='gray';
				}
				lis[this.index].style.background='#E8268B';
			}
			n=this.index;
			next=this.index;
		}
	}







	var lunbo=$(".twofore");
	var zuo=$(".lunbo-left")[0];
	var you=$(".lunbo-right")[0];
	var imgBox=$("#img-box");
	var kaiguan=true;
	var kuang=parseInt(getStyle($(".img-lis")[0],"width"));
	var ti=setInterval(movee,3000);

	function movee(){
		if(!kaiguan){
			return;
		}
		kaiguan=false;
		animate(imgBox,{left:-kuang},1000,function(){
			var imgfirst=getFirst(imgBox);
			imgBox.appendChild(imgfirst);
			imgBox.style.left="0px";
			kaiguan=true;
		});
	}
	

	lunbo.onmouseover=function(){
		clearInterval(ti);
	}

	lunbo.onmouseout=function(){
		ti=setInterval(movee,3000);
	}

	zuo.onclick=function(){
		if(!kaiguan){
			return;
		}
		kaiguan=false;
		var last=getLast(imgBox);
		var first=getFirst(imgBox);
		insertBefore(last,first);
		imgBox.style.left=-kuang+"px";
		animate(imgBox,{left:0},1000,function(){
			kaiguan=true;
		});
	}

	you.onclick=function(){
		movee();
	}






	 var anvSy=$(".wz");
	 var datails=$(".datails")
	 for (var i=0; i<anvSy.length;i++){
	 	anvSy[i].index=i;
	 	anvSy[i].onmouseover=function(){
	 		for(var i=0;i<datails.length;i++){
	 			datails[i].style.display="none";
	 		};
	 		datails[this.index].style.display="block";
	 		this.style.background="#f3f3f3";

	 	}
	 	anvSy[i].onmouseout=function(){
	 		for(var i=0;i<datails.length;i++){
	 			datails[i].style.display="none";
	 		};
	 		this.style.background="#e4e4e4";
	 	}
	 
	}




     var Xlk=function(jj,ewm){

		 var mean=jj;
		 var ewm=ewm;
		 for (var i=0; i<mean.length;i++){
		 	mean[i].index=i;
		 	mean[i].onmouseover=function(){
		 		for(var i=0;i<ewm.length;i++){
		 			ewm[i].style.display="none";
		 		};
		 		ewm[this.index].style.display="block";
		 		this.style.background="#fff";
		 	}
		 	mean[i].onmouseout=function(){
		 		for(var i=0;i<ewm.length;i++){
		 			ewm[i].style.display="none";
		 		};
		 		this.style.background="#F6F6F6";
		 	}
		 
		}



	}

		 var mean=$(".mean");
		 var ewm=$(".Ewm");

		 Xlk(mean,ewm);

		 var mean=$(".dlsy");
		 var ewm=$(".DLsy");

		 Xlk(mean,ewm);












}



