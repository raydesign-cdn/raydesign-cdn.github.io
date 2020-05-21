// datepicker setup
// var apiUrl = 'https://op-reg.mirumhk.com/api/timeslots';
var apiUrl = '/data/timeslots.json';
$.ajax({
  url: apiUrl,
  method: "GET",
  dataType: 'JSON',
  contentType: 'application/json; charset=UTF-8'
})
.done(function(resp) {
  if (resp.success) {
    var availDate = resp.data;
    $("#edit-submitted-dateVisit").datepicker({
      numberOfMonths: $(window).outerWidth() > 767 ? 2 : 1,
      minDate: new Date(availDate[0].date),
      maxDate: new Date(availDate[availDate.length-1].date),
      hideIfNoPrevNext: true,
      // filter available dates to be selectable
      beforeShowDay: function(date){
        var dateString = $.datepicker.formatDate('yy-mm-dd', date);
        var found = false;
        for (var i=0; i < availDate.length && !found; i++) {
          found = dateString === availDate[i].date && availDate[i].available;
        }
        return [ found ];
      }
    });
  } else {
    window.location = 'error.html';
  }
})
.fail(function(jqXHR, textStatus, errorThrown ) {
  window.location = 'error.html';
});

// events setup

// close dialog
$('.mx-custom .close').on('click', function(e) {
  e.preventDefault();
  $('.mx-custom .dialog').hide();
  $('body').removeClass('overflow-hidden');
});

// show dialog for clicking tnc
$('.mx-custom .tnc').on('click', function(e) {
  e.preventDefault();
  $('.mx-custom .dialog').show();
  $('body').addClass('overflow-hidden');
});

// dynamically add and remove guests
$('#edit-submitted-guestNum').on('change', function(e) {
  $('.guest-ticket-info').remove();
  if (this.value) {
    var template = $('#guest-ticket-info-template').html();
    // render list of guest info
    for(var i=0; i < this.value; i++) {
      $('.guest-ticket-info-section').append(template.replace(/@{guestNum}/g, i+1));
    }
    $('.guest-ticket-info-section, .webform-component--dateVisit').show();
  } else {
    $('.guest-ticket-info-section, .webform-component--dateVisit').hide();
  }
});

// form submit handling
var $form = $('.mx-custom form');
$form.on('submit', function(e) {
  e.preventDefault();
  // validation
  $('.mx-custom :input:not("#g-recaptcha-response")').each(function(i, e) {
    var $e = $(e);
    $e.add($e.closest('.form-item')).toggleClass('has-error', $e.hasClass('form-checkbox') ? !e.checked : e.value === '');
  });

  // email verification
  if (registrationForm.email.value !== registrationForm.reinputEmail.value) {
    $(registrationForm.reinputEmail).add(registrationForm.reinputEmail.parentNode).addClass('has-error');
  }

  // stop here if any error found
  if ($form.find('.has-error').length) {
    return;
  }

  var formData = {
    guestNum: registrationForm.guestNum.value,
    dateVisit: registrationForm.dateVisit.value,
    guests: [],
    email: registrationForm.email.value,
    contact: {
      countryCode: registrationForm.countryCode.value,
      contactNo: registrationForm.contactNo.value,
    }
  }
  // save tickets info
  for(var i=0; i < formData.guestNum; i++) {
    formData.guests.push({
      ticket: $('input[name="guest' + (i+1) + 'Ticket"]:checked').val(),
      ticketCode: registrationForm['guest' + (i+1) + 'TicketCode'].value
    });
  }
  // here should call api to save reg info with formData
  // ...
  console.log('passed');
});

// enable and disable ticke code based on ticket type
$('.mx-custom .guest-ticket-info-section').delegate('input[type=radio]', 'click', function(e) {
  var currentOption = this.value;
  var codeInputElement = registrationForm[this.getAttribute('name') + 'Code'];
  if (currentOption === 'others') {
    $(codeInputElement).val($(this).data('codevalue'));
    $(codeInputElement).attr('disabled', true);
  } else {
    $(codeInputElement).val('');
    $(codeInputElement).removeAttr('disabled');
  }
});
