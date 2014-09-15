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
	
	var html = [],
			indicators = [];
	
	for (var i = 1; i <= 10; i++) {

		var active = i==1 ? " active" : "";
		
		indicators.push("<li data-target='#guesstimate' data-slide-to='" + (i-1) + "' class='" + active + "'></li>");
    
    html.push("<div class='item" + active + "'> <div style='height: 315px; width: 1200px; background-color:gray;'></div> <div class='carousel-caption'> <div class='row question-row' data-question='question-" + i + "'><div class='col-sm-12 quest'>" + questionsAnswers['question-' + i]['question'] + "</div><div class='col-sm-6 lowest'><label>Low estimate</label><input class='form-control' type='text' name='low'></div><div class='col-sm-6 highest'><label>High estimate</label><input class='form-control' type='text' name='high'></div><div class='final col-sm-12'></div></div> </div> </div>");
	}

	$('.carousel-indicators').html(indicators.join(''));
	$('.carousel-inner').html(html.join(''));

}