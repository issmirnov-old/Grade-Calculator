		function extrapolateGrade(){ /*Extrapolates grades*/
			savePage();

			//initialize arrays and variables
			$('#weight').data('weightArray', []);
			$('#myscore').data('myscoreArray', []);
			$('#categories').data('categoriesArray', []);
			var result = 0;
			var desiredGrade = eval($('#currentGrade').val());

			//clear messages div
			$('#msg').empty();
			$('#msg').css("background", '')

			//exit catch - if grade empty then quit
			if (isNaN(parseFloat($('#currentGrade').val())) && isFinite($('#currentGrade').val())){
				$(msg).css("background", "#FFC")
				$(msg).append("<p>Error: Fill in desired grade.<p>");
				return
			}

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
					//debug
					//console.log( $('#myscore').data('myscoreArray')[i] );
				}

				// clean arrays
				if ($('#weight').data('weightArray')[i] == undefined){
					$('#weight').data('weightArray')[i] = 0
				}
				// multiply
				$('#categories').data('categoriesArray').push(
					$('#weight').data('weightArray')[i] * $('#myscore').data('myscoreArray')[i]
				);
			}

			// get temporary result
			for (i = 0; i < $('#weight').data('weightArray').length; i++){
				result += $('#categories').data('categoriesArray')[i]
			}


			// calculate weightSum
			var weightSum = 0;
			for (i = 0; i < $('#weight').data('weightArray').length; i++){
				weightSum += $('#weight').data('weightArray')[i] - 0
			}

			//for when percents not add up to 100
			desiredGrade =  desiredGrade / 100 * weightSum;

			//parse categories for empty entries, summarize weights
			var emptyWeight = 0;
			for (i = 0; i < $('#weight').data('weightArray').length; i++){
				if ( ($('#categories').data('categoriesArray')[i]) == 0 ){
					emptyWeight = parseFloat(emptyWeight) + ($('#weight').data('weightArray')[i] - 0);
				}//end if
			}///end for


			//calculate percentage
			var newGrade = (( desiredGrade - result ) / emptyWeight );

			//if categories entry is 0, populate it
			for (i = 0; i < $('#weight').data('weightArray').length; i++){
				if ( ($('#categories').data('categoriesArray')[i]) == 0 ){
						$('#categories').data('categoriesArray')[i] = newGrade  * $('#weight').data('weightArray')[i];
				}//end if
			}

			//clear my score column
			$('#myscore').empty();
			//add back header
			$('#myscore').append('<div class="header" id="myScoreHeader">My Score (decimals)</div>');

			//clean array
			var bigResult = 0;
			for (i = 0; i < $('#weight').data('weightArray').length; i++){
				if ( isNaN($('#categories').data('categoriesArray')[i] / $('#weight').data('weightArray')[i])){
					bigResult = " ";
				}
				else
				{
					bigResult = $('#categories').data('categoriesArray')[i] / $('#weight').data('weightArray')[i]
					bigResult = parseFloat(bigResult.toFixed(4)) // round to 4 digits, strip trailing zeros
				}

				//add required score
					$('#myscore').append(
						$('<li>').append(
							$('<input>').attr({
							type: 'text',
							onkeyup: "javascript:validate(event)",
							value: bigResult
							})
						)
					);
			}///end for

			// clean desired grade
			desiredGrade = parseFloat(desiredGrade.toFixed(4))
			//print results
			$('#currentGrade').attr('value', desiredGrade);
		}//end extrapolateGrade()
