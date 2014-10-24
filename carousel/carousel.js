window.onload = function(){
	var main = document.querySelector('#main'), //document.getElementById('main')
		slider = document.querySelector('#slider'), //document.getElementById('slider')
		button = document.querySelector('.button').getElementsByTagName('span'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		len = slider.getElementsByTagName('img').length,
		index = 1,
		animated = false,
		timer,
		interval = 1000
	;
	// common function
	var animate = function(node,offset){
			if(offset == 0){ return ;}
			var left = parseInt(node.style.left) + offset,
				time = 600,
				serval = 10,
				speed = offset/(time/serval);

			animated = true;

			var go = function(){

					if( speed !=0 && parseInt(node.style.left) != left ){
						node.style.left = parseInt(node.style.left) + speed + 'px';
						setTimeout(go,serval);
					}else{
						node.style.left = left + 'px';
						if(left > 0 ){ node.style.left = -600 * (len - 1) + 'px'; }
						if(left < (-600 * (len-1)) ){ node.style.left = 0 + 'px';}

						animated = false;
							
					}
				};

			go();
			
			showButton(button,index);
		},
		showButton = function(node,n){
			for(var i=0;i<node.length;i++){
				if( node[i].className == 'on' ){ 
					node[i].className = '';
				 	// break;
				}
				node[n-1].className = 'on';
			}
		},
		play = function(){ timer = setTimeout(function(){ next.click(); play();},interval);},
		stop = function(){ clearTimeout(timer);}
		;

	// next
	next.addEventListener('click',function(){
		if(animated){ return;}
		
		index += 1;
		if( index == len +1 ){ index = 1;}
		animate(slider,-600);
	},false);
	// prev
	prev.addEventListener('click',function(){
		if(animated){ return;}

		index -= 1;
		if( index == 0 ){ index = len;}
		animate(slider,600);
	},false);
	// every button
	for(var i=0;i<button.length;i++){
		button[i].addEventListener('click',function(){
			if(animated){ return;}
			var myindex = parseInt(this.getAttribute('index')),
				offset = -600 * (myindex - index)
			index = myindex;
			animate(slider,offset);
		},false); //item()
	}

	// mouse event
	// main.onmouseout = play;
	// main.onmouseover = stop;
	main.onmouseout = play;
	main.onmouseover = stop;
	// init
	play();


};