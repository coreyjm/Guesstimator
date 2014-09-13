var score = 0;

$(document).ready(function(){
	populateQuestions();

	$('#guess').click(function(){
		var incomplete = false;
		score = 0;

		$.each($('.question-row'), function(k,v){
			var q = $(this).attr('data-question'),
					a = questionsAnswers[q]["answer"],
					l = parseInt($(this).find('input[name="low"]').val()),
					h = parseInt($(this).find('input[name="high"]').val()),
					$signal = $(this).find('.final');

			if (isNaN(l) || isNaN(h)){
				$signal.html("<span class='error'>* Required</span>");
				incomplete = true;
			} else {
				if (l <= a && a <= h){
					$signal.html("<span class='correct'>CORRECT</span>");
					score++;
				} else {
					$signal.html("<span class='incorrect'>NOPE</span>");
				}
			}

		});

		if (!incomplete){
			$('#score').html(score);
		}

	});

})

function populateQuestions(){
	
	var html = ["<div class='row'><div class='col-md-5'>Questions</div><div class='col-md-2'>Low Estimate</div><div class='col-md-2'>High estimate</div><div class='final col-md-3'></div></div>"];
	
	for (var i = 1; i <= 10; i++) {
    html.push("<div class='row question-row' data-question='question-" + i + "'><div class='col-md-5'>" + questionsAnswers['question-' + i]['question'] + "</div><div class='col-md-2'><input type='text' name='low'></div><div class='col-md-2'><input type='text' name='high'></div><div class='final col-md-3'></div></div>");
	}

	$('.questions').html(html.join(''));

}