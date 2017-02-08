window.onload = function() {

	vline = new VLine()
	vline.setupFont('Courier', 16, 20)
	vline.setupVLineHeader('Atributos de liderança', ['N1','N2','N3','N4'])
	vline.addElement('Alinhamento cultural', 3)
	vline.addElement('Gestão de negócios', 2)
	vline.addElement('Lidar com ambiguidades e incertezas', 3)
	vline.addElement('Liderança de pessoas', 2)
	vline.buildCanvas()
}