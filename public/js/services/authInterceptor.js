(function(){
	angular.module('wedjoy')
        .factory('authInterceptor', authInterceptor)

    function authInterceptor(authService){
        return {
            request: function(config){
                var token = authService.getToken();
                if(token){
                    config.headers['x-access-token'] = token
                    // console.log(config.headers);
                }
                // console.log(config);
                return config;
            },
            response: function(res){
                if(res.data.token){authService.saveToken(res.data.token)}
                return res;
            }
        }
    }
})()
