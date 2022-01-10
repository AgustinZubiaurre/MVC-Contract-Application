# MVC-Contract-Application




EVALUACIÓN TÉCNICA

	OBJETIVO
Construir una Grilla que muestre los Tipos de Contrato que maneja la empresa

	CONSIGNAS
•	El proyecto podrá ser realizado en Visual Studio o Visual Code - :white_check_mark:

•	Tendrá que tener una estructura MVC - :white_check_mark:

•	Podrán utilizarse solamente los siguientes lenguajes:
-	HTML - :white_check_mark:
-	CSS - :white_check_mark:
-	Javascript o Jquery (según sea conveniente) - :white_check_mark:
-	Bootstrap - [x]
•	Se deberán ingresar datos como ejemplo - :white_check_mark:
•	La pantalla tendrá que ser Responsive - :white_check_mark:


	MODELO A DISEÑAR
•	La pantalla deberá tener una Grilla con dos columnas: Tipo de Contrato y Estado - [x]

•	La columna Tipo deberá tener un filtro - [x]

•	La columna Estado, en el título, aparte de la palabra “Estado” deberá contener la imagen de un corazón - [x]

•	La columna Estado tendrá que contener un Checkbox que cambiará de tildado a destildado al hacer click :white_check_mark: 

•	Deberá incluirse la posibilidad de crear un nuevo Tipo de Contrato y de modificar los existentes :white_check_mark:

•	En la parte inferior derecha de la pantalla deberá haber un Float Action Button  :white_check_mark:
(en HTML con CSS) con la siguiente imagen: (me tome la libertad creativa de implementar un Float Action button con resources distintos del que se mostraba en el documento .word, pero manteniendo la esencia del mismo)

El desafio de esta evaluacion, fue realizar un CRUD en un IDE que no habia utilizado previamente (Visual Studio Code), e imeplentar un patron MVC en un lenguaje que nunca utilice para el mismo ya que mi experiencia hasta el dia de la fecha con el modelo MVC es en PHP. 
Decidi no utilizar Bootstrap ya que con los tiempos disponibles, preferi enforcarme en la funcionalidad del proyecto. La cual considero lograda, pero no asi el cumplimento de los requisitos de que sea en formatode una  Grilla con dos columnas, si no que se utilizo un formato de lista para representar los contratos.

Se pueden crear nuevos contratos y visualizarlos, asi como editarlos y eliminarlos. Tambien dispone de un Float Action Button hecho enteramente en CSS y HTML.
No se respeto el formato de Grilla con columnas de "Estado" y "Tipo de Contrato", ni se implemento un filtro para los mismos.

Este filtro supondria un componente extra, en el cual al ingresar letras en un input, la lista de contratos solo muestre los que se matcheen con los valores ingresador como se muestra en el siguiente ejemplo: https://www.w3schools.com/howto/howto_js_filter_lists.asp

 
