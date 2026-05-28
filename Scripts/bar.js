let isHoldingObject = false;
let heldobject;
let ingredientList = [];
let hoveredObject = null;
let recipieInProgress

const recipies = [];
recipies.push({ name: "Screwdriver", ingredients: ["vodka", "oj"] })
recipies.push({ name: "Dirty Shirley", ingredients: ["vodka", "grenadine", "cherries"] })
recipies.push({ name: "Marg", ingredients: ["tequilla", "lj", "lime", "salt"] })

console.log(recipies)
selectRecipie()

function selectRecipie() {
  let activeRecipie = Math.floor(Math.random() * (recipies.length));
  recipieInProgress = recipies[activeRecipie]
  console.log(recipieInProgress)
  console.log(recipieInProgress.ingredients)
  displayRecipie()
};

function displayRecipie() {

  for (let i = 0; i < recipieInProgress.ingredients.length; i++) {
    $(".menu").append("<div>" + recipieInProgress.ingredients[i] + "</div>")
    console.log("appended: " + recipieInProgress.ingredients[i])
  }
}


getAllIngredients()
GetAllShelves()

// collects all objects of class item, creates an array of ingredients: name, position values
function getAllIngredients() {
  const allIngredients = document.getElementsByClassName("item");

  for (let i = 0; i < allIngredients.length; i++) {
    const ingredientName = allIngredients[i].id

    position = allIngredients[i].getBoundingClientRect();
    const top = position.top;
    const left = position.left;


    const ingredient = {
      name: ingredientName,
      startingPosition_L: left,
      startingPosition_T: top
    }

    ingredientList.push(ingredient);
  }

  return;
};

function GetAllShelves() {
  const allShelves = document.getElementsByClassName("shelf_container");

  for (let i = 0; i < allShelves.length; i++) {
    allShelves[i].id = i;

  }
}

//compares variable to all ingredients, checks if it's in array and returns object value
function getItemValue(object) {
  for (let i = 0; i < ingredientList.length; i++) {

    if (object == ingredientList[i].name) {
      console.log("item found, value is: " + i)
      return i
    };

  }
};



function itemLetGo() {
  let itemIndex = getItemValue(heldobject)
  isHoldingObject = false;


  let startingLeft = ingredientList[itemIndex].startingPosition_L
  let startingTop = ingredientList[itemIndex].startingPosition_T

  $("#" + heldobject).css("left", startingLeft + "px")
  $("#" + heldobject).css("top", startingTop + "px")
  heldobject = null;

}


function checkIngredient(ing) {
  console.log(recipieInProgress.ingredients.length)

  for (let i = 0; i < recipieInProgress.ingredients.length; i++) {

    if (ing == recipieInProgress.ingredients[i]) {
      console.log("HUZZAH")
      recipieInProgress.ingredients.splice(i)
      return
    }
  }

}



$(".shelf_container").click(function () {

  console.log("container clicked")

  if (isHoldingObject == false) {
    heldobject = this.querySelector(".item").id
    console.log("held object ID: " + getItemValue(heldobject) + " and container id: " + this.id)
    isHoldingObject = true;
  }
  else if (isHoldingObject == true && getItemValue(heldobject) == this.id) {


    itemLetGo();
    isHoldingObject = false;
  }
  else if ((isHoldingObject == true && getItemValue(heldobject) != this.id)) {
    console.log("wronc container!")
  }

});

$(".shaker").click(function () {
  //get recipie
  //check if ingredient same as recipie and not already done
  //add ingredient to cup and mark as added ingredient
  //put ingredient on back of shelf


  if (isHoldingObject == true) {
    checkIngredient(heldobject)
    console.log("added ingredient: " + heldobject)
    itemLetGo();

  }

});



$(document).mousemove(function (event) {

  if (isHoldingObject === true) {
    $("#" + heldobject).css({
      left: event.pageX - $(".bar_shelf").offset().left,
      top: event.pageY - $(".bar_shelf").offset().top
    });
  }
});


$(document).keydown(function (event) {
  if (event.key === " " || event.code === "Space") {
    itemLetGo()
  }
});


