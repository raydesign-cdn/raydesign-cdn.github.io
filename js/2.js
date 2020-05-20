// responsive table is no need for this page, so override func.js which create responsive table
$(document).ready(function() {
  $('table.hidden-lg').remove();
  $('table.hidden-xs').removeClass('hidden-xs');
});

// api call to get result
var apiUrl = '/data/registration.json';  // just for testing
$.ajax({
  url: apiUrl,
  method: "GET",
  dataType: 'JSON',
  contentType: 'application/json; charset=UTF-8'
})
.done(function(resp) {
  // render the result
  $('#registration-no').html(resp.registrationNo);
  $('#guests-num').html(resp.guests.length);
  $('#date-visit').html(resp.dateVisit);
  $('#qr-code').attr('src', resp.qrCode);
  $('#guest-0 .guest-ticket').html(resp.guests[0].ticketType + ' ' + resp.guests[0].ticketCode);
  // loop all guests
  for(var i=resp.guests.length-1; i > 0; i--) {
    var $guest = $('#guest-0').clone().insertAfter('#guest-0');
    $guest.attr('id', 'guest-' + i);
    $guest.find('td:first-child').empty();
    $guest.find('.guest-ticket').html(resp.guests[i].ticketType + ' ' + resp.guests[i].ticketCode);
  }
  $('#contact-no').html('(' + resp.contact.countryCode + ') ' + resp.contact.contactNo);
  // show success section
  $('#success').show();
})
.fail(function(jqXHR, textStatus, errorThrown ) {
  console.error(textStatus);
  window.location="error.html";
});