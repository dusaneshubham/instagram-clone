const FollowerSuggestionListCtrl = ['suggestionListService', function(suggestionListService, $localStorage, $scope) {
    let followers = this;

    const currentUserId = JSON.parse(localStorage.getItem('user'))._id;

    suggestionListService.getSuggestions()
        .then((res) => {
            console.log(res.data.filter(e => e._id != currentUserId));
            followers.all = res.data.filter(e => e._id != currentUserId);

        }).catch((err) => {
            console.log(err);
        });
}];

angular
    .module("instagramApp")
    .controller("FollowerSuggestionListCtrl", FollowerSuggestionListCtrl);