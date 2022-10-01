setTimeout(function(){
	console.log(document);
	var img = document.createElement('img');
	img.width = 600;
	img.src =  'http://localhost:8080/ads_gif.gif';
    document.body.appendChild(img);
	
},300);