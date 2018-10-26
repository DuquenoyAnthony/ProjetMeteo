//var nomVille = $("#temp form").get('rechercheVille');
function recherche()
{
	var nomVille = document.getElementById("rechercheVille").value;
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast?q="+nomVille+"&units=metric&APPID=032aa7acbc4a4d21a85dc6638409262b",
		success: function( result ) {
		console.log(result);
		$( "#ex1" ).html( "Il fait <strong>" + result.list[0].main.temp+ "</strong> degrés à " + result.city.name +". L'humidité est de "+ result.list[0].main.humidity);
		$( "#ex1" ).append( " Il fait <strong>" + result.list[1].main.temp );
		$( "#ex1" ).append( " Il fait <strong>" + result.list[2].main.temp );
		},
		error: function(result){
			$( "#ex1" ).html( "Cette ville n'existe pas" );
		}
	});
}