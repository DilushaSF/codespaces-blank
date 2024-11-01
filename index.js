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



  // $('#addMemberForm').submit(function(event) { event.preventDefault(); // Prevent the default form submission 
  //   // Serialize form data 
  //   let formData = { firstName: $('#firstName').val(), 
  //     middleName: $('#middleName').val(), 
  //     sirName: $('#sirName').val(), 
  //     dob: $('#dob').val(), 
  //     nameOfMother: $('#nameOfMother').val(), 
  //     nameOfFather: $('#nameOfFather').val(), 
  //     address: $('#address').val(), 
  //     birthPlace: $('#birthPlace').val(), 
  //     contactNo: $('#contactNo').val(), 
  //     marriedDate: $('#marriedDate').val(), 
  //     marriedChurch: $('#marriedChurch').val() 
    
  //   }; 
  //     // Send the POST request 
  //     $.post('http://localhost:3000/member-registration/create', formData, function(response) { 
  //       // Handle the response from the server 
  //       alert('Member added successfully!'); // Clear the form after successful submission 
  //       $('#addMemberForm')[0].reset(); 
  //     }).fail(function(error) { 
  //       // Handle any errors 
  //       alert('Error adding member: ' + error.responseText); 
  //     }); 
  //   });
});
