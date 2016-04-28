(function(){
    angular.module('wedjoy')
        .service('authService', authService)



function authService($window){
    var self = this
    self.parseJwt = function(token){
        var base64Url = token.split('.')[1]
        var base64 = base64Url.replace('-', '+').replace('_', '/')
        return JSON.parse($window.atob(base64))
    }
    //save the token
    self.saveToken = function(token){
        $window.localStorage['jwtToken'] = token;
    }
    //get the token
    self.getToken = function(){
        return $window.localStorage['jwtToken'];
    }
    //checking the token to see if user is authenticated
    self.isAuthed = function(){
        var token = self.getToken();
        // console.log(token);
        if(token){
            var params = self.parseJwt(token);
            return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            return false;
        }
    }
    console.log(self.isAuthed(), "WORKKKK");
    //removes token from local storage
    self.logout = function(){
        $window.localStorage.removeItem('jwtToken');
        $window.localStorage.removeItem('currentUserId');
    }
}
})()
