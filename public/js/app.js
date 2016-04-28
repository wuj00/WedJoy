(function(){
	angular.module('wedjoy', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider, $httpProvider){

			// handle any attempts to routes other than what's listed below:
            $httpProvider.interceptors.push('authInterceptor')
            $urlRouterProvider.otherwise('/')

			// my established routes
			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'partials/home.html'
				})
                .state('login', {
                    url: '/login',
                    templateUrl: 'partials/login.html'
                })
				.state('signup', {
					url: '/signup',
					templateUrl: 'partials/signup.html'
				})
                .state('users', {
                    url: '/users',
                    templateUrl: 'partials/users.html'
                })
				.state('profile', {
					url: '/users/:id',
					templateUrl: 'partials/profile.html',
					controller: 'ProfileCtrl as pc'
				})
				.state('inspo', {
					url: '/inspoboard/:id',
					templateUrl: 'partials/inspo.html',
					controller: 'InspoCtrl as ic'
				})
		})
})()//everytime something new is made CONSOLE LOG - so that you know where it went wrong.
