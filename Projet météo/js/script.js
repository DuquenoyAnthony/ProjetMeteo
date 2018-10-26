//var nomVille = $("#temp form").get('rechercheVille');
function recherche()
{
	var nomVille = document.getElementById("rechercheVille").value;
	$.ajax({
		url: "https://api.openweathermap.org/data/2.5/forecast?q="+ nomVille +"&units=metric&APPID=032aa7acbc4a4d21a85dc6638409262b",
		success: function( result ) {
		console.log(result);
		$( "#ex1" ).html( "Il fait <strong>" + result.main.temp + "</strong> degrés à " + result.name );
		},
		error: function(result){
			$( "#ex1" ).html( "Cette ville n'existe pas" );
		}
	});
}