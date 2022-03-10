angular.module('instagramApp').service('suggestionListService', ['$http',
    function ($http, $scope) {
        const service = this;
        service.getSuggestions = () => {
            return $http.get(`http://localhost:2700/user/all-user`);
        };

        service.getCurrentUser = () => {
            const token = localStorage.getItem('token');
            return $http.post(`http://localhost:2700/user/current-user`, { token });
        }

    }
])