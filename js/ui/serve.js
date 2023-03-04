//10.0.0.147
//ifconfig look for IPv4 Address


ou can use the touch events touchstart, touchend, and touchmove to detect a swipe in JavaScript. Here's an example:

javascript
Copy code

//xDown
//yDown have to be unique with respect to the carousel and must be set to null when interaction with a different carousel begins

// click on the element who is is assciated with 0


const div = document.getElementById("myDiv");
let xDown = null;
let yDown = null;

div.addEventListener("touchstart", function(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
});

div.addEventListener("touchend", function(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.changedTouches[0].clientX;
  let yUp = evt.changedTouches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 100) {
      /* left swipe */
      console.log("Swiped left");
    } else {
      /* right swipe */
      console.log("Swiped right");
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
});


/// find  boxshadow being used replace with options   fadeOut fadeOutTime
-----------------------------------


const div = document.querySelector("div");
const lastElement = div.lastElementChild;

const isInView = () => {
  const rect = lastElement.getBoundingClientRect();
  return rect.bottom <= document.documentElement.clientHeight;
};

if (isInView()) {
  console.log("Last element is in view");
}


-----------------------------------

function viewClothing() {

  var listElements = document.getElementsByClassName('clothing_instance');
  var l;
  for (var i = 0; i < listElements.length; i++) {
    // console.log(isScrolledIntoView(listElements[i]),i);
    if (!seenElements.includes(listElements[i].getAttribute('instance_id')) && isScrolledIntoView(listElements[i])) {

      //------------------------
      // local storage/in memory  update
      if (localStorage.getItem("seenElementsId") != null && localStorage.getItem("seenElementsId") != "") {
        // get items from local storage
        l = localStorage.getItem("seenElementsId").split(",");
      } else {
        l = [];
      }
      // add current item
      l.push(listElements[i].getAttribute('instance_id'));
      // store updated items
      localStorage.setItem("seenElementsId", l);
      // update inmem structure
      seenElements.push(listElements[i].getAttribute('instance_id'));


      //---------------------------
      // Send Interaction to server


      //--------------------------
      // locals storage time log and clean up

      // capture time of first log
      if (localStorage.getItem("time") == null) {
        localStorage.setItem("time", Date.now() / 1000);
      }
      console.log(localStorage.getItem("seenElementsId"), "stored local elemen")
      // local time is stored and it has been 24 hrs since first log
      if (localStorage.getItem("time") != null && parseInt(localStorage.getItem("time")) + (24 * 3600) < Date.now() / 1000) {
        //clear elements
        localStorage.setItem("seenElementsId", "");
        // console.log("clear local storage")
      }
      //----------------------------------
      // update UI
      //  get the paragraph tag holding the num interactions and add one to number
      var pEle = listElements[i].getElementsByClassName('eyes')[0].getElementsByTagName('p')[0];
      pEle.innerHTML = `${parseInt(pEle.innerHTML) + 1}`;




    }

  }
  // console.log("---------")

}
var seenElements = [];
if (localStorage.getItem("seenElementsId") != null) {
  seenElements = localStorage.getItem("seenElementsId").split(",");
  // localStorage.setItem("seenElementsId","")
}
// document how far person scrolls.
document.addEventListener("scroll", viewClothing)




  function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }



// --------

Here are example datastructures. Create a javascript function to generate a datastructure of similar sytle with random values for the keys.
The randomly generated datastructure should follow this pattern.
Also, the function must take in  as input a list of the same type of data structure, call the input outfitlist, and generate a articleId or outfitId which has not been used before. Confirm this.
In Addition, the function must take in a list of objects, call the list imagelist, with a field named id and using the values of the id field it must select random ids to place in the list of the items field of the datastructure. Confirm this.
Keep in mind data structures of type article must only one id in it's items list.



{
  "type": "outfit",
  "creator": "Ksn daksnd cipher",
  "uuid": "chees429",
  "outfitId": "56232",
  "items": ["8", "9", "10", "4"],
  "likeCount": 40,
  "dislikeCount": 60,
  "userLiked": "true",
  "userDisliked": "false",
  "wishlist": "true",
  "name": "fashion",
  "tags": ["spring", "winter", "short"]
}

{
  "type": "outfit",
  "creator": "Decipher",
  "uuid": "81982xhd",
  "outfitId": "13",
  "items": ["1", "2", "3"],
  "likeCount": 40,
  "dislikeCount": 60,
  "userLiked": "true",
  "userDisliked": "false",
  "wishlist": "true",
  "name": "Lebron Ja ",
  "tags": ["spring", "winter", "short"]
}
{
  "type": "article",
  "creator": "Phostrino",
  "uuid": "phostrino",
  "articleId": "22",
  "items": ["4"],
  "userLiked": "false",
  "userDisliked": "false",
  "likeCount": 40,
  "dislikeCount": 60,
  "wishlist": "true",
    "name": "Lebron Ja ",
  "tags": ["spring", "winter", "short"]
}
{
  "type": "article",
  "creator": "Phostrino",
  "uuid": "phostrino",
  "articleId": "19093",
  "items": ["4"],
  "userLiked": "false",
  "userDisliked": "false",
  "likeCount": 40,
  "dislikeCount": 60,
  "wishlist": "true",
    "name": "Lebron Ja ",
  "tags": ["spring", "winter", "short"]
}



function generateDataStructure(outfitlist, imagelist) {
  let outfitId, articleId;
  const usedIds = outfitlist.map(outfit => outfit.outfitId).concat(outfitlist.map(outfit => outfit.articleId));
  const allIds = [...Array(999999).keys()].map(i => i.toString());
  const unusedIds = allIds.filter(id => !usedIds.includes(id));
  const randomIndex = Math.floor(Math.random() * unusedIds.length);
  const type = Math.random() > 0.5 ? "outfit" : "article";
  const creator = "creator" + Math.floor(Math.random() * 10000);
  const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const likeCount = Math.floor(Math.random() * 100);
  const dislikeCount = Math.floor(Math.random() * 100);
  const userLiked = Math.random() > 0.5 ? "true" : "false";
  const userDisliked = Math.random() > 0.5 ? "true" : "false";
  const wishlist = Math.random() > 0.5 ? "true" : "false";
  const name = "name" + Math.floor(Math.random() * 10000);
  const tags = ["spring", "winter", "short"];

  if (type === "outfit") {
    outfitId = unusedIds[randomIndex];
    const randomItems = [];
    const maxItems = Math.floor(Math.random() * imagelist.length + 1);
    for (let i = 0; i < maxItems; i++) {
      const randomImageIndex = Math.floor(Math.random() * imagelist.length);
      randomItems.push(imagelist[randomImageIndex].id);
    }
    return {
      type,
      creator,
      uuid,
      outfitId,
      items: randomItems,
      likeCount,
      dislikeCount,
      userLiked,
      userDisliked,
      wishlist,
      name,
      tags
    };
  } else {
    articleId = unusedIds[randomIndex];
    const randomImageIndex = Math.floor(Math.random() * imagelist.length);
    return {
      type,
      creator,
      uuid,
      articleId,
      items: [imagelist[randomImageIndex].id],
      likeCount,
      dislikeCount,
      userLiked,
      userDisliked,
      wishlist,
      name,
      tags
    };
  }
}



  var carouselList = document.querySelectorAll('.carousel__list');
  carouselList[i].addEventListener("touchstart",
  carouselList[i].addEventListener("touchend",
carouselList[i].addEventListener('click',
carouselList[i].addEventListener("mouseup",
carouselList[i].addEventListener("mousedown",

Here is an example datastructures. Create a javascript function to generate a datastructure of similar sytle with random values for the keys.
The randomly generated datastructure should follow this pattern.
In Addition, the function must take in a list of objects, call the list imagelist, with a field named id and using the values of the id field it must select random ids to place in the list of the items field of the datastructure. Confirm this.
In Addition, the function must take in a list of objects, call the list likeList, with a field named articleId and  select a random articleId  which does not already exist in likeList. Confirm this.
Keep in mind data structures of type article must only one id in it's items list.
Keep in mind the items field max length for the list is one. confirm this.
Keep in mind userLiked feild must always be true and userDisliked feild must always be false. confirm this

modification: articleId must be a value which does not exist in likeList, creator must be a random username, userLiked and userDisliked must be in string form



{
    "type": "article",
    "creator": "JAjk Decipher",
    "uuid": "phostrino",
    "articleId": "22",
    "items": ["4"],
    "userLiked": "false",
    "userDisliked": "false",
    "likeCount": 40,
    "dislikeCount": 60,
    "wishlist": "true",
    "tags": ["spring", "winter", "short"]
  }
