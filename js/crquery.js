
var city= "Chicago"
var cityCode = "16000US1714000";

/*var tables = 
	[
	"B01003", //total population table. Total row = B01003001
	"B01002", //median age by sex. Total row = B01002001
	"B09001", //population under 18 years old. Total row = B09001001
	"B19013", //median income. Total row = B19013001
	"B17001", //poverty. Total row = B17001001
	"B11001", //household type. Married couple families row = B11001003
	"B01001", //sex by age. Total males row = B01001002. Total females row = B01001026.
	"C03001", //hispanic/latino origin. Total hispanic row = C03001001. Total Mexican row = C03001004.
	"B09020", //seniors. Total row = B09020001.
	"B11009", //same-sex couples. Male + male row = B11009003. Female + female row = B11009005.
	];
*/
//Make a big 'ol queries object full of all the individual queries with associated tables and rows.
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
			row: "B17001001"
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

//loop through queries object to extract tables
$.each( query, function( i, val ) {
  console.log(val);
};
//Feed tables into url that queries the census reporter api
//var crAPI = "http://api.censusreporter.org/1.0/data/show/latest?table_ids="+tables+"&geo_ids="+city;


//get the data
$.getJSON(crAPI, function (crdata) {

	//run the queries on the data and save numbers as vars
	//example console.log(crdata.data["16000US1714000"].B01001.estimate.B01001001); 

});



