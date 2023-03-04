// Avoid `console` errors in browsers that lack a console. store serve side
const ski = "9ae329fcd610a577db8293ec4f9fee5c79674d072110c36a3e64d113da18e75e";
const inco = true;


function printObj(obj) {
  const objStr = JSON.stringify(obj);
  return objParsed = JSON.parse(objStr);

}

function xorString(str, flag) {

  let result = '';
  let keyIndex = 0;
  for (let i = 0; i < str.length; i++) {
    let xorValue = str.charCodeAt(i) ^ parseInt(ski.slice(keyIndex, keyIndex + 2), 16);
    if (xorValue >= 0x20 && xorValue <= 0x7E) {
      result += String.fromCharCode(xorValue);
    } else {
      result += str[i];
    }
    keyIndex += 2;
    if (keyIndex > ski.length - 2) {
      keyIndex = 0;
    }
  }
  return (flag) ? encodeURIComponent(result) : result;

}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


let debounced = (function() {
  let timer;
  return function(fn) {
    clearTimeout(timer);
    timer = setTimeout(fn, 1);
  };
})();

// if(flag){
//   let result = '';
//   let keyIndex = 0;
//   for (let i = 0; i < str.length; i++) {
//     let xorValue = str.charCodeAt(i) ^ parseInt(ski.slice(keyIndex, keyIndex + 2), 16);
//     result += String.fromCharCode(xorValue);
//     keyIndex += 2;
//     if (keyIndex > ski.length - 2) {
//         keyIndex = 0;
//     }
//   }
//   return  encodeURIComponent(result);
// }else{
//   let result = '';
//   let keyIndex = 0;
//   for (let i = 0; i < str.length; i++) {
//     let xorValue = str.charCodeAt(i) ^ parseInt(ski.slice(keyIndex, keyIndex + 2), 16);
//     result += String.fromCharCode(xorValue);
//     keyIndex += 2;
//     if (keyIndex > ski.length - 2) {
//         keyIndex = 0;
//     }
//   }
//   return  result;
// }

function generateKey() {
  // Create a new Uint8Array with a specified length
  var key = new Uint8Array(32);

  // Fill the array with cryptographically secure random numbers
  crypto.getRandomValues(key);

  // Convert the array to a hexadecimal string
  return Array.prototype.map.call(key, function(x) {
    return ('00' + x.toString(16)).slice(-2);
  }).join('');
}
// console.log(generateKey());

function is_touch_enabled() {
  return ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0);
}


function isElementInViewport(el) {
  // console.log("isElementInViewport",el)
  const rect = el.getBoundingClientRect();
  return (

    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function checkFirstCharNumber(str) {
  var firstChar = str.charAt(0);
  var firstCharInt = parseInt(firstChar);
  if (isNaN(firstCharInt)) {
    return firstChar;
  } else {
    return numberToLetter(firstCharInt);
  }
}

function numberToLetter(number) {
  switch (number) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    case 4:
      return "E";
    case 5:
      return "F";
    case 6:
      return "G";
    case 7:
      return "H";
    case 8:
      return "I";
    case 9:
      return "J";
    default:
      return "Invalid input. Please enter a number between 0 and 9.";
  }
}



function cosDegrees(angleDegrees) {
  return Math.cos(angleDegrees * Math.PI / 180);
};

function sinDegrees(angleDegrees) {
  return Math.sin(angleDegrees * Math.PI / 180);
};

function highlightKeyWord(desc, keywordList, imgObj) {
  // console.log(imgObj)
  keywordList.forEach(function(keyword) {
    let regex = new RegExp("\\b" + keyword + "\\b", "gi");
    desc = desc.replace(regex, "<span><b>$&</b></span>");
  });
  return desc;
}


function createSpinner() {
  var newItem = document.createElement('div');
  newItem.style.cssText = 'position:relative; width: 100%; height: 30px;';
  newItem.innerHTML = `<div class="spinner">
                        <span class="ball-1"></span>
                        <span class="ball-2"></span>
                        <span class="ball-3"></span>
                        <span class="ball-4"></span>
                        <span class="ball-5"></span>
                        <span class="ball-6"></span>
                        <span class="ball-7"></span>
                        <span class="ball-8"></span>
                      </div>`;
  return newItem
}

function checkForSQLInjection(userInput) {
  return false;
  // Define a regex to check for common SQL injection attacks
  const sqlInjectionRegex = /(?:')|(?:--)|(\/\*)|(\*\/)|(?:[^\w\s])/;

  // Check if the email contains any of the common SQL injection attacks
  if (sqlInjectionRegex.test(userInput)) {
    // If the email contains a SQL injection attack, return true
    console.log("checkForSQLInjection", userInput)
    return true;
  } else {
    // If the email does not contain a SQL injection attack, return false
    return false;
  }
}

function checkForMaliciousPayloads(userInput) {
  // First, convert the email to lowercase to make the check case-insensitive
  var userInput_ = userInput.toLowerCase();

  // Define an array of common malicious payloads
  const maliciousPayloads = ["<script>", "javascript:", "onload=", "onerror=", "onmouseover=", "onfocus=", "onblur="];

  // Loop through the array and check if any of the malicious payloads are present in the email
  for (let i = 0; i < maliciousPayloads.length; i++) {
    if (userInput_.includes(maliciousPayloads[i])) {
      // If a malicious payload is found, return true

      return true;
    }
  }

  if (checkForSQLInjection(userInput)) {
    return true;
  }

  // If no malicious payloads are found, return false
  return false;
}


function uniqueUsername(userInput) {
  if (checkForMaliciousPayloads(userInput) || userInput == "") {
    return false;
  } else {
    return true;
  }


}


const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;




function imgInstance(imgObj) {
  var res = "";

  for (var i = 0; i < imgObj.length; i++) {
    res += `<li img-id="${imgObj[i].id}" style='background: url("${imgObj[i].img}") no-repeat;
                 background-size: cover;  background-position: center;' class="carousel__item detail_modal" data-pos="${i}" loading="lazy" >${i}</li>`
  }
  return res

}

function createCarousel(clothingDisplayDataStruct, imagesList, index, options = null) {
  // if out fit is true it is for SET UP save outfit and it populates the save modal


  var likeImage = "";
  var dislikeImage = "";
  // user has liked the image set it to green
  if (clothingDisplayDataStruct["userLiked"] == "true") {
    likeImage = "img/like-svgrepo-com-inv.svg";
  } else {
    likeImage = "img/like-svgrepo-com.svg";
  }

  // user has disliked the image set it to green
  if (clothingDisplayDataStruct["userDisliked"] == "true") {

    dislikeImage = "img/dislike-svgrepo-com-inv.svg"
  } else {
    dislikeImage = "img/like-svgrepo-com.svg"
  }

  var filtered = imagesList.filter(
    function(e) {
      return clothingDisplayDataStruct["items"].includes(e["id"]);
    });

  var lastClass = ""
  if (options != null) {
    if ("lastCarousel" in options && options.lastCarousel) {

      // I saw on a slow computer 2 lastClass elements so I need to limit
      lastClass = "lastCarousel"
    }
  }
  // for appending an element to the list, instead of changing the whole innerHTML
  // for (var i = 0; i < count; i++) {
  //     var li = document.createElement("li");
  //     li.classList.add("item");
  //     li.innerHTML = "" +
  //       "<div class='displayTable'>" +
  //         "<div class='displayTableRow'>" +
  //           "<div class='displayTableCell'><div class='listImg marginRight1rem'></div>Item</div>" +
  //           "<div class='displayTableCell paddingLeft0-5rem'>" + i + "</div>" +
  //         "<div>" +
  //       "</div>";
  //     list.appendChild(li);
  //   }
  //
  //   overlay.classList.remove("visible");
  // }

  var creator  = ""
  if (clothingDisplayDataStruct["type"] == "outfit") {
    creator = `<div profilePageOwner="${ xorString(clothingDisplayDataStruct.uuid, true)}" class="circle profil_pic_offset " style="margin-bottom:20px; cursor:pointer;">
      <svg width="48px" height="48px">
        <circle cx="24" cy="24" r="14" stroke="black" stroke-width="5" fill="black" />
        <text fill="white" font-size="14" font-family="Verdana" x="24" y="24" text-anchor="middle" dominant-baseline="central">${capitalizeFirstLetter(checkFirstCharNumber(clothingDisplayDataStruct.creator))}</text>
      </svg>

      <div style="position:relative">
        <p style="position: absolute;top: -26px;left: 53px;z-index: 80;color: black;width: 131px;line-height: .8; white-space: nowrap;">${clothingDisplayDataStruct.creator} </p>
      </div>
    </div>`
  }


  return ` <div style="margin-bottom: 4vh;" class="hrs"></div>
  <div style="position:relative; width: 100%;" displayBufferIndex="${index}" type="${clothingDisplayDataStruct.type}" instance_id="${clothingDisplayDataStruct.outfitId}" class="clothing_instance ${lastClass}">

  ${creator}

    <div style="display: flex; flex-direction: column; position: relative " class="carousel">

      <ul class="carousel__list carousel__list_evt">
        ${imgInstance(filtered)}
      </ul>

      <div class="carousel_button_right" style=" ">
        <div class="like_button" like_count="${clothingDisplayDataStruct.likeCount}" liked="${clothingDisplayDataStruct.userLiked}" style="margin-top: 20px;">
          <p>${clothingDisplayDataStruct.likeCount}</p>
          <img loading="lazy" src="${likeImage}" style="height: 20px;width: 20px; ">
        </div>

        <div class="dislike_button" dislike_count="${clothingDisplayDataStruct.dislikeCount}" disliked="${clothingDisplayDataStruct.userDisliked}" style="margin-top: 20px;">
          <p>${clothingDisplayDataStruct.dislikeCount}</p>
          <img loading="lazy" src="${dislikeImage}" style="height: 20px;width: 20px; transform: rotateZ(180deg);  ">
        </div>
      </div>

      <div style="text-align:center; margin-top:35px; max-width: 195px;">
        <div class="itemDescription">
          <p style=""> <b> <i>${filtered[0].company}</i> </b> </p>
          <p style="max-height: 44px; min-height: 44px; overflow: hidden;">${highlightKeyWord(filtered[0].desc,filtered[0].keywords,filtered[0])}</p>
          <p><b> ${filtered[0].price}</b></p>
        </div>


        <div class="doNotClose" style="display:flex; justify-content: space-around; margin-top: 20px;">
          <div imageListId="${filtered[0].id}" class="carousel__tag carousel__tag_add save_outfit_button doNotClose">
            <p class="doNotClose" style="font-size: 13px;">Save Item </p>
          </div>

          <div shop="https://www.google.com" company="google.com" class="carousel__tag selected_filter goToShop_ carousel__tag_add">
            <p style="font-size: 13px;">Go to Shop </p>
          </div>

        </div>

      </div>
    </div>

  </div> `

}

// Place any jQuery/helper plugins in here.


function createOutfitListInstance(outfit, options) {
  var lastClass = ""
  if (options != null) {
    if ("lastInstance" in options && options.lastInstance) {

      // I saw on a slow computer 2 lastClass elements so I need to limit
      lastClass = "lastInstance"
    }
  }
  return `  <div class="outfitInstance doNotClose ${lastClass}" oufitid="${outfit.outfitId}">

    <p class="doNotClose">${outfit.name}</p>

  </div>`
}


//-------------
//Save Outfit
function createArticleCarousel(clothingDisplayDataStruct, imagesList, articleClicked) {
  // for SET UP save outfit and it populates the save modal

  if (clothingDisplayDataStruct["type"] == "outfit") {

  }

  var likeImage = "";
  var dislikeImage = "";
  // user has liked the image set it to green
  if (clothingDisplayDataStruct["userLiked"] == "true") {
    likeImage = "img/like-svgrepo-com-inv.svg";
  } else {
    likeImage = "img/like-svgrepo-com.svg";
  }

  // user has disliked the image set it to green
  if (clothingDisplayDataStruct["userDisliked"] == "true") {

    dislikeImage = "img/dislike-svgrepo-com-inv.svg"
  } else {
    dislikeImage = "img/like-svgrepo-com.svg"
  }

  res = "";
  // do not add the same item to an outfit twice
  if (!clothingDisplayDataStruct.items.includes(articleClicked) && clothingDisplayDataStruct.items.length <= 8 ){
    clothingDisplayDataStruct.items.unshift(articleClicked)
  }
  for (var i = 0; i < clothingDisplayDataStruct.items.length; i++) {
    var filtered = imagesList.filter(
      function(e) {
        return e["id"] == clothingDisplayDataStruct.items[i]
      });
    var background = ""

    if (i == 0) {
      // background = "border: 2px solid black;  border-radius: 10px;"
      background = ""
    }

    res += `
        <div class="outfitInstanceCar">
        <div style="" class="hrs"></div>
              <div style="position:relative; width: 100%; "  type="${clothingDisplayDataStruct["type"]}" instance_id="${clothingDisplayDataStruct["outfitId"]}" class="clothing_instance">

                <div style="display: flex; flex-direction: column; position: relative; " class="carousel">

                  <ul class="carousel__list carousel__list_evt">
                    ${imgInstance(filtered)}

                  </ul>

                  <div style="text-align:center; margin-top:35px; max-width: 195px; ${background} ">
                    <div class="itemDescription">
                      <p style=""> <b> <i>${filtered[0].company}</i> </b> </p>
                      <p>${highlightKeyWord(filtered[0].desc,filtered[0].keywords,filtered[0])}</p>
                      <p><b> ${filtered[0].price}</b></p>
                    </div>


                    <div style="display:flex; justify-content: space-around; margin-top: 20px;">


                      <div shop="${filtered[0].link}" company="${filtered[0].company}" class="carousel__tag selected_filter goToShop_ carousel__tag_add doNotClose">
                        <p style="font-size: 13px;">Go to Shop </p>
                      </div>

                      <div imageId ="${filtered[0].id}" style="background-color:black !important; color:white !important; display:none" class="carousel__tag selected_filter  carousel__tag_add outfitDeleteArticle_ doNotClose">
                        <p class="doNotClose" style="font-size: 13px;">Delete</p>
                      </div>

                    </div>


                  </div>
                </div>

              </div>
        </div>

      `

  }

  return res

}

// --------------
// Notification
function createNotifications(userNotifications,options=null) {
  var lastClass = ""
  if (options != null) {
    if ("lastInstance" in options && options.lastInstance) {

      // I saw on a slow computer 2 lastClass elements so I need to limit
      lastClass = "lastInstance"
    }
  }
  var seen = "";
  console.log(userNotifications.seen)
  if (userNotifications.seen == true){
    seen = "background-color: gainsboro;"
  }

  return `  <div style="${seen}" class="notificationInst doNotClose ${lastClass}" hyperlink="${userNotifications.hyperlink}" profilePageOwner="${userNotifications.profileEventuuid}">

      <p class="doNotClose">${userNotifications.event}</p>

    </div>`
}

//----------------
// User Instance

function createUserListInst(user, options=null) {
  // split on the first space
  const username = user.slice(user.indexOf(' ') + 1);


  const uuid = user.slice(0, user.indexOf(' '));

  var lastClass = ""
  if (options != null) {
    if ("lastInstance" in options && options.lastInstance) {

      // I saw on a slow computer 2 lastClass elements so I need to limit
      lastClass = "lastInstance"
    }
  }

  return `  <div class="userProfileInst doNotClose ${lastClass}" hyperlink="t" profilePageOwner="${uuid}" style = "display:flex; justify-content: center;     margin-left: auto;
    margin-right: auto;">

            <div style="position:relative;">
              <svg style="position:absolute; top: -5px; left: -64px;" width="48px" height="48px">
                <circle cx="24" cy="24" r="14" stroke="black" stroke-width="5" fill="black" />
                <text class="profilePageUserImg" fill="white" font-size="14" font-family="Verdana"  x="24" y="24" text-anchor="middle" dominant-baseline="central">${capitalizeFirstLetter(checkFirstCharNumber(username))}</text>
              </svg>
            </div>

            <p class="doNotClose">${username}</p>

    </div>`
}


//----------------------
// Generate random data

function getRandomValueFromList(list) {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}


// generate imageList data struct

function generateRandomDataStructureImage(existingDataStructures) {
  const usedIds = existingDataStructures.map(ds => ds.id);
  let id;
  do {
    id = Math.floor(Math.random() * 1000).toString();
  } while (usedIds.includes(id));

  var images = [
    'https://images.urbndata.com/is/image/Anthropologie/4130370060107_041_b?$an-category$&qlt=80&fit=constrain',
    'https://images.urbndata.com/is/image/Anthropologie/4130638280246_061_b?$an-category$&qlt=80&fit=constrain',
    'https://images.urbndata.com/is/image/Anthropologie/4130916210123_001_b2?$an-category$&qlt=80&fit=constrain',
    'https://images.urbndata.com/is/image/Anthropologie/4130464030212_041_b?$an-category$&qlt=80&fit=constrain',
    'https://images.urbndata.com/is/image/Anthropologie/4130464030211_065_b14?$an-category$&qlt=80&fit=constrain',
    'https://images.urbndata.com/is/image/Anthropologie/4130916210126_009_b?$an-category$&qlt=80&fit=constrain',
    'https://images.urbndata.com/is/image/Anthropologie/4130691080004_001_b?$an-category$&qlt=80&fit=constrain',
    'https://images.urbndata.com/is/image/Anthropologie/4130615360010_060_b?$an-category$&qlt=80&fit=constrain'
  ]


  const desc = "By Anthropologie Sequin Mini Dress";
  const price = "$" + (Math.random() * 500).toFixed(2);
  const link = "/shop/by-anthropologie-sequin-mini-dress?category=dresses&color=041&type=STANDARD";
  const img = getRandomValueFromList(images)
  const likeCount = Math.floor(Math.random() * 100);
  const dislikeCount = Math.floor(Math.random() * 100);
  const company = "Anthropologie";
  const userLiked = Math.random() >= 0.5 ? "true" : "false";
  const userDisliked = Math.random() >= 0.5 ? "true" : "false";
  const wishlist = Math.random() >= 0.5 ? "true" : "false";
  const keywords = ['dress'];

  return {
    id,
    desc,
    price,
    link,
    img,
    likeCount,
    dislikeCount,
    company,
    userLiked,
    userDisliked,
    wishlist,
    keywords
  };
}



function generateDataStructureOutfit(outfitlist, imagelist) {
  let outfitId, articleId;
  const usedIds = outfitlist.map(outfit => outfit.outfitId).concat(outfitlist.map(outfit => outfit.articleId));
  const allIds = [...Array(99).keys()].map(i => i.toString());
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
    console.log("outfitId",outfitId,randomIndex)
    const randomItems = [];
    const maxItems = Math.min(Math.floor(Math.random() * imagelist.length + 1), 8);
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

function generateRandomDataStructureLike(imageList, likeList) {
  const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
  const existingArticleIds = likeList.map(x => x.articleId);
  let articleId;
  do {
    articleId = Math.floor(Math.random() * 1000).toString();
  } while (existingArticleIds.includes(articleId));

  const possibleUsernames = ["John Doe", "Jane Doe", "Jim Smith", "Sarah Johnson", "Michael Brown"];
  const randomUsername = possibleUsernames[Math.floor(Math.random() * possibleUsernames.length)];

  return {
    type: "article",
    creator: randomUsername,
    uuid: Math.random().toString(36).substring(2, 15),
    articleId: articleId,
    items: [randomImage.id],
    userLiked: "true",
    userDisliked: "false",
    likeCount: Math.floor(Math.random() * 100),
    dislikeCount: Math.floor(Math.random() * 100),
    wishlist: Math.random() >= 0.5 ? "true" : "false",
    tags: ["spring", "winter", "short"][Math.floor(Math.random() * 3)]
  };
}






function generateRandomDataStructureNotification() {
  return {
    "uuid": "chees429",
    "profileEventuuid": xorString("chees429", true),
    "event": "user1 liked Outfit: x",
    "eventTime": "unixtimestameseconds ",
    "seen": false,
    "hyperlink": 't'
  }
}

function generateRandomDataStructureFollows() {
  return `${xorString("chees429",true)} Amanda Decipher`
}
function generateRandomDataStructureFollowers() {
  return `${xorString("chees429",true)} Amdass Decipher`
}
