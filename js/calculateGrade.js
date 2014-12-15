function calculateGrade(){ /*Calculates grades*/
	//clear messages div
	$('#msg').empty();
	$('#msg').css("background", '')

	// TODO - use proper arrays instead of HTML DOM binds

    
	//initialize arrays and variables
	$('#weight').data('weightArray', []);
	$('#myscore').data('myscoreArray', []);
	$('#categories').data('categoriesArray', []);
	var result = 0;

	//loop and add weight values to array
	$("ul#weight > li > input").each(function(index) {
		$('#weight').data('weightArray').push($(this).val());
	});

	//loop and add score values to array
	$("ul#myscore > li > input").each(function(index) {
		$('#myscore').data('myscoreArray').push($(this).val());
	});

	// multiply together, store in new array
	for (i = 0; i < $('#weight').data('weightArray').length; i++){
		//catch fractions
		if (eval($('#myscore').data('myscoreArray')[i]) != undefined){
			$('#myscore').data('myscoreArray')[i] = eval($('#myscore').data('myscoreArray')[i]);
		}
		// multiply
		$('#categories').data('categoriesArray').push(
			$('#weight').data('weightArray')[i] * $('#myscore').data('myscoreArray')[i]
		);
	}
	// summarize values
	for (i = 0; i < $('#weight').data('weightArray').length; i++){
		result += $('#categories').data('categoriesArray')[i]
	}
	// calculate weightSum
	var weightSum = 0;
	for (i = 0; i < $('#weight').data('weightArray').length; i++){
		weightSum += $('#weight').data('weightArray')[i] - 0
	}
	//create result, normalize to 100 scale
	result = result * 100 / weightSum;
	result = result.toFixed(2);

	//print results
	$('#currentGrade').attr('value', result);
	savePage();
}//end calculateGrade()