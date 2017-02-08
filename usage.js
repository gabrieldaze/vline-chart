window.onload = function() {

	vline = new VLine()
	vline.setupFont('Courier', 16, 20)
	vline.setupVLineHeader('Leadership Attributes', [
		'Low',
		'Medium',
		'High'
	])
	vline.addElement('Business management', 2)
	vline.addElement('Entrepreneurial mindset', 3)
	vline.addElement('Ambition and resilience', 2)
	vline.addElement('Relationship building', 2)
	vline.addElement('Project management', 1)
	vline.addElement('Taking orders', 1)
	vline.buildCanvas()
}