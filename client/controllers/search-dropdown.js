const SearchCtrl = ['suggestionListService', function (suggestionListService) {
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
    .controller("SearchCtrl", SearchCtrl)
    .filter("myFilter", () => {
        return (item, searchTerm) => {
            let data = item.filter(user => user.username.includes(searchTerm) || user.fullname.includes(searchTerm));
            return data;
        }
    });