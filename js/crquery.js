
var city= "Chicago"; //Change this for your city!
var cityCode = "16000US1714000"; //Change this for your city!


/*
Now we make a big 'ol queries object full of all the individual queries with associated tables and 
rows from the data we found at census reporter.

If you want to change your data, you just change tables & rows and the query name in this object, as needed.

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
$.each(queries, function() {
  $.each(this, function(name, value) {
    if (name == "table"){ 
    	tables.push(value); // push tables into tables array
    };
    
  });
});

//Feed tables into url that queries the census reporter api
var crAPI = "http://api.censusreporter.org/1.0/data/show/latest?table_ids="+tables+"&geo_ids="+cityCode;
	//console.log(crAPI);

//get the data
$.getJSON(crAPI, function (crdata) {

	//Find the data we need and save numbers as vars.
	//If you decide to look at different tables and rows, you'll want to make these var names match your data.
	/*
	Will do this smarter so people can monkey around with different cities 
	and change tables and rows in queries object, 
	but right now, I cant think that hard, so let's be janky ...
	*/
	var totalPopulation = crdata.data+'["'+cityCode+'"]'+.B01003.estimate.B01003001;
	console.log(totalPopulation);
	var medianAge = crdata.data["16000US1714000"].B01002.estimate.B01002001;
	var under18 = crdata.data["16000US1714000"].B09001.estimate.B09001001;
	var medianIncome = crdata.data["16000US1714000"].B19013.estimate.B19013001;
	var povertyT = crdata.data["16000US1714000"].B17001.estimate.B17001002;
	var marriedCoupFam = crdata.data["16000US1714000"].B01001.estimate.B01001026;
	var totalWomen = crdata.data["16000US1714000"].B01001.estimate.B01001026;
	var mexicanOrigin = crdata.data["16000US1714000"].C03001.estimate.C03001004;
	var seniors = crdata.data["16000US1714000"].B09020.estimate.B09020001;
	var samesexM = crdata.data["16000US1714000"].B11009.estimate.B11009003;
	var samesexW = crdata.data["16000US1714000"].B11009.estimate.B11009005;
	//console.log(totalPopulation, medianAge, under18, medianIncome, povertyT, marriedCoupFam, totalWomen, mexicanOrigin, seniors, samesexM, samesexW);

	//make poverty a percentage and add to get samesex couples
	var povertyPct = (povertyT/totalPopulation)*100
	var samesexCouples = samesexM + samesexW 
	//console.log(povertyPct, samesexCouples);
});



