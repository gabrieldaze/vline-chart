window.onload = function() {

	vline = new VLine()
	vline.setupFont('Courier', 16)
	vline.setupVLineHeader('Titulo', ['N1','N2','N3','N4'])
	vline.addElement('Elemento', 4)
	vline.addElement('Teste', 2)
	vline.addElement('Outro teste', 1)
	vline.buildCanvas()
}