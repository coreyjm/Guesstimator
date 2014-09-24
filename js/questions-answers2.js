
var city= "Chicago"; //Change this for your city!
var cityCode = "16000US1714000"; //Change this for your city!


/*
Now we make a big 'ol queries object full of all the individual queries with associated tables and 
rows from the data we found at census reporter.

If you want to change your data, you can change tables & rows and the query name in this object, as needed.

For other table ideas, check out interesting topics at http://censusreporter.org/topics/
*/
var queries = {
		totalPop: {
			table: "B01003",
			row: "B01003001"
		},
		medAge: {
			table: "B01002",
			row: "B01002001"
		},
		children: {
			table: "B09001",
			row: "B09001001"
		},
		medIncome: {
			table: "B19013",
			row: "B19013001"
		},
		poverty: {
			table: "B17001",
			row: "B17001002"
		},
		marriedCoupleFams: {	
			table: "B11001",
			row: "B11001003"
		},
		totalFem: {
			table: "B01001",
			row: "B01001026"
		},
		totalMexican: {
			table: "C03001",
			row: "C03001004"
		},
		totalSeniors: {
			table: "B09020",
			row: "B09020001"
		},
		samesexMen: {
			table: "B11009",
			row: "B11009003"
		},
		samesexWomen: {
			table: "B11009",
			row: "B11009005"
		}
};

var tables = [];

//loop through queries object to extract tables
$.each(queries, function() { //loop through the queries object
  $.each(this, function(name, value) { //loop through each individual query
    if (name == "table"){   //if the name is "table"
    	tables.push(value); // push the value into tables array
    };
    
  });
});

//Feed tables into url that queries the census reporter api
var crAPI = "http://api.censusreporter.org/1.0/data/show/latest?table_ids="+tables+"&geo_ids="+cityCode;
	//console.log(crAPI);

//get the data
$.getJSON(crAPI, function (crdata) {

	//Find the data we need and save numbers as vars.
	//If you decide to look at different tables and rows, you'll want to make these vars match your data.
	/*
	!!!!!
	Need to do this smarter so people can monkey around with different cities 
	and change stuff in queries object without changing it here, 
	but right now, I cant think that hard, so I'll just be janky ...
	!!!!!
	*/
	var totalPopulation = crdata.data[cityCode].B01003.estimate.B01003001;
	var medianAge = crdata.data[cityCode].B01002.estimate.B01002001;
	var under18 = crdata.data[cityCode].B09001.estimate.B09001001;
	var medianIncome = crdata.data[cityCode].B19013.estimate.B19013001;
	var povertyT = crdata.data[cityCode].B17001.estimate.B17001002;
	var marriedCoupFam = crdata.data[cityCode].B01001.estimate.B01001026;
	var totalWomen = crdata.data[cityCode].B01001.estimate.B01001026;
	var mexicanOrigin = crdata.data[cityCode].C03001.estimate.C03001004;
	var seniors = crdata.data[cityCode].B09020.estimate.B09020001;
	var samesexM = crdata.data[cityCode].B11009.estimate.B11009003;
	var samesexW = crdata.data[cityCode].B11009.estimate.B11009005;
	//console.log(totalPopulation, medianAge, under18, medianIncome, povertyT, marriedCoupFam, totalWomen, mexicanOrigin, seniors, samesexM, samesexW);

	//make poverty a percentage and add to get samesex couples
	var povertyPct = (povertyT/totalPopulation)*100
	var samesexCouples = samesexM + samesexW 
	//console.log(povertyPct, samesexCouples);
	console.log(totalPopulation);
	console.log(samesexM)

	var questionsAnswers = {
		"question-1": {
				"question" : "What is the total population of "+city+"?",
				"answer" : totalPopulation
		},	
		"question-2": {
				"question" : "What is the median age of people in "+city+"?",
				"answer" : medianAge
		},	
		"question-3": {
				"question" : "How many children (under 18) live in "+city+"?",
				"answer" : under18
		},	
		"question-4": {
				"question" : "What is the median income in "+city+"?",
				"answer" : medianIncome
		},	
		"question-5": {
				"question" : "What percentage of people in "+city+" live in poverty?",
				"answer" : povertyPct
		},	
		"question-6": {
				"question" : "How many families of married couples live in "+city+"?",
				"answer" : marriedCoupFam
		},	
		"question-7": {
				"question" : "How many women live in "+city+"?",
				"answer" : totalWomen
		},	
		"question-8": {
				"question" : city+" has awesome tacos. About how many people of Mexican origin live here?",
				"answer" : mexicanOrigin
		},	
		"question-9": {
				"question" : "How many senior citizens (older than 65) live in "+city+"?",
				"answer" : seniors
		},	
		"question-10": {
				"question" : "Gay marriage came to "+city+" in June. How many same-sex couples live here?",
				"answer" : samesexCouples
		}
	};


	//and now all the variables are populated and match those at the top of the questions-answers file. Boom.
});



var score = 0;

$(document).ready(function(){

	var html = ["<div class='row'><div class='col-xs-12 quest'>Questions</div></div><div class='row'></div><div class='row'><div class='final col-xs-12'></div></div>"];
	
	for (var i = 1; i <= 10; i++) {
    html.push("<div class='row question-row' data-question='question-" + i + "'><div class='col-xs-12 quest'>#" + i + ": " +  questionsAnswers['question-' + i]['question'] + "</div><div class='col-xs-6 lowest'><label>Low estimate</label><input class='form-control' type='text' name='low'></div><div class='col-xs-6 highest'><label>High estimate</label><input class='form-control' type='text' name='high'></div><div class='final col-xs-12'></div></div>");
	}

	$('.questions').html(html.join(''));

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


