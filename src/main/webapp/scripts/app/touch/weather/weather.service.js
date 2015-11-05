angular.module('wayfindingApp')

.factory('weatherService', function($http) {
	return {
		getWeather: function(location) {
			if (typeof(location) === 'undefined') location = 'HongKong';
			var weather = { id: null, temp: {}};
			$http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&callback=JSON_CALLBACK&APPID=6c87706315903015f3d0f5fac54aa667').success(function(data) {
				if (data) {
					weather.id = data.weather[0].id;
					weather.temp.current = data.main.temp;
					weather.temp.min = data.main_min;
					weather.temp.max = data.main.temp_max;
				}
			});
			
			return weather;
		}
	}
});