class VLine {

	// Class constructor
	constructor() {
		// Create the element canvas
		var canvas = document.createElement('canvas')
		canvas.id = 'canvas'
		this.canvas = canvas
		this.canvas.style.display = 'none'

		// Get the canvas context
		var context = canvas.getContext('2d')
		this.context = context

		// Initializing main variables
		this.vLineHeader = null
		this.elementRow = []
		this.fontFamily = null
		this.fontSize = null
		this.maxTitleWidth = 0
		this.maxElementWidth = 0
		this.columnPos = []
		this.rowPos = []
		this.vLineMarker = []
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
		this.vLineHeader = {
			'title':title,
			'elements':arrayElements
		}
	}

	// Add element row to the chart
	addElement(title, elementMarker) {
		if(title == '' || elementMarker == 0)
			return alert('[ERROR] addElement: Missing parameter')
		if(elementMarker > this.vLineHeader.elements.length)
			return alert('[ERROR] addElement: elementMarker out of bounds')
		this.elementRow.push({
			'title':title,
			'element':elementMarker
		});
	}

	// Set up the canvas settings
	buildCanvas() {
		var characterWidth = this.fontSize * 0.75
		
		var arrayTitle = [this.vLineHeader.title.length]
		for(var i = 0; i < this.elementRow.length; i++) {
			arrayTitle.push(this.elementRow[i].title.length)
		}
		this.maxTitleWidth = Math.max(...arrayTitle) * characterWidth
		var arrayElement = []
		for(var i = 0; i < this.vLineHeader.elements.length; i++) {
			arrayElement.push(this.vLineHeader.elements[i].length)
		}
		this.maxElementWidth = Math.max(...arrayElement) * characterWidth
		this.canvas.width = this.maxTitleWidth + (this.maxElementWidth * this.vLineHeader.elements.length) + this.fontMargin * (this.vLineHeader.elements.length + 1)
		var canvasHeight = (this.fontSize + this.fontMargin) * (this.elementRow.length + 1)
		this.canvas.height = canvasHeight
		this.drawCanvas()
	}

	// Draw the canvas elements
	drawCanvas() {
		this.context.save()
		this.context.fillStyle = '#333'
		this.context.font = this.fontSize + 'px ' + this.fontFamily
		
		var currentY = this.fontMargin
		this.context.fillText(this.vLineHeader.title, this.fontMargin / 2, currentY)
		
		for(var i = 0; i < this.elementRow.length; i++) {
			currentY += this.fontMargin + this.fontSize
			this.rowPos.push(currentY)
			this.context.fillText(this.elementRow[i].title, this.fontMargin / 2, currentY)
			this.context.beginPath()
			this.context.moveTo(this.fontMargin / 2, currentY + 3)
			this.context.lineTo(this.maxTitleWidth - this.fontMargin, currentY + 3)
			this.context.stroke()
		}
		this.context.textAlign = 'center'
		currentY = this.fontMargin
		var currentX = this.canvas.width - this.fontMargin - (this.maxElementWidth / 2)
		for(var i = this.vLineHeader.elements.length - 1; i >= 0; i--) {
			this.context.fillText(this.vLineHeader.elements[i], currentX, currentY)
			this.columnPos.push(currentX)
			currentX -= this.maxElementWidth + this.fontMargin
		}
		this.drawMarker(3)
		this.context.restore()
		var img = document.createElement('img')
		img.src = this.canvas.toDataURL("image/png")
		document.body.appendChild(img)

	}

	// Draw the point markers
	drawMarker(radius) {
		var columns = this.columnPos.reverse()
		var lines = this.rowPos
		for(var i = 0; i < this.elementRow.length; i++) {
			this.context.beginPath()
			this.context.arc(columns[this.elementRow[i].element - 1], lines[i] - radius, radius, 0, 2 * Math.PI)
			this.vLineMarker.push({
				'x':columns[this.elementRow[i].element - 1],
				'y':lines[i] - radius/2
			});
			this.context.fill()
		}
		this.context.beginPath()
		this.context.lineWidth = radius
		for(var i = 0; i < this.vLineMarker.length; i++) {
			if(i == 0) {
				this.context.moveTo(this.vLineMarker[i].x, this.vLineMarker[i].y - radius / 2)
			} else {
				this.context.lineTo(this.vLineMarker[i].x, this.vLineMarker[i].y - radius / 2)
			}
		}
		this.context.stroke()
	}
}