
var city = "16000US1714000";
var crAPI = "http://api.censusreporter.org/1.0/data/show/latest?table_ids=B01001,B01002&geo_ids="+city;

console.log = crAPI;

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