const SearchCtrl = ['suggestionListService', function(suggestionListService) {
    const search = this;
    suggestionListService.getSuggestions()
        .then((res) => {
            search.all = res.data;

        }).catch((err) => {
            console.log(err);
        });
}]

angular
    .module("instagramApp")
    .controller("SearchCtrl", SearchCtrl);