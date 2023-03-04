// Avoid `console` errors in browsers that lack a console.
(function() {


  function createOutfitID() {
    return "outfit Id"
  }

  // use sendToServer for all server tripx
  function sendToServer(url, method, object) {
    serverLoading()
  }


  function carouselItemPostion(container, parent, changeMap = false) {

    const circleDegree = 360;
    var spacing;
    const unitCircleDiam = 2;
    const unitCircleMin = -1;
    const xTranMax = 40;
    const xTranMin = -40;
    const xScaleMax = 1
    const xScaleMin = .6
    const xZindexMin = -10;
    const xZindexMax = 10;
    var elemAngle = 0;
    var resultXindex;
    var attributess = []; // will contain the ordering of cards around the circle by degrees
    // return if no cards
    // have to copy elements out of container because sort is not working on container
    // I have to enure the zero element is always the first to be placed on the circle or else a even, odd bug occurs where there are two elements on zero
    // ------------------------
    var sub = []
    for (var i = 0; i < container.length; i++) {
      sub.push([container[i], container[i].dataset.pos])
    }
    // console.log( JSON.parse(JSON.stringify(sub)) )
    sub.sort((a, b) => a[1] - b[1])
    // console.log( JSON.parse(JSON.stringify(sub)),"\n\n" )
    var container = [];
    for (var i = 0; i < sub.length; i++) {
      container.push(sub[i][0])
    }
    //-------------------------------
    if (container.length <= 0) {
      return;
    } else {
      for (var i = 0; i < container.length; i++) {
        // console.log(container[i])
        // the first element in the list will take the middle position

        spacing = (circleDegree / container.length);
        var index = parseInt(container[i].dataset.pos);

        if (index == 0) {
          // get the posiion of the card on the circle by degrees
          attributess.push([index, 0]);
          // console.log(JSON.parse(JSON.stringify(attributess)))

          var elemYPos = parseFloat(sinDegrees(elemAngle).toFixed(2));
          var elemXPos = parseFloat(cosDegrees(elemAngle).toFixed(2));
          // console.log(i,elemXPos,elemYPos,elemAngle)

        }
        // on even mark the postion with respect to 0, odds with respect to 360
        else if (index & 1) {
          if (container.length == 2) {
            elemAngle = 90
          } else {
            elemAngle = spacing * index;
          }
          // add postion to buffer to be sorted
          attributess.push([index, circleDegree - elemAngle]);
          // console.log(JSON.parse(JSON.stringify(attributess)))
          // console.log(index, circleDegree - elemAngle, elemAngle, spacing)

          var elemYPos = parseFloat(sinDegrees(circleDegree - elemAngle).toFixed(2));
          var elemXPos = parseFloat(cosDegrees(circleDegree - elemAngle).toFixed(2));
          // console.log(i,elemXPos,elemYPos,circleDegree - elemAngle)
        } else {
          // there is a bug unless this fixes it
          if (container.length % 2 == 0) {
            elemAngle = spacing * index;

          }


          attributess.push([index, elemAngle]);
          // console.log(JSON.parse(JSON.stringify(attributess)))
          // console.log(index, elemAngle, elemAngle, spacing)
          var elemYPos = parseFloat(sinDegrees(elemAngle).toFixed(2));
          var elemXPos = parseFloat(cosDegrees(elemAngle).toFixed(2));
          // console.log(i,elemXPos,elemYPos,elemAngle);
        }


        // https://byjus.com/equation-of-a-line-from-two-points-calculator/
        var resultTransY = (50 * elemYPos) + 0;


        var resultScaleX = ((.2 * elemXPos) + .8);
        var resultBlur = (-3 * elemXPos) + 3
        var resultZindex = (10 * elemXPos);

        if (i == 0) {
          container[i].style.cssText += `transform: translateX(${Math.round(resultTransY)}%) scale(${resultScaleX.toFixed(1)}) ; z-index: ${Math.round(resultZindex)};filter: blur(${Math.floor(resultBlur)}px) grayscale(20%);  `
          continue;
        } else if (i & 1) {
          container[i].style.cssText += `transform: translateX(${Math.round(resultTransY)}%) scale(${resultScaleX.toFixed(1)})  ; z-index: ${Math.round(resultZindex)}; filter: blur(${Math.floor(resultBlur)}px) grayscale(20%);  `
          continue;
        } else {
          container[i].style.cssText += `transform: translateX(${Math.round(resultTransY)}%) scale(${resultScaleX.toFixed(1)}) ; z-index: ${Math.round(resultZindex)};filter: blur(${Math.floor(resultBlur)}px) grayscale(20%);  `
          continue;
        }

      }
      // console.log(JSON.parse(JSON.stringify(sub)))

      // console.log(JSON.parse(JSON.stringify(attributess)))
      // console.log(JSON.parse(JSON.stringify(attributess.sort((a, b) =>  a[1] - b[1] ))))
    }
    // create mapping of postionsions
    if (changeMap) {
      var map = {}
      // sort on degrees
      attributess.sort((a, b) => a[1] - b[1])
      for (var i = 0; i < attributess.length - 1; i++) {
        map[attributess[i][0]] = attributess[i + 1][0];
      }
      map[attributess[attributess.length - 1][0]] = attributess[0][0];
      parent.setAttribute("def", JSON.stringify(map))
      // parent.setAttribute("def_list", JSON.stringify(attributess))
    }

  }


  let xDown = null;
  let yDown = null;
  let timer;

  function removeCarousel() {
    var carouselList = document.querySelectorAll('.carousel__list');
    for (let i = 0; i < carouselList.length; i++) {
      console.log("removeCarousel");

    }
  }

  var eventListenersExistMouseDown = []
  var eventListenersExistMouseUp = []
  var eventListenersExistTouchStart = []
  var eventListenersExistTouchEnd = []
  var eventListenersExistClick = []


  function runCarousel() {

    // Select the carousel list and all carousel items
    var carouselList = document.querySelectorAll('.carousel__list');

    // for loop selecting all carousel__list and the elements within the list

    for (var i = 0; i < carouselList.length; i++) {
      // console.log(carouselList[i],carouselList[i].getElementsByClassName("carousel__item"))
      carouselItemPostion(carouselList[i].getElementsByClassName("carousel__item"), carouselList[i], true);
    }


    for (var i = 0; i < carouselList.length; i++) {



      if (!is_touch_enabled()) {


        // drag
        if (!eventListenersExistMouseDown.includes(carouselList[i])) {
          carouselList[i].addEventListener("mousedown", function handleMouseDown_(evt) {
            evt.preventDefault();
            xDown = evt.clientX;
            yDown = evt.clientY;

            console.log(xDown);

          }, false);
        }

          if (!eventListenersExistMouseUp.includes(carouselList[i])) {
        carouselList[i].addEventListener("mouseup", function handleMouseUp_(evt) {
          evt.preventDefault();
          // set up 50 ms debounce
          clearTimeout(timer);
          timer = setTimeout(function() {
            if (!xDown || !yDown) {
              return;
            }

            let xUp = evt.clientX;
            let yUp = evt.clientY;

            console.log(xUp);

            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;

            // looks to be the case that 1 is always point to 0, possible to simplify
            var map = JSON.parse(evt.target.closest('.carousel__list').getAttribute("def"))



            /*most significant*/
            if (xDiff > 1) {
              /* left swipe */
              // console.log("Swiped left", evt.target.closest('.carousel__list'));

              let parent = evt.target.closest('.carousel__list');
              let children = parent.querySelectorAll("*");
              let childFound = null;

              for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (child.hasAttribute("data-pos") && child.getAttribute("data-pos") === `${map[0]}`) {
                  childFound = child;
                  childFound.click()
                  break;
                }
              }

            }

            if (xDiff < -1) {
              /* left right */
              // console.log("Swiped right", evt.target.closest('.carousel__list'));


              let parent = evt.target.closest('.carousel__list');
              let children = parent.querySelectorAll("*");
              let childFound = null;

              for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (child.hasAttribute("data-pos") && child.getAttribute("data-pos") === `1`) {
                  childFound = child;
                  childFound.click()
                  break;
                }
              }

            }

            /* reset values */
            xDown = null;
            yDown = null;
          }, 50);

        });
        }
      }
      // drag
        if (!eventListenersExistTouchStart.includes(carouselList[i])) {
        carouselList[i].addEventListener("touchstart", function handleTouchStart_(evt) {
          xDown = evt.touches[0].clientX;
          yDown = evt.touches[0].clientY;

        }, false);
    }

      if (!eventListenersExistTouchEnd.includes(carouselList[i])) {
      carouselList[i].addEventListener("touchend", function handleTouchEnd_(evt) {
        if (!xDown || !yDown) {
          return;
        }

        let xUp = evt.changedTouches[0].clientX;
        let yUp = evt.changedTouches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        // looks to be the case that 1 is always point to 0, possible to simplify
        var map = JSON.parse(evt.target.closest('.carousel__list').getAttribute("def"))


        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          /*most significant*/
          if (xDiff > 5) {
            /* left swipe */
            // console.log("Swiped left", evt.target.closest('.carousel__list'));

            let parent = evt.target.closest('.carousel__list');
            let children = parent.querySelectorAll("*");
            let childFound = null;

            for (let i = 0; i < children.length; i++) {
              let child = children[i];
              if (child.hasAttribute("data-pos") && child.getAttribute("data-pos") === `${map[0]}`) {
                childFound = child;
                childFound.click()
                break;
              }
            }

          }

          if (xDiff < -5) {
            /* left right */
            // console.log("Swiped right", evt.target.closest('.carousel__list'));


            let parent = evt.target.closest('.carousel__list');
            let children = parent.querySelectorAll("*");
            let childFound = null;

            for (let i = 0; i < children.length; i++) {
              let child = children[i];
              if (child.hasAttribute("data-pos") && child.getAttribute("data-pos") === `1`) {
                childFound = child;
                childFound.click()
                break;
              }
            }

          }
        }
        /* reset values */
        xDown = null;
        yDown = null;
      });
    }

  if (!eventListenersExistClick.includes(carouselList[i])) {
      // click rotate
      carouselList[i].addEventListener('click', function handleClick_(event) {
        // prevents double selection of the whole carousel
        event.preventDefault();

        // Get the element that was clicked
        var newActive = event.target;

        // Check if the clicked element is a carousel item
        var isItem = newActive.closest('.carousel__item');

        // If the clicked element is not a carousel item or is already active, return
        if (!isItem || newActive.classList.contains('carousel__item_active')) {
          return;
        }

        // Otherwise, update the carousel
        update(newActive, isItem.parentNode);

      });
      // carouselList[i].addEventListener('mousedown', (event) => {console.log('event')});
      }
    }
    // Add a click event listener to the carousel list


    // Function to update the carousel
    const update = function(clickedElm, parentElm) {
      // make the target which has NewActive 0
      var map = JSON.parse(parentElm.getAttribute("def"))

      // the clicked elm always comes to the front
      while (parseInt(clickedElm.dataset.pos) != 0) {
        [...parentElm.children].forEach(item => {
          // console.log(item);
          var itemPos = item.dataset.pos;
          // item.setAttribute("dataset-pos",map[parseInt(item.dataset.pos)])
          // console.log(`${item.dataset.pos} -> ${map[parseInt(item.dataset.pos)]}`)
          item.dataset.pos = map[parseInt(item.dataset.pos)];

        });
        carouselItemPostion([...parentElm.children], parentElm);
      }

    };
  }


  // Server Loading Animation

  function serverLoading() {

    var boxShadow = false
    var options = {
      "boxshadow": true,
      "fadeOut": true,
      "fadeOutTime": 3000
    }
    banner_up(`<div style='position:relative; width: 100%; height: 30px; display:flex; justify-content:center;' class="doNotClose"><div class="spinnerW doNotClose">
                      <span class="ball-1 doNotClose"></span>
                      <span class="ball-2 doNotClose"></span>
                      <span class="ball-3 doNotClose"></span>
                      <span class="ball-4 doNotClose"></span>
                      <span class="ball-5 doNotClose"></span>
                      <span class="ball-6 doNotClose"></span>
                      <span class="ball-7 doNotClose"></span>
                      <span class="ball-8 doNotClose"></span>
                    </div> </div>`, 'rgba(0,0,0,0)', options);
  }


  // SET UP BANNER
  function close_bannner(e) {
    // console.trace()
    // console.log("banner down ")
    if (e == null) {
      var banner = document.getElementsByClassName('banner')[0]
    } else {
      var banner = e.target.closest('.banner');
    }

    banner.style.opacity = 0;
    banner.style.bottom = '0px';
    banner.style.visibility = 'hidden';


  }

  function close_banner() {
    close_bannner(null);
  }

  var storeBannerTimeout  = [];
  function banner_up(message, color, options = null) {
    //     var options = {
        //   "boxshadow": true,
        //   "fadeOut": true,
        //   "fadeOutTime": 3000
        // }
    // remove time out
    if (storeBannerTimeout.length == 1){
      clearTimeout(  storeBannerTimeout[0]);
    }
    var banner_elm = document.getElementsByClassName('banner')[0];


    banner_elm.style.bottom = '5%';
    banner_elm.style.opacity = 1;
    banner_elm.style.zIndex = "9000";

    banner_elm.getElementsByTagName('p')[0].innerHTML = message;
    if (color == "red" || color == "green" || color == "black") {
      banner_elm.getElementsByTagName('p')[0].style.color = "white";

    }

    if (color == "white") {
      banner_elm.getElementsByTagName('p')[0].style.color = "black";
    }

    banner_elm.style.boxShadow = "0px 2px 8px 0px rgb(50 50 50 / 50%)";


    if (options != null) {

      if ("boxshadow" in options) {
        banner_elm.style.boxShadow = "none";

      }

      // Fade out after as set time
      if ("fadeOut" in options && "fadeOutTime" in options) {
      var time_out =   setTimeout(function() {
          close_banner()
        }, options.fadeOutTime);
          storeBannerTimeout.push(time_out);
      }
    }


    banner_elm.style.backgroundColor = color;
    banner_elm.style.visibility = 'visible';



  }

  function setUpBanner() {
    var banner_elm = document.getElementsByClassName('banner')[0];
    banner_elm.addEventListener("click", close_bannner);
  }


  // Set Up like;
  // depending on typ send to outfit server or article server
  function like(e) {
    // console.log(e.target)
    var like_elme = e.target.closest('.like_button');


    // if dislike is already selected unselect it
    console.log(like_elme.parentNode.getElementsByClassName('dislike_button'))
    if (like_elme.parentNode.getElementsByClassName('dislike_button')[0].getAttribute("disliked") == "true") {
      like_elme.parentNode.getElementsByClassName('dislike_button')[0].click()
    }


    if (like_elme.getAttribute("liked") == "true") {
      if (uniqueUserId == "") {
        var options = {
          "fadeOut": true,
          "fadeOutTime": 3000
        }
        banner_up("Sign In!", "black",options);
      } else {
        // send to sever
      }


      like_elme.getElementsByTagName('img')[0].src = "img/like-svgrepo-com.svg"
      like_elme.setAttribute("liked", "false");
      like_elme.getElementsByTagName('p')[0].innerHTML = `${parseInt(like_elme.getElementsByTagName('p')[0].innerHTML) - 1}`;

      // if successful change nums

      // not succesful post banner
    } else {

      if (uniqueUserId == "") {
        var options = {
          "fadeOut": true,
          "fadeOutTime": 3000
        }
        banner_up("Sign In!", "black",options);
      } else {
        // send to sever
      }
      like_elme.getElementsByTagName('img')[0].src = "img/like-svgrepo-com-inv.svg";
      like_elme.setAttribute("liked", "true");
      like_elme.getElementsByTagName('p')[0].innerHTML = `${parseInt(like_elme.getElementsByTagName('p')[0].innerHTML) + 1}`;


    }

  }

  function setUpLike() {
    for (var i = 0; i < document.getElementsByClassName('like_button').length; i++) {
      document.getElementsByClassName('like_button')[i].addEventListener("click", like)
    }
  }


  // SET UP DISLIKE

  function dislike(e) {
    // console.log(e.target)
    var dislike_elme = e.target.closest('.dislike_button');


    // if dislike is already selected unselect it
    if (dislike_elme.parentNode.getElementsByClassName('like_button')[0].getAttribute("liked") == "true") {
      dislike_elme.parentNode.getElementsByClassName('like_button')[0].click()
    }


    if (dislike_elme.getAttribute("disliked") == "true") {
      if (uniqueUserId == "") {
        var options = {
          "fadeOut": true,
          "fadeOutTime": 3000
        }
        banner_up("Sign In!", "black",options);
      } else {
        // send to sever
      }

      // send to sever
      dislike_elme.getElementsByTagName('img')[0].src = "img/like-svgrepo-com.svg"
      dislike_elme.getElementsByTagName('img')[0].style.cssText = "height: 20px;width: 20px; transform: rotateZ(180deg);"
      dislike_elme.setAttribute("disliked", "false");
      dislike_elme.getElementsByTagName('p')[0].innerHTML = `${parseInt(dislike_elme.getElementsByTagName('p')[0].innerHTML) - 1}`;

      // if successful change nums

      // not succesful post banner
    } else {

      if (uniqueUserId == "") {
        var options = {
          "fadeOut": true,
          "fadeOutTime": 3000
        }
        banner_up("Sign In!", "black",options);
      } else {
        // send to sever
      }

      dislike_elme.getElementsByTagName('img')[0].src = "img/dislike-svgrepo-com-inv.svg";
      dislike_elme.getElementsByTagName('img')[0].style.cssText = "height: 20px;width: 20px; transform: rotateZ(180deg); opacity:.5"
      dislike_elme.setAttribute("disliked", "true");
      dislike_elme.getElementsByTagName('p')[0].innerHTML = `${parseInt(dislike_elme.getElementsByTagName('p')[0].innerHTML) + 1}`;

    }

  }

  function setUpDislike() {
    for (var i = 0; i < document.getElementsByClassName('dislike_button').length; i++) {
      document.getElementsByClassName('dislike_button')[i].addEventListener("click", dislike)
    }

  }

  // Set up User scroll view Interaction



  //SET UP SIGN UP

  function closeSignin() {
    var sign_elm = document.getElementsByClassName('signIn')[0];
    sign_elm.classList.add("hideSignIn");
    upSignin = false;
    close_banner();

  }

  function signinUp() {
    var signElm = document.getElementsByClassName('signIn')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      upSignin = true;
    }, "50")
  }
  // state to determine if sign in modal is being displayed, initial state is hidden -> false
  var upSignin = false;


  function setUpSignIn() {
    // add on click to header menue
    var sign_elm = document.getElementsByClassName('phos_sign_in')[0];
    sign_elm.addEventListener("click", signinUp);

    // add on click to sign in modal
    var sign_elmX = document.getElementsByClassName('banner_x_s')[0];
    sign_elmX.addEventListener("click", closeSignin);
  }

  //-------------
  // Login


  function signInMorphToProfilePage() {
    // set the url to the user name  then swith to url page

    // change Sign In to profile

    var signIn = document.getElementsByClassName('phos_sign_in')[0];
    signIn.getElementsByTagName('p')[0].innerHTML = "Profile";

    // disable sign in modal flow
    signIn.removeEventListener('click', signinUp);
    signIn.classList.remove('phos_sign_in');

    // add profile page class
    signIn.classList.add('profile_page_button');


    // add
    ///??? profilepageowner
    signIn.setAttribute("profilePageOwner", xorString(profileUserObject.uuid, true))

    signIn.addEventListener("click", profilePageDisplay);
    //save login state  to local storage
    //????
    onPageLoad();
  }

  function login(userEmail, userPassword) {
    console.log("login ");
    close_banner();

    // send request to server

    // on pass put button back
    // newItem.parentNode.replaceChild(signInButton, newItem);
    //// have to initalize event listener
    // var signInButton = document.getElementsByClassName('signin__tag')[0];
    //
    // signInButton.addEventListener("click", submitSignIn);

    // document.getElementById("signInEmail").value = ''
    // document.getElementById("signInPassword").value = '';

    //closeSignin();
    // flip sign In to profile
    //close_banner()
    uniqueUserId = "";
    return true;
  }

  function submitSignIn() {
    // animate button
    var newItem = createSpinner();
    var signInButt = document.getElementsByClassName('signin__tag')[0];
    var signInButton = signInButt.cloneNode(true);
    signInButt.parentNode.replaceChild(newItem, signInButt);


    // ensure input feild is email ChatGPT
    var userEmail = document.getElementById("signInEmail").value;
    var userPassword = document.getElementById("signInPassword").value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    // Check if the email is in a valid format
    if (emailRegex.test(userEmail)) {
      // If the email is in a valid format, check for malicious payloads
      // You can do this by running the email through a function that checks for malicious payloads
      if (checkForMaliciousPayloads(userEmail) && checkForMaliciousPayloads(userPassword)) {
        // If the function returns true, it means that there is a malicious payload present
        // You can then alert the user or display an error message
        console.log("The email you entered contains a malicious payload. Please enter a different email.");
        return;
      } else {
        // If the function returns false, it means that the email is safe
        // You can proceed with the login process
        if (login(userEmail, userPassword)) {
          // Login succesful
          newItem.parentNode.replaceChild(signInButton, newItem);
          // reinitialize event listener
          var signInButton = document.getElementsByClassName('signin__tag')[0];
          signInButton.addEventListener("click", submitSignIn);

          signInMorphToProfilePage();

          localStorage.setItem("phost_login", "true");
          localStorage.setItem("phost_useruuid", "")

          closeSignin();
          banner_up("Welcome Back!", "black");


        } else {
          // unsucessful login
          banner_up("Login Unsucessful", "red")

          newItem.parentNode.replaceChild(signInButton, newItem);
          // reinitialize event listener
          var signInButton = document.getElementsByClassName('signin__tag')[0];
          signInButton.addEventListener("click", submitSignIn);
        }
      }
    } else {
      // If the email is not in a valid format, alert the user or display an error message

      banner_up("The email you entered in a valid format.", "red")

      newItem.parentNode.replaceChild(signInButton, newItem);
      // reinitialize event listener
      var signInButton = document.getElementsByClassName('signin__tag')[0];
      signInButton.addEventListener("click", submitSignIn);

    }
    // ensure password is not expliotable  ChatGPT

  }


  function serverGetUniqueIdEmail() {

  }

  function setUpSubmitSignIn() {
    var signInButton = document.getElementsByClassName('signin__tag')[0];

    signInButton.addEventListener("click", submitSignIn);
    // -------
    // Condition to check when user first gets onto page
    // If user is signed in
    if (localStorage.getItem("phost_login") != null && localStorage.getItem("phost_login") == "true") {
      signInMorphToProfilePage();
      uniqueUserId = localStorage.getItem("phost_useruuid");
    }
  }
  // Set Up Sign UP
  var upSignUp = false;
  // close sign up
  function closeSignUp() {
    var sign_elm = document.getElementsByClassName('signUp')[0];
    sign_elm.classList.add("hideSignIn");
    upSignUp = false;
    close_banner();


    removeEditProfile();
  }


  // pull up signUp modal
  function signUpUp() {
    removeEditProfile();
    closeSignin();
    console.log("signUp")
    var signElm = document.getElementsByClassName('signUp')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      upSignUp = true;
    }, "50")
  }

  function severUserSignUp(userSignUpName, userEmail, userPassword) {
    uniqueUserId = "chees429"
    return true;
  }



  function signUpUser() {
    console.log("Sign Up User")
    // animate button
    var newItem = createSpinner();
    var signInButt = document.getElementsByClassName('signup__tag')[0];
    var signInButton = signInButt.cloneNode(true);
    signInButt.parentNode.replaceChild(newItem, signInButt);

    // ensure input feild is email ChatGPT
    var userSignUpName = document.getElementById('signUpUserName').value;
    var userEmail = document.getElementById("signUpEmail").value;
    var userPassword = document.getElementById("signUpPassword").value;
    var userPasswordConfirm = document.getElementById("signUpPasswordConfirm").value;
    // var userBirth = document.getElementById('birth').value;
    // var userGender = document.getElementById('gender').value;
    // var terms = document.getElementById('terms').checked;
    console.log(userSignUpName, !uniqueUsername(userSignUpName), userSignUpName == "",
      userEmail,
      userPassword,
      userPasswordConfirm,
      // userBirth,
      // userGender,
      // terms
    )
    // Anybody can take any username we are not searching on user names
    // if (!uniqueUsername(userSignUpName)) {
    //   console.log("here")
    //   banner_up("The username you entered is not available.", "red")
    //   newItem.parentNode.replaceChild(signInButton, newItem);
    //   // reinitialize event listener
    //   var signInButton = document.getElementsByClassName('signup__tag')[0];
    //   signInButton.addEventListener("click", signUpUser);
    //   return;
    // }

    // limit username length
    if (userSignUpName.length  >= 26) {
      banner_up("User name cannont be longer than then twenty-five characters", "red")
      newItem.parentNode.replaceChild(signInButton, newItem);
      // reinitialize event listener
      var signInButton = document.getElementsByClassName('signup__tag')[0];
      signInButton.addEventListener("click", signUpUser);
      return;
    }


    // Check if the email is in a valid format
    if (emailRegex.test(userEmail)) {

      //error with password
      if (!(userPassword == userPasswordConfirm && userPassword != "")) {
        banner_up("The password you entered does not match.", "red")

        newItem.parentNode.replaceChild(signInButton, newItem);
        // reinitialize event listener
        var signInButton = document.getElementsByClassName('signup__tag')[0];
        signInButton.addEventListener("click", signUpUser);
        return;
      }


      // user Gender
      // if (userGender == "") {
      //   banner_up("Please Select a Gender ", "red")
      //   newItem.parentNode.replaceChild(signInButton, newItem);
      //   // reinitialize event listener
      //   var signInButton = document.getElementsByClassName('signup__tag')[0];
      //   signInButton.addEventListener("click", signUpUser);
      //   return;
      // }

      // terms selected
      // if (!terms) {
      //   banner_up("Terms and Conditions not accepted.", "red")
      //   newItem.parentNode.replaceChild(signInButton, newItem);
      //   // reinitialize event listener
      //   var signInButton = document.getElementsByClassName('signup__tag')[0];
      //   signInButton.addEventListener("click", signUpUser);
      //   return;
      // }

      //userBirth selected
      // if (userBirth == "2018-07-22") {
      //   banner_up("Must be 18+", "red")
      //   newItem.parentNode.replaceChild(signInButton, newItem);
      //   // reinitialize event listener
      //   var signInButton = document.getElementsByClassName('signup__tag')[0];
      //   signInButton.addEventListener("click", signUpUser);
      //   return;
      // }




      // If the email is in a valid format, check for malicious payloads
      // You can do this by running the email through a function that checks for malicious payloads
      if (checkForMaliciousPayloads(userEmail) && checkForMaliciousPayloads(userPassword)) {
        // If the function returns true, it means that there is a malicious payload present
        // You can then alert the user or display an error message
        console.log("The email OR password you entered contains a malicious payload.");
        return;
      } else {
        // If the function returns false, it means that the email is safe
        // You can proceed with the login process
        if (severUserSignUp(userSignUpName, userEmail, userPassword)) {
          // Login succesful
          newItem.parentNode.replaceChild(signInButton, newItem);
          // reinitialize event listener
          var signInButton = document.getElementsByClassName('signup__tag')[0];
          signInButton.addEventListener("click", signUpUser);

          // Set Up Global variables

          userName = userSignUpName

          signInMorphToProfilePage();

          localStorage.setItem("phost_login", "true");
          localStorage.setItem("phost_useruuid", uniqueUserId);

          closeSignUp();
          banner_up(`Welcome ${userSignUpName}!`, "black");


        } else {
          // unsucessful login
          banner_up("SignUp Unsucessful", "red")

          newItem.parentNode.replaceChild(signInButton, newItem);
          // reinitialize event listener
          var signInButton = document.getElementsByClassName('signup__tag')[0];
          signInButton.addEventListener("click", signUpUser);
        }
      }
    } else {
      // If the email is not in a valid format, alert the user or display an error message

      banner_up("The email you entered is a valid format.", "red")

      newItem.parentNode.replaceChild(signInButton, newItem);
      // reinitialize event listener
      var signInButton = document.getElementsByClassName('signup__tag')[0];
      signInButton.addEventListener("click", signUpUser);

    }

  }

  function setUpSignUp() {
    // add click to sign up to bring up modal
    var signUpButton = document.getElementsByClassName("phos_sign_up")[0];
    signUpButton.addEventListener("click", signUpUp);

    // add click to x to close sign up modal
    var sign__elmX = document.getElementsByClassName('banner_x_sup')[0];
    sign__elmX.addEventListener("click", closeSignUp);


    var signUpUserButton = document.getElementsByClassName('signup__tag')[0];
    signUpUserButton.addEventListener("click", signUpUser)

  }

  // -----------
  //Set Up Reset Password

  var resetUp = false;
  // close sign up
  function closeReset() {
    var sign_elm = document.getElementsByClassName('reset_passw')[0];
    sign_elm.classList.add("hideSignIn");
    resetUp = false;
    close_banner();

  }
  // pull up signUp modal
  function reseTUp() {
    closeSignin();
    console.log("reset modal")
    var signElm = document.getElementsByClassName('reset_passw')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      resetUp = true;
    }, "50")
  }


  function serverResetPasword(userEmail) {
    return true;
  }

  function resetPassword() {
    // animate button
    var newItem = createSpinner();
    var signInButt = document.getElementsByClassName('reset__tag')[0];
    var signInButton = signInButt.cloneNode(true);
    signInButt.parentNode.replaceChild(newItem, signInButt);


    // ensure input feild is email ChatGPT
    var userEmail = document.getElementById("resetEmail").value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    // Check if the email is in a valid format
    if (emailRegex.test(userEmail)) {
      // If the email is in a valid format, check for malicious payloads
      // You can do this by running the email through a function that checks for malicious payloads
      if (checkForMaliciousPayloads(userEmail)) {
        // If the function returns true, it means that there is a malicious payload present
        // You can then alert the user or display an error message
        console.log("The email you entered contains a malicious payload. Please enter a different email.");
        return;
      } else {
        // If the function returns false, it means that the email is safe
        // You can proceed with the login process
        if (serverResetPasword(userEmail)) {
          // Login succesful
          newItem.parentNode.replaceChild(signInButton, newItem);
          // reinitialize event listener
          var signInButton = document.getElementsByClassName('reset__tag')[0];
          signInButton.addEventListener("click", resetPassword);


          closeReset();
          closeSignin();
          banner_up(`A reset password has been sent to ${userEmail}!`, "green");
          document.getElementById("resetEmail").value = "";


        } else {
          // unsucessful login
          banner_up("Sorry, we do not have an account under that email.", "red")

          newItem.parentNode.replaceChild(signInButton, newItem);
          // reinitialize event listener
          var signInButton = document.getElementsByClassName('reset__tag')[0];
          signInButton.addEventListener("click", resetPassword);
        }
      }
    } else {
      // If the email is not in a valid format, alert the user or display an error message

      banner_up("The email you entered is a valid format.", "red")

      newItem.parentNode.replaceChild(signInButton, newItem);
      // reinitialize event listener
      var signInButton = document.getElementsByClassName('signin__tag')[0];
      signInButton.addEventListener("click", submitSignIn);

    }
    // ensure password is not expliotable  ChatGPT
  }


  function setUpPassword() {
    // add click to sign up to bring up modal
    var resetUpButton = document.getElementsByClassName("phos_forgot_password")[0];
    resetUpButton.addEventListener("click", reseTUp);

    // add click to x to close sign up modal
    var reset_elmX = document.getElementsByClassName('banner_x_reset')[0];
    reset_elmX.addEventListener("click", closeReset);



    var resetPasswButton = document.getElementsByClassName('reset__tag')[0];
    resetPasswButton.addEventListener("click", resetPassword);
  }


  //----------------------
  // SET UP FILTER
  var filterUp = false;
  var selectedGender = {
    "women": true,
    "men": false,
    "babies": false
  };
  var selectedArticlesObj = {
    "outfit": true,
    "item": true
  };
  var likeState = "none";
  var minPrice = 0;
  var maxPrice = 1000;
  var userSelectedCompany = ""




  function closeFilter() {
    var sign_elm = document.getElementsByClassName('filter_modal')[0];
    sign_elm.classList.add("hideSignIn");
    filterUp = false;
    close_banner();

  }
  // pull up filter modal
  function filteRUp() {
    closeSignin();
    console.log("filter")
    var signElm = document.getElementsByClassName('filter_modal ')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      filterUp = true;
    }, "50")
  }

  function serverFilterOptions() {
    selectedGender
    selectedArticlesObj
    likeState
    minPrice
    maxPrice
    userSelectedCompany
    return true
  }


  function filterClothes() {

    // animate button
    var newItem = createSpinner();
    var signInButt = document.getElementsByClassName('filter__tag')[0];
    var signInButton = signInButt.cloneNode(true);
    signInButt.parentNode.replaceChild(newItem, signInButt);

    userSelectedCompany = document.getElementById('company_filter').value

    //  checks for malicious payloads
    if (checkForMaliciousPayloads(userSelectedCompany)) {
      // If the function returns true, it means that there is a malicious payload present
      // You can then alert the user or display an error message
      console.log("The filter contains a malicious payload.");
      return;
    } else {
      // If the function returns false, it means that the email is safe
      // You can proceed with the login process
      if (serverFilterOptions()) {
        // filter successful
        newItem.parentNode.replaceChild(signInButton, newItem);
        // reinitialize event listener
        var signInButton = document.getElementsByClassName('filter__tag')[0];
        signInButton.addEventListener("click", filterClothes);


        closeFilter();
        closeSignin();
      } else {
        // unsucessful login
        banner_up("Sorry, something went wrong on our end", "red")

        newItem.parentNode.replaceChild(signInButton, newItem);
        // reinitialize event listener
        var signInButton = document.getElementsByClassName('filter__tag')[0];
        signInButton.addEventListener("click", filterClothes);
      }
    }

  }


  function filterForm() {
    var options = {
      "fadeOut": true,
      "fadeOutTime": 3000
    }
    // update the tool tip indicators for the slider
    function selectGender() {

      function getSelectedGender() {
        // get the gender elements
        var elms = document.getElementsByClassName('filter_gender')[0].getElementsByClassName('filter__tag_f');

        var selectedElms = [];
        for (var i = 0; i < elms.length; i++) {
          if (elms[i].classList.contains("selected_filter")) {
            selectedElms.push(elms[i]);
          }
        }
        return selectedElms;
      }

      function selectGenderElem(e) {

        var genElm = e.target.closest('.filter__tag_f');
          console.log(genElm)
        //if only one selected gender do nothing
        if (getSelectedGender().length == 1 && getSelectedGender().includes(genElm)) {
          banner_up("<b>At least on gender must be selected.</b>", "white",options)
          return;
        }
        // element is already selected and need to remove it from selected
        if (getSelectedGender().includes(genElm)) {
          genElm.classList.remove("selected_filter");

          var sGen = genElm.getAttribute("gen");
          selectedGender[sGen] = !selectedGender[sGen];
          banner_up(`Unselect:  <b>${capitalizeFirstLetter(sGen)}</b>`, "white");

        } else {
          console.log('add selected filter')
          genElm.classList.add("selected_filter");

          var sGen = genElm.getAttribute("gen");
          selectedGender[sGen] = !selectedGender[sGen];
          banner_up(`Gender Select: <b>${capitalizeFirstLetter(sGen)}</b>`, "black",options);

        }

        console.log(selectedGender)
      }

      var genderElm = document.getElementsByClassName('filter_gender')[0].getElementsByClassName('filter__tag_f');
      for (var i = 0; i < genderElm.length; i++) {
        // try {
        //   genderElm[i].removeEventListener("click", selectGenderElem)
        // } catch (e) {}
         if (!eventListenersExist.includes(genderElm[i])) {
          genderElm[i].addEventListener("click", selectGenderElem);
           eventListenersExist.push(genderElm[i]);
         }
      }
    }


    function selectArticle() {

      function getSelectedArticle() {
        // get the gender elements
        var elms = document.getElementsByClassName('filter_articles')[0].getElementsByClassName('filter__tag_f');

        var selectedElms = [];
        for (var i = 0; i < elms.length; i++) {
          if (elms[i].classList.contains("selected_filter")) {
            selectedElms.push(elms[i]);
          }
        }
        return selectedElms;
      }

      function selectArticleElem(e) {
        var articleElm = e.target.closest('.filter__tag_f');
        //if only one selected gender do nothing
        if (getSelectedArticle().length == 1 && getSelectedArticle().includes(articleElm)) {
          banner_up(`<b>Cannot Deselect.</b> Either Outfit or Items must be selected.`, "red"),options;
          return;
        }
        // element is already selected and need to remove it from selected
        if (getSelectedArticle().includes(articleElm)) {
          articleElm.classList.remove("selected_filter");

          var sarticle = articleElm.getAttribute("choice");
          selectedArticlesObj[sarticle] = !selectedArticlesObj[sarticle];

          banner_up(`Don't show </b>${capitalizeFirstLetter(sarticle)}</b>`, "white",options);
        } else {
          articleElm.classList.add("selected_filter");

          var sarticle = articleElm.getAttribute("choice");
          selectedArticlesObj[sarticle] = !selectedArticlesObj[sarticle];
          banner_up(`Show </b>${capitalizeFirstLetter(sarticle)}</b>`, "black",options);

        }

        console.log(selectedArticlesObj)
      }

      var articleElm = document.getElementsByClassName('filter_articles')[0].getElementsByClassName('filter__tag_f');
      for (var i = 0; i < articleElm.length; i++) {

        if (!eventListenersExist.includes(articleElm[i])) {
          articleElm[i].addEventListener("click", selectArticleElem)
          eventListenersExist.push(articleElm[i]);
        }
      }
    }


    function priceTooltip(upperVal, lowerVal) {
      minPrice = lowerVal;
      maxPrice = upperVal;
      if (upperVal == 1000) {
        document.getElementById('price_high').innerHTML = `$${upperVal}+`
      } else {
        document.getElementById('price_high').innerHTML = `$${upperVal}`
      }
      document.getElementById('price_low').innerHTML = `$${lowerVal}`

    }
    // Crate the multi range slider
    function multirangeSlider() {
      lowerSlider = document.querySelector('#lower'),
        upperSlider = document.querySelector('#upper'),
        lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      upperSlider.oninput = function() {
        lowerVal = parseInt(lowerSlider.value);
        upperVal = parseInt(upperSlider.value);

        priceTooltip(upperVal, lowerVal);
        if (upperVal < lowerVal + 4) {
          lowerSlider.value = upperVal - 4;

          if (lowerVal == lowerSlider.min) {
            upperSlider.value = 4;
          }
        }
      };


      lowerSlider.oninput = function() {
        lowerVal = parseInt(lowerSlider.value);
        upperVal = parseInt(upperSlider.value);

        priceTooltip(upperVal, lowerVal);

        if (lowerVal > upperVal - 4) {
          upperSlider.value = lowerVal + 4;

          if (upperVal == upperSlider.max) {
            lowerSlider.value = parseInt(upperSlider.max) - 4;
          }

        }
      };

    }


    function autocomplete() {
      // add key press
      document.getElementById("company_filter").addEventListener("keyup", function(event) {
        openAutoComplete(event, "company_filter", "price-type", "typeahead_container", "typeaheadInstance");
      });

      // register the autocomplete section to be hidded when anywhere outside of it has been clicked

    }

    function selectLikesAtt() {

      function selectLAtt(e) {
        var obj_ = {
          "none": "least",
          "most": "none",
          "least": "most"
        };
        // get the like elmented selected
        var selectedElm = e.target.closest('.likeClass');


        // set the state of elme
        selectedElm.setAttribute("state", obj_[selectedElm.getAttribute("state")])

        if (obj_[selectedElm.getAttribute("state")] == "none") {
          banner_up("Likes <b>don't matter</b> ", "grey",options)
          selectedElm.classList.remove("selected_filter");
          selectedElm.innerHTML = ` <p class="doNotClose" style="text-align: center;">Likes </p>`
        }

        if (obj_[selectedElm.getAttribute("state")] == "most") {
          banner_up("<b>Top likes</b>  shown first ", "black",options)
          if (!selectedElm.classList.contains("selected_filter")) {
            selectedElm.classList.add("selected_filter");
          }

          selectedElm.innerHTML = `<p class="doNotClose" style="text-align: center;">Likes <span  class="doNotClose" style="font-size: 10px;">&#9650;</span></p>`
        }

        if (obj_[selectedElm.getAttribute("state")] == "least") {
          banner_up("<b>Least liked</b> shown first", "white",options)
          if (!selectedElm.classList.contains("selected_filter")) {
            selectedElm.classList.add("selected_filter");
          }

          selectedElm.innerHTML = `<p class="doNotClose" style="text-align: center;">Likes <span  class="doNotClose" style="font-size: 10px;">&#9660;</span></p>`
        }

        console.log(obj_[selectedElm.getAttribute("state")])

        likeState = obj_[selectedElm.getAttribute("state")];

      }

      var elm = document.getElementsByClassName('likeClass')[0];
      elm.addEventListener("click", selectLAtt)
    }

    // both men and women can be selected, one must always be selected

    // use banner when setting third state for like

    // listen to key press highlight options

    // enter selects and searches
    selectGender();
    selectArticle();
    multirangeSlider();
    selectLikesAtt();
    autocomplete();

  }

  function closeAutoComplete() {
    filterAutoUp = false;
    document.getElementsByClassName('price-type')[0].classList.add("hideSignIn");
    console.log("hide auto")
  }
  // for Type agead
  var filterAutoUp = false;


  function setUpFilter() {
    filterForm();

    // add click to bring up filter modal
    var filterButton = document.getElementsByClassName("phos_filterz")[0];
    filterButton.addEventListener("click", filteRUp);

    // add click to x to close filter modal
    var filter_elmX = document.getElementsByClassName('banner_x_filter')[0];
    filter_elmX.addEventListener("click", closeFilter);


    // filter based on choices
    var filterButton = document.getElementsByClassName('filter__tag')[0];
    filterButton.addEventListener("click", filterClothes);
  }


  //----------------------
  // SET UP Search
  var maindSearchUp = false;

  function closeAutoCompleteMain() {
    maindSearchUp = false;
    document.getElementsByClassName('main-auto')[0].classList.add("hideSignIn");
    console.log("hide auto")
    searchMainField();
  }

  function mainAutoComplete() {
    // add key press
    document.getElementById("mainSearchField").addEventListener("keyup", function(event) {
      openAutoComplete(event, "mainSearchField", "main-auto", "typeahead_container_1", "typeaheadInstance_1");
    });

    // register the autocomplete section to be hidded when anywhere outside of it has been clicked

  }

  function serverSearchFeild() {
    return true;
  }

  function searchMainField() {
    // animate button
    var newItem = createSpinner();
    var signInButt = document.getElementsByClassName('autoLoader')[0];
    var signInButton = signInButt.cloneNode(true);
    signInButt.parentNode.replaceChild(newItem, signInButt);

    if (checkForMaliciousPayloads(userSelectedCompany)) {

    } else {

    }

    if (serverSearchFeild()) {
      //populate list

    } else {
      banner_up("Something happend on our end", "red")
    }

    newItem.parentNode.replaceChild(signInButton, newItem);

  }

  mainAutoComplete();


  //----------------------
  // SET UP Go to Shop

  var goToShopUp = false;
  // close list detail
  function closeGoToShop() {
    var sign_elm = document.getElementsByClassName('go_to_shop_modal')[0];
    sign_elm.classList.add("hideSignIn");
    goToShopUp = false;
    close_banner();

  }
  // open list detail
  function openGoToShop(company) {

    document.getElementById('goToShopElm').innerHTML = `Shop at <b> ${company} </b>`;
    closeSignin();
    var signElm = document.getElementsByClassName('go_to_shop_modal')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      serverLoading();
      goToShopUp = true;
    }, "50")


  }

  function clickGoToShop(e) {
    // get the div containing the clicked text
    var carousel = e.target.closest(".carousel__tag");

    // open delay modal
    openGoToShop(carousel.getAttribute("company"));
    setTimeout(() => {
      window.open(carousel.getAttribute("shop"), "_blank");
    }, "1000")

  }

  function setUpGotoShop() {
    var shopElm = document.getElementsByClassName('goToShop_');
    for (var i = 0; i < shopElm.length; i++) {
      shopElm[i].addEventListener("click", clickGoToShop)
    }
  }


  function changeDescrip(e) {
    var identifier = e.target.closest(".clothing_instance");
    var imageIndex = identifier.querySelectorAll('[data-pos="0"]')[0].getAttribute("img-id")
    var filtered = imagesList.filter(
      function(e) {
        return e["id"] == imageIndex;
      });

    var desc = identifier.getElementsByClassName('itemDescription')[0];
    desc.innerHTML = `<p style=""> <b> <i>${filtered[0].company}</i> </b> </p>
                    <p style="max-height: 44px; min-height: 44px; overflow: hidden;">${highlightKeyWord(filtered[0].desc,filtered[0].keywords,filtered[0])}</p>
                    <p><b> ${filtered[0].price}</b></p>`;


    var shop = identifier.getElementsByClassName('goToShop_')[0];
    shop.setAttribute("shop", `${filtered[0].link}`);
    shop.setAttribute("company", `${filtered[0].company}`);

    var saveOutfit = identifier.getElementsByClassName('save_outfit_button')[0];
    saveOutfit.setAttribute("imageListId", `${filtered[0].id}`);


  }

  function setUpCarouselDescr() {
    var carousel = document.getElementsByClassName('carousel__list_evt');
    for (var i = 0; i < carousel.length; i++) {
      carousel[i].addEventListener("click", changeDescrip)
    }

    var clos_s = document.getElementsByClassName('banner_x_shop')[0];
    clos_s.addEventListener("click", closeGoToShop)

  }


  //----------------------
  // SET UP save outfit

  var saveOutfitUp = false;
  var articleClicked;
  var editOufitId;
  var deletedOuftitName;
  var editOutfitMode = false

  function closeSaveOutfitShop() {
    var sign_elm = document.getElementsByClassName('save_outfit_modal')[0];
    sign_elm.classList.add("hideSignIn");
    saveOutfitUp = false;

    close_banner();

  }
  // open list detail
  function openSaveOutfitShop() {
    closeSignin();
    var signElm = document.getElementsByClassName('save_outfit_modal')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      saveOutfitUp = true;
    }, "50")


  }

  function deleteArticleFromOutfit(e) {
    // get the outfit id
    // get image id
    var imgId = e.target.closest(".outfitDeleteArticle_").getAttribute("imageId");
    console.log(editOufitId, imgId);
    // Send request to server
    serverLoading();



    var img = imagesList.filter(
      function(e) {
        return e.id == imgId;
      });

    banner_up(`Deleted: ${img[0].desc}`, `red`)

    var index = userOutfits.findIndex(function(obj) {
      return obj.outfitId == editOufitId;
    });
    var filtered_items = userOutfits[index].items.filter(
      function(id) {
        return id != imgId;
      });

    userOutfits[index].items = filtered_items;

    var outfitInstanceElm = e.target.closest(".outfitInstanceCar")
    outfitInstanceElm.parentNode.removeChild(outfitInstanceElm)

  }

  function deleteOutfit() {
    //get deleted ouftit id
    var filteredOutfit = userOutfits.filter(
      function(e) {
        return e["outfitId"] != editOufitId;
      });
    console.log("filteredOutfit", filteredOutfit)

    userOutfits = filteredOutfit

    // close the modal so that the outfit list screen can refresh
    closeConfModal();
    closeSaveOutfitShop()
    document.getElementsByClassName('save_outfit_modal_back')[0].click();

    // Send request to server
    //spinnerW
    serverLoading();

    // create a banner for deleted outfit
    banner_up(`<b> ${deletedOuftitName} </b> was deleted`, "red")

  }

  function outfitEditMode(e, cleanUp = false) {

    if (!editOutfitMode) {
      // Expose Delete buttons
      // add functiontionality to delete buttons
      var editButtons = document.getElementsByClassName('outfitDeleteArticle_')
      for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].style.display = "block";
        editButtons[i].addEventListener("click", deleteArticleFromOutfit)
      }

      //change text to save
      document.getElementsByClassName('edit_outfit_button_outfit_modal')[0].getElementsByTagName('p')[0].innerHTML = "Save Outfit"
      document.getElementsByClassName('edit_outfit_button_outfit_modal')[0].style.cssText = "background-color:black !important; color:white !important; margin-left:10px; padding:0px; min-width: 103px; max-width:103px;    line-height: 29px;"
      // flip boolean
      editOutfitMode = true

      // Replace Title input
      var edit_list = document.getElementsByClassName('save_outfit_modal_list_outfitInstance')[0];
      var title = edit_list.getElementsByTagName("h2")[0];
      var input_ = document.createElement("input");
      input_.value = title.innerHTML;
      input_.setAttribute("id", "EditOutfitName");
      input_.style.cssText = " margin: 26px;"
      title.parentNode.replaceChild(input_, title);

    } else {
      var editButtons = document.getElementsByClassName('outfitDeleteArticle_')
      for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].style.display = "none";
      }
      if (!cleanUp) {

        // send to server
        //only send info to the server if we are not doing a teardown
        // not a teardown, therefore send info to the server
        serverLoading();

      }

      //change text
      document.getElementsByClassName('edit_outfit_button_outfit_modal')[0].getElementsByTagName('p')[0].innerHTML = "Edit Outfit";
      document.getElementsByClassName('edit_outfit_button_outfit_modal')[0].style.cssText = "background-color:white !important; color:black !important; margin-left:10px; padding:0px; min-width: 103px; max-width:103px;    line-height: 29px;"

      //flip boolean
      editOutfitMode = false;


      // Replace Title input
      try {
        // on deleteing an outfit index does not exist
        var edit_list = document.getElementsByClassName('save_outfit_modal_list_outfitInstance')[0];
        var title = edit_list.getElementsByTagName("input")[0];
        var input_ = document.createElement("h2");
        input_.classList.add("detail_outfit_name")
        input_.innerHTML = title.value;
        var index = userOutfits.findIndex(function(obj) {
          return obj.outfitId == editOufitId;
        });
        userOutfits[index].name = title.value
        input_.style.cssText = " margin: 26px;"
        title.parentNode.replaceChild(input_, title);
      } catch (error) {

        var edit_list = document.getElementsByClassName('save_outfit_modal_list_outfitInstance')[0];
        var title = edit_list.getElementsByTagName("input")[0];
        var input_ = document.createElement("h2");
        input_.classList.add("detail_outfit_name")
        title.parentNode.replaceChild(input_, title);
        // console.error(error);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
      }



    }

  }


  function editOutfitDetails(e) {
    //Clean up and intialize
    if (editOutfitMode) {
      var teardown = false;
      outfitEditMode(false, teardown)
    }

    //was create button clicked
    if (e.target.closest(".createOutfitButton") != null) {

      // Create a new outfit data structure

      var uuid = uniqueUserId;
      var outfitId = createOutfitID();
      userOutfits.push({
        "type": "outfit",
        "creator": userName,
        "uuid": uuid,
        "outfitId": outfitId,
        "items": [],
        "likeCount": 0,
        "dislikeCount": 0,
        "userLiked": "false",
        "userDisliked": "false",
        "wishlist": "false",
        "name": "New Outfit",
        "tags": [],
        "lastAccessed": Math.floor(Date.now() / 1000),
      })

      var outId = outfitId;

    } else {
      var outId = e.target.closest(".outfitInstance").getAttribute("oufitid");
    }



    editOufitId = outId; // save outfit id to global var
    console.log(outId, articleClicked, "clicked outfit instance");
    // get the article clicked on and update last access
    var filtered = imagesList.filter(
      function(e) {
        return e["id"] == articleClicked;
      });
    // get the outfit the user clicked on
    var filteredOutfit = userOutfits.filter(
      function(e) {
        return e["outfitId"] == outId;
      });
      console.log(filteredOutfit[0]);

    console.log("filteredOutfit", filteredOutfit)



    //shift from outfit list view to outfit detail// diffent modal module
    var mList = document.getElementsByClassName('save_outfit_modal_main_outfit_list')[0];
    var oInst = document.getElementsByClassName('save_outfit_modal_list_outfitInstance')[0]
    mList.style.display = "none"
    oInst.classList.remove("hideSignIn")

    // add back functionality
    document.getElementsByClassName('save_outfit_modal_back')[0].addEventListener("click", function(e) {
      mList.style.display = "block";
      document.getElementsByClassName("add_to_outfit_modal_title")[0].style.display = "block";
      oInst.classList.add("hideSignIn");
      outfitEditMode(false, false)
      saveOutfitMenu(saveOutfitMenuEVal);
    })

    //Place Outfit name at top of the modal. Change the outfit name reduce the length
    // could be the case that the still in edit outfit mode click on edit outfit get out out of the mode changes will be saved.
    // if (document.getElementsByClassName('detail_outfit_name').length == 0){
    //   document.getElementsByClassName('edit_outfit_button_outfit_modal')[0].click();
    // }
    if (filteredOutfit[0].name.length < 30) {
      // "<b>Desc:</b> "
      document.getElementsByClassName('detail_outfit_name')[0].innerHTML = filteredOutfit[0].name
      deletedOuftitName = filteredOutfit[0].name
    } else {
      document.getElementsByClassName('detail_outfit_name')[0].innerHTML = filteredOutfit[0].name.slice(0, 30) + "...";
      deletedOuftitName = filteredOutfit[0].name;

    }

    //Remvove modal title, takes up to much room
    document.getElementsByClassName("add_to_outfit_modal_title")[0].style.display = "none";

    // Update outfite LRU time
    filteredOutfit[0].lastAccessed = Math.floor(Date.now() / 1000);

    //create a banner for added outfit
    banner_up(`<b> ${deletedOuftitName} </b> was updated`, "black")




    if (filteredOutfit[0].items.includes(articleClicked)) {
      //
      var filtered = imagesList.filter(
        function(e) {
          return e["id"] == articleClicked
        });
      banner_up(`Item: <b> ${filtered[0].desc} </b> was already added`, "red");

    }

    if (!(filteredOutfit[0].items.length <= 8)){

      banner_up(`Outfit has hit item limit. Please delete an item from your outfit to add <b> ${filtered[0].desc} </b> to <b> ${filteredOutfit[0].name}</b> `, "red");
    }

    // the article is added in createArticleCarousel
    document.getElementsByClassName('outfit-article-List')[0].innerHTML = createArticleCarousel(filteredOutfit[0], imagesList, articleClicked);
    // Set up links
    setUpGotoShop();
    // add conf modal to delete button
    document.getElementsByClassName('delete_outfit_button_outfit_modal')[0].addEventListener("click", function(e) {
      openConfModal(deleteOutfit, closeConfModal, ` Delete Outfit`, `Do you want to delete <b> ${filteredOutfit[0].name} </b>?`)
    })

    // add edit functionality
    document.getElementsByClassName('edit_outfit_button_outfit_modal')[0].addEventListener("click", outfitEditMode);

    // if create button click put view into edit mode
    if (e.target.closest(".createOutfitButton") != null) {
      outfitEditMode(false, false);
    }
  }

  var userOutfitEventListener = [];
  var userOutfitEventListener_1 = [];
  function saveOutfitMenuScroll() {
    serverGetCurrentUserOutfits(profileUserObject.uuid);


    //get the outfit list instance container
    var res = '';
    var outfitList = document.getElementsByClassName('outfit_list')[0];
    var temp_i = 0; // variable to add i to counter


    // on the intial load of the page userOutfits array will be populated if any
    if (userOutfits.length == 0) {

      outfitList.innerHTML = `<div style="margin-top:90px;" class="noDisplayOutfits ">
                      <p>No Outfits to Display</p>
                    </div>`
      return;
    }else{

      for (var i = 0; i < userOutfits.length; i++) {
        options = {
         "lastInstance": i + 1 ==  Math.min(infiniteLoadBurst.currentUserOutfits + infiniteLoadCounter.currentUserOutfits, userOutfits.length) ?
            true : false}
        res += createOutfitListInstance(userOutfits[i], options);
        temp_i = i;
      }

    // dynamic html of outfitlist


    // create the html for outfit instances

    // populate list

    if (infiniteLoadCounter.currentUserOutfits == 0) {
      outfitList.innerHTML = res;
    } else{
      var lastElm = outfitList.getElementsByClassName('lastInstance')[0];
      if (lastElm) {
        lastElm.classList.remove('lastInstance');
      }
      outfitList.innerHTML  +=  res;

    }

    infiniteLoadCounter.currentUserOutfits = (temp_i + 1)

    if (!userOutfitEventListener_1.includes("lastInViewcurrentUserOutfit")){
      userOutfitEventListener_1.push("lastInViewcurrentUserOutfit")

      outfitList.addEventListener("scroll", function lastInViewcurrentUserOutfit(e) {
        // console.log('load more list page',e)
        lastItemVisibe(e, 'outfit_list', 'lastInstance');

      });

    }

    //add the evet listener to outfit instances
    var outInstance = document.getElementsByClassName('outfitInstance');
    for (var i = 0; i < outInstance.length; i++) {

      if ( !userOutfitEventListener.includes(outInstance[i])){
        userOutfitEventListener.push(  outInstance[i]);
        outInstance[i].addEventListener("click", editOutfitDetails);
        }
    }

    infiniteFlag.currentUserOutfits = true; // the rendering is on a debounce when this is true another render can be triggered

        }

  }

  function saveOutfitMenu(e) {

    if (uniqueUserId == "") {
      var options = {
        "fadeOut": true,
        "fadeOutTime": 3000
      }
      banner_up("<b>Sign In</b> to save item to outfit!", "white",options);
      return;
    }
    // save clicked element for reset
    saveOutfitMenuEVal = e
    //dislplay main outfit list
    document.getElementsByClassName('save_outfit_modal_main_outfit_list')[0].style.display = "block";
    document.getElementsByClassName("add_to_outfit_modal_title")[0].style.display = "block";
    document.getElementsByClassName('save_outfit_modal_list_outfitInstance')[0].classList.add("hideSignIn")


    // get article clicked on by id save to global var
    articleClicked = e.target.closest('.save_outfit_button').getAttribute("imageListId");

    var filtered = imagesList.filter(
      function(e) {
        return e["id"] == articleClicked;
      });

    // shorten more for mobile experience
    // shorten the string so id does not overflow
    var desc = filtered[0].desc;
    if (desc > 30) {
      desc = desc.slice(0, 30) + "...";
    }

    document.getElementsByClassName('outFit_article_desc')[0].innerHTML = "<b> Item: </b>" + desc

    // open modal
    openSaveOutfitShop();

    saveOutfitMenuScroll();


    // add evnt listner to create button
    var createOutfitBut = document.getElementsByClassName('createOutfitButton')[0].addEventListener("click", editOutfitDetails)


  }

  function setUpsaveOutfit() {
    var carousel = document.getElementsByClassName('save_outfit_button');
    for (var i = 0; i < carousel.length; i++) {
      carousel[i].addEventListener("click", saveOutfitMenu)
    }

    var clos_s = document.getElementsByClassName('banner_x_saveOutfit')[0];
    clos_s.addEventListener("click", closeSaveOutfitShop)

  }


  //----------------------------------------
  //----------------------------------------
  // Set Up Go To Profile page
  var profilePageOutfitModalUp = false;
  var profilePageLikesUp = false;
  var profilePageEditProfileUp = false;
  var profileNotifcationsUp = false;
  var profileFollowersFollowingUp = false;
  var profileUserUUID;



  var localDevCountOutfit = 6
  function serverGetUserOutfits(userId) {

    // manpiulate global variable   profilePageUserOutfits
    for (var i = 0; i < 4; i++) {
      imagesList.push(generateRandomDataStructureImage(imagesList));
    }
    for (var i = 0; i < infiniteLoadBurst.profilePageOutfit; i++) {
      createdProfileOutfit = generateDataStructureOutfit(profilePageUserOutfits, imagesList)
      if (createdProfileOutfit.type == "outfit"){
        profilePageUserOutfits.push(createdProfileOutfit)
      }

    }

    localDevCountOutfit -= 1
    if (localDevCountOutfit == 0) {
      infiniteFlag.profilePageOutfitLoadMore = false;
    }
  }

  var localDevCountUserOutfit = 6
  function serverGetCurrentUserOutfits(userId) {

    // manpiulate global variable
    for (var i = 0; i < 4; i++) {
      imagesList.push(generateRandomDataStructureImage(imagesList));
    }
    for (var i = 0; i < infiniteLoadBurst.currentUserOutfits; i++) {
      var created_outfit = generateDataStructureOutfit(userOutfits, imagesList)
      if (created_outfit.type == "outfit"){
        userOutfits.push(created_outfit)
      }

    }
    console.log(userOutfits)

    userOutfits.sort((a, b) => (a.lastAccessed < b.lastAccessed) ? 1 : -1);


    localDevCountOutfit -= 1
    if (localDevCountOutfit == 0) {
      infiniteFlag.currentUserOutfitsLoadMore = false;
    }
  }

  function serverGetUserObject(userUUID) {

  }

  var localDevCountNotification = 6
  function serverGetUserNotifications(userId) {
    // manipulate global variable

    // get notification in the last 24 hours and time since seen is less than 24 hours
    console.log("notification server before",printObj(userNotifications))
    for (var i = 0; i < infiniteLoadBurst.profilePageNotification; i++) {
      userNotifications.push(generateRandomDataStructureNotification())
    }
    console.log("notification server after",printObj(userNotifications))


    localDevCountNotification -= 1

    if (localDevCountNotification == 0) {
      infiniteFlag.profilePageNotificationLoadMore = false;
    }

  }

  var localDevCountLike = 6
  function serverGetUserLikes(userId) {
    // manpiulate global variable  profilePageLikesDataStruct
    // manipulate imagesList to put id's of articles in the list if not already there
    for (var i = 0; i < 4; i++) {
      imagesList.push(generateRandomDataStructureImage(imagesList));
    }
    for (var i = 0; i < infiniteLoadBurst.profilePageLike; i++) {
      profilePageLikesDataStruct.push(generateRandomDataStructureLike(imagesList, profilePageLikesDataStruct))
    }

    localDevCountLike -= 1
    if (localDevCountLike == 0) {
      infiniteFlag.profilePageLikeLoadMore = false;
    }
  }

  function serverUserEditProfile(userId, username, password) {
    // if password == "" don't change password

    //Update User Profile Object
    return true;
  }

  function serverFollowUser(userId) {

  }

  function serverUnFollowUser(userId) {

  }


  var localDevCountFollows = 6
  function serverGetUserFollows(userId) {

    for (var i = 0; i < infiniteLoadBurst.profilePageFollows; i++) {
      profileUserObject.followings_.push(generateRandomDataStructureFollows())
    }

    localDevCountFollows -= 1
    if (localDevCountFollows == 0) {
      infiniteFlag.profilePageFollowsLoadMore = false;
    }
  }


  var localDevCountFollowers = 6
  function serverGetUserFollowers(userId) {

    for (var i = 0; i < infiniteLoadBurst.profilePageFollowers; i++) {
      profileUserObject.followers_.push(generateRandomDataStructureFollowers())
    }

    localDevCountFollowers -= 1
    if (localDevCountFollowers == 0) {
      infiniteFlag.profilePageFollowersLoadMore = false;
    }
  }


  function currentUserisfollowing(profileUUID) {
    // uuid of the pfile page currently clicked
    return true;
  }

  function removeEditProfile() {
    if (profilePageEditProfileUp) {
      profilePageEditProfileUp = false;
      document.getElementsByClassName('signUpTitle')[0].innerHTML = "Sign Up";
      document.getElementsByClassName('signUpBirth')[0].style.display = "block";
      document.getElementsByClassName('signUpGender')[0].style.display = "block";
      document.getElementsByClassName('signUpGenderAgreement')[0].style.display = "block";
      try {
        document.getElementsByClassName('signup__tag')[0].removeEventListener("click", profilePageEditProfile)
      } catch (e) {};
      document.getElementsByClassName('signup__tag')[0].addEventListener("click", signUpUser);
      document.getElementsByClassName('saveEdit')[0].innerHTML = "Sign Up";
      document.getElementById('signUpBio').parentNode.style.display = "none";

    }
  }


  function profilePageEditProfile() {
    console.log("Edit Profile ")
    // animate button
    var newItem = createSpinner();
    var signInButt = document.getElementsByClassName('signup__tag')[0];
    var signInButton = signInButt.cloneNode(true);
    signInButt.parentNode.replaceChild(newItem, signInButt);

    // ensure input feild is email ChatGPT
    var userSignUpName = document.getElementById('signUpUserName').value;
    var userPassword = document.getElementById("signUpPassword").value;
    var userPasswordConfirm = document.getElementById("signUpPasswordConfirm").value;

    var userLinks = document.getElementById('signUpBio').value;

    if (checkForMaliciousPayloads(userLinks))

      if (!uniqueUsername(userSignUpName)) {
        banner_up("The username you entered is not available.", "red")
        newItem.parentNode.replaceChild(signInButton, newItem);
        // reinitialize event listener
        var signInButton = document.getElementsByClassName('saveEdit')[0];
        signInButton.addEventListener("click", profilePageEditProfile);
        return;
      }

    //error with password
    if (!(userPassword == userPasswordConfirm)) {
      banner_up("The password you entered does not match.", "red")

      newItem.parentNode.replaceChild(signInButton, newItem);
      // reinitialize event listener
      var signInButton = document.getElementsByClassName('saveEdit')[0];
      signInButton.addEventListener("click", profilePageEditProfile);
      return;
    }

    // You can do this by running the email through a function that checks for malicious payloads
    if (checkForMaliciousPayloads(userPassword)) {
      // If the function returns true, it means that there is a malicious payload present
      // You can then alert the user or display an error message
      console.log("The email OR password you entered contains a malicious payload.");
      return;
    } else {
      var userId = profileUserObject.uuid;
      // If the function returns false, it means that the email is safe
      // You can proceed with the login process
      if (serverUserEditProfile(userId, userSignUpName, userPassword)) {
        // Login succesful
        newItem.parentNode.replaceChild(signInButton, newItem);
        // reinitialize event listener
        var signInButton = document.getElementsByClassName('saveEdit')[0];
        signInButton.addEventListener("click", profilePageEditProfile);


        closeSignUp();
        banner_up(`Edit Profile Success ${userSignUpName}!`, "green");

        document.getElementsByClassName('profilePageUserImg')[0].innerHTML = checkFirstCharNumber(profileUserObject.username)
        // add Letter to the img place holder
        document.getElementsByClassName('profilePageUserName')[0].innerHTML = profileUserObject.username;


      } else {
        // unsucessful login
        banner_up("Edit Unsucessful", "red")

        newItem.parentNode.replaceChild(signInButton, newItem);
        // reinitialize event listener
        var signInButton = document.getElementsByClassName('saveEdit')[0];
        signInButton.addEventListener("click", profilePageEditProfile);
      }
    }

  }


  function profilePageEditProfileOpen() {

    signUpUp();
    // hijack the signUP function then on close we will reverse modification based on the boolean
    profilePageEditProfileUp = true;
    document.getElementsByClassName('signUpTitle')[0].innerHTML = "Edit Profile";
    document.getElementsByClassName('emailSignUp')[0].style.display = "none";
    // document.getElementsByClassName('signUpBirth')[0].style.display = "none";
    // document.getElementsByClassName('signUpGender')[0].style.display = "none";
    // document.getElementsByClassName('signUpGenderAgreement')[0].style.display = "none";
    try {
      document.getElementsByClassName('signup__tag')[0].removeEventListener("click", signUpUser)
    } catch (e) {};
    document.getElementsByClassName('signup__tag')[0].addEventListener("click", profilePageEditProfile);
    document.getElementsByClassName('saveEdit')[0].innerHTML = "Save";
    document.getElementById('signUpBio').parentNode.style.display = "block";
    document.getElementById('signUpBio').value = profileUserObject.link

  }

  function followUser() {

    if (uniqueUserId == "") {
      var options = {
        "fadeOut": true,
        "fadeOutTime": 3000
      }
      banner_up("Sign In to follow!", "black",options);
      return
    }

    console.log("followUser")
    var button = document.getElementsByClassName('profilePageFollowEditProfile')[0];

    try {
      button.removeEventListener("click", followUser)
    } catch (e) {}
    try {
      button.removeEventListener("click", editProfile)
    } catch (e) {}

    button.innerHTML = "<p>Unfollow</p>"
    serverFollowUser(profileUserUUID);
    button.addEventListener("click", unfollowUser)
  }

  function unfollowUser() {

    console.log("unfollowUser")
    var button = document.getElementsByClassName('profilePageFollowEditProfile')[0];
    try {
      button.removeEventListener("click", unfollowUser)
    } catch (e) {}
    try {
      button.removeEventListener("click", editProfile)
    } catch (e) {}

    button.innerHTML = "<p>Follow</p>"
    serverUnFollowUser(profileUserUUID);
    button.addEventListener("click", followUser)
  }
  var profilePageOutfitScrollEventListener = []
  function profilePageOutfitScroll() {
    if (infiniteFlag.profilePageOutfitLoadMore == false){
      return
    }


    // get profilePage user Outfits
    serverGetUserOutfits(profileUserObject.uuid)
    // if user has no outfits do not list anything
    var res = '';
    var profileOutfitList = document.getElementsByClassName('profilePage-outfit-article-List')[0]
    var temp_i = 0; // variable to add i to counter

    if (profilePageUserOutfits.length == 0) {
      res = ` <div style="margin-bottom: 9vh;" class="hrs"></div> ${profileUserObject.username} has no outfit`;
      document.getElementsByClassName('profilePage-outfit-article-List')[0].innerHTML = res;

    } else {
      // list the userOutfits

      var options  = {};
      for (var i = infiniteLoadCounter.profilePageOutfit; i <  Math.min(infiniteLoadBurst.profilePageOutfit + infiniteLoadCounter.profilePageOutfit, profilePageUserOutfits.length); i++) {
        options = {
         "profileOutfits": true,
         "lastCarousel": i + 1 ==  Math.min(infiniteLoadBurst.profilePageOutfit + infiniteLoadCounter.profilePageOutfit, profilePageUserOutfits.length) ?
            true : false}
        res += createCarousel(profilePageUserOutfits[i], imagesList, i, options);
        temp_i = i;
      }



      if (infiniteLoadCounter.profilePageOutfit == 0) {
        profileOutfitList.innerHTML = res;
      } else{
        var lastElm = profileOutfitList.getElementsByClassName('lastCarousel')[0];
        if (lastElm) {
          lastElm.classList.remove('lastCarousel');
        }
        profileOutfitList.innerHTML += res ;

      }

      infiniteLoadCounter.profilePageOutfit = (temp_i + 1)

      if (!profilePageOutfitScrollEventListener.includes("lastInViewProfOutfit")){
        profilePageOutfitScrollEventListener.push("lastInViewProfOutfit")

        profileOutfitList.addEventListener("scroll", function lastInViewProfOutfit(e) {
          // console.log('load more list page',e)
          lastItemVisibe(e, 'profilePage-outfit-article-List', 'lastCarousel');

        });

      }

      runCarousel();
      setUpLike();
      setUpDislike();
      setUpGotoShop();
      setUpCarouselDescr();
      setUpsaveOutfit();
      console.trace()


      infiniteFlag.profilePageOutfit = true; // the rendering is on a debounce when this is true another render can be triggered

  }

}

  function profilePageOpenOutfit() {

    console.trace()

    requestAnimationFrame(() => {
    serverLoading()
  },  { leading: true, trailing: false } )



  requestAnimationFrame(() => {
    var signElm = document.getElementsByClassName('profilePageOutfitModal')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      profilePageOutfitModalUp = true;
    }, "50");

},{delay:0, leading: true, trailing: false } )
    // open modal


    // close on click x
    var clos_s = document.getElementsByClassName('banner_x_profilePageOutfit')[0];
    clos_s.addEventListener("click", closeProfileOutfitModal)

    profilePageOutfitScroll()



  }

  function closeProfileOutfitModal() {
    var sign_elm = document.getElementsByClassName('profilePageOutfitModal')[0];
    sign_elm.classList.add("hideSignIn");
    profilePageOutfitModalUp = false;
    close_banner();
  }


  function loadProfileLikesScroll() {

    if (infiniteFlag.profilePageLikeLoadMore == false){
      return
    }
    // get profilePage user Outfits
    serverGetUserLikes(profileUserObject.uuid);
    // if user has no outfits do not list anything
    var res = '';
    var profileLikeList = document.getElementsByClassName('profilePage-like-article-List')[0]
    var temp_i = 0; // variable to add i to counter

    if ( profilePageLikesDataStruct.length == 0) {
      res = ` <div style="margin-bottom: 9vh;" class="hrs"></div> ${profileUserObject.username} has no outfit`;
      document.getElementsByClassName('profilePage-like-article-List')[0].innerHTML = res;

    } else {
      var options  = {};

      for (var i = infiniteLoadCounter.profilePageLike; i < Math.min(infiniteLoadBurst.profilePageLike + infiniteLoadCounter.profilePageLike, profilePageLikesDataStruct.length); i++) {
         options = {
          "profileOutfits": true,
          "lastCarousel": i + 1 == Math.min(infiniteLoadBurst.profilePageLike + infiniteLoadCounter.profilePageLike, profilePageLikesDataStruct.length) ?
             true : false}
        res += createCarousel(profilePageLikesDataStruct[i], imagesList, i, options);
        temp_i = i
      }



      if (infiniteLoadCounter.profilePageLike == 0) {
        profileLikeList.innerHTML = res;
      } else{
        var lastElm = profileLikeList.getElementsByClassName('lastCarousel')[0];
        if (lastElm) {
          lastElm.classList.remove('lastCarousel');
        }
        profileLikeList.innerHTML += res ;
      }
      infiniteLoadCounter.profilePageLike = (temp_i + 1)

      profileLikeList.addEventListener("scroll", function lastInViewProfLike(e) {
        // console.log('load more list page',e)
        lastItemVisibe(e, 'profilePage-like-article-List', 'lastCarousel');
      });



      runCarousel();
      setUpLike();
      setUpDislike();
      setUpGotoShop();
      setUpCarouselDescr();
      setUpsaveOutfit();

      infiniteFlag.profilePageLike = true; // the rendering is on a debounce when this is true another render can be triggered


  }

}

  function profilePageOpenLikes() {

    requestAnimationFrame(() => {
    serverLoading()
  },  { leading: true, trailing: false } )
    // open modal
    var signElm = document.getElementsByClassName('profilePageLikesModal')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      profilePageLikesUp = true;
    }, "50");
    requestAnimationFrame(() => {
    serverLoading()
  } )



    // close on click x
    var clos_s = document.getElementsByClassName('banner_x_profilePageLikes')[0];
    clos_s.addEventListener("click", closeProfilePageLikes)

     loadProfileLikesScroll();

    }


  function closeProfilePageLikes() {
    var sign_elm = document.getElementsByClassName('profilePageLikesModal')[0];
    sign_elm.classList.add("hideSignIn");
    profilePageLikesUp = false;
    close_banner();
  }

  function profilePageLinkUserAccount(e) {

    var clickedElm = e.target.closest('.notificationInst');
    if (clickedElm == null) {
      clickedElm = e.target.closest('.userProfileInst');
    }

    var profileId = xorString(decodeURIComponent(clickedElm.getAttribute("profilePageOwner")), false);
    console.log(profileId);
    if (clickedElm.getAttribute("hyperlink") == 't') {
      window.location.href = `./index.html?page=profilePage&o=${clickedElm.getAttribute("profilePageOwner")}`

    }

  }


  function loadNotificationsScroll() {
    if (infiniteFlag.profilePageNotificationLoadMore == false){
      return
    }

    serverGetUserNotifications(profileUserObject.uuid);

    // populate Notifications
    var res = '';
    var notificationList = document.getElementsByClassName('profilePage-notification-List')[0]
    var temp_i = 0; // variable to add i to counter

    if (userNotifications.length == 0) {
      res = ` <div style="margin-bottom: 9vh;" class="hrs"></div> ${profileUserObject.username} has no outfit`;
      document.getElementsByClassName('profilePage-notification-List')[0].innerHTML = res;

    } else {
      // list the user notifications
      var options  = {};



      console.table("about to populate userNotifications",printObj(userNotifications))
      for (var i = infiniteLoadCounter.profilePageNotification; i < Math.min(infiniteLoadBurst.profilePageNotification + infiniteLoadCounter.profilePageNotification, userNotifications.length); i++) {

        options = {
         "lastInstance": i + 1 == Math.min(infiniteLoadBurst.profilePageNotification + infiniteLoadCounter.profilePageNotification, userNotifications.length) ?
            true : false}

        res += createNotifications(userNotifications[i],options);
        temp_i = i
      }


      if (infiniteLoadCounter.profilePageNotification == 0) {
        notificationList.innerHTML = res;
      } else{
        var lastElm = notificationList.getElementsByClassName('lastInstance')[0];
        if (lastElm) {
          lastElm.classList.remove('lastInstance');
        }
        notificationList.innerHTML += res ;
      }
      infiniteLoadCounter.profilePageNotification = (temp_i + 1)

      notificationList.addEventListener("scroll", function lastInViewNotification(e) {
        // console.log('load more list page',e)
        lastItemVisibe(e, 'profilePage-notification-List', 'lastInstance');
      });



      // add hyperlink to user profile
      for (var i = 0; i < document.getElementsByClassName('notificationInst').length; i++) {
        document.getElementsByClassName('notificationInst')[i].addEventListener("click", profilePageLinkUserAccount)
      }

      infiniteFlag.profilePageNotification = true; // the rendering is on a debounce when this is true another render can be triggered


    }
  }

  // Notifications
  function profilePageOpenNotifications() {

    requestAnimationFrame(() => {
    serverLoading()
  },  { leading: true, trailing: false } )
    // get profilePage user Outfits

    // open modal
    var signElm = document.getElementsByClassName('profilePageNotificationsModal')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      profileNotifcationsUp = true;
    }, "50");

    // close on click x
    var clos_s = document.getElementsByClassName('banner_x_profilePageNotifications')[0];
    clos_s.addEventListener("click", closeProfilePageNotificationsModal)

    loadNotificationsScroll();

  }

  function closeProfilePageNotificationsModal() {
    var sign_elm = document.getElementsByClassName('profilePageNotificationsModal')[0];
    sign_elm.classList.add("hideSignIn");
    profileNotifcationsUp = false;
    close_banner();

    for (var i = 0; i < userNotifications.length; i++) {
      userNotifications[i].seen = true;
    }
    console.log("close userNotifications",userNotifications)

    document.getElementsByClassName('notification_alert')[0].style.visibility = "hidden";

  }

  var loadProfileFollowingScrollEventListener = [];

  function lastInViewProfFollows(e) {
    // console.log('load more list page',e)
    lastItemVisibe(e, 'profilePage-followingfollowers-List', 'lastInstance');
  }

  function loadProfileFollowingScroll() {

    if (infiniteFlag.profilePageFollowsLoadMore == false){
      return
    }

    serverGetUserFollows(profileUserObject.uuid);


    // populate Following Followers
    var res = '';
    var profileFollowList = document.getElementsByClassName('profilePage-followingfollowers-List')[0]
    var temp_i = 0; // variable to add i to counter

    var users = profileUserObject.followings_;
      var message  = "No Follows"
    if (users.length == 0) {
      res = ` <div style="margin-bottom: 9vh;" class="hrs"></div> ${message}`;
      profileFollowList.innerHTML = res;

    } else {
      var options  = {};
      for (var i = infiniteLoadCounter.profilePageFollows; i < Math.min(infiniteLoadBurst.profilePageFollows + infiniteLoadCounter.profilePageFollows, users.length); i++) {

        options = {
         "lastInstance": i + 1 == Math.min(infiniteLoadBurst.profilePageFollows + infiniteLoadCounter.profilePageFollows, users.length) ?
            true : false}

        res += createUserListInst(users[i],options);
        temp_i = i
      }


      if (infiniteLoadCounter.profilePageFollows == 0) {
        profileFollowList.innerHTML = res;
      } else{
        var lastElm = profileFollowList.getElementsByClassName('lastInstance')[0];
        if (lastElm) {
          lastElm.classList.remove('lastInstance');
        }
        profileFollowList.innerHTML += res ;
      }
      infiniteLoadCounter.profilePageFollows = (temp_i + 1)
      // keeping track of which eventlistener is currently attached to the function
      // only add event listener if there is not alreay an event listener in the list
      if (!loadProfileFollowingScrollEventListener.includes("lastInViewProfFollows")) {

        if(loadProfileFollowingScrollEventListener.includes("lastInViewProfFollowers")){
          console.log(loadProfileFollowingScrollEventListener)
          profileFollowList.removeEventListener('scroll', lastInViewProfFollowers);
                        // Find the index of the string you want to remove
              let index = loadProfileFollowingScrollEventListener.indexOf('lastInViewProfFollowers');

              // Use the splice() method to remove the string at the specified index
              if (index !== -1) {
                loadProfileFollowingScrollEventListener.splice(index, 1);
              }

        }

        loadProfileFollowingScrollEventListener.push("lastInViewProfFollows")

      profileFollowList.addEventListener("scroll",lastInViewProfFollows );

  }

      // add hyperlink to user profile
      for (var i = 0; i < document.getElementsByClassName('userProfileInst').length; i++) {
        document.getElementsByClassName('userProfileInst')[i].addEventListener("click", profilePageLinkUserAccount)
      }
      infiniteFlag.profilePageFollows = true; // the rendering is on a debounce when this is true another render can be triggered

    }

    followsHTML =  profileFollowList.innerHTML

  }


  function lastInViewProfFollowers(e) {
   // console.log('load more list page',e)
   lastItemVisibe(e, 'followersfollowing', 'lastInstance');
 }

  function loadProfileFollowersScroll() {

    if (infiniteFlag.profilePageFollowersLoadMore == false){
      return
    }

    serverGetUserFollowers(profileUserObject.uuid);

    // populate Following Followers
    var res = '';
    var profileFollowerList = document.getElementsByClassName('profilePage-followingfollowers-List')[0]
    var temp_i = 0; // variable to add i to counter

    var users = profileUserObject.followers_;
    var message  = "No Followers"
    if (users.length == 0) {
      res = ` <div style="margin-bottom: 9vh;" class="hrs"></div> ${message}`;
      document.getElementsByClassName('profilePage-followingfollowers-List')[0].innerHTML = res;

    } else {
      var options  = {};
      for (var i = infiniteLoadCounter.profilePageFollowers; i < Math.min(infiniteLoadBurst.profilePageFollowers + infiniteLoadCounter.profilePageFollowers, users.length); i++) {

        options = {
         "lastInstance": i + 1 == Math.min(infiniteLoadBurst.profilePageFollowers + infiniteLoadCounter.profilePageFollowers, users.length) ?
            true : false}

        res += createUserListInst(users[i],options);
        temp_i = i
      }

      if (infiniteLoadCounter.profilePageFollowers == 0) {
        profileFollowerList.innerHTML = res;
      } else{
        var lastElm = profileFollowerList.getElementsByClassName('lastInstance')[0];
        if (lastElm) {
          lastElm.classList.remove('lastInstance');
        }
        profileFollowerList.innerHTML += res ;
      }

      infiniteLoadCounter.profilePageFollowers = (temp_i + 1)



      if (!loadProfileFollowingScrollEventListener.includes("lastInViewProfFollowers")) {
        console.trace()
        if(loadProfileFollowingScrollEventListener.includes("lastInViewProfFollows")){
          console.log(loadProfileFollowingScrollEventListener)
          profileFollowerList.removeEventListener('scroll', lastInViewProfFollows);
                        // Find the index of the string you want to remove
              let index = loadProfileFollowingScrollEventListener.indexOf('lastInViewProfFollows');

              // Use the splice() method to remove the string at the specified index
              if (index !== -1) {
                loadProfileFollowingScrollEventListener.splice(index, 1);
              }

        }

        loadProfileFollowingScrollEventListener.push("lastInViewProfFollowers")

        profileFollowerList.addEventListener("scroll",lastInViewProfFollowers);

    }


      // add hyperlink to user profile
      for (var i = 0; i < document.getElementsByClassName('userProfileInst').length; i++) {
        document.getElementsByClassName('userProfileInst')[i].addEventListener("click", profilePageLinkUserAccount)
      }
      infiniteFlag.profilePageFollowers = true; // the rendering is on a debounce when this is true another render can be triggered

    }

    followersHTML =profileFollowerList.innerHTML

  }
  // Purpose: To save the privious state of the div before it is overwritten
  // This needs to be reset when the profile page is reset
  var followsHTML = ""
  var followersHTML = ""
  // Following Followers
  function profilePageOpenFollowersFollowing(e) {
    // which element was clicked followers or following?
    if (e.target.closest('.profilePageFollowing')) {
      document.getElementsByClassName('FollowersFollowingHeading')[0].innerHTML = "Following";
      var users = profileUserObject.followings_;
      var message = `No Followings`;

    } else {
      document.getElementsByClassName('FollowersFollowingHeading')[0].innerHTML = "Followers";
      var users = profileUserObject.followers_;
      var message = 'No Followers';
    }
    // open modal
    var signElm = document.getElementsByClassName('profilePageFollowersFollowingModal')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      profileFollowersFollowingUp = true;
    }, "50");


    // close on click x
    var clos_s = document.getElementsByClassName('banner_x_profilePageFollowersFollowing')[0];
    clos_s.addEventListener("click", closeProfilePageFollowersFollowing)

      if (e.target.closest('.profilePageFollowing')) {

        document.getElementsByClassName('profilePage-followingfollowers-List')[0].innerHTML = followsHTML
    loadProfileFollowingScroll()
  }else{
    document.getElementsByClassName('profilePage-followingfollowers-List')[0].innerHTML = followersHTML
    loadProfileFollowersScroll()
  }

  }


  function closeProfilePageFollowersFollowing() {
    var sign_elm = document.getElementsByClassName('profilePageFollowersFollowingModal')[0];
    sign_elm.classList.add("hideSignIn");
    profileFollowersFollowingUp = false;
    close_banner();
  }

  function profilePageSignOut() {

    closeConfModal();
    uniqueUserId = "";
    localStorage.setItem("phost_login", "false");
    localStorage.setItem("phost_useruuid", "")
    window.location.href = "./index.html";
    profileUserObject = {}

    return;
  }

  function hideProfilePage() {
    profilePage = false;
    document.getElementsByClassName('profilePage')[0].style.display = "none";

  }

  function profilePageSetup() {

    document.getElementsByClassName('profilePageOutfit')[0].addEventListener("click", profilePageOpenOutfit);
    document.getElementsByClassName('profilePageLikes')[0].addEventListener("click", profilePageOpenLikes);
    // document.getElementsByClassName('profilePageAffliate')[0].addEventListener("click",profilePageOpenAffiliate);
    document.getElementsByClassName('profilePageNotifications')[0].addEventListener("click", profilePageOpenNotifications);
    document.getElementsByClassName('profilePageFollowing')[0].addEventListener("click", profilePageOpenFollowersFollowing);
    document.getElementsByClassName('profilePageFollowers')[0].addEventListener("click", profilePageOpenFollowersFollowing);
    //  follow, unfollow, edit profile  in profilePageDisplay
  }

  function profilePageDisplay(e) {

    //get the url where the persons uuid endoded will be there
    // Get the current page URL
    var currentUrl = window.location.href;

    // Check if the URL contains a query parameter "o"
    if (currentUrl.indexOf("o=") != -1) {
      // Get the value of the "o" query parameter
      profileUserUUID = xorString(decodeURIComponent(currentUrl.split("o=")[1].split("&")[0]), false)
      console.log(profileUserUUID, "decodeurl");
    } else {
      console.log("o parameter not present in the url");
    }


    // or get the event which caused us to be on the profilePage
    if (e != null && e.target != null) {

      if (e.target.closest('.profil_pic_offset')) {

        console.log("profile pic ")
        e.target.closest('.profil_pic_offset')
        var clickedElm = e.target.closest('.profil_pic_offset');
        profileUserUUID = xorString(decodeURIComponent(clickedElm.getAttribute("profilePageOwner")), false);
        // profileUserUUID = "";
        console.log(clickedElm.getAttribute("profilePageOwner"))
        console.log(profileUserUUID)

      }


      if (e.target.closest('.profile_page_button') != null) {

        console.log("profile button ")

        var clickedElm = e.target.closest('.profile_page_button');
        profileUserUUID = xorString(decodeURIComponent(clickedElm.getAttribute("profilePageOwner")), false);
        // profileUserUUID = "";
        console.log(clickedElm.getAttribute("profilePageOwner"))
        console.log(profileUserUUID)

      }


    }

    //

    //Server get profile user object store result in global variable for future reference
    serverGetUserObject(profileUserUUID);

    document.getElementsByClassName('profilePageUserImg')[0].innerHTML = checkFirstCharNumber(profileUserObject.username)
    // add Letter to the img place holder
    document.getElementsByClassName('profilePageUserName')[0].innerHTML = profileUserObject.username;

    // display following
    document.getElementsByClassName('profilePageFollowing')[0].innerHTML = `  <p>Following: <b>${profileUserObject.following}</b> </p>`

    // display followers
    document.getElementsByClassName('profilePageFollowers')[0].innerHTML = `  <p>Followers: <b>${profileUserObject.followers}</b> </p>`

    //display Links
    document.getElementsByClassName('profilePageLink')[0].innerHTML = ` <a target="_blank"  rel="noopener noreferrer" href="${profileUserObject.link}">${profileUserObject.link}</a>` //
    // set up action depending on if this is the current user's page

    console.log(profileUserUUID, uniqueUserId, "profilepage")
    if (uniqueUserId == profileUserUUID) {
      document.getElementsByClassName('profilePageFollowEditProfile')[0].innerHTML = "Edit Profile";

      // display noftifications
      document.getElementsByClassName('profilePageNotifications')[0].style.display = "block";

      //serverGetUserNotifications(profileUserObject.uuid);
      loadNotificationsScroll();
      //  display notification count
      var unseen_notification_count = 0;
      for (var i = 0; i < userNotifications.length; i++) {
        if (userNotifications[i].seen == false){
          unseen_notification_count += 1
          document.getElementsByClassName('notification_alert')[0].style.visibility = "visible";
        }
      }
      document.getElementsByClassName('notification_alert')[0].getElementsByTagName("p")[0].innerHTML = `${unseen_notification_count}`



      document.getElementsByClassName('profilePageFollowEditProfile')[0].addEventListener("click", profilePageEditProfileOpen);

      // display signout
      document.getElementsByClassName('signOut')[0].style.display = "block";
      if (!eventListenersExist.includes(document.getElementsByClassName('signOut')[0])) {
        eventListenersExist.push(document.getElementsByClassName('signOut')[0]);

        document.getElementsByClassName('signOut')[0].addEventListener("click", function functionName() {
          openConfModal(profilePageSignOut, closeConfModal, "Sign Out?", "")
        })
      }


    } else {
      // hid notifications
      document.getElementsByClassName('profilePageNotifications')[0].style.display = "none";
      document.getElementsByClassName('signOut')[0].style.display = "none";
      if (currentUserisfollowing(profileUserUUID)) {
        document.getElementsByClassName('profilePageFollowEditProfile')[0].innerHTML = "<p>Follow</p>";
        document.getElementsByClassName('profilePageFollowEditProfile')[0].addEventListener("click", followUser);


      } else {
        document.getElementsByClassName('profilePageFollowEditProfile')[0].innerHTML = " <p>Unfollow</p>";

        document.getElementsByClassName('profilePageFollowEditProfile')[0].addEventListener("click", unfollowUser);

      }

    }

    profilePageSetup();


    hideListPage();
    profilePage = true;
    // The data parameter can be any JavaScript object
    var data = {
      name: "profile"
    };

    // The title parameter is the title of the new state
    var title = "Profile Page";

    // The url parameter is the new URL to be set as the current URL
    // Get the current URL
    var currentUrl = window.location.href;

    // Check if there is a '?' in the URL, indicating the presence of query parameters
    if (currentUrl.indexOf("?") != -1) {
      // Split the URL at the '?' to remove the query parameters
      var urlWithoutQuery = currentUrl.split("?")[0];
      console.log(urlWithoutQuery);
      var url = urlWithoutQuery + `?page=profilePage&o=${xorString(profileUserObject.uuid,true)}`;
    } else {
      var url = window.location.href + `?page=profilePage&o=${xorString(profileUserObject.uuid,true)}`;
    }


    // Use the replaceState() method to modify the current history entry
    window.history.pushState(data, title, url);

    document.getElementsByClassName('profilePage')[0].style.display = "block"

    // determine if user selected is current user or not
    document.getElementById('documentbody').style.cssText = "font-family: Arial, Helvetica, sans-serif; display: block;overflow-x:hidden;"

  }

  function setUpProfilePage() {
    var userProfileElm = document.getElementsByClassName('profil_pic_offset')
    for (var i = 0; i < userProfileElm.length; i++) {
      userProfileElm[i].addEventListener("click", profilePageDisplay)
    }
  }

  // outfits with no user will be assigned to Phostrino

  // when pulling images from the server ensure we don't already have it locally

  // Search should have clothing companay name as key words

  // set filter for notification seen vs unseen, add time field on backend for filter


  // Store items by name in database by apperal name (dress, shirt) and only collect items from site which have the apperal name, infact when we search a site on a name all clothes displayed should fall under that title, so even if the description does not have it we can put it there

  // remove exxcess event lister calls

  // embedded search retrival, hash string to number
  // add sylist feild to image, random generation functions

  // add list of stylist to company list, change the name of company list any thing custom will be stored there
  //Adding to outfit we should highlight it and fade away the background


  // This code should be a function open modal pass class and variable
  // var signElm = document.getElementsByClassName('profilePageOutfitModal')[0];
  // signElm.classList.remove("hideSignIn");
  // setTimeout(() => {
  //   profilePageOutfitModalUp = true;
  // }, "50");

  // TODO

  // .profilePage-outfit-article-List, .profilePage-like-article-List , .profilePage-followingfollowers-List, .profilePage-notification-List{
  //
  //
  // .outfit-article-List,.outfit_list  {
  //
  //   listPage
  //
  //
  //
  //   counter pointing to last element in datastructure holding list of elements to load
  //
  //
  //   data pull,serveloading , update lists, :imagelist clothingDisplayDataStruct
  //
  //   add new elements to the bottom of the dives from the top of the counter for each respective datastructure list






// sign up should have server loading symbol


// make edit profile and sign out same color





  // Update likes thumb function to like an outfit in outfit mode and like the image, I don't know if we ever like the image so a like on an outfit should propagate the like to all clothes. Actually single items are shown when an article is by itself





  // Go to shop should be click on static anchor, for going to shop create a static anchor tag and dynamically click it

  // shorten the link url in bio, link should open in a new page
  // we should know when someone clicks on a link




  // hyperlink user in notifcation modal, dd username interpolation to th standard notification, user liked item in outfit





  // on infinite load make sure we fill the div to the max on the first bust because scrolling is what does the refresh
      // if count is 0 then burst should be 20
  // add consent modal, could we just replace the div content with the text?
  // consolidate persistent data on user login and logout



  // change view Clothing so it doesn not update ui but records what happens

  // outfit modal
  // -------User image should be SVG of First Letter of Person's name https://www.w3schools.com/html/html5_svg.asp




  // get clothes

  //----------------
  // Set up confirmation Modal
  var confModUp = false;

  function openConfModal(confirmationfuncCallBack, cancelfuncCallBack, title, desc) {
    var signElm = document.getElementsByClassName('confModal')[0];
    signElm.classList.remove("hideSignIn");
    setTimeout(() => {
      confModUp = true;
    }, "50");
    document.getElementsByClassName('confHeading')[0].innerHTML = title;
    document.getElementsByClassName('confDesc')[0].innerHTML = desc;


    document.getElementsByClassName('confCancelB')[0].addEventListener("click", cancelfuncCallBack);
    document.getElementsByClassName('confConfirmB')[0].addEventListener("click", confirmationfuncCallBack);
  }

  function closeConfModal() {

    var sign_elm = document.getElementsByClassName('confModal')[0];

    sign_elm.classList.add("hideSignIn");
    confModUp = false;

  }

  function setUpConfModal() {
    var clos_s = document.getElementsByClassName('banner_x_conf')[0];
    clos_s.addEventListener("click", closeConfModal)
  }

  //---------------------------------------------
  // ---------------------------------------
  var eventListenersExist = [];
  var profileUserObject = {
    "uuid": "chees429",
    "username": "Amanda Decipher",
    "followings_": [`${xorString("chees429",true)} Amanda Decipher`],
    "followers_": [`${xorString("chees429",true)} 6767 Decipher`],
    "following": 110,
    "followers": 230,
    "link": "https://twitter.com"
  }
  var uniqueUserId = "";
  var userName = "";
  var userNotifications = [{
    "uuid": "chees429",
    "profileEventuuid": xorString("chees429", true),
    "event": "user1 liked Outfit: x",
    "eventTime": "unixtimestameseconds ",
    "seen": false,
    "hyperlink": 't'
  }]
  var profilePageLikesDataStruct = [{
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
    }, // this replicates the data in the image instances
  ]
  var profilePageUserOutfits = [{
      "type": "outfit",
      "creator": "Amanda Decipher",
      "uuid": "chees429",
      "outfitId": "241213",
      "items": ["1", "2", "3"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "faLebron James ",
      "tags": ["spring", "winter", "short"],
      "lastAccessed": 189871897,
    },
    {
      "type": "outfit",
      "creator": "Alice Smith",
      "uuid": "abc123",
      "outfitId": "12011",
      "items": ["5", "9", "12"],
      "likeCount": 20,
      "dislikeCount": 30,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": " look",
      "tags": ["summer", "casual"],
      "lastAccessed": 169871897,
    },
    {
      "type": "outfit",
      "creator": "Bob Johnson",
      "uuid": "def456",
      "outfitId": "223212",
      "items": ["7", "11", "16"],
      "likeCount": 25,
      "dislikeCount": 35,
      "userLiked": "false",
      "userDisliked": "true",
      "wishlist": "false",
      "name": "Y H  evening wear",
      "tags": ["evening", "elegant"],
      "lastAccessed": 159871897,
    },
    {
      "type": "outfit",
      "creator": "Charlie Williams",
      "uuid": "ghi789",
      "outfitId": "23",
      "items": ["1", "6", "9"],
      "likeCount": 15,
      "dislikeCount": 45,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "sporty weekend look",
      "tags": ["sporty", "weekend"],
      "lastAccessed": 149871897,
    },
    {
      "type": "outfit",
      "creator": "Amanda Decipher",
      "uuid": "chees429",
      "outfitId": "56",
      "items": ["11", "12", "13"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "fashion",
      "tags": ["spring", "winter", "short"],
      "lastAccessed": 149871897,
    },
    {
      "type": "outfit",
      "creator": "Amanda Decipher",
      "uuid": "chees429",
      "outfitId": "1233213",
      "items": ["1", "2", "3"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "fashion Hands ",
      "tags": ["spring", "winter", "short"],
      "lastAccessed": 189871897,
    },
    {
      "type": "outfit",
      "creator": "Alice Smith",
      "uuid": "abc123",
      "outfitId": "121",
      "items": ["5", "9", "12"],
      "likeCount": 20,
      "dislikeCount": 30,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "casual de la hoya look",
      "tags": ["summer", "casual"],
      "lastAccessed": 169871897,
    },
    {
      "type": "outfit",
      "creator": "Bob Johnson",
      "uuid": "def456",
      "outfitId": "11212",
      "items": ["7", "11", "16"],
      "likeCount": 25,
      "dislikeCount": 35,
      "userLiked": "false",
      "userDisliked": "true",
      "wishlist": "false",
      "name": " really long name which is hard to spell out some thimes ",
      "tags": ["evening", "elegant"],
      "lastAccessed": 159871897,
    },
    {
      "type": "outfit",
      "creator": "Charlie Williams",
      "uuid": "ghi789",
      "outfitId": "23",
      "items": ["1", "6", "9"],
      "likeCount": 15,
      "dislikeCount": 45,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "sporty weekend look",
      "tags": ["sporty", "weekend"],
      "lastAccessed": 149871897,
    },
    {
      "type": "outfit",
      "creator": "Amanda Decipher",
      "uuid": "chees429",
      "outfitId": "5256",
      "items": ["11", "12", "13"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "ANo anl dnklj lsdj",
      "tags": ["spring", "winter", "short"],
      "lastAccessed": 149871897,
    }
  ];

  var userOutfits = [
    {
      "type": "outfit",
      "creator": "Amanda Decipher",
      "uuid": "chees429",
      "outfitId": "241213",
      "items": ["1", "2", "3"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "faLebron James ",
      "tags": ["spring", "winter", "short"],
      "lastAccessed": 189871897,
    },
    {
      "type": "outfit",
      "creator": "Alice Smith",
      "uuid": "abc123",
      "outfitId": "12011",
      "items": ["5", "9", "12"],
      "likeCount": 20,
      "dislikeCount": 30,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": " look",
      "tags": ["summer", "casual"],
      "lastAccessed": 169871897,
    },
    {
      "type": "outfit",
      "creator": "Bob Johnson",
      "uuid": "def456",
      "outfitId": "223212",
      "items": ["7", "11", "16"],
      "likeCount": 25,
      "dislikeCount": 35,
      "userLiked": "false",
      "userDisliked": "true",
      "wishlist": "false",
      "name": "Y H  evening wear",
      "tags": ["evening", "elegant"],
      "lastAccessed": 159871897,
    },
    {
      "type": "outfit",
      "creator": "Charlie Williams",
      "uuid": "ghi789",
      "outfitId": "23",
      "items": ["1", "6", "9"],
      "likeCount": 15,
      "dislikeCount": 45,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "sporty weekend look",
      "tags": ["sporty", "weekend"],
      "lastAccessed": 149871897,
    },
    {
      "type": "outfit",
      "creator": "Amanda Decipher",
      "uuid": "chees429",
      "outfitId": "56",
      "items": ["11", "12", "13"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "fashion",
      "tags": ["spring", "winter", "short"],
      "lastAccessed": 149871897,
    },
    {
      "type": "outfit",
      "creator": "Amanda Decipher",
      "uuid": "chees429",
      "outfitId": "1233213",
      "items": ["1", "2", "3"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "fashion Hands ",
      "tags": ["spring", "winter", "short"],
      "lastAccessed": 189871897,
    },
    {
      "type": "outfit",
      "creator": "Alice Smith",
      "uuid": "abc123",
      "outfitId": "121",
      "items": ["5", "9", "12"],
      "likeCount": 20,
      "dislikeCount": 30,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "casual de la hoya look",
      "tags": ["summer", "casual"],
      "lastAccessed": 169871897,
    },
    {
      "type": "outfit",
      "creator": "Bob Johnson",
      "uuid": "def456",
      "outfitId": "11212",
      "items": ["7", "11", "16"],
      "likeCount": 25,
      "dislikeCount": 35,
      "userLiked": "false",
      "userDisliked": "true",
      "wishlist": "false",
      "name": " really long name which is hard to spell out some thimes ",
      "tags": ["evening", "elegant"],
      "lastAccessed": 159871897,
    },
    {
      "type": "outfit",
      "creator": "Charlie Williams",
      "uuid": "ghi789",
      "outfitId": "23",
      "items": ["1", "6", "9"],
      "likeCount": 15,
      "dislikeCount": 45,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "sporty weekend look",
      "tags": ["sporty", "weekend"],
      "lastAccessed": 149871897,
    },
    {
      "type": "outfit",
      "creator": "Amanda Decipher",
      "uuid": "chees429",
      "outfitId": "5256",
      "items": ["11", "12", "13"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "ANo anl dnklj lsdj",
      "tags": ["spring", "winter", "short"],
      "lastAccessed": 149871897,
    }
  ];

  var imagesList = [
    {
      "id": "1",
      "desc": "By Anthropologie Sequin Mini Dress",
      "price": "$248.00",
      "link": "/shop/by-anthropologie-sequin-mini-dress?category=dresses&color=041&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130370060107_041_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "2",
      "desc": "Cecilia Prado Twist-Front Dress",
      "price": "$230.00",
      "link": "/shop/cecilia-prado-twist-front-dress?category=dresses&color=061&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130638280246_061_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "3",
      "desc": "Maeve Embellished Velvet Dress",
      "price": "$230.00",
      "link": "/shop/maeve-embellished-velvet-dress?category=dresses&color=001&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130916210123_001_b2?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "4",
      "desc": "Hutch Puff-Sleeve Velvet Dress",
      "price": "$198.00",
      "link": "/shop/hutch-puff-sleeve-velvet-dress?category=dresses&color=041&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130464030212_041_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "5",
      "desc": "Hutch Fringed Chevron Dress",
      "price": "$220.00",
      "link": "/shop/hutch-fringed-chevron-dress?category=dresses&color=065&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130464030211_065_b14?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "6",
      "desc": "By Anthropologie Embroidered Floral Dress",
      "price": "$260.00",
      "link": "/shop/by-anthropologie-embroidered-floral-dress?category=dresses&color=009&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130916210126_009_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "7",
      "desc": "Rinku Dalamal Sequin Shirt Dress",
      "price": "$198.00",
      "link": "/shop/rinku-dalamal-sequin-shirt-dress?category=dresses&color=001&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130691080004_001_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "8",
      "desc": "Dhruv Kapoor Smocked Cerise Dress",
      "price": "$198.00",
      "link": "/shop/dhruv-kapoor-smocked-cerise-dress?category=dresses&color=060&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130615360010_060_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "9",
      "desc": "Kachel Puff-Sleeve Dress",
      "price": "$198.00",
      "link": "/shop/kachel-puff-sleeve-dress?category=dresses&color=041&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130342480029_041_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "10",
      "desc": "Maeve Sequin Blazer Dress",
      "price": "$220.00",
      "link": "/shop/maeve-sequin-blazer-dress?category=dresses&color=060&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130348690199_060_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "11",
      "desc": "By Anthropologie Fringed Velvet Halter Dress",
      "price": "$268.00",
      "link": "/shop/by-anthropologie-fringed-velvet-halter-dress?category=dresses&color=029&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130348690201_029_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "12",
      "desc": "Verb by Pallavi Singhee Sequin Shift Dress",
      "price": "$220.00",
      "link": "/shop/verb-by-pallavi-singhee-sequin-shift-dress?category=dresses&color=066&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130456940046_066_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "13",
      "desc": "Maeve Layered Sheer Mini Dress",
      "price": "$160.00",
      "link": "/shop/maeve-layered-sheer-mini-dress?category=dresses&color=001&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130370060097_001_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "14",
      "desc": "By Anthropologie Ruffled Tiered Midi Dress",
      "price": "$170.00",
      "link": "/shop/by-anthropologie-ruffled-tiered-midi-dress?category=dresses&color=046&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130265410015_046_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "15",
      "desc": "The Somerset Maxi Dress: Velvet Edition",
      "price": "$180.00",
      "link": "/shop/the-somerset-maxi-dress-velvet-edition?category=dresses&color=062&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130916210109_062_b14?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "16",
      "desc": "By Anthropologie Twist-Front Sequin Dress",
      "price": "$210.00",
      "link": "/shop/by-anthropologie-twist-front-sequin-dress?category=dresses&color=041&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130370060109_041_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "17",
      "desc": "By Anthropologie Tiered Halter Dress",
      "price": "$170.00",
      "link": "/shop/by-anthropologie-tiered-halter-dress?category=dresses&color=065&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130370060101_065_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    },
    {
      "id": "18",
      "desc": "Maeve Ruched Off-The-Shoulder Dress",
      "price": "$170.00",
      "link": "/shop/maeve-ruched-off-the-shoulder-dress?category=dresses&color=098&type=STANDARD",
      "img": "https://images.urbndata.com/is/image/Anthropologie/4130647160149_098_b?$an-category$&qlt=80&fit=constrain",
      "likeCount": 20,
      "dislikeCount": 10, // add type to image
      "company": "Anthropologie",
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "keywords": ['dress']
    }
  ]

  var infiniteLoadBurst = {
    'listPage': 5, // determines how many more items to render
    'profilePageLike': 5,
    'profilePageOutfit':  5,
    'profilePageNotification': 5,
    'profilePageFollows': 5,
    'profilePageFollowers': 5,
    'currentUserOutfits': 8,

  }

  var infiniteFlag = {
    'listPage': true,  // the rendering is on a debounce when this is true another render can be triggered
    'listPageLoadMore': true, // server can determine that there are no more items to load

    'profilePageLike': true,
    'profilePageLikeLoadMore': true,

    'profilePageOutfit': true,
    'profilePageOutfitLoadMore': true,

    'profilePageNotification': true,
    'profilePageNotificationLoadMore':true,

    'profilePageFollows': true,
    'profilePageFollowsLoadMore': true,


    'profilePageFollowers': true,
    'profilePageFollowersLoadMore': true,

    'currentUserOutfits': true,
    'currentUserOutfitsLoadMore': true,

  }
  var infiniteLoadCounter = {
    "listPage": 0, // counter points to the last rendered item in the datastructure so on the next rendering the following items will be added to the viewport
    "profilePageLike": 0,
    'profilePageOutfit': 0,
    'profilePageNotification': 0,
    'profilePageFollows': 0,
    'profilePageFollowers': 0,
    'currentUserOutfits': 0,
  }
  var clothingDisplayDataStruct = [
    {
      "type": "outfit",
      "creator": "Decipher",
      "uuid": "chees429",
      "outfitId": "13",
      "items": ["1", "2", "3"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "Lebron Ja ",
      "tags": ["spring", "winter", "short"]
    }, // when liked the clothing likes increase and decrease
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
      "tags": ["spring", "winter", "short"]
    }, // this replicates the data in the image instances
    {
      "type": "outfit",
      "creator": "Amanda dklaj",
      "uuid": "chees429",
      "outfitId": "31456",
      "items": ["11", "12", "13"],
      "likeCount": 40,
      "dislikeCount": 60,
      "userLiked": "true",
      "userDisliked": "false",
      "wishlist": "true",
      "name": "fashion",
      "tags": ["spring", "winter", "short"]
    }, // when liked the clothing likes increase and decrease
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
    }, // when liked the clothing likes increase and decrease

  ]


  var onHome = true; // diplaying home page
  var profilePage = false
  var currentUserProfile = false; //displays current user profile page



  function hideListPageMenu() {
    document.getElementsByClassName('input_search_list_page')[0].style.display = "none";

  }

  function hideListPage() {
    onHome = false;
    profilePage = false;
    document.getElementsByClassName('listPage')[0].style.display = "none";
    hideListPageMenu();
    document.getElementsByClassName('phos_filterz')[0].style.display = "none";

  }
  var localDevCount = 6

  function serverPopulateListPageDataStruct() {

    serverLoading();
    // update imagesList
    for (var i = 0; i < infiniteLoadBurst.listPage; i++) {
      imagesList.push(generateRandomDataStructureImage(imagesList));
      clothingDisplayDataStruct.push(generateDataStructureOutfit(clothingDisplayDataStruct, imagesList))
    }
    localDevCount -= 1
    if (localDevCount == 0) {
      infiniteFlag.listPageLoadMore = false;
    }


  }

  function populateClothingDisplayDataStruct() {
    var res = ''
    var listPageElm = document.getElementsByClassName('listPage')[0];
    var temp_i = 0; // variable to add i to counter
    for (var i = infiniteLoadCounter.listPage; i < Math.min(infiniteLoadBurst.listPage + infiniteLoadCounter.listPage, clothingDisplayDataStruct.length); i++) {

      // on the last item create a class,
      res += createCarousel(clothingDisplayDataStruct[i], imagesList, i, i + 1 == Math.min(infiniteLoadBurst.listPage + infiniteLoadCounter.listPage, clothingDisplayDataStruct.length) ? {
        "lastCarousel": true
      } : null)
      temp_i = i
    }
    //googleadsense insertion
    res += `
    <div style="margin-bottom: 4vh;" class="hrs"></div>
    <div style="position: relative;width: 100%; display:flex; justify-content:center;"> 
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5695242329127800"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block;width:336px;height:280px;"
     data-adtest="on"
     data-ad-format="fluid"
     data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-client="ca-pub-5695242329127800"
     data-ad-slot="1144413283"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
</div>
`
    // inital load of screen
    if (infiniteLoadCounter.listPage == 0) {
      listPageElm.innerHTML = res;
      listPageElm.innerHTML = `<div style="text-align:center; width: 100%;"> <h1 style = "margin-top:72px;"> Discover</h1> </div> ` + listPageElm.innerHTML

    } else {
      // user scrolls to bottom of container
      // bug triggering before lastCarousel on initial screen load, lastCarousel is the class name for the last element in the container. There should only be one. When more than 1 bugs happen
      var lastElm = listPageElm.getElementsByClassName('lastCarousel')[0];
      if (lastElm) {
        lastElm.classList.remove('lastCarousel');
      }
      listPageElm.innerHTML += res;

    }
    infiniteLoadCounter.listPage = (temp_i + 1)

    document.getElementsByClassName('listPage')[0].addEventListener("scroll", function lastInViewListPage(e) {
      // console.log('load more list page',e)
      lastItemVisibe(e, 'listPage', 'lastCarousel');
    });
    infiniteFlag.listPage = true; // the rendering is on a debounce when this is true another render can be triggered

  }


  function lastItemVisibe(e, className, lastClassName) {
    var list = e.target.closest(`.${className}`);
    var lastElm = list.getElementsByClassName(lastClassName)[0];
    if (list.getElementsByClassName(lastClassName).length == 2) {
      banner_up("broken", "red")
    }
    // console.log("profilePageNotification",lastElm, list)

    // console.log(lastElm,infiniteFlag.listPage)
    if (lastElm && isElementInViewport(lastElm)) {


      console.log("lastCarousel exist if 1 not if 0", list.getElementsByClassName('lastCarousel').length)

      debounced(function() {
        if (  infiniteFlag.listPage && className == 'listPage' && lastClassName == 'lastCarousel' && infiniteFlag.listPageLoadMore ) {
          serverLoading();

          lastElm.classList.remove(lastClassName);
            infiniteFlag.listPage = false;
          listPageDisplay();
        }
        //console.log(infiniteFlag.profilePageLike ,className == 'profilePage-like-article-List',lastClassName == 'lastCarousel',infiniteFlag.profilePageLikeLoadMore)
        if (infiniteFlag.profilePageLike  && className == 'profilePage-like-article-List' && lastClassName == 'lastCarousel' && infiniteFlag.profilePageLikeLoadMore) {
          console.log("load more likes ")
          serverLoading()

          infiniteFlag.profilePageLike = false;
          lastElm.classList.remove(lastClassName);

          loadProfileLikesScroll();
        }
        if (infiniteFlag.profilePageNotification  && className == 'profilePage-notification-List' && lastClassName == 'lastInstance' && infiniteFlag.profilePageNotificationLoadMore) {
          console.log("populate more on scroll")
          console.log("load more Notifications ")
          serverLoading()

          infiniteFlag.profilePageNotification = false;
          lastElm.classList.remove(lastClassName);

          loadNotificationsScroll();
        }


        if (infiniteFlag.profilePageFollows  && className == 'profilePage-followingfollowers-List' && lastClassName == 'lastInstance' && infiniteFlag.profilePageFollowsLoadMore) {
          console.log("populate more on scroll, follows")

          serverLoading();

          infiniteFlag.profilePageFollows = false;
          lastElm.classList.remove(lastClassName);

          loadProfileFollowingScroll();
        }

        if (infiniteFlag.profilePageFollowers  && className == 'followersfollowing' && lastClassName == 'lastInstance' && infiniteFlag.profilePageFollowersLoadMore) {
          console.log("populate followers")

          serverLoading();

          infiniteFlag.profilePageFollowers = false;
          lastElm.classList.remove(lastClassName);

          loadProfileFollowersScroll();
        }

        // outfit instances
        if (infiniteFlag.currentUserOutfits  && className == 'outfit_list' && lastClassName == 'lastInstance' && infiniteFlag.currentUserOutfitsLoadMore) {
          console.log("populate followers")

          serverLoading();

          infiniteFlag.currentUserOutfits = false;
          lastElm.classList.remove(lastClassName);

          saveOutfitMenuScroll();
        }



        if (infiniteFlag.profilePageOutfit  && className == 'profilePage-outfit-article-List'  && lastClassName == 'lastCarousel' && infiniteFlag.profilePageOutfitLoadMore) {
          console.log("load more likes ")
          serverLoading()

          infiniteFlag.profilePageOutfit = false;
          lastElm.classList.remove(lastClassName);
          requestAnimationFrame(() => {
          profilePageOutfitScroll();
        } )
        }

      });

    }
  }

  function listPageDisplay() {


    serverPopulateListPageDataStruct();
    requestAnimationFrame(() => {
      hideProfilePage();
      populateClothingDisplayDataStruct();


      document.getElementsByClassName('listPage')[0].style.display = "block";
      document.getElementsByClassName('phos_filterz')[0].style.display = "block";
      document.getElementsByClassName('input_search_list_page')[0].style.display = "block";


      runCarousel();
      setUpLike();
      setUpDislike();
      setUpGotoShop();
      setUpCarouselDescr();
      setUpsaveOutfit();
      setUpBanner();
      setUpConfModal(); // setsup confirmation modal

      addEventListener("resize", (event) => {
        runCarousel();
      });
      setUpProfilePage();
    });



  }

  window.onpopstate = function() {
    // depending on the url display a page on back button click ;
    onPageLoad();
  };


  function onPageLoad() {
    //get the url where the persons uuid endoded will be there
    // Get the current page URL
    // Why is this in a try?
    try {
      setUpSignUp()
    } catch (e) {
      console.log('setUpSignUp()')
    }
    try {
      setUpSignIn()
    } catch (e) {
      console.log('setUpSignIn()')
    }
    try {
      setUpSubmitSignIn()
    } catch (e) {
      console.log('setUpSubmitSignIn(')
    }
    try {
      setUpPassword()
    } catch (e) {
      console.log('setUpPassword()')
    }
    try {
      setUpFilter();
    } catch (e) {
      console.log('setUpFilter()')
    }

    var currentUrl = window.location.href;

    // Check if the URL contains a query parameter "o"
    if (currentUrl.indexOf("o=") != -1) {
      profilePageDisplay()


    } else {
      console.log("o parameter not present in the url");
      // get the url and display the approiate page
      listPageDisplay();
    }




    document.getElementById('documentbody').style.cssText = "font-family: Arial, Helvetica, sans-serif; display: block;overflow-x:hidden;"
    document.getElementsByClassName('phos_headerz')[0].addEventListener("click", function() {
      window.location.href = "./index.html"
    })

  }

  try {
    onPageLoad();
  } catch (e) {
    localStorage.setItem("phost_login", "false");
    localStorage.setItem("phost_useruuid", "");
    onPageLoad();
  }



//Auto Complete setup
  const articlesList = [
    "Watch",
    "Bracelet",
    "Necklace",
    "Ring",
    "Earrings",
    "Brooch",
    "Cufflinks",
    "Tie",
    "Bowtie",
    "Suspenders",
    "Cummerbund",
    "Pocket square",
    "Cravat",
    "Scarf",
    "Shawl",
    "Poncho",
    "Cape",
    "Sari",
    "Kimono",
    "Hijab",
    "Apron",
    "Chef's hat",
    "Kitchen gloves",
    "Oven mitts",
    "Work gloves",
    "Safety goggles",
    "Hard hat",
    "Steel-toed boots",
    "Lab coat",
    "Scrubs",
    "Uniform",
    "Tactical gear",
    "Life jacket",
    "Rafting helmet",
    "Wet suit",
    "Dive mask",
    "Flippers",
    "Snorkel",
    "Diving suit",
    "Surfboard",
    "Bandana",
    "Headband",
    "Ear warmers",
    "Neck gaiter",
    "Face mask",
    "Sun hat",
    "Visor",
    "Sunglasses",
    "Eyeglasses",
    "Contact lenses",
    "Sunglasses case",
    "Eyeglass case",
    "Wallet",
    "Purse",
    "Backpack",
    "Briefcase",
    "Handbag",
    "Luggage",
    "Tote bag",
    "Umbrella",
    "Bikini",
    "One-piece swimsuit",
    "Trunks",
    "Board shorts",
    "Rash guard",
    "Wetsuit",
    "Towel",
    "Robe",
    "Pajamas",
    "Slippers",
    "Swim cap",
    "Goggles",
    "Flippers",
    "Snorkel",
    "Diving suit",
    "Surfboard",
    "Sandals",
    "Flip-flops",
    "Ballet flats",
    "High heels",
    "Shirt",
    "Pants",
    "Jacket",
    "Dress",
    "Skirt",
    "Suit",
    "Sweater",
    "T-shirt",
    "Jeans",
    "Coat",
    "Blouse",
    "Tank top",
    "Leggings",
    "Underwear",
    "Socks",
    "Hat",
    "Scarf",
    "Gloves",
    "Belt",
    "Shoes",
    "Basketball jersey",
    "Basketball shorts",
    "Basketball shoes",
    "Football jersey",
    "Football pants",
    "Football cleats",
    "Shoulder pads"

  ]

  const companies = [
    "Gazelle Technologies",
    "Quadrant Solutions",
    "Neptune Enterprises",
    "Violet Ventures",
    "Cascade Solutions",
    "Skyline Corporation",
    "Aurora Industries",
    "Lunar Enterprises",
    "Horizon Technologies",
    "Galaxy Solutions"
  ];

  var companyTrie = {};
  var articleListTrie = {}


  function createCompanyTrie() {
    for (var i = 0; i < companies.length; i++) {
      var tempObject = companyTrie;
      for (var j = 0; j < companies[i].length; j++) {
        if (!tempObject.hasOwnProperty(companies[i][j].toLowerCase())) {
          tempObject[companies[i][j].toLowerCase()] = {}
        }
        if (j == (companies[i].length - 1)) {
          tempObject["finalWord"] = companies[i]
        }
        tempObject = tempObject[companies[i][j].toLowerCase()]
      }
    }
  }

  createCompanyTrie();


  function createArticleListTrie() {
    for (var i = 0; i < articlesList.length; i++) {
      var tempObject = articleListTrie;
      for (var j = 0; j < articlesList[i].length; j++) {
        if (!tempObject.hasOwnProperty(articlesList[i][j].toLowerCase())) {
          tempObject[articlesList[i][j].toLowerCase()] = {}
        }
        if (j == (articlesList[i].length - 1)) {
          tempObject["finalWord"] = articlesList[i]
        }
        tempObject = tempObject[articlesList[i][j].toLowerCase()]
      }
    }
  }

  createArticleListTrie();



  function openAutoComplete(e, inputElem, relativeContainer, typeContainer, typeaheadInstance) {
    console.log(inputElem, relativeContainer, typeContainer);
    console.log(e.key)
    if (e.keyCode == 46) {
      console.log("delete");
    }
    // on enter  search for main filed
    if (e.keyCode == 13 && inputElem == "mainSearchField") {
      searchMainField();
    }

    function selectInstance(ev) {
      var clickedElem = ev.target.closest(`.${typeaheadInstance}`);

      document.getElementById(`${inputElem}`).value = clickedElem.getAttribute("inst");

      if (inputElem == "mainSearchField") {
        searchMainField()
      }

    }

    if (inputElem == "company_filter") {
      filterAutoUp = true;
    }

    if (inputElem == "mainSearchField") {
      maindSearchUp = true;
    }

    if (document.getElementsByClassName(`${relativeContainer}`)[0].classList.contains("hideSignIn")) {
      document.getElementsByClassName(`${relativeContainer}`)[0].classList.remove("hideSignIn");

    }
    // add click event to instances


    // fill in auto complete
    var currentSearch = document.getElementById(`${inputElem}`).value;
    if (currentSearch.length == 0) {
      console.log("leave")
      if (relativeContainer == "price-type") {
        closeAutoComplete();
      }
      if (relativeContainer == "main-auto") {
        closeAutoCompleteMain();
      }
      return;
    }
    if (inputElem == "mainSearchField") {
      var tempObject = articleListTrie;
    }
    if (inputElem == "company_filter") {
      var tempObject = companyTrie;
    }

    var currObj;
    var validWord = ""
    console.log("currentSearch", currentSearch, "length", currentSearch.length);
    for (var i = 0; i < currentSearch.length; i++) {
      var letter = `${currentSearch[i]}`
      if (tempObject.hasOwnProperty(letter.toLowerCase())) {
        // pull in all the companies from las valid entry
        console.log("Object.keys(tempObject)", Object.keys(tempObject), JSON.stringify(tempObject))
        tempObject = tempObject[letter.toLowerCase()]
        validWord += currentSearch[i]

      } else {
        if (i == 0) {
          // there are no valid entries to displapy
          console.log("leave")
          if (relativeContainer == "price-type") {
            closeAutoComplete();
          }
          if (relativeContainer == "main-auto") {
            closeAutoCompleteMain();
          }
          return;
        }
        break;

      }

    }


    var queue = [];
    var displayWords = [];

    for (const letter of Object.keys(tempObject)) {
      // in the current object there could be a final word
      if (letter == "finalWord") {
        displayWords.push(tempObject[letter]);
      } else {
        // push object in the queue fo processing
        queue.push(tempObject[letter])
      }

    }


    while (queue.length > 0) {
      tempObject = queue.shift();
      for (const letter of Object.keys(tempObject)) {
        // in the current object there could be a final word
        if (letter == "finalWord") {
          displayWords.push(tempObject[letter]);
        } else {
          // push object in the queue fo processing
          queue.push(tempObject[letter])
        }
      }
    }
    res = ""

    console.log("displayWords.length", displayWords.length, displayWords)
    if (displayWords.length == 0) {
      if (relativeContainer == "price-type") {
        closeAutoComplete();
      }
      if (relativeContainer == "main-auto") {
        closeAutoCompleteMain();
      }

      return;
    }

    for (var j = 0; j < displayWords.length; j++) {
      // create type ahead instancess
      res += `<div inst="${displayWords[j]}" class="${typeaheadInstance} "  style="text-align: center;">
                        <strong>${displayWords[j].slice(0,validWord.length)}</strong>${displayWords[j].slice(validWord.length)}
                      </div>`
    }

    document.getElementsByClassName(`${typeContainer}`)[0].innerHTML = res

    // add selected click to element
    var typeInstance = document.getElementsByClassName(`${typeaheadInstance}`)
    for (var i = 0; i < typeInstance.length; i++) {
      typeInstance[i].addEventListener("click", selectInstance);
    }

  }


  // ---------------------
  // Detect when area outside modal  was clicked
  var specifiedElement = document.getElementsByClassName('signIn')[0];
  var specifiedElement_1 = document.getElementsByClassName('signUp')[0];
  var specifiedElement_2 = document.getElementsByClassName('reset_passw')[0];
  var specifiedElement_3 = document.getElementsByClassName('filter_modal')[0];
  var specifiedElement_4 = document.getElementsByClassName('price-type')[0];
  var specifiedElement_5 = document.getElementsByClassName('main-auto')[0];
  var specifiedElement_7 = document.getElementsByClassName('go_to_shop_modal')[0];
  var specifiedElement_8 = document.getElementsByClassName('save_outfit_modal')[0];
  var specifiedElement_9 = document.getElementsByClassName('confModal')[0];
  var specifiedElement_10 = document.getElementsByClassName('profilePageOutfitModal')[0];
  var specifiedElement_11 = document.getElementsByClassName('profilePageLikesModal')[0];
  var specifiedElement_12 = document.getElementsByClassName('profilePageNotificationsModal')[0];
  var specifiedElement_13 = document.getElementsByClassName('profilePageFollowersFollowingModal')[0];






  // Track what elements users are clicking on
  document.addEventListener('click', event => {

    const isClickInside = specifiedElement.contains(event.target);
    const isClickInside_1 = specifiedElement_1.contains(event.target);
    const isClickInside_2 = specifiedElement_2.contains(event.target);
    const isClickInside_3 = specifiedElement_3.contains(event.target);
    const isClickInside_4 = specifiedElement_4.contains(event.target);
    const isClickInside_5 = specifiedElement_5.contains(event.target);
    const isClickInside_7 = specifiedElement_7.contains(event.target);
    const isClickInside_8 = specifiedElement_8.contains(event.target);
    const isClickInside_9 = specifiedElement_9.contains(event.target);
    const isClickInside_10 = specifiedElement_10.contains(event.target);
    const isClickInside_11 = specifiedElement_11.contains(event.target);
    const isClickInside_12 = specifiedElement_12.contains(event.target);
    const isClickInside_13 = specifiedElement_13.contains(event.target);




    if (!isClickInside && upSignin && !event.target.classList.contains('doNotClose')) {
      closeSignin();
      console.log("close");
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (!isClickInside_1 && upSignUp && !event.target.classList.contains('doNotClose')) {
      closeSignUp();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (!isClickInside_2 && resetUp && !event.target.classList.contains('doNotClose')) {
      closeReset();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (!isClickInside_3 && filterUp && !event.target.classList.contains('doNotClose')) {
      closeFilter();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }



    if (!isClickInside_7 && goToShopUp && !event.target.classList.contains('doNotClose')) {
      closeGoToShop();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }
    if (!isClickInside_8 && saveOutfitUp && !event.target.classList.contains('doNotClose')) {
      closeSaveOutfitShop();
      console.log("close")

      // The click was OUTSIDE the specifiedElement, do something
    }
    if (!isClickInside_9 && confModUp && !event.target.classList.contains('doNotClose')) {
      closeConfModal();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (!isClickInside_10 && profilePageOutfitModalUp && !event.target.classList.contains('doNotClose')) {
      closeProfileOutfitModal();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (!isClickInside_11 && profilePageLikesUp && !event.target.classList.contains('doNotClose')) {
      closeProfilePageLikes();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (!isClickInside_12 && profileNotifcationsUp && !event.target.classList.contains('doNotClose')) {
      closeProfilePageNotificationsModal();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (!isClickInside_13 && profileFollowersFollowingUp && !event.target.classList.contains('doNotClose')) {
      closeProfilePageFollowersFollowing();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (filterAutoUp) {
      closeAutoComplete();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

    if (maindSearchUp) {
      closeAutoCompleteMain();
      console.log("close")
      return;
      // The click was OUTSIDE the specifiedElement, do something
    }

  })


}());
