var city= "Chicago"; //Change this for your city!
var cityCode = "16000US1714000"; //Change this for your city!
var score = 0;

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
			table: "B11003",
			row: "B11003002"
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
	

	var totalPopulation = crdata.data[cityCode].B01003.estimate.B01003001;
	var medianAge = crdata.data[cityCode].B01002.estimate.B01002001;
	var under18 = crdata.data[cityCode].B09001.estimate.B09001001;
	var medianIncome = crdata.data[cityCode].B19013.estimate.B19013001;
	var povertyT = crdata.data[cityCode].B17001.estimate.B17001002;
	var marriedCoupFam = crdata.data[cityCode].B11003.estimate.B11003002;
	var totalWomen = crdata.data[cityCode].B01001.estimate.B01001026;
	var mexicanOrigin = crdata.data[cityCode].C03001.estimate.C03001004;
	var seniors = crdata.data[cityCode].B09020.estimate.B09020001;
	var samesexM = crdata.data[cityCode].B11009.estimate.B11009003;
	var samesexW = crdata.data[cityCode].B11009.estimate.B11009005;
	console.log(marriedCoupFam);
	//and now all the variables are populated. Boom.

	//make poverty a percentage and add to get samesex couples
	var povertyPct = (povertyT/totalPopulation)*100
	var samesexCouples = samesexM + samesexW 

	var questionsAnswers = {
		"question-1": {
				"question" : "What is the total population of "+city+"?",
				"answer" : totalPopulation,
				"image" : "icons/population.png"
		},	
		"question-2": {
				"question" : "What is the median age of people in "+city+"?",
				"answer" : medianAge,
				"image" : "icons/bdaycake.png"
		},	
		"question-3": {
				"question" : "How many children (under 18) live in "+city+"?",
				"answer" : under18,
				"image" : "icons/baby.png"
		},	
		"question-4": {
				"question" : "What is the median income in "+city+"?",
				"answer" : medianIncome,
				"image" : "icons/money.png"
		},	
		"question-5": {
				"question" : "What percentage of people in "+city+" live in poverty?",
				"answer" : povertyPct,
				"image" : "icons/poverty.png"
		},	
		"question-6": {
				"question" : "How many married couples live in "+city+"?",
				"answer" : marriedCoupFam,
				"image" : "icons/wedding.png"
		},	
		"question-7": {
				"question" : "How many women live in "+city+"?",
				"answer" : totalWomen,
				"image" : "icons/woman.png"
		},	
		"question-8": {
				"question" : city+" has awesome tacos. How many people identify as being of Mexican origin here?",
				"answer" : mexicanOrigin,
				"image" : "icons/taco.png"
		},	
		"question-9": {
				"question" : "How many senior citizens (older than 65) live in "+city+"?",
				"answer" : seniors,
				"image" : "icons/senior.png"
		},	
		"question-10": {
				"question" : "Gay marriage came to "+city+" in June. How many same-sex couples live here?",
				"answer" : samesexCouples,
				"image" : "icons/gay.png"
		}
	};

	var html = ["<div class='row'><div class='col-xs-12 quest'>Questions</div></div><div class='row'></div><div class='row'><div class='final col-xs-12'></div></div>"];
	
	for (var i = 1; i <= 10; i++) {
    html.push("<div class='row question-row' data-question='question-" + i + "'><div class='col-xs-12 questimg'><p></p><img src='"+questionsAnswers['question-' + i]['image']+"'></div><div class='col-xs-12 quest'>" + i + ": " +  questionsAnswers['question-' + i]['question'] + "</div><div class='col-xs-6 lowest'><label>Low estimate</label><input class='form-control' type='text' name='low'></div><div class='col-xs-6 highest'><label>High estimate</label><input class='form-control' type='text' name='high'></div><div class='final col-xs-12'></div></div>");
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
					$signal.html("<span class='correct'>CORRECT! The exact answer is "+a+"</span>");
					score++;
				} else {
					$signal.html("<span class='incorrect'>NOPE! The exact answer is "+a+"</span>");
				}
			}

		});

		if (!incomplete){
			$('#guess').fadeOut();
			var click = "window.open('https://twitter.com/intent/tweet?text=My%20%23score%20is%20' + (score*10) + '%25%20on%20the%20%23ona14newsgames%20Guesstimator!%20Try%20to%20beat%20me!&url=http%3A%2F%2Fbit.ly%2FONAguess', 'newwindow', 'width=430, height=260'); return false;";
			$('#score').html('<h3>You scored '+ (score*10) +'%! Now tweet your score! If you do so during the session, you could get a prize!</h3><a onclick="' + click + '" href="" id="tweet" class="btn btn-info">Tweet Your Score!</a>');
		}

	});

});