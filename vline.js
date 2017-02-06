class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
	}
}

class VLine {

	// Class constructor
	constructor() {
		// Create the element canvas
		var canvas = document.createElement('canvas')
		canvas.id = 'canvas'
		this.canvas = canvas

		// Get the canvas context
		var context = canvas.getContext('2d')
		this.context = context

		// Initializing main variables
		this.vLineElements = null
		this.elementRow = []
		this.fontFamily = null
		this.fontSize = null
	}

	// Set up the chart font
	setupFont(fontFamily, fontSize) {
		this.fontFamily = fontFamily
		this.fontSize = fontSize
		this.context.font = fontSize + 'px ' + fontFamily
	}

	// Set up the vLine Elements
	setupVLineHeader(title, arrayElements) {
		this.vLineElements = {
			'title':title,
			'elements':arrayElements
		}
	}

	// Add element row to the chart
	addElement(title, elementMarker) {
		if(title == '' || elementMarker == 0)
			return alert('[ERROR] addElement: Missing parameter')
		if(elementMarker > this.vLineElements.elements.length)
			return alert('[ERROR] addElement: elementMarker out of bounds')
		this.elementRow.push({
			'title':title,
			'element':elementMarker
		});
	}

	// Set up the canvas settings
	buildCanvas() {
		var arrayStrings = []
		var context = this.context
		arrayStrings.push(parseInt(context.measureText(this.vLineElements.title).width))
		this.vLineElements.elements.forEach(function(string) {
			arrayStrings.push(parseInt(context.measureText(string).width))
		});
		this.elementRow.forEach(function(string) {
			arrayStrings.push(parseInt(context.measureText(string.title).width))
		});
		var maxWidth = Math.max(...arrayStrings)
	}  
}