window.onload = function() {

	vline = new VLine()
	vline.setupFont('Courier', 16, 20)
	vline.setupVLineHeader('Atributos de liderança', [
		'n1',
		'n2',
		'n3',
		'n4'
	])
	vline.addElement('Alinhamento cultural', 3)
	vline.addElement('Gestão de negócios', 2)
	vline.addElement('Lidar com ambiguidades e incertezas', 1)
	vline.addElement('Liderança de pessoas', 2)
	vline.addElement('Experiência internacional', 2)
	vline.addElement('Conectividade', 2)
	vline.addElement('Liderança', 1)
	vline.addElement('Experiência nacional', 1)
	vline.buildCanvas()
}