document.addEventListener("DOMContentLoaded", function() {
    loadProducts();
    document.querySelector('input[type="search"]').addEventListener("input", searchrecipie);
});

function loadProducts() {
    let recipieList = document.getElementById("recipieList");
    allRecipies.forEach(function(obj) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = obj.recipie_img;
        img.classList.add("recipe-image");
        img.addEventListener("click", function() {
            showRecipeDetails(obj.recipie_img, obj.recipie_method);
        });

        var h4 = document.createElement("h4");
        h4.innerText = obj.recipie_name;

        var btn = document.createElement("button");
        btn.innerText = "Add to CookBook";
        btn.className = "btn btn-warning";
        btn.setAttribute("title", obj.recipie_id);
        btn.addEventListener("click", addItem);

        li.appendChild(img);
        li.appendChild(h4);
        li.appendChild(btn);
        
        recipieList.appendChild(li);
    });
}

function showRecipeDetails(imageSrc, method) {
    var modalImage = document.getElementById("modalImage");
    var recipeDetails = document.getElementById("recipeDetails");

    modalImage.src = imageSrc;
    recipeDetails.innerText = method;

    var recipeModal = new bootstrap.Modal(document.getElementById("recipeModal"));
    recipeModal.show();
}

function addItem() {
    let food_id = this.title;
    let resultArr = allRecipies.filter(function(obj) {
        return obj.recipie_id == food_id;
    });

    let arr = cookbookObj.cookbookList.filter(function(obj) {
        return obj.id == food_id;
    });
    if(arr.length != 0) {
        alert("Recipe already exists in CookBook...");
        return;
    }

    cookbookObj.addItem(resultArr[0].recipie_id, resultArr[0].recipie_name, resultArr[0].recipie_img, resultArr[0].recipie_method);

    savecookbook();
}

function savecookbook() {
    console.log("cookbook")
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
    let recipieList = document.getElementById("recipieList");
    
    recipieList.innerHTML = "";
    let filteredRecipies = allRecipies.filter(function(obj) {
        return obj.recipie_name.toLowerCase().includes(searchInput);
    });
    filteredRecipies.forEach(function(obj) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.src = obj.recipie_img;
        img.classList.add("recipe-image");
        img.addEventListener("click", function() {
            showRecipeDetails(obj.recipie_img, obj.recipie_method);
        });

        var h4 = document.createElement("h4");
        h4.innerText = obj.recipie_name;

        var btn = document.createElement("button");
        btn.innerText = "Add to CookBook";
        btn.className = "btn btn-warning";
        btn.setAttribute("title", obj.recipie_id);
        btn.addEventListener("click", addItem);

        li.appendChild(img);
        li.appendChild(h4);
        li.appendChild(btn);

        recipieList.appendChild(li);
    });
}