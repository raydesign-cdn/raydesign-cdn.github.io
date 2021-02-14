var isSmartFunPage = $('html.op-custom.smartFun').length > 0;
var apiPrefix = isSmartFunPage ? 'sf-' : '';
var apiDateVisit = '';

function sfValidation(element) {
  var barcode = element.value;
  var $element = $(element);
  var apiUrl = '/api/sf-validate/' + barcode + '/' + apiDateVisit;
  var result = null;
  // duplication check
  $('.guest-ticket-info-group .guest-ticket-info:not(.d-none)').each(function(i, el) {
    var $anotherBarcode = $(el).find('input[type="text"]');
    if (!$element.is($anotherBarcode) && barcode == $anotherBarcode.val() && result == null) {
      result = { duplicate: true }
    }
  });
  if (result == null) {
    $.ajax({
        url: apiUrl,
        method: "GET",
        dataType: 'JSON',
        async: false,
        contentType: 'application/json; charset=UTF-8'
      })
      .done(function(resp) {
        result = resp.data;
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        result = null;
      });
  }
  return result;
}

// events setup

// reset form on browser navigating such as back page
$(window).on("pageshow", function() {
  var form = $('form');
  // let the browser natively reset defaults
  form[0].reset();
  // To remove error state from back page
  $('.captcha.error').removeClass('error');
});

// close dialog
$('.op-custom .close').on('click', function(e) {
  e.preventDefault();
  $('.op-custom .dialog').hide();
  $('body').removeClass('overflow-hidden');
});

// show dialog for clicking tnc
$('.op-custom .tnc').on('click', function(e) {
  e.preventDefault();
  $('.op-custom .dialog').show();
  $('body').addClass('overflow-hidden');
});

$('#edit-submitted-dateVisit-input').on('click', function(e) {
  $('#calendar-section').show();
});

// dynamically add and remove guests
$('#edit-submitted-guestNum').on('change', function(e) {
  if (this.value) {
    //datepicker setup
    // var apiUrl = '/api/' + apiPrefix + 'timeslots' + '/' + this.value;
    var apiUrl = '/data/' + apiPrefix + 'timeslots.json';
    $.ajax({
        url: apiUrl,
        method: "GET",
        dataType: 'JSON',
        contentType: 'application/json; charset=UTF-8'
      })
      .done(function(resp) {
        if (resp.success) {
          var availDate = resp.data;
          $("#edit-submitted-dateVisit").datepicker("destroy");
          $("#edit-submitted-dateVisit").datepicker({
            numberOfMonths: $(window).outerWidth() > 767 ? 2 : 1,
            minDate: new Date(availDate[0].date),
            maxDate: new Date(availDate[availDate.length - 1].date),
            hideIfNoPrevNext: true,
            dateFormat: 'dd/mm/yy',
            onSelect: function(date) {
              $('#edit-submitted-dateVisit-input').val(date);
              // $('#calendar-section').hide();
              apiDateVisit = date.replace(/\//g, '-');
            },
            // filter available dates to be selectable
            beforeShowDay: function(date) {
              var dateSelected = $('#edit-submitted-dateVisit-input').val();
              var dateString = $.datepicker.formatDate('yy-mm-dd', date);
              var compareDateString = $.datepicker.formatDate('dd/mm/yy', date);
              var found = false;
              var isFull = false;
              for (var i = 0; i < availDate.length && !found; i++) {
                if (dateString === availDate[i].date) {
                  found = availDate[i].available;
                  isFull = !availDate[i].available && availDate[i].full;
                  // if date not availabe, force user to choose again
                  if (compareDateString === dateSelected && !availDate[i].available) {
                    dateSelected = '';
                    $('#edit-submitted-dateVisit-input').val(dateSelected);
                  }
                  break;
                }
              }
              return [found, isFull ? 'ui-state-full' : compareDateString === dateSelected ? 'ui-state-selected' : ''];
            }
          });
        } else {
          window.location = 'error.html';
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        window.location = 'error.html';
      });
    var template = $('#guest-ticket-info-template').html();
    // render list of guest info
    var numGuests = $('.guest-ticket-info').length
    var $guestInfo;
    // create new info element or show it if already exist
    for (var i = 0; i < this.value; i++) {
      $guestInfo = $('.guest-ticket-info').eq(i);
      if ($guestInfo.length) {
        $guestInfo.removeClass('d-none').find('input').removeClass('d-none');
      } else {
        $('.guest-ticket-info-group').append(template.replace(/@{guestNum}/g, i + 1));
      }
    }
    // hide all redundant guests info
    $('.guest-ticket-info:gt(' + (this.value - 1) + ')').addClass('d-none')
      .find('input').addClass('d-none');
    // show the section
    $('#calendar-section, .guest-ticket-info-section, .webform-component--dateVisit').show();
  } else {
    // hide the section as no guests info
    $('#calendar-section, .guest-ticket-info-section, .webform-component--dateVisit').hide();
  }
});

// form submit handling
var $form = $('.op-custom form.webform-client-form');
$form.submit(function(e) {
  var validEmail = function(mail) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  }

  // validation
  // must not empty for required fields
  $form.find(':input').not('.d-none').each(function(i, e) {
    var $e = $(e);
    $([$e, $e.closest('.form-item')]).toggleClass('error', $e.hasClass('form-checkbox') ? !e.checked : e.value === '');
  });

  // ticket code length
  $form.find('.guest-ticket-info .guest-code input.form-text').not('.d-none').each(function(i, e) {
    var $e = $(e);
    var currentOption = $e.closest('.form-item').prev('.webform-component').find('input:checked').val();
    var fieldset = [$e, $e.closest('.form-item')];
    // smartFun validation
    if (isSmartFunPage) {
      $e.closest('.form-item').find('.message').addClass('d-none');
      if (e.value.length < 1) {
        $(fieldset).toggleClass('error', true);
        $e.closest('.form-item').find('.message.len-err').removeClass('d-none');
      } else if (apiDateVisit) {
        var resp = sfValidation(e);
        if (!resp) {
          $(fieldset).toggleClass('error', true);
          $e.closest('.form-item').find('.message.sys-err').removeClass('d-none');
        } else if (resp.duplicate) {
          $(fieldset).toggleClass('error', true);
          $e.closest('.form-item').find('.message.duplicated').removeClass('d-none');
        } else if (!resp.valid) {
          $(fieldset).toggleClass('error', true);
          $e.closest('.form-item').find('.message.invalid').removeClass('d-none');
        } else if (resp.expired) {
          $(fieldset).toggleClass('error', true);
          $e.closest('.form-item').find('.message.expired').removeClass('d-none');
        }
      }
    } else {
      // general ticket validation
      var hasError = e.value.length < 4 || (currentOption == 'others' && (isNaN(e.value) || Number(e.value) < 1900 || Number(e.value) > new Date().getFullYear()));
      $(fieldset).toggleClass('error', hasError);
      $e.closest('.form-item').find('.message').addClass('d-none');
      $e.closest('.form-item').find('.message' + (currentOption == 'generalTickets' ? '.empty-err' : '.year-err')).removeClass('d-none');
    }
  });

  // contact number validation
  if (registrationForm.contactNumber.value.length < 8) {
    $([registrationForm.contactNumber, registrationForm.contactNumber.parentNode]).addClass('error');
  }

  // email verification
  if (!validEmail(registrationForm.email.value)) {
    $([registrationForm.email, registrationForm.email.parentNode]).addClass('error');
  }

  if (registrationForm.email.value !== registrationForm.reinputEmail.value) {
    $([registrationForm.email, registrationForm.reinputEmail, registrationForm.reinputEmail.parentNode]).addClass('error');
  }

  if ($form.find('.captcha') != null) {
    var v = grecaptcha.getResponse();
    $form.find('.captcha').toggleClass('error', v.length == 0);
  }

  // no. of guests and visit date cross check
  // $(registrationForm.dateVisit).toggleClass('error', registrationForm.guestNum.value > 5 && registrationForm.dateVisit.value === '06/01/2020');

  // stop here if any error found
  var inputErrors = $form.find(':input.error').not('.d-none, .g-recaptcha-response').length;
  if (inputErrors || $('.captcha.error').length) {
    // not to show message if just recaptcha fail
    $('.form-actions .message').toggleClass('d-none', inputErrors === 0);
    return false;
  }

  // remove all unused field before submit
  $form.find(':input.d-none').remove();

  return true;

});

// max. length of contact number is 8
$('.op-custom #edit-submitted-contactNumber').on('keyup', function(e) {
  if (this.value.length > 8) {
    this.value = this.value.slice(0, 8);
  }
});

// enable and disable ticket code based on ticket type
$('.op-custom .guest-ticket-info-section').delegate('input[type=radio]', 'click', function(e) {
  var currentOption = this.value;
  var codeInputElement = registrationForm[this.getAttribute('name') + 'Code'];
  if (/buyTickets/.test(currentOption)) {
    $(codeInputElement).val($(this).data('codevalue'));
    $(codeInputElement).attr('disabled', true);
  } else {
    $(codeInputElement).val('');
    $(codeInputElement).removeAttr('disabled');
  }
  // show corresponding label for input
  $(this).closest('.guest-ticket-info').find('.guest-code-label').each(function(i, el) {
    var forOption = $(el).attr('for');
    $(el).toggleClass('d-none', currentOption != forOption);
  });
});

// only accept alphabetic for name in English only
// if ($('html').attr('lang') === 'en') {
//   $('.op-custom .guest-ticket-info-section').delegate('.guest-name input[type=text]', 'keyup', function(e) {
//     if (this.value.match(/[^a-zA-Z]/g)) {
//       this.value = this.value.replace(/[^a-zA-Z]/g, '');
//     }
//   });
// }

// only accept alphanumeric for ticket code and length
$('.op-custom .guest-ticket-info-section').delegate('.guest-code input[type=text]', 'keyup', function(e) {
  var maxlength = isSmartFunPage ? 16 : 4;
  var option = $(this).closest('.form-item').prev('.webform-component').find('input:checked').val();
  if (!isSmartFunPage && option == 'others' && this.value.match(/[^0-9]/g) != null) {
    this.value = this.value.replace(/[^0-9]/g, '');
  } else if (this.value.match(/[^a-zA-Z0-9]/g)) {
    this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
  }
  if (this.value.length > maxlength) {
    this.value = this.value.slice(0, maxlength);
  }
  if (isSmartFunPage) {
    this.value = this.value.toUpperCase();
  }
});