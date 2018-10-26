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


function recherche()
{
	var nomVille = document.getElementById("rechercheVille").value;
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/weather?q="+ nomVille +"&units=metric&APPID=032aa7acbc4a4d21a85dc6638409262b",
		success: function( result ) {
		console.log(result);
		var date = new Date();
		var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
		$( "#ex1" ).html( "Il fait <strong>" + result.main.temp + "</strong> degrés à " + result.name + " le "+ tab_jour[date.getDay()]);
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
		},
		error: function(result){
			$( "#ex1" ).html( "Cette ville n'existe pas" );
		}
	});
}
$('document').ready(function(){
	$(".day").html(tab_jour[date.getDay()]);
	$(".date").html(jour + " " + tab_mois[mois]);
	
	function maPosition(position) {
		var infopos = "Position déterminée :\n";
		infopos += "Latitude : "+position.coords.latitude +"\n";
		infopos += "Longitude: "+position.coords.longitude+"\n";
	 	infopos += "Altitude : "+position.coords.altitude +"\n";
	  	rechercheByLatLong(position.coords.latitude,position.coords.longitude);
	}

	if(navigator.geolocation)
	  navigator.geolocation.getCurrentPosition(maPosition);
});