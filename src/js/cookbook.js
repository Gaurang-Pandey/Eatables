class FavItem {
    constructor(id, name, img, method) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.method = method;
        this.selected = false;
    }
}

let cookbookObj = {
    cookbookList: [],

    deleteItem: function (food_id) {
        this.cookbookList = this.cookbookList.filter(function(obj) {
            return obj.id != food_id;
        });
    },
};