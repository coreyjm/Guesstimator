
var city= "Chicago"
var cityCode = "16000US1714000";
var tables = 
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
var totalPopulation = 2714844;
var medianAge = 33.6;
var under18 = 612404;
var medianIncome = 45214;
var povertyPct = (2666002/totalPopulation)*100;
var marriedCoupFam = 332025;
var totalWomen = 1399062;
var mexicanOrigin = 593289;
var seniors = 296635;
var samesexCouples = 6048 + 3113;

var crAPI = "http://api.censusreporter.org/1.0/data/show/latest?table_ids="+tables+"&geo_ids="+city;
//console.log(crAPI);

var 

$.getJSON(crAPI, function (crdata) {

	//console.log(crdata); //Check out all the data in the console.
	
	console.log(crdata.data["16000US1714000"].B01001.estimate.B01001001); 

});



/* var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  $.getJSON( flickerAPI, {
    tags: "mount rainier",
    tagmode: "any",
    format: "json"
  })
    .done(function( data ) {
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#query" );
        if ( i === 3 ) {
          return false;
        }
      });
    });
*/