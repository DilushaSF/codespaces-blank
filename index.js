$(document).ready(function () {
  console.log("jquery loaded");
  $.get(
    "http://localhost:3000/member-registration/get/all",
    function (data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
      console.log("DAta", data);
    }
  );
});
