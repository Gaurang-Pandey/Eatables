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
    addItem: function (id, name, img, method) {
        let obj = new FavItem(id, name, img, method);
        this.cookbookList.push(obj);
        console.log(this.cookbookList);
    },
};