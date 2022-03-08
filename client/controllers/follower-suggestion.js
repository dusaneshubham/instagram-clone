const FollowerSuggestionCtrl = ['$localStorage', '$http', function($localStorage, $http) {
    let follower = this;

    const token = localStorage.getItem('token');
    this.follow = true;



    this.followUser = (id) => {



        $http.put(`http://localhost:2700/user/follow/${id}`, { token: token }, {

        }).then((res) => {
            console.log(res)
            this.follow = false
        }).catch(err => {
            console.log(err);
        })


    }
    this.unFollowUser = (id) => {



        $http.put(`http://localhost:2700/user/unfollow/${id}`, { token: token }, {

        }).then((res) => {
            console.log(res)
            this.follow = true
        }).catch(err => {
            console.log(err);
        })


    }





}];

angular
    .module("instagramApp")
    .controller("FollowerSuggestionCtrl", FollowerSuggestionCtrl);