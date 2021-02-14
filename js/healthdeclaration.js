var isSmartFunPage = $('html.op-custom.smartFun').length > 0;
var apiPrefix = isSmartFunPage ? 'sf-' : '';
var apiDateVisit = '';
var renderCalendar = function() {
  // var availDate = resp.data;
  $("#edit-submitted-dateVisit").datepicker("destroy");
  $("#edit-submitted-dateVisit").datepicker({
    numberOfMonths: $(window).outerWidth() > 767 ? 2 : 1,
    minDate: 0,
    maxDate: '+2M',
    hideIfNoPrevNext: true,
    dateFormat: 'dd/mm/yy',
    onSelect: function(date) {
      $('#edit-submitted-dateVisit-input').val(date);
      $('#calendar-section').hide();
      apiDateVisit = date.replace(/\//g, '-');
    },
    // filter available dates to be selectable
    beforeShowDay: function(date) {
      var dateSelected = $('#edit-submitted-dateVisit-input').val();
      var compareDateString = $.datepicker.formatDate('dd/mm/yy', date);
      var isSelected = compareDateString === dateSelected ? 'ui-state-selected' : '';
      isSelected ? console.log(dateSelected) : '';
      return [true,  isSelected];
    }
    // beforeShowDay: function(date) {
    //   var dateSelected = $('#edit-submitted-dateVisit-input').val();
    //   var dateString = $.datepicker.formatDate('yy-mm-dd', date);
    //   var compareDateString = $.datepicker.formatDate('dd/mm/yy', date);
    //   var found = true;
    //   var isFull = false;
    //   for (var i = 0; i < availDate.length && !found; i++) {
    //     if (dateString === availDate[i].date) {
    //       found = availDate[i].available;
    //       isFull = !availDate[i].available && availDate[i].full;
    //       // if date not availabe, force user to choose again
    //       if (compareDateString === dateSelected && !availDate[i].available) {
    //         dateSelected = '';
    //         $('#edit-submitted-dateVisit-input').val(dateSelected);
    //       }
    //       break;
    //     }
    //   }
    //   return [found, isFull ? 'ui-state-full' : compareDateString === dateSelected ? 'ui-state-selected' : ''];
    // }
  });
}

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

renderCalendar();

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

// form submit handling
var $form = $('.op-custom form.webform-client-form');
$form.submit(function(e) {
  var validEmail = function(mail) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  }

  // validation
  // must not empty for required fields
  $form.find('[required]:input').not('.d-none').each(function(i, e) {
    var $e = $(e);
    $([$e, $e.closest('.form-item')]).toggleClass('error', $e.hasClass('form-checkbox') ? !e.checked : e.value === '');
  });

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

// only accept alphabetic for name in English only
// if ($('html').attr('lang') === 'en') {
//   $('.op-custom input[id*=guest], .op-custom #edit-submitted-name').on('keyup', function(e) {
//     if (this.value.match(/[^a-zA-Z]/g)) {
//       this.value = this.value.replace(/[^a-zA-Z]/g, '');
//     }
//   });
// }