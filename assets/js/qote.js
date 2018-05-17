var language = navigator.language || navigator.userLanguage;

document.addEventListener('DOMContentLoaded', function() {
	//
}, false);
window.addEventListener('load', function() {
	document.body.dataset.status = 'loaded';
	document.body.dataset.language = language;

	if(document.getElementById('menu-state') != null) {
		document.getElementById('menu-state').checked = false;
	}

	var a = document.getElementsByTagName('a');
	for(var i = 0, l = a.length; i < l; i++) {
		setPageChangeEvent(a[i]);
	}

	var input = document.getElementsByTagName('input');
	for(var i = 0, l = input.length; i < l; i++) {
		inputEvents(input[i]);
	}

	var textarea = document.getElementsByTagName('textarea');
	for(var i = 0, l = textarea.length; i < l; i++) {
		inputEvents(textarea[i]);
	}

	if(document.getElementById('work') != null) {
		var grid = new Catgrid(document.getElementById('work'), document.getElementById('work-classifier'));
	}

	if(document.getElementById('clients') != null) {
		setClients();
	}

	if(document.getElementById('map') != null) {
		initMap();
	}

	if(document.getElementById('work-grid') != null) {
		document.getElementById('work-grid').checked = true;
	}
	var workBlocks = document.getElementsByClassName('project');
	for(var i = 0, l = workBlocks.length; i < l; i++) {
		workLoadEvent(workBlocks[i]);
	}

}, false);

function inputEvents(input) {
	if(input.value != '') {
		input.dataset.empty = "false";
	} else {
		input.dataset.empty = "true";
	}
	input.addEventListener('input', function() {
		if(input.value != '') {
			input.dataset.empty = "false";
		} else {
			input.dataset.empty = "true";
		}
	}, false);
}

function initMap() {
	var map = L.map('map').setView([48.857193, 2.332618], 15);
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();
	map.boxZoom.disable();
	map.keyboard.disable();
	/*
	mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');
	var map = new mapboxgl.Map({
	container: 'map',
	style: 'style-cdn.json',
	attributionControl: true,
	hash: true
	});
	map.addControl(new mapboxgl.NavigationControl());
	*/
	//L.tileLayer.provider('Stamen.Watercolor').addTo(map);
	//L.tileLayer.provider('Stamen.Terrain').addTo(map);
	L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

	var myIcon = L.divIcon({ popupAnchor: [0, -130] });
	var marker = L.marker(location, {
		icon: myIcon
	}).bindPopup(function (marker) {}); //Shortened
	//L.tileLayer.provider('OpenStreetMap.BlackAndWhite').addTo(map);
	
	L.marker([48.857193, 2.332618]).addTo(map)
		.bindPopup('QOTE<br />13 rue des Saints-Pères<br />75006 PARIS<br />France<br /><br />(+33) (0)1 86 76 05 00<br /><a href="mailto:'+window.atob('Y29udGFjdEBxb3RlLmZy')+'">'+window.atob('Y29udGFjdEBxb3RlLmZy')+'</a>')
		.openPopup();

}

function setPageChangeEvent(a) {
	a.addEventListener('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		if(document.getElementById('menu-items').contains(a)) {
			a.className = 'menu-selected';
		}
		document.body.dataset.status = 'loading';
		setTimeout(function() {
			document.body.dataset.status = 'loaded';
			if(document.getElementById('menu-items').contains(a)) {
				a.className = '';
			}
			redirect(a.href);
		}, 1150);
		
	}, false);
}

function redirect(link) {
	window.location.href = link;
}




var clientsContainer;

var currentQuote = 0;
var quotesLength = 0;
var quotesButtons;
var quotesContainer;
var quoteInterval;

function setClients() {
	clientsContainer = document.getElementById('clients-container');
	var d = clientsContainer.getElementsByTagName('div');
	for(var i = 0, l = d.length; i < l; i++) {
		//d[i].style.marginLeft = (i*100)+'%';
		d[i].style.width = (100/l)+'%';
	}

	quotesLength = d.length;
	
	clientsContainer.style.width = (quotesLength*100)+'%';

	quoteInterval = window.setInterval(nextQuote, 5000);
}


function nextQuote() {
	currentQuote++;
	if(currentQuote >= (quotesLength*6)-5) {
		currentQuote = 0;
	}
	loadQuote();
}

function gotoQuote() {
	currentQuote = parseInt(this.dataset.slide);
	clearInterval(quoteInterval);
	quoteInterval = setInterval(nextQuote, 5000);
	loadQuote();
}

function loadQuote() {
	clientsContainer.style.marginLeft = -((currentQuote/6)*100)+'%';
}

function workLoadEvent(e) {
	e.addEventListener('click', function() {
		loadWork(e);
	}, false);
}

function loadWork(element) {
	document.getElementById('project-container').innerHTML = element.getElementsByClassName('project-data')[0].value;

	var c = document.getElementById('project-container').getElementsByClassName('project-block')[0];
	if(typeof c !== 'undefined') {
		var close = document.createElement('div');
		close.className = 'project-close';
		close.addEventListener('click', function() {
			document.getElementById('work-grid').checked = true;
		}, false);
		c.prepend(close);
	}

	

	document.getElementById('work-details').checked = true;

	
	

}


function addClass(element, classList) {
	var classes = classList.split(" ");
	for(var i=0, l=classes.length; i<l; i++) {
		if(!this.hasClass(element, classes[i])) {
			element.className = element.className+' '+classes[i];
		}
	}
}
function removeClass(element, classList) {
	var result = element.className;
	var classes = classList.split(" ");
	for(var i=0, l=classes.length; i<l; i++) {
		if(this.hasClass(element, classes[i])) {
			result = (' '+result+' ').replace((' '+classes[i]+' '),' ');
		}
	}
	result = result.replace(/ {2,}/g,' ');
	element.className = result;
}
function hasClass(element, classTo) {
	return ((' '+element.className+' ').indexOf(' '+classTo+' ') > -1);
}
