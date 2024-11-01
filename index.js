$(document).ready(function () {
  // console.log("jquery loaded");

  // $.get(
  //   "http://localhost:3000/member-registration/get/all",
  //   function (data, status) {
  //     console.log("DAta", data);
  //   }
  // );

  $("#registerButton").click(function () {
    $.get(
      "http://localhost:3000/member-registration/get/all",
      function (data, status) {
        console.log("Data", data);
      }
    );
  });

  $("#addNewRegistrationButton").click(function () {
    window.location.href = "addmembers.html";
  });

  $.get("http://localhost:3000/member-registration/get/all", function (data) {
    data.forEach(function (member) {
      $("#membersTableBody").append(
        `<tr>
          <td>${member.firstName}</td>
          <td>${member.middleName}</td>
          <td>${member.dob}</td>
          <td>${member.nameOfMother}</td>
          <td>${member.nameOfFather}</td>
          <td>${member.address}</td>
          <td>${member.birthPlace}</td>
        </tr>`
      );
    });
  });

  $("#addMemberForm").submit(function (event) {
    event.preventDefault();
    let formData = {
      firstName: $("#firstName").val(),
      middleName: $("#middleName").val(),
      sirName: $("#sirName").val(),
      dob: $("#dob").val(),
      nameOfMother: $("#nameOfMother").val(),
      nameOfFather: $("#nameOfFather").val(),
      address: $("#address").val(),
      birthPlace: $("#birthPlace").val(),
      contactNo: $("#contactNo").val(),
      marriedDate: $("#marriedDate").val(),
      marriedChurch: $("#marriedChurch").val(),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/member-registration/create",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        // Handle the response from the server
        alert("Member added successfully!");
        // Clear the form after successful submission
        $("#addMemberForm")[0].reset();
        window.location.href = "members.html";
      },

      error: function (error) {
        alert("Error adding member: " + error.responseText);
      },
    });
  });

  $("#addNewRegistrationButton").click(function () {
    window.location.href = "addmembers.html";
  });

  $("#registerButton").click(function () {
    window.location.href = "members.html";
  });

  $("#backToHomeButton").click(function () {
    window.location.href = "home.html";
  });
});
