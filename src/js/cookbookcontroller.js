document.addEventListener("DOMContentLoaded", function() {
    loadcookbook();
    document.querySelector('input[type="search"]').addEventListener("input", searchrecipie);
});

function loadcookbook() {
    console.log("Cookbook Loaded 1")
    if (window.localStorage) {
        if (localStorage.getItem("cookbook")) {
            console.log("Cookbook Loaded 2")
            let data = localStorage.getItem("cookbook");
            cookbookObj.cookbookList = JSON.parse(data);
            showcookbook();
        }
    } else {
        alert("Browser doesn't support local storage");
        alert("CookBook cannot be loaded..");
    }
}

function showcookbook() {
    console.log("Cookbook showed")
    let cookbook = document.querySelector("#cookbookList");
    cookbook.innerHTML = "";
    cookbookObj.cookbookList.forEach(function(obj) {
        console.log(cookbookObj.cookbookList)
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = obj.img;
        img.classList.add("recipe-image");
        img.addEventListener("click", function() {
            showRecipeDetails(obj.img, obj.method);
        });

        var h4 = document.createElement("h4");
        h4.innerText = obj.name;

        var btn = document.createElement("button");
        btn.innerText = "Remove from CookBook";
        btn.className = "btn btn-warning";
        btn.setAttribute("title", obj.id);
        btn.addEventListener("click",deletefood );

        li.appendChild(img);
        li.appendChild(h4);
        li.appendChild(btn);

        cookbook.appendChild(li);
    });
}

function showRecipeDetails(imageSrc, method) {
    var modalImage = document.getElementById("modalImage");
    var recipeDetails = document.getElementById("cookbookDetails");

    modalImage.src = imageSrc;
    recipeDetails.innerText = method;

    var recipeModal = new bootstrap.Modal(document.getElementById("cookbookModal"));
    recipeModal.show();
}

function deletefood() {
    let food_id = this.title;
    cookbookObj.deleteItem(food_id);
    showcookbook();
    savecookbook();
}

function savecookbook() {
    if(window.localStorage) {
        let data = JSON.stringify(cookbookObj.cookbookList);
        localStorage.setItem("cookbook", data);
    }
    else {
        alert("Browser don't support localstorage");
        alert("CookBook cannot be saved..");
    }
}

function searchrecipie() {
    let searchInput = document.querySelector('input[type="search"]').value.toLowerCase();
    let filteredCookbook = cookbookObj.cookbookList.filter(function(obj) {
        return obj.name.toLowerCase().includes(searchInput);
    });
    showFilteredCookbook(filteredCookbook);
}

function showFilteredCookbook(filteredCookbook) {
    let cookbook = document.querySelector("#cookbookList");
    cookbook.innerHTML = "";
    filteredCookbook.forEach(function(obj) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = obj.img;
        img.classList.add("recipe-image");
        img.addEventListener("click", function() {
            showRecipeDetails(obj.img, obj.method);
        });

        var h4 = document.createElement("h4");
        h4.innerText = obj.name;

        var btn = document.createElement("button");
        btn.innerText = "Remove from CookBook";
        btn.className = "btn btn-warning";
        btn.setAttribute("title", obj.id);
        btn.addEventListener("click",deletefood );

        li.appendChild(img);
        li.appendChild(h4);
        li.appendChild(btn);

        cookbook.appendChild(li);
    });
}