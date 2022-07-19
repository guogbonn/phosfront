function create_cohort_elm(instance) {
  return `<div class="border shadow-hover clickable" onclick="selectedCohort(this,${instance.id})" style="border-radius: 10px; margin-bottom:10px;">
                        <div class="row" >
                          <div class="col-1 justify-content-center" style="text-align: center; margin-right:15px;">
                             <p style="white-space: nowrap; font-size: 10px; margin:10px; ">${instance.days}</p>
                          </div>
                          <div class="col-3 justify-content-center"  style="text-align: center;">
                             <p  style="white-space: nowrap; font-size: 10px; margin:10px; margin-left: 9px;">${instance.class_time}</p>
                          </div>
                          <div class="col-4 justify-content-center"  style="text-align: center; margin-right:18px;">
                             <p  style="white-space: nowrap; font-size: 10px; margin:10px;"> ${instance.dates}</p>
                          </div>
                          <div class="col-1 justify-content-center "  style="text-align: center;">
                             <p  style="white-space: nowrap; font-size: 10px; margin:10px; margin-left: -4px;"><b>${instance.ages}</b> </p>
                          </div>
                          <div class="col-1 justify-content-center "  style="text-align: center;  margin-left:-3px;">
                             <p  style="white-space: nowrap; font-size: 10px; margin:10px;">${instance.seats_available}</p>
                          </div>

                        </div>
                      </div>`;
}

function create_enrollment_description(instance) {
    return `           <p> <b>Platform: </b> Zoom <span style="font-size: 10px">**Meeting Link sent after enrollment**</span> </p>
                      <p><b>Course Title:</b> <span>${instance.course_title}</span> </p>
                      <p> <b>Class Size:  </b> <span>12</span> </p>
                      <p> <b>Length: </b> <span>10 Sessions</span> </p>
                      <p> <b>Age:  </b> <span> ${instance.ages}</span></p>
                      <p> <b>Days:  </b> <span> ${instance.days}</span></p>
                      <p> <b>Class Time:  </b> <span>${instance.class_time}</span> </p>
                      <p> <b>Dates:  </b>  <span>${instance.dates}</span> </p>
                      <p> <b>Price:  </b> <span> $${instance.price}</span></p>

                      <p> <b>Requirments:</b> Zoom - Video Conference software; Computer (Mac/Linux/Windows) made within the last seven years.</p>

                      <p> <b>Refund:</b> Allowed up to 24 hrs  <b>after</b> the first session <b>3% Processing Fee</b></p>`;
}


function successfulPaymentUI(conf,email) {
  var paymentElement = document.getElementById('payment-form');
  // get rid of student form
  document.getElementById('StudentInfoForm').innerHTML = '';
  // get rid of course info
  document.getElementById('courseInfo').innerHTML = '';
  // get rid of enrollment header
  document.getElementById('EnrollmentHeader').innerHTML = '';
  // get  set payment header to center of modal
  document.getElementById('paymentHeader').setAttribute("style"," display: flex;justify-content: center;align-items: center;");
  // change the payment text
  document.getElementById('paymentHeader').innerHTML = "  <h5 >Successful Payment </h5>";
  //set the payment content to middle of div
  paymentElement.setAttribute("style"," display: flex;justify-content: center;align-items: center;");
  // create new div element
  paymentElement.innerHTML =
      `  <svg class="success" width="159px" height="159px" viewBox="0 0 159 159" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- Generator: Sketch 41 (35326) - http://www.bohemiancoding.com/sketch -->
        <title>Group</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="kuittaus---maksu-onnistui" transform="translate(-81.000000, -239.000000)">
                <g id="Group" transform="translate(81.000000, 239.000000)">
                    <polyline id="Stroke-52" stroke="#00C6BA" stroke-width="18" points="44 76.578 71.37 103.058 114.816 56"></polyline>
                    <path d="M79.278,135.52 C48.324,135.52 23.132,110.328 23.132,79.374 C23.132,48.412 48.324,23.22 79.278,23.22 C110.24,23.22 135.424,48.412 135.424,79.374 C135.424,110.328 110.24,135.52 79.278,135.52 M79.278,0 C35.558,0 -2.27373675e-13,35.56 -2.27373675e-13,79.278 C-2.27373675e-13,122.996 35.558,158.574 79.278,158.574 C122.996,158.574 158.574,122.996 158.574,79.278 C158.574,35.56 122.996,0 79.278,0" id="Fill-136" fill="#65E5D8"></path>
                </g>
            </g>
        </g>
    </svg>

    `;
    document.getElementById('paymentContainer').innerHTML +=  `<div style="display: flex;justify-content: center;align-items: center; margin-top:10px; text-align: center;"><p>A confirmation email has been sent to <b> ${email}</b></p></div> <div style="display: flex;justify-content: center;align-items: center; text-align: center;"><p >Confirmation Code: <b>${confirmationCode}</b> </p></div>  <div style="display: flex;justify-content: center;align-items: center;  text-align: center;"><p >For any concerns please contact support@phostrino.com</p></div>                 <div style="display: flex;justify-content: center;align-items: center;">
                    <button id="button-text" onclick="userConfirmPayment()" class="btn btn-primary" >Confirm</button>
                    </div>`;
    // here on success
}
