$(document).ready(function(){
	populateQuestions();

	$('#guess').click(function(){

		$.each($('.question-row'), function(k,v){
			var q = $(this).attr('data-question');
			var a = questionsAnswers[q]["answer"];

			console.log(q,a);

		});

	});

})

function populateQuestions(){
	
	var html = ["<div class='row'><div class='col-md-6'>Questions</div><div class='col-md-3'>Low Estimate</div><div class='col-md-3'>High estimate</div>"];
	
	for (var i = 1; i <= 10; i++) {
    html.push("<div class='row question-row' data-question='question-" + i + "'><div class='col-md-6'>" + questionsAnswers['question-' + i]['question'] + "</div><div class='col-md-3'><input type='text' name='low'></div><div class='col-md-3'><input type='text' name='high'></div></div>");
	}

	$('.questions').html(html.join(''));

}