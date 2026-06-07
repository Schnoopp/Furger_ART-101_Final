let isHoldingObject = false;
let heldobject;
let ingredientList = [];
let activeRecipie;

let drinkInProgress = [];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const recipies = [];
recipies.push({ name: "Screwdriver", ingredients: ["vodka", "orangeJuice"] })
recipies.push({ name: "Dirty Shirley", ingredients: ["vodka", "grenadine", "cherries", "limeJuice"] })
recipies.push({ name: "Lemon Drop", ingredients: ["vodka", "tripleSec", "lemonJuice", "syrup", "sugar"] })
recipies.push({ name: "White Russian", ingredients: ["vodka", "kahula", "creamLiqueur", "cherries"] })

recipies.push({ name: "Margarita", ingredients: ["tequilla", "limeJuice", "lime", "salt", "sugar"] })
recipies.push({ name: "Tequila Sunrise", ingredients: ["tequilla", "orangeJuice", "grenadine", "cherries"] })
recipies.push({ name: "Tequila Espresso Martini", ingredients: ["tequilla", "kahula", "syrup"] })
recipies.push({ name: "Matador", ingredients: ["tequilla", "pineappleJuice", "limeJuice", "tripleSec"] })

recipies.push({ name: "Gin and Tonic", ingredients: ["gin", "tonic", "lime"] })
recipies.push({ name: "Gimlet", ingredients: ["gin", "syrup", "limeJuice", "lime"] })
recipies.push({ name: "Tom Collins", ingredients: ["gin", "lemonJuice", "syrup", "tonic", "cherries"] })
recipies.push({ name: "Gin Sour", ingredients: ["gin", "lemonJuice", "syrup", "bitters"] })

recipies.push({ name: "Mojito", ingredients: ["rum", "limeJuice", "mint", "sugar", "tonic"] })
recipies.push({ name: "Bahama Mama", ingredients: ["rum", "kahula", "pineappleJuice", "cherries"] })
recipies.push({ name: "Daquiri", ingredients: ["rum", "limeJuice", "sugar", "syrup"] })
recipies.push({ name: "Mai Tai", ingredients: ["rum", "tripleSec", "pineappleJuice", "orangeJuice", "syrup", "grenadine"] })

recipies.push({ name: "Old Fashioned", ingredients: ["whiskey", "syrup", "bitters", "cherries"] })
recipies.push({ name: "Revolver", ingredients: ["whiskey", "kahula", "bitters"] })
recipies.push({ name: "B52 Shot", ingredients: ["whiskey", "kahula", "creamLiqueur", "triplesec"] })
recipies.push({ name: "Whiskey Sour", ingredients: ["whiskey", "lemonJuice", "syrup", "cherries"] })

console.log(recipies)
selectRecipie()


function selectRecipie() {
  activeRecipie = recipies[Math.floor(Math.random() * (recipies.length))]
  console.log(activeRecipie)
  console.log(activeRecipie.ingredients)
  displayRecipie(activeRecipie)
};

function displayRecipie(recipie) {
  $("#menuText").append("<div>" + recipie.name + ": </div>" + "<p>ingredients: </p>")
  for (let i = 0; i < recipie.ingredients.length; i++) {
    $("#menuText").append("<div>" + recipie.ingredients[i] + "</div>")
    console.log("appended: " + recipie.ingredients[i])
  }
}


getAllIngredients()
GetAllShelves()

// collects all objects of class item, creates an array of ingredients: name, position values
function getAllIngredients() {
  const allIngredients = document.getElementsByClassName("item");

  for (let i = 0; i < allIngredients.length; i++) {

    position = allIngredients[i].getBoundingClientRect();
    const top = position.top;
    const left = position.left;


    const ingredient = {
      name: allIngredients[i].id,
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

let label_show = false;

$(".shelf_container").hover(
  function () {
    if (isHoldingObject == false) {
      if (label_show == false) {
        $(".label").stop(true, true).slideDown(300);
        $(".label").html(ingredientList[this.id].name)
        console.log(ingredientList[this.id].name)
        label_show = true

      }
    }



  },
  function () {

    label_show = false
    delay(1000).then(() => {
      if (label_show == false) {
        $(".label").stop(true, true).slideUp(300);
      }

    })


  }
);



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
  console.log(activeRecipie.ingredients.length)

  for (let i = 0; i < activeRecipie.ingredients.length; i++) {

    if (ing == activeRecipie.ingredients[i]) {
      console.log("HUZZAH")
      drinkInProgress.push(heldobject);
      console.log(drinkInProgress)

      return
    }
  }
}





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

$("#done").click(function () {
  if (compareArrays(drinkInProgress, activeRecipie.ingredients) == true) {
    console.log("ALLDONE")
  }
  else(
    console.log("dumbass your drink not done")
  )


});


function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  console.log("array euqal length")

  const sortedArr1 = arr1;
  const sortedArr2 = arr2;

  sortedArr1.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  sortedArr2.sort(function (a, b) {
    var textA = a.toUpperCase();
    var textB = b.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) return false;
  }
  return true;


};


// document bs
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


