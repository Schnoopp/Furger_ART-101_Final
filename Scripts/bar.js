let isHoldingObject = false;
let heldobject;
let ingredientList = [];

const allIngredients = document.getElementsByClassName("item");
console.log(allIngredients)

getAllIngredients()



function getAllIngredients() {
  for (let i = 0; i < allIngredients.length; i++) {
    const ingredientName = allIngredients[i].id

    position = allIngredients[i].getBoundingClientRect();
    const top = position.top;
    const left = position.left;
    

    const ingredient = {
      name: ingredientName,
      startingPosition_L: top,
      startingPosition_T: left

    }

    ingredientList.push(ingredient)
  }
  console.log(ingredientList)
  return


}






$('.item').click(function () {
  let clickedObject = event.target.id
  if (isHoldingObject == false && clickedObject != heldobject) {
    isHoldingObject = true;
    heldobject = event.target.id
    console.log('clicked ' + heldobject + ", this is a new thing")
  }
  else if (clickedObject == heldobject) {
    console.log("this is the same thing " + heldobject)
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
    isHoldingObject = false;
    heldobject = null;
  }
});


