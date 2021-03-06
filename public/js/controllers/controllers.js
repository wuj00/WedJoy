(function(){
	angular.module('wedjoy')
        .controller('ProfileCtrl', ProfileCtrl)
        .controller('InspoCtrl', InspoCtrl)
        .controller('CardCtrl', CardCtrl)

    ProfileCtrl.$inject = ['$stateParams', 'userService', 'inspoService', '$scope', '$window']
    InspoCtrl.$inject = ['$stateParams', 'inspoService', 'cardService', '$scope', '$window']
    CardCtrl.$inject = ['$stateParams', 'inspoService', 'cardService', '$scope', '$window']

    //PROFILE
    function ProfileCtrl($stateParams, userService, inpsoService, $scope, $window){
        var self = this
        self.title = "PROFILE controller yup"
        self.currentUserId = $window.localStorage['currentUserId']


			userService.show(self.currentUserId).success(function(results){
				// for(var i=0; i < result.inspo.length; i++) {
			    // if (results){

					self.user = results
		            console.log(self.user)
					})
			// 	}
			// }

        self.edit = function(){
            self.editing = true
            self.editingUser = {
                name: self.user.name,
                lastname: self.user.lastname,
                email: self.user.email,
                password: self.user.password
            }
        }
        self.update = function(){
            //patch request will go here.
            userService.update(self.currentUserId, self.editingUser).success(function(response){
                self.editing = false
                // console.log(response)
                self.user = response.user
	            })
	        }
	    }

    //INSPO BOARD
    function InspoCtrl($stateParams, inspoService, cardService, $scope, $window){
        // var self = this
        // // self.cardArray = []
        // // self.usersArray = []
		//
        // self.title = "INSPO controller"
        // self.currentUserId = $window.localStorage['currentUserId']
		//
		//
        // inspoService.show(self.currentUserId).success(function(results){
        //     self.user = results
        //     // console.log(self.inspo);
        // })
		//
		// self.create = function(){
		// 	self.newProduct._creator = $scope.$parent.main.currentUserId
		// 	userService.create(self.newUser).success(function(response){
		// 		$state.go('inspo', {id: response.user._id})
		// 	})
		// }
		// self.destroy = function(id, index){
		// 	userService.destroy(id).success(function(response){
		// 		console.log(response)
		// 		self.users.splice(index, 1)
		// 	})
		// }
	}

	//INSPO BOARD
	function CardCtrl($stateParams, inspoService, cardService, $scope, $window){
	}
})()
