const FollowerSuggestionListCtrl = ['suggestionListService', function (suggestionListService, $localStorage, $scope, $http) {
    let followers = this;

    const currentUserId = JSON.parse(localStorage.getItem('user'))._id;

    suggestionListService.getSuggestions()
        .then((res) => {
            suggestionListService.getCurrentUser()
                .then((currentUserRes) => {
                    const currentUserData = currentUserRes.data;
                    let suggestionsToShow = res.data.filter(e => ((e._id != currentUserId) && !(currentUserData.following.includes(e._id))));
                    followers.all = suggestionsToShow.filter((data, index) => index < 5);
                }).catch((err) => {
                    console.log(err);
                })
        }).catch((err) => {
            console.log(err);
        });
}];

angular
    .module("instagramApp")
    .controller("FollowerSuggestionListCtrl", FollowerSuggestionListCtrl);