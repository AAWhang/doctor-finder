import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import FindDoctor from "./doctorObj.js";
import $ from 'jquery';
var api_key = process.env.apiKey;


$(function(){

  $("#ailSubmit").click(function() {
    event.preventDefault();
    let search = $("#querySearch").val();
    let findDoctor = new FindDoctor();
    let promise = findDoctor.doctorFinder(search, api_key);
    promise.then(function(response) {
      let body = JSON.parse(response);
      let catty = body["data"];
      $('#doctors').html(``);
      if (catty[0] === undefined) {
        $('#doctors').html('No matches were found for "' + search + '", please try again.');
      } else {
      for (let i=0; i < catty.length; i++) {
        $('#doctors').append(`<h1>Name: ${catty[i].profile.first_name} ${catty[i].profile.last_name}</h1>`);
        $('#doctors').append(`<li>Address: ${catty[i].practices[0].visit_address.street} ${catty[i].practices[0].visit_address.city}, ${catty[i].practices[0].visit_address.state} ${catty[i].practices[0].visit_address.zip}</li>`);
        $('#doctors').append(`<li>Phone: ${catty[i].practices[0].phones[0].number}`);
        if (catty[i].practices[0].website != undefined) {
          $('#doctors').append(`<li>Website: ${catty[i].practices[0].website}`);
        }
        if (catty[i].practices[0].accepts_new_patients === true) {
          $('#doctors').append(`<li>Accepting new patients!</li>`);
        } else {
          $('#doctors').append(`<li>Not accepting new patients!</li>`);
        }
          $('#doctors').append(`<hr>`);
        }
      }
    })
    .catch(function(error) {
        $('#doctors').html(`There was an error processing your request: ${error.message}`);
    });



  });
});
