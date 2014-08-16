var questionsAnswers = [
	["Question 1", "Answer"],
	["Question 2", "Answer"],
	["Question 3", "Answer"],
	["Question 4", "Answer"],
	["Question 5", "Answer"],
	["Question 6", "Answer"],
	["Question 7", "Answer"],
	["Question 8", "Answer"],
	["Question 9", "Answer"],
	["Question 10", "Answer"]
];

$(document).ready(function(){
	populateQuestions();

})

function populateQuestions(){
	
	var html = ["<div class='row'><div class='col-md-6'>Questions</div><div class='col-md-3'>Low Estimate</div><div class='col-md-3'>High estimate</div>"];
	
	$.each(questionsAnswers, function(k,v){
		html.push("<div class='row' data-question='question-" + k + "'><div class='col-md-6'>" + v[0] + "</div><div class='col-md-3'><input type='text' name='low'></div><div class='col-md-3'><input type='text' name='high'></div></div>");
	});

	$('.questions').html(html.join(''));

}