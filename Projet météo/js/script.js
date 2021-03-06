//var nomVille = $("#temp form").get('rechercheVille');
var date = new Date();
var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
var tab_mois=new Array("Décembre","Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre");
var annee   = date.getFullYear();
var mois    = date.getMonth() + 1;
var jour    = date.getDate();
var heure   = date.getHours();
var minute  = date.getMinutes();
var seconde = date.getSeconds();


function recherche(nomVille)
{
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather?q="+ nomVille +"&units=metric&APPID=032aa7acbc4a4d21a85dc6638409262b",
		success: function( result ) {
		console.log(result);
		/*var $lat = result.coord.lat;
		var $long = result.coord.lon;
		rechercheByLatLong($lat, $long);*/
		$('#location').html(result.name)
		$( "#temperature" ).html( Math.floor(result.main.temp) + "<sup>o</sup>C");
		$('#vent').html("<img src=\"images/icon-wind.png\" alt=\"\">" + result.wind.speed + "km/h");
		$('#humidite').html("<img src=\"images/icon-umberella.png\" alt=\"\">" + result.main.humidity + "%");
		},
		error: function(result){
			$( "#ex1" ).html( "Cette ville n'existe pas" );
		}
	});
}
function rechercheByLatLong(lat,long)
{
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+ long +"&units=metric&APPID=032aa7acbc4a4d21a85dc6638409262b",
		success: function( result ) {
		console.log(result);
		$('#location').html(result.name)
		$( "#temperature" ).html( Math.floor(result.main.temp) + "<sup>o</sup>C");
		$('#vent').html("<img src=\"images/icon-wind.png\" alt=\"\">" + result.wind.speed + "km/h");
		$('#humidite').html("<img src=\"images/icon-umberella.png\" alt=\"\">" + result.main.humidity + "%");
		},
		error: function(result){
			$( ".find-location" ).html( "Cette ville n'existe pas" );
		}
	});
}
$('document').ready(function(){
	$(".day").html(tab_jour[date.getDay()]);
	$(".date").html(jour + " " + tab_mois[mois]);
	
	function maPosition(position) {
	  	rechercheByLatLong(position.coords.latitude,position.coords.longitude);
	}

	function obtenirParametre (sVar) {
  		return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
	}

	if (window.location.search) {
		var nomVille = obtenirParametre("rechercheVille");
		recherche(nomVille);
	}
	else{
		navigator.geolocation.getCurrentPosition(maPosition);
	}
});
