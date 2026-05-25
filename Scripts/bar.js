let isHoldingObject = false;
let heldobject;
let ingredientList = [];



getAllIngredients()


// collects all objects of class item, creates an array of ingredients: name, position values
function getAllIngredients() {
  const allIngredients = document.getElementsByClassName("item");
  console.log(allIngredients)
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
  console.log(ingredientList)
  return

};

//compares variable to all ingredients, checks if it's in array and returns object value
function getItemValue(object) {
  for (let i = 0; i < ingredientList.length; i++) {

    if (object == ingredientList[i].name) {
      console.log("item found, value is: " + i)
      return i
    };

  }
};


$('.item').click(function () {
  let clickedObject = event.target.id
  if (isHoldingObject == false && clickedObject != heldobject) {
    isHoldingObject = true;
    heldobject = event.target.id
    console.log('clicked ' + heldobject + ", this is a new thing")
  }
  else if (clickedObject == heldobject) {
    console.log("this is the same thing " + heldobject)
    itemLetGo()


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


function itemLetGo() {
  let itemIndex = getItemValue(heldobject)
  console.log(itemIndex)
  isHoldingObject = false;



  console.log("LEFT: "+ingredientList[itemIndex].startingPosition_L)
  console.log("TOP: "+ingredientList[itemIndex].startingPosition_T)

  let startingLeft = ingredientList[itemIndex].startingPosition_L
  let startingTop = ingredientList[itemIndex].startingPosition_T

  $("#" + heldobject).css("left", startingLeft + "px")
  $("#" + heldobject).css("top", startingTop + "px")
  heldobject = null;

}