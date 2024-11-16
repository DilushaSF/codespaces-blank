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
            <a href="editmembers.html?id=${member._id}" class="btn btn-primary">
              <i class="fas fa-pencil-alt"></i> Update
            </a>
            
            <button class="btn btn-danger delete-button" data-id="${member._id}">
                <i class="fas fa-trash-alt"></i> Delete
            </button>
          </td>
        </tr>`
      );
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

  $("#logoutButton").click(function () {
    window.location.href = "index.html";
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
          window.location.href = "members.html";
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

  // New create post method
  // Attach a submit event listener to the form
  $("#addMemberForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Serialize the form data into a JSON object
    const formData = {
      firstName: $("#firstName").val(),
      middleName: $("#middleName").val(),
      sirName: $("#sirName").val(),
      nameOfMother: $("#nameOfMother").val(),
      nameOfFather: $("#nameOfFather").val(),
      birthPlace: $("#birthPlace").val(),
      dob: $("#dob").val(),
      address: $("#address").val(),
      contactNo: $("#contactNo").val(),
      marriedDate: $("#marriedDate").val(),
      marriedChurch: $("#marriedChurch").val(),
    };

    // Send the data to the server using an AJAX POST request
    $.ajax({
      url: "http://localhost:3000/member-registration/create", // Replace this with your actual API endpoint
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData), // Send the form data as a JSON string
      success: function (response) {
        // Handle success response
        alert("Member details saved successfully!");
        $("#addMemberForm")[0].reset(); // Reset the form
        window.location.href = "members.html";
      },
      error: function (error) {
        // Handle error response
        console.error("Error saving member details:", error);
        alert(
          "An error occurred while saving member details. Please try again."
        );
      },
    });
  });

  // Navigate back to the Registered Member List on button click
  $("#backToMemberList").on("click", function () {
    window.location.href = "/members"; // Replace this with your actual member list page URL
  });

  // new update function
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const memberId = urlParams.get("id");

  $.ajax({
    url: `http://localhost:3000/member-registration/${memberId}`, // Replace with your actual endpoint to get member details
    type: "GET",
    success: function (data) {
      // alert(JSON.stringify(data));
      console.log("Member Details:", data);
      // Populate the form fields with the retrieved data
      $("#firstName").val(data.member.firstName);
      $("#middleName").val(data.member.middleName);
      $("#sirName").val(data.member.sirName);
      $("#nameOfMother").val(data.member.nameOfMother);
      $("#nameOfFather").val(data.member.nameOfFather);
      $("#birthPlace").val(data.member.birthPlace);
      $("#dob").val(data.member.dob);
      $("#address").val(data.member.address);
      $("#contactNo").val(data.member.contactNo);
      $("#marriedDate").val(data.member.marriedDate);
      $("#marriedChurch").val(data.member.marriedChurch);
    },
    error: function (error) {
      console.error("Error fetching member details:", error);
    },
  });

  $("#editMemberForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = {
      firstName: $("#firstName").val(),
      middleName: $("#middleName").val(),
      sirName: $("#sirName").val(),
      nameOfMother: $("#nameOfMother").val(),
      nameOfFather: $("#nameOfFather").val(),
      birthPlace: $("#birthPlace").val(),
      dob: $("#dob").val(),
      address: $("#address").val(),
      contactNo: $("#contactNo").val(),
      marriedDate: $("#marriedDate").val(),
      marriedChurch: $("#marriedChurch").val(),
    };

    // Send updated data using AJAX PUT request
    $.ajax({
      url: `http://localhost:3000/update-member-registration/${memberId}`, // Replace with your actual endpoint to update member
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        alert("Member details updated successfully!");
        window.location.href = "/members"; // Redirect to member list page
      },
      error: function (error) {
        console.error("Error updating member details:", error);
        alert(
          "An error occurred while updating member details. Please try again."
        );
      },
    });
  });

  // Navigate back to the Registered Member List on button click
  $("#backToMemberList").on("click", function () {
    window.location.href = "/members"; // Replace with your actual member list page URL
  });
});
