angular.module('wayfindingApp')

.factory('weatherService', function($http) {
	return {
		getWeather: function(location) {
			if (typeof(location) === 'undefined') location = 'hongkong';
			var weather = { id: '', temp: 0 };

			$http.jsonp('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + location + '%22)&format=json&callback=JSON_CALLBACK')
			.success(function(data) {
				if (data) {
					weather.id = data.query.results.channel.item.condition.code;
					weather.temp = (Number(data.query.results.channel.item.condition.temp) - 32) / 1.8;
				}
			});
			
			return weather;
		}
	}
});