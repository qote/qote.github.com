function Catgrid(container, classifier) {
	this.container = container;
	if(typeof classifier !== 'undefined') {
		this.classifier = classifier;
	} else {
		this.classifier = undefined;
	}

	this.elem = [];
	this.cat = ['All'];

	this.selector;
	this.catSelectors = []; // contain the header selectors

	this.positions = [];
	//this.gap = [0,0];

	this.initialize();
	this.create();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                Catgrid Prototype Start                                                                   //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Catgrid.prototype = {
	initialize: function() {
		this.children = this.container.getElementsByTagName("*");
		for(var i = 0, l = this.children.length; i < l; i++) {
			if(typeof this.children[i].dataset.cat !== 'undefined') {
				this.elem.push(this.children[i]);
				if(this.cat.indexOf(this.children[i].dataset.cat) == -1) {
					this.cat.push(this.children[i].dataset.cat);
				}
			}
		}
	},

	create: function() {
		this.selector = document.createElement('div');
		this.selector.className = 'catgrid-selector';

		for(var i = 0, l = this.cat.length; i < l; i++) {
			var div = document.createElement('div');
			if(i == 0) {
				div.className = 'catgrid-category catgrid-selected';
			} else {
				div.className = 'catgrid-category';	
			}
			div.dataset.category = this.cat[i];
			div.innerHTML = this.cat[i];

			this.catSelectors.push(div);
			this.selector.appendChild(div);

			var self = this;
			div.addEventListener('click', function() { self.hideCategory(this.dataset.category); }, false);
		}

		if(typeof this.classifier !== 'undefined') {
			this.classifier.insertBefore(this.selector, this.classifier.firstChild);
		} else {
			this.container.insertBefore(this.selector, this.container.firstChild);
		}
		

		for(var i = 0, l = this.elem.length; i < l; i++) {
			var elemPos = this.getPosition(this.elem[i]);
			var positionArray = [elemPos.left,elemPos.top];
			this.positions.push(positionArray);
		}
	},

	showAll: function() {
		for(var i = 0, l = this.elem.length; i < l; i++) {
			this.removeClass(this.elem[i], 'catgrid-hidden');
		}
	},

	hideCategory: function(category) {
		var active = 0;

		for(var i = 0, l = this.elem.length; i < l; i++) {
			if(this.elem[i].dataset.cat == category || category == 'All') {
				this.removeClass(this.elem[i], 'catgrid-hidden');
				this.moveTo(this.elem[i], this.positions[active][0], this.positions[active][1]);
				active++;
			}
		}

		for(var i = 0, l = this.elem.length; i < l; i++) {
			if(this.elem[i].dataset.cat != category && category != 'All') {
				this.addClass(this.elem[i], 'catgrid-hidden');
				this.resetPosition(this.elem[i]);
			} else {
				this.removeClass(this.elem[i], 'catgrid-hidden');
			}
		}

		for(var i = 0, l = this.catSelectors.length; i < l; i++) {
			this.removeClass(this.catSelectors[i], 'catgrid-selected');
			if(this.catSelectors[i].dataset.category == category) {
				this.addClass(this.catSelectors[i], 'catgrid-selected');
			}
		}
	},

	moveTo: function(e,x,y) {
		var ePos = this.getPosition(e);
		console.log(x,y,ePos.left, ePos.top);
		x = x - ePos.left;
		y = y - ePos.top;
		
		e.style["-webkit-transform"] = "translate(" + -x + "px, " + -y +"px)";
		e.style["-moz-transform"] = "translate(" + x + "px, " + y +"px)";
		e.style["-ms-transform"] = "translate(" + x + "px, " + y + "px)";
		e.style["-o-transform"] = "translate(" + -x + "px, " + -y + "px)";
		e.style["transform"] = "translate(" + x + "px, " + y + "px)";

	},

	resetPosition: function(e) {
		e.style["-webkit-transform"] = 'none';
		e.style["-moz-transform"] = 'none';
		e.style["-ms-transform"] = 'none';
		e.style["-o-transform"] = 'none';
		e.style["transform"] = 'none';
	},

	getPosition: function(element){
		var top = 0, left = 0;
		var elem = element;
		while (element) {
			left += element.offsetLeft;
			top += element.offsetTop;
			element = element.offsetParent;
		}
		
		// make the coordinates relative to parent block
		top = top - elem.parentNode.offsetTop;
		left = left - elem.parentNode.offsetLeft;

		return {'left':left, 'top':top};
	},

	addClass: function(element, classList) {
		var classes = classList.split(" ");
		for(var i=0, l=classes.length; i<l; i++) {
			if(!this.hasClass(element, classes[i])) {
				element.className = element.className+' '+classes[i];
			}
		}
	},
	removeClass: function(element, classList) {
		var result = element.className;
		var classes = classList.split(" ");
		for(var i=0, l=classes.length; i<l; i++) {
			if(this.hasClass(element, classes[i])) {
				result = (' '+result+' ').replace((' '+classes[i]+' '),' ');
			}
		}
		result = result.replace(/ {2,}/g,' ');
		element.className = result;
	},
	hasClass: function(element, classTo) {
		return ((' '+element.className+' ').indexOf(' '+classTo+' ') > -1);
	}
};
