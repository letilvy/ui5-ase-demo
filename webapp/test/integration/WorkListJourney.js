/*
	On the worklist page, there should be an EXPLORER button on the header tool bar
	Click on the button will call a dialog with a title 'Make a choice' and two buttons
	Please try the button by yourself and implement following 2 test case:
		1.	When click on the button 'I love SAPUI5 !'
			Then show a messageToast with text 'SAPUI5'
			
		2.	When click on the button 'I love ABAP !'
			Then show a messageToast with text 'ABAP'	

Hint:
	Assertion for messageToast text could be like this:
	
					check: function() {
						return sap.ui.test.Opa5.getJQuery()(".sapMMessageToast").text() === "Hello World";
					},
		
*/