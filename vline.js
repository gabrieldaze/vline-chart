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
	setupFont(fontFamily, fontSize, fontMargin) {
		this.fontFamily = fontFamily
		this.fontSize = fontSize
		this.fontMargin = fontMargin
		// this.context.font = fontSize + 'px ' + fontFamily
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

		var goldenRatio = 1.618
		var goldenLine = this.fontSize * goldenRatio
		var widthBase = (goldenLine * goldenLine) / this.fontSize
		var charWidth = widthBase // / Math.sqrt(this.fontSize)

		var titleArray = []
		var maxTitleLength = 0
		var elementArray = []
		var maxElementLength = 0
		titleArray.push(this.vLineElements.title.length)
		this.vLineElements.elements.forEach(function(string) {
			elementArray.push(parseInt(string.length))
		});
		this.elementRow.forEach(function(string) {
			titleArray.push(string.title.length)
		});
		maxTitleLength = Math.max(...titleArray)
		maxElementLength = Math.max(...elementArray)
		this.canvas.width = (charWidth * maxTitleLength) + (charWidth * maxElementLength) + (this.fontMargin * this.elementRow.length) + 2 * this.fontMargin
		this.canvas.height = (this.fontSize + this.fontMargin * 2) + (this.fontSize + this.fontMargin * 2) * this.elementRow.length
		document.body.appendChild(this.canvas)
		this.drawTable()
	} 

	// Draw the table
	drawTable() {
		this.context.font = this.fontSize + 'px ' + this.fontFamily
		this.context.fillStyle = '#EEE'
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.context.fillStyle = '#333'
		this.context.fillText(this.vLineElements.title, this.fontMargin, this.fontMargin * 1.4)
		var currentX = this.fontMargin
		var currentY = this.fontMargin * 1.4 + this.fontSize * 4
		var context = this.context
		var fontSize = this.fontSize
		var fontMargin = this.fontMargin
		this.elementRow.forEach(function(obj) {
			context.fillText(obj.title, currentX, currentY)
			currentY += fontSize + fontMargin * 1.4
		});
	}
}