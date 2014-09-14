/*
var city = "16000US1714000";
var tables = 
	[
	"B01003", //total population
	"B01002", //median age by sex
	"B09001", //population under 18 years
	"B19013", //median income
	"B17001", //poverty
	"B11001", //household type (married couple families)
	"B01001", //sex by age
	"C03001", //hispanic/latino origin
	"B09020", //seniors
	"B11009", //same-sex couples
	];


var crAPI = "http://api.censusreporter.org/1.0/data/show/latest?table_ids="+tables+"&geo_ids="+city;
console.log(crAPI);

$.getJSON(crAPI, function (crdata) {

	console.log(crdata); //Check out all the data in the console.
	console.log(crdata.data); //down to data level works
	
	//This chokes with Uncaught SyntaxError: Unexpected token ILLEGAL and I don't know why?
	//console.log(crdata.data.16000US1714000); 

	//Also breaks with an undefined if I just do this, which is actually preferable for this project ...
	//console.log(crdata.data[0].B01001); 

    //This is what I want to get at:
    //console.log(crdata.data[0].B01001.estimate.B01001001);

    parseJSON(cr)

});

*/
$.getJSON( "js/crdata.js", function( json ) {
  console.log( "JSON Data: " + crdata.data);
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