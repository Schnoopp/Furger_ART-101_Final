let isHoldingObject = false;
let heldobject;
let ingredientList = [];
let activeRecipie;
let menuenumber = 1;
let drinkInProgress = [];
let label_show = false;

//Audio files
var pour = new Audio('sound/drinkPour.mp3');

barAudio = new Audio('sound/barAmbiance.wav');
barAudio.volume = .075;
if (typeof barAudio.loop == 'boolean') {
  barAudio.loop = true;
}
else {
  barAudio.addEventListener('ended', function () {
    this.currentTime = 0;

    this.play();
  }, false);
}
barAudio.play();

musicLoop = new Audio('sound/bgMusic.mp3');
musicLoop.volume = .2;
if (typeof musicLoop.loop == 'boolean') {
  musicLoop.loop = true;
}
else {
  musicLoop.addEventListener('ended', function () {
    this.currentTime = 0;

    this.play();
  }, false);
}
musicLoop.play();



//TimerFunction
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//All Recipies
const recipies = [];
recipies.push({ menuenum: 1, name: "Screwdriver", ingredients: ["vodka", "orangeJuice"], image: "Images/Drinks/ColinsGlass/Screwdriver.png", glassImage: "Images/Drinks/ColinsGlass/CollinsGlass.png" })
recipies.push({ menuenum: 1, name: "Dirty Shirley", ingredients: ["vodka", "grenadine", "cherries", "limeJuice"], image: "Images/Drinks/ColinsGlass/DirtyShirley.png", glassImage: "Images/Drinks/ColinsGlass/CollinsGlass.png" })
recipies.push({ menuenum: 1, name: "Lemon Drop", ingredients: ["vodka", "tripleSec", "lemonJuice", "syrup", "sugar"], image: "Images/Drinks/MartiniGlass/LemonDrop.png", glassImage: "Images/Drinks/MartiniGlass/MartiniGlass.png" })
recipies.push({ menuenum: 1, name: "White Russian", ingredients: ["vodka", "kahula", "creamLiqueur", "cherries"], image: "Images/Drinks/RocksGlass/WhiteRussian.png", glassImage: "Images/Drinks/RocksGlass/RocksGlass.png" })

recipies.push({ menuenum: 2, name: "Margarita", ingredients: ["tequilla", "limeJuice", "lime", "salt", "sugar"], image: "Images/Drinks/MartiniGlass/Margarita.png", glassImage: "Images/Drinks/MartiniGlass/MartiniGlass.png" })
recipies.push({ menuenum: 2, name: "Tequila Sunrise", ingredients: ["tequilla", "orangeJuice", "grenadine", "cherries"], image: "Images/Drinks/ColinsGlass/TequilaSunrise.png", glassImage: "Images/Drinks/ColinsGlass/CollinsGlass.png" })
recipies.push({ menuenum: 2, name: "Tequila Espresso Martini", ingredients: ["tequilla", "kahula", "syrup"], image: "Images/Drinks/MartiniGlass/EspressoMartini.png", glassImage: "Images/Drinks/MartiniGlass/MartiniGlass.png" })
recipies.push({ menuenum: 2, name: "Matador", ingredients: ["tequilla", "pineappleJuice", "limeJuice", "tripleSec"], image: "Images/Drinks/ColinsGlass/Matador.png", glassImage: "Images/Drinks/ColinsGlass/CollinsGlass.png" })

recipies.push({ menuenum: 3, name: "Gin and Tonic", ingredients: ["gin", "tonic", "lime"], image: "Images/Drinks/RocksGlass/GinAndTonic.png", glassImage: "Images/Drinks/RocksGlass/RocksGlass.png" })
recipies.push({ menuenum: 3, name: "Gimlet", ingredients: ["gin", "syrup", "limeJuice", "lime"], image: "Images/Drinks/MartiniGlass/Gimlet.png", glassImage: "Images/Drinks/MartiniGlass/MartiniGlass.png" })
recipies.push({ menuenum: 3, name: "Tom Collins", ingredients: ["gin", "lemonJuice", "syrup", "tonic", "cherries"], image: "Images/Drinks/ColinsGlass/TomCollins.png", glassImage: "Images/Drinks/ColinsGlass/CollinsGlass.png" })
recipies.push({ menuenum: 3, name: "Gin Sour", ingredients: ["gin", "lemonJuice", "syrup", "bitters"], image: "Images/Drinks/MartiniGlass/GinSour.png", glassImage: "Images/Drinks/MartiniGlass/MartiniGlass.png" })

recipies.push({ menuenum: 4, name: "Mojito", ingredients: ["rum", "limeJuice", "mint", "sugar", "tonic"], image: "Images/Drinks/ColinsGlass/Mojito.png", glassImage: "Images/Drinks/ColinsGlass/CollinsGlass.png" })
recipies.push({ menuenum: 4, name: "Bahama Mama", ingredients: ["rum", "kahula", "pineappleJuice", "cherries"], image: "Images/Drinks/ColinsGlass/BahamaMama.png", glassImage: "Images/Drinks/ColinsGlass/CollinsGlass.png" })
recipies.push({ menuenum: 4, name: "Daquiri", ingredients: ["rum", "limeJuice", "sugar", "syrup"], image: "Images/Drinks/MartiniGlass/Daiquiri.png", glassImage: "Images/Drinks/MartiniGlass/MartiniGlass.png" })
recipies.push({ menuenum: 4, name: "Mai Tai", ingredients: ["rum", "tripleSec", "pineappleJuice", "orangeJuice", "syrup", "grenadine"], image: "Images/Drinks/RocksGlass/MaiTai.png", glassImage: "Images/Drinks/RocksGlass/RocksGlass.png" })

recipies.push({ menuenum: 5, name: "Old Fashioned", ingredients: ["whiskey", "syrup", "bitters", "cherries"], image: "Images/Drinks/RocksGlass/OldFashioned.png", glassImage: "Images/Drinks/RocksGlass/RocksGlass.png" })
recipies.push({ menuenum: 5, name: "Revolver", ingredients: ["whiskey", "kahula", "bitters"], image: "Images/Drinks/MartiniGlass/Revolver.png", glassImage: "Images/Drinks/MartiniGlass/MartiniGlass.png" })
recipies.push({ menuenum: 5, name: "B52 Shot", ingredients: ["whiskey", "kahula", "creamLiqueur", "tripleSec",], image: "Images/Drinks/RocksGlass/B52.png", glassImage: "Images/Drinks/RocksGlass/ShotGlass.png" })
recipies.push({ menuenum: 5, name: "Whiskey Sour", ingredients: ["whiskey", "lemonJuice", "syrup", "cherries"], image: "Images/Drinks/RocksGlass/WhiskeySour.png", glassImage: "Images/Drinks/RocksGlass/RocksGlass.png" })

//Intialize Page
getAllIngredients()
GetAllShelves()
menuDisplay();

//Menu Drink Selection Functionality
function menuDisplay() {
  $('.recipieSheetText').html("")
  for (let i = 0; i < recipies.length; i++) {
    if (recipies[i].menuenum == menuenumber) {
      console.log(recipies[i])
      let drinkPic = recipies[i].image

      $('.recipieSheetText').append('<div class="drinkDisplay", id = "' + recipies[i].name + '"><img src="' + drinkPic + '" , class="menuImage">' + recipies[i].name + '</div>')


    }
  }
}


$("#leftButton").click(function () {
  if (menuenumber > 1) {
    menuenumber -= 1
    console.log(menuenumber)
    menuDisplay();

  }
})


$("#rightButton").click(function () {
  if (menuenumber < 5) {
    menuenumber += 1
    console.log(menuenumber)
    menuDisplay();
  }
})


$(".recipieSheetText").on("click", ".drinkDisplay", function () {
  console.log("drink clicked: " + this.id)
  selectRecipie(this.id)

  $(".recipieWindow").css("display", "none", "pointer-events", "none")
});


$(".drinkDisplay").click(function () {

})


function selectRecipie(selectedDrink) {
  activeRecipie = recipies[getItemValue(selectedDrink, recipies)]
  displayRecipie(activeRecipie);
  drinkInProgress = [];


};

//Display selected recipie on sheet, place correct glass
function displayRecipie(recipie) {
  $("#menuText").html("")
  $("#menuText").append("<div>" + recipie.name + ": </div>" + "<p>ingredients: </p>")
  for (let i = 0; i < recipie.ingredients.length; i++) {
    $("#menuText").append("<div>" + recipie.ingredients[i] + "</div>")
    console.log("appended: " + recipie.ingredients[i])
  }
  $(".glass").html('<img src="' + recipie.glassImage + '" , class="glassImage">');
}

//showcase menu when clicked

$(".menu_container").click(function () {

  $(".recipieWindow").css("display", "flex", "pointer-events", "all")

});



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
      startingPosition_T: top,
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
function getItemValue(object, list) {
  for (let i = 0; i < list.length; i++) {

    if (object == list[i].name) {
      console.log("item found, value is: " + i)
      return i
    };

  }
};

// be able to click on item and send it home

$(".shelf_container").click(function () {

  console.log("container clicked")

  if (isHoldingObject == false) {
    heldobject = this.querySelector(".item").id

    console.log("held object ID: " + getItemValue(heldobject, ingredientList) + " and container id: " + this.id)
    $("#" + heldobject).css('z-index', 100)
    isHoldingObject = true;
  }
  else if (isHoldingObject == true && getItemValue(heldobject, ingredientList) == this.id) {


    itemLetGo();
    isHoldingObject = false;
  }
  else if ((isHoldingObject == true && getItemValue(heldobject, ingredientList) != this.id)) {
    console.log("wronc container!")
  }

});


function itemLetGo() {
  let itemIndex = getItemValue(heldobject, ingredientList)
  isHoldingObject = false;
  $("#" + heldobject).css('z-index', 0)

  let startingLeft = ingredientList[itemIndex].startingPosition_L
  let startingTop = ingredientList[itemIndex].startingPosition_T

  $("#" + heldobject).css("left", startingLeft + "px")
  $("#" + heldobject).css("top", startingTop + "px")
  $("#" + heldobject).css("position", "absolute")
  heldobject = null;

}

// take ingredients and add them to the drink in progress aray
$(".shaker").click(function () {

  if (isHoldingObject == true) {
    checkIngredient(heldobject)
    console.log("added ingredient: " + heldobject)
    itemLetGo();
  }

});
//check if the ingredient is in the recipie and check for duplicates before adding
function checkIngredient(ing) {
  console.log(activeRecipie.ingredients.length)
  if (activeRecipie.ingredients.includes(ing)) {
    if (!drinkInProgress.includes(ing)) {
      console.log("ingredient found")
      console.log("HUZZAH")
      drinkInProgress.push(heldobject);
      console.log(drinkInProgress)
    }
  }

}
//compare arrays 
$("#done").click(function () {
  if (compareArrays(drinkInProgress, activeRecipie.ingredients) == true) {
    console.log("ALLDONE")
    $(".glass").html('<img src="' + activeRecipie.image + '" , class="glassImage">');
    pour.play();

  }
  else (
    console.log(" your drink not done")
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




// Label display and text, timer functionalty used here to not hide label immedietly off of items when scrolling through
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






// document bs
$(document).mousemove(function (event) {

  if (isHoldingObject === true) {
    $("#" + heldobject).css({
      left: event.pageX - $("body").offset().left,
      top: event.pageY - $("body").offset().top
    });
  }
});


$(document).keydown(function (event) {
  if (event.key === " " || event.code === "Space") {
    itemLetGo()
  }
});


