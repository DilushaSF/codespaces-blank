$(document).ready(function () {
  console.log("jquery loaded");
  $.get(
    "http://localhost:3000/member-registration/get/all",
    function (data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
      console.log("DAta", data);
    }
  );

  $("#registerButton").click(function () {
    // Place your API call here
    $.get(
      "http://localhost:3000/member-registration/get/all",
      function (data, status) {
        console.log("Data", data);
      }
    );
  });

  // $.get("http://localhost:3000/member-registration/get/all", function (data) {
  //   // Assuming data is an array of member objects
  //   data.forEach(function (member) {
  //     $("#membersTableBody").append(
  //       `<tr> 
  //         <td>${member.firstName}</td> 
  //         <td>${member.middleName}</td> 
  //         <td>${member.dob}</td> 
  //         <td>${member.nameOfMother}</td> 
  //         <td>${member.nameOfFather}</td> 
  //         <td>${member.address}</td> 
  //         <td>${member.birthPlace}</td> 
  //       </tr>`
  //     );
  //   });
  // });
});
