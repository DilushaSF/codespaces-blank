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
      // console.log("member ", member);
      var encodedStringBtoA = btoa(JSON.stringify(member));
      $("#membersTableBody").append(
        `<tr>
          <td>${member.firstName}</td>
          <td>${member.middleName}</td>
          <td>${member.dob}</td>
          <td>${member.nameOfMother}</td>
          <td>${member.nameOfFather}</td>
          <td>${member.address}</td>
          <td>${member.birthPlace}</td>
          <td> 
            <a href="addmembers.html?id=${member._id}&data=${encodedStringBtoA}" class="btn btn-primary"> <i class="fas fa-pencil-alt"></i> Update 
            </a>
            
            <button class="btn btn-danger delete-button" data-id="${member._id}">
                <i class="fas fa-trash-alt"></i> Delete
            </button>
          </td>
        </tr>`
      );
    });
  });

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const data = urlParams.get("data");

  // var decodedData = atob(data);
  // var memberDetails = JSON.parse(decodedData);

  if (data) {
    // Fetch member data and prefill the form
    // $.get(
    //   `http://localhost:3000/update-member-registration/${memberId}`,
    //   function (member) {
    //     $("#firstName").val(member.firstName);
    //     $("#middleName").val(member.middleName);
    //     $("#sirName").val(member.sirName);
    //     $("#dob").val(member.dob);
    //     $("#nameOfMother").val(member.nameOfMother);
    //     $("#nameOfFather").val(member.nameOfFather);
    //     $("#address").val(member.address);
    //     $("#birthPlace").val(member.birthPlace);
    //     $("#contactNo").val(member.contactNo);
    //     $("#marriedDate").val(member.marriedDate);
    //     $("#marriedChurch").val(member.marriedChurch);
    //   }
    // );

    var decodedStringAtoB = atob(data);
    // console.log("Decodeeee ", decodedStringAtoB);

    var memberData = JSON.parse(decodedStringAtoB); // Populate the form fields with the parsed data
    $("#firstName").val(memberData.firstName);
    $("#middleName").val(memberData.middleName);
    $("#sirName").val(memberData.sirName);
    $("#dob").val(memberData.dob);
    $("#nameOfMother").val(memberData.nameOfMother);
    $("#nameOfFather").val(memberData.nameOfFather);
    $("#address").val(memberData.address);
    $("#birthPlace").val(memberData.birthPlace);
    $("#contactNo").val(memberData.contactNo);
    $("#marriedDate").val(memberData.marriedDate);
    $("#marriedChurch").val(memberData.marriedChurch);
  }

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

    let method_url = "http://localhost:3000/member-registration/create";
    let method = "POST";

    if (memberData._id) {
      method_url = `http://localhost:3000/update-member-registration/${memberData._id}`;
      method = "PUT";
    }

    $.ajax({
      type: method,
      url: method_url,
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        // Handle the response from the server
        alert("Member added successfully!");
        // Clear the form after successful submission
        // $("#addMemberForm")[0].reset();
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

  $(document).on("click", ".delete-button", function () {
    const memberId = $(this).data("id"); // Get member ID from data-id attribute

    if (confirm("Are you sure you want to delete this member?")) {
      $.ajax({
        url: `http://localhost:3000/member-registration/delete/${memberId}`,
        type: "DELETE",
        success: function () {
          // Remove the row from the table
          $(`#row-${memberId}`).remove();
          alert("Member deleted successfully!");
        },
        error: function () {
          alert("Failed to delete the member. Please try again.");
        },
      });
    }
  });

  $("#loginForm").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission
    // Serialize form data
    const formData = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    // alert(JSON.stringify(formData));

    // Send the AJAX POST request for validation
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/signin", // Change this URL to your actual login endpoint
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        if (response.success) {
          alert("Login successful!");
          window.location.href = "home.html"; // Redirect to home.html
        } else {
          alert("Invalid credentials. Please try again.");
        }
      },
      error: function (error) {
        alert("Error during login: " + error.responseText);
      },
    });
  });
});
