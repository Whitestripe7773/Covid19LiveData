function getData(){
$.getJSON("https://api.covid19api.com/summary", showdata = function(data){

    console.log(data);

    // Get data from JSON object
    var newConfirmed = data.Global.NewConfirmed;
    var newDeaths = data.Global.NewDeaths;
    var newRecovered = data.Global.NewRecovered;

    var totalConfirmed = data.Global.TotalConfirmed;
    var totalDeaths = data.Global.TotalDeaths;
    var totalRecovered = data.Global.TotalRecovered;


    $(".confirmed").text("New confirmed: " + newConfirmed + " -|- Total confirmed: " + totalConfirmed);
    $(".deaths").text("New deaths: " + newDeaths + " -|- Total deaths: " + totalDeaths);
    $(".recovered").text("New recovered: " + newRecovered + " -|- Total recovered: " + totalRecovered);

    window.setInterval(function(){
        getData();
    }, 60000);
});
}

function getCountryData(){
    $.getJSON("https://api.covid19api.com/summary", showdata = function(data){

    var country = getCountryName();

    var result = [];
    for (var i = 0; i < data.Countries.length; i++){
        if (data.Countries[i].Country == country)
        {
            result.push(data.Countries[i]);
        }
    }
    console.log(result);

    var countryNewConfirmed = result[0].NewConfirmed;
    var countrynewDeaths = result[0].NewDeaths;
    var countrynewRecovered = result[0].NewRecovered;
    
    var countrytotalConfirmed = result[0].TotalConfirmed;
    var countrytotalDeaths = result[0].TotalDeaths;
    var countrytotalRecovered = result[0].TotalRecovered;

    $(".country").text(country);
    $(".confirmed-country").text("New confirmed: " + countryNewConfirmed + " -|- Total confirmed: " + countrytotalConfirmed);
    $(".deaths-country").text("New deaths: " + countrynewDeaths + " -|- Total deaths: " + countrytotalDeaths);
    $(".recovered-country").text("New recovered: " + countrynewRecovered + " -|- Total recovered: " + countrytotalRecovered);
})
}



$(function() {
    var availableTags = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Germany",
    "Turkey"
    ];
    function split( val ) {
    return val.split( /,\s*/ );
    }
    function extractLast( term ) {
    return split( term ).pop();
    }
    $( "#countryName" )
    // don't navigate away from the field on tab when selecting an item
    .bind( "keydown", function( event ) {
    if ( event.keyCode === $.ui.keyCode.TAB &&
    $( this ).data( "ui-autocomplete" ).menu.active ) {
    event.preventDefault();
    }
    })
    .autocomplete({
    minLength: 0,
    source: function( request, response ) {
    // delegate back to autocomplete, but extract the last term
    response( $.ui.autocomplete.filter(
    availableTags, extractLast( request.term ) ) );
    },
    focus: function() {
    // prevent value inserted on focus
    return false;
    },
    select: function( event, ui ) {
    var terms = split( this.value );
    // remove the current input
    terms.pop();
    // add the selected item
    terms.push( ui.item.value );
    // add placeholder to get the comma-and-space at the end
    terms.push( "" );
    this.value = terms.join( "" );
    return false;
    }
    });
    });

function getCountryName(){
    var countryName = document.getElementById("countryName").value;
    return countryName;
}