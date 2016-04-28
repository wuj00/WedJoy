(function(){
	angular.module('wedjoy')
        .controller("GlobalCtrl", GlobalCtrl)

    GlobalCtrl.$inject = ['userService', '$state', 'authService', '$rootScope', '$window']


    function GlobalCtrl(userService, $state, authService, $rootScope, $window){
        var self = this
        self.title = "Global Controller"
        self.newUser = {}
        self.loginUser = {}

        //body tag
        $rootScope.$on('$stateChangeStart', function(event, toState){
			console.log(toState.name);
			// if (toState.name === "login" && !self.isAuthed()){
			//     event.preventDefault()
		    //     $state.go('home')
			// }

            // console.log(toState);
        })

        function handleRequest(res){
            var token = res.data ? res.data.token : null;
            if (token) {
                console.log('JWT:', token)
                authService.saveToken(token)
                self.currentUserId = res.data.user._id
                $window.localStorage['currentUserId'] = self.currentUserId
                console.log('id:', self.currentUserId)
                $state.go('profile', {user: self.currentUserId})
            }
        }

		// function userService($http){
		// 	var self = this;

	        // userService.index().success(function(results){
	        // 	self.users = results
	        // })

			self.getUsers = function() {
			    userService.show()
			    	.then(handleRequest, handleRequest);
			}
	        self.login = function(){
	            // console.log('main login')
	            userService.login(self.loginUser)
	            .then(handleRequest, handleRequest)
	        }
	        self.signup = function(){
	            userService.create(self.newUser)
	                .then(handleRequest, handleRequest)
	        }
	        self.logout = function(){
	            authService.logout && authService.logout();
				self.message = "You logged out. Goodbye.";
	        }
	        self.isAuthed = function(){
	            return authService.isAuthed ? authService.isAuthed() : false;
	        }
	        console.log(self.isAuthed(), "what to dooo");
		// }
    }
})()
