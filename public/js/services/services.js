(function(){
	angular.module('wedjoy')
		.factory('userService', userService)
		.factory('inspoService', inspoService)
		.factory('cardService', cardService)

	userService.$inject = ['$http']
	inspoService.$inject = ['$http']
	cardService.$inject = ['$http']

	function userService($http){
		var apiUrl = '/users/'
		var service = {
			index: index,
			show: show,
			create: create,
			login: login,
			update: update,
			destroy: destroy
		}
		return service

		// factory functions:
		function index(){
			return $http.get(apiUrl)
		}
		function show(id){
			return $http.get(apiUrl + id)
		}
		function create(data){
			return $http.post(apiUrl, data)

		}
		function update(id, data){
			return $http.patch(apiUrl + id, data)
		}
		function destroy(id){
			return $http.delete(apiUrl + id)
		}
		function login(data){
			console.log(data);
			return $http.post(apiUrl + 'authenticate', data)

		}
	}

	function inspoService($http){
		var apiUrl = '/inspo/'
		var service = {
			show: show,
			create: create,
			update: update,
			destroy: destroy
		}
		return service

		function show(id){
			return $http.get(apiUrl + id)
		}
		function create(data){
			return $http.post(apiUrl, data)
		}
		function update(id, data){
			return $http.patch(apiUrl + id, data)
		}
		function destroy(id){
			return $http.delete(apiUrl + id)
		}
	}

	function cardService($http){
		var apiUrl = '/card/'
		var service = {
			show: show,
			create: create,
			update: update,
			destroy: destroy
		}
		return service

		function show(id){
			return $http.get(apiUrl + id)
		}
		function create(data){
			return $http.post(apiUrl, data)
		}
		function update(id, data){
			return $http.patch(apiUrl + id, data)
		}
		function destroy(id){
			return $http.delete(apiUrl + id)
		}
	}
})()
