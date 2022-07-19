var islocal = false;
var text_lenght_i = 0;
var reset = false;
// This is your test publishable API key.
var stripe;


if(islocal){
   var backend = 'http://localhost:8000';
   var host = 'http://localhost:8001'

}else {
  var backend = 'https://phostrino.herokuapp.com';
  var host = 'https://phostrino.com';
}


function getenv() {
   fetch(backend + '/env')
   .then(response => response.json()).then(data  => {
       // handle the response
       stripe = Stripe(data["stripe_pk"])

   })
    .catch(error => {
        // handle the error
          console.log(error);
    });


}

async function track_user() {

    var page_access =   await ping();
    await fetch(backend+"/log_login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_access }),
    });


}


function typeWriter() {
  var txt = 'Live Instructor. Online Classes.'; /* The text */
  var speed = 300; /* The speed/duration of the effect in milliseconds */

  if(reset){
    text_lenght_i = 0;
    speed = 300;
    reset = false;
    document.getElementById("demo").innerHTML = "";
  }

  if(text_lenght_i < txt.length){
          document.getElementById("demo").innerHTML += txt.charAt(text_lenght_i);
          text_lenght_i++;
          setTimeout(typeWriter, speed);
          speed -= 5
  }else{

    reset = true;
    setTimeout(typeWriter, 1000);
  }
}

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

function validateEmail(email){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

function stripeErrorMess(val) {
  showMessage(val);
  document.getElementById('payment-message').setAttribute("style","color:red;  display:flex; justify-content: center;");
}


var selectedCohortElm = '';
var courseSelected = '';

function selectedCohort(elm,courseNum) {
  // user clicks on cohort what happents
  //check to see if they have clicked on a cohort before
  if (selectedCohortElm ==''){
    elm.setAttribute("style","background-color:white;border-radius: 10px; margin-bottom:10px;");
    selectedCohortElm = elm;
    courseSelected = courseNum;
    //they are clicking on the same cohort
  }else if (elm == selectedCohortElm) {
    return;
  } else {
    // they are clicking on a differnt cohort than what they have selected before
    elm.setAttribute("style","background-color:white;border-radius: 10px; margin-bottom:10px;");
    selectedCohortElm.setAttribute("style","border-radius: 10px; margin-bottom:10px;")
    selectedCohortElm = elm;
    courseSelected = courseNum;
  }

}


// The items the customer wants to buy
const items = [{ id: "intro-python" }];

var enrollElement = '';
var paymentSuccuss = false;

function enroll() {
  // save modal state
  if(enrollElement == ''){
    enrollElement = document.getElementById('modal3').innerHTML;
  }
  // reset modal after payment
  if (paymentSuccuss) {
    document.getElementById('modal3').innerHTML = enrollElement;
    paymentSuccuss = false;
  }


  if(courseSelected == ''){
    document.getElementById('warningSelectCourse').innerHTML = "Please Select a Cohort";
    return;
  }

  // Show payment modal
  $('#modal1').modal('hide');

  $('#modal3').modal('show');

  // Want to know when someone considers a course.

  // intialize stripe
  let elements;
  // need to pass in the course id here
  if (document.getElementById('courseAge')){
    document.getElementById('courseInfo').innerHTML = create_enrollment_description(courseList[selectedCourseTitle].find(x => x.id === courseSelected))
    document.getElementById('courseAge').innerHTML = courseList[selectedCourseTitle].find(x => x.id === courseSelected).ages;
  }

  // only do the following if the user has not clicked confirm after paying
  if(!paymentSuccuss){

    //populate enroll course Description

    initialize();
    checkStatus();
    document.querySelector("#payment-form").addEventListener("submit", handleSubmit);
  }


}

 async function ping() {
  // await fetch(backend  +'/ping/')
  //   .then(response => response.json()).then(data  => {
  //       // handle the response
  //       console.log(data);
  //   })
  //   .catch(error => {
  //       // handle the error
  //         console.log(error);
  //   });
    // local  ipinfo.io?token=22bbe7ed5730c9
    //HTTPS/ SSL https://ipinfo.io?token=22bbe7ed5730c9
    var info;
    await fetch('https://ipinfo.io/json?token=22bbe7ed5730c9')
     .then(response => response.json()).then(data  => {
         // handle the response
         info = data;
     })
      .catch(error => {
          // handle the error
            console.log(error);
      });
      return info;
}
var courseList;
function   getCourseList() {
  fetch(backend + '/courselist')
    .then(response => response.json()).then(data  => {
        // handle the response
        // console.log("courseList",data);
        courseList = data;
    })
    .catch(error => {
        // handle the error
          console.log(error);
          return;
    });
}

var confirmationCode;
async function createStudent(data) {

  await fetch(backend +"/submitEnrollment", {
    method: "POST",
    headers: { "Content-Type": "application/json","Access-Control-Allow-Origin": host,"Access-Control-Allow-Methods": "POST"},
    body: JSON.stringify({ data }),
  }).then(response => response.json()).then(data  => {
      // handle the response
      console.log(" enrolled!!!",data);
        confirmationCode = data["confirmation_code"];
  })
  .catch(error => {
      // handle the error
        console.log(error);
        return;
  });

}


var selectedCourseTitle;
function populate_cohort(courseTitle) {
  if(courseList){
    selectedCourseTitle = courseTitle;
    var cohortElm = document.getElementById('cohortList');
    cohortElm.innerHTML = "";
    var res = '';
    for (var instance of courseList[courseTitle]) {
      res += create_cohort_elm(instance);
    }
    cohortElm.innerHTML = res;
  }else{
    // Loading Animation in div
  }

}

function main() {
  typeWriter();
  getCourseList();
  track_user();
  getenv();
}



var showtermvar = false;
function showterms(){
  //Allow user to go back to enrolment after seeing terms
  showtermvar = true;
  $('#modal2').modal('show');
  $('#modal3').modal('hide');
}

function gotopayments() {
  //Allow user to go back to enrolment after seeing terms
  if(showtermvar){
      showtermvar = false;
    $('#modal3').modal('show');
  }
}
///// Stripe below


// Fetches a payment intent and captures the client secret
async function initialize() {
  if(paymentSuccuss){return;}
  const response = await fetch(backend+"/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElement = elements.create("payment");
  if(document.getElementById('payment-element')){
    paymentElement.mount("#payment-element");

  }
}
// https://stripe.com/docs/js/payment_intents/confirm_payment?type=cardElement
async function handleSubmit(e) {
  e.preventDefault();

  var studentName = document.getElementById('stname');
  var emailAdd = document.getElementById('exampleInputEmail1');
  var emailConf = document.getElementById('exampleInputEmail2');
  var termsConf = document.getElementById('exampleCheck1');
  var ageAgree = document.getElementById('exampleCheck2');

  var studentNameVal;
  var emailAddVal;
  var emailConfVal;
  //Get Student Name
  if (studentName && studentName.value) {
    studentNameVal = sanitizeString(studentName.value);
  }else{
    stripeErrorMess("Please enter a valid student name")
    return;
  }

  //Get email
  if (emailAdd && emailAdd.value &&   validateEmail(emailAdd.value) ) {
    emailAddVal = emailAdd.value;
  }else{
    stripeErrorMess("Please enter a valid email.")
    return;
  }

  //Get confirmed email
  if (emailConf && emailConf.value &&   validateEmail(emailConf.value) &&  emailConf.value == emailAddVal) {
    emailConfVal = emailConf.value;
  }else{
    stripeErrorMess("Emails do not match.")
    return;
  }
  // Agree to terms
  if (termsConf.checked){
  }else{
    stripeErrorMess("Terms not Agreed too.")
    return;
  }
  // Agree to age
  if (ageAgree.checked){
  }else{
    stripeErrorMess("Please acknowledge student age.")
    return;
  }

  // trigger loading animation
  setLoading(true);

  var student = {}
  student.name = studentNameVal;
  student.email = emailAddVal;
  student.course_id = courseSelected;
  student.amount_payed = courseList[selectedCourseTitle].find(x => x.id === courseSelected).price;
  student.course_days =  courseList[selectedCourseTitle].find(x => x.id === courseSelected).days;
  student.course_dates =  courseList[selectedCourseTitle].find(x => x.id === courseSelected).dates;
  student.course_time = courseList[selectedCourseTitle].find(x => x.id === courseSelected).class_time;
  student.course_title = courseList[selectedCourseTitle].find(x => x.id === courseSelected).course_title;
  student.zoom_link = courseList[selectedCourseTitle].find(x => x.id === courseSelected).zoom_link;
  student.passcode = courseList[selectedCourseTitle].find(x => x.id === courseSelected).passcode;




  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
     return_url: host,

    },
     redirect:  'if_required',
  });

  // if no errors
  if(error == undefined){
    //remove loading animation
      // get client info
      student["client"] = await ping();
      //return email and confirmation code
      var severSubmitPayment = await createStudent(student);
      setLoading(false);
      await successfulPaymentUI(severSubmitPayment,student.email);
      // refresh course list
      getCourseList();

      return;
  }
  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
  getCourseList();
}

function userConfirmPayment() {
  $('#modal3').modal('hide');
  paymentSuccuss = true;
  // Update the courses with one less seat
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
      showMessage("Payment succeeded!");
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageText.textContent = "";
  }, 4000);
}


// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}
