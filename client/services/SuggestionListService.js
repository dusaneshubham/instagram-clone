angular.module('instagramApp').service('suggestionListService', ['$http',
    function($http, $scope) {
        const service = this;
        service.getSuggestions = () => {
            return $http.get(`http://localhost:2700/user/all-user`);
        };


    }
])