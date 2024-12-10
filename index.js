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
      "https://dilusha7.uksouth.cloudapp.azure.com/member-registration/get/all",
      function (data, status) {
        console.log("Data", data);
      }
    );
  });

  $("#addNewRegistrationButton").click(function () {
    window.location.href = "addmembers.html";
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
        url: `https://dilusha7.uksouth.cloudapp.azure.com/member-registration/delete/${memberId}`,
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
      url: "https://dilusha7.uksouth.cloudapp.azure.com/signin", // Change this URL to your actual login endpoint
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
      url: "https://dilusha7.uksouth.cloudapp.azure.com/member-registration/create", // Replace this with your actual API endpoint
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
    window.location.href = "members.html"; // Replace this with your actual member list page URL
  });

  // new update function
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const memberId = urlParams.get("id");

  $.ajax({
    url: `https://dilusha7.uksouth.cloudapp.azure.com/member-registration/${memberId}`, // Replace with your actual endpoint to get member details
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
      url: `https://dilusha7.uksouth.cloudapp.azure.com/update-member-registration/${memberId}`, // Replace with your actual endpoint to update member
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        alert("Member details updated successfully!");
        window.location.href = "members.html"; // Redirect to member list page
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
    window.location.href = "members.html";
    // Replace with your actual member list page URL
  });

  //search functionality
  const apiUrl =
    "https://dilusha7.uksouth.cloudapp.azure.com/member-registration/get/all";
  let membersData = [];

  // Fetch members data when the page loads
  $.get(apiUrl, function (data) {
    membersData = data;
    populateTable(membersData);
  });

  // Populate the table with member data
  function populateTable(data) {
    const tableBody = $("#membersTableBody");
    tableBody.empty();
    if (data.length === 0) {
      tableBody.append(
        `<tr><td colspan="8" class="text-center">No records found</td></tr>`
      );
    } else {
      data.forEach((member) => {
        tableBody.append(`
          <tr>
              <td>${member.firstName}</td>
              <td>${member.middleName}</td>
              <td>${member.dob}</td>
              <td>${member.nameOfMother}</td>
              <td>${member.nameOfFather}</td>
              <td>${member.address}</td>
              <td>${member.birthPlace}</td>
              <td> 
                <a href="viewmembers.html?id=${member._id}
                  &firstName=${encodeURIComponent(member.firstName)}
                  &middleName=${encodeURIComponent(member.middleName)}" 
                    class="btn btn-info"><i class="fas fa-eye"></i> View
                </a>

                <a href="editmembers.html?id=${member._id}
                  &firstName=${encodeURIComponent(member.firstName)}
                  &sirName=${encodeURIComponent(member.sirName)}" 
                  class="btn btn-primary"><i class="fas fa-pencil-alt"></i> Update 
                </a>
                  
                <button class="btn btn-danger delete-button" 
                  data-id="${
                    member._id
                  }"> <i class="fas fa-trash-alt"></i> Delete
                </button>
              </td>
          </tr>
      `);
      });
    }
  }

  // onkeyup event
  $("#searchBar").on("keyup", function () {
    const searchTerm = $(this).val().trim().toLowerCase();
    const filteredMembers = membersData.filter(
      (member) =>
        member.firstName.toLowerCase().includes(searchTerm) ||
        member.middleName.toLowerCase().includes(searchTerm)
    );
    populateTable(filteredMembers);
  });

  //sorting function
  let sortState = {
    firstName: true,
    dob: true,
  };

  $("#sortFirstName").on("click", function () {
    sortState.firstName = !sortState.firstName;

    membersData.sort((a, b) => {
      if (sortState.firstName) {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });

    const sortIcon = sortState.firstName ? "&#9650;" : "&#9660;";
    $(this).find("span").html(sortIcon);

    populateTable(membersData);
  });

  $("#sortDob").on("click", function () {
    sortState.dob = !sortState.dob;

    membersData.sort((a, b) => {
      const dateA = new Date(a.dob);
      const dateB = new Date(b.dob);

      if (sortState.dob) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    const sortIcon = sortState.dob ? "&#9650;" : "&#9660;";
    $(this).find("span").html(sortIcon);

    populateTable(membersData);
  });

  // parsing firstname to edit and view form headings
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    for (const [key, value] of urlParams.entries()) {
      params[key] = decodeURIComponent(value);
    }

    return params;
  }

  // Extract the firstName and display it
  const params = getQueryParams();
  if (params.firstName && params.middleName) {
    const heading = document.querySelector("h1");
    heading.textContent = `View Member : ${params.firstName} ${params.middleName}`;
  }
  if (params.sirName) {
    const heading = document.querySelector("h1");
    heading.textContent = `Edit Member : ${params.firstName} ${params.sirName}`;
  }
});
