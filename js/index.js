var env = "development";
var currentStep = 1;
var maxGuestNum = 4;
var agreeTnC = false;
var $stepsEl = null;
var mode = 'new';
console.log(env);

(function() {
  'use strict';

  var formValidation = {
    step2: function step2Validation() {
      var $formStep2 = $('#form-step2');
      var isValidEmail = function(mail) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(mail);
      }
    
      // must not empty for required fields and validate each field
      $formStep2.find(':input[required]').each(function(i, e) {
        var $e = $(e);
        var $field = $e.closest('.field-container');

        // check if empty but ignore hidden guest input
        $([e, $field[0]]).toggleClass('is-invalid',
          $e.closest('.d-none').length
            ? false
            : $e.attr('type') == 'checkbox'
              ? !e.checked
              : e.value === ''
        );

        // email
        if (e.id === 'email' && e.value && !isValidEmail(e.value)) {
          $([e, $field[0]]).addClass('is-invalid');
        }
      });

      // fields cross checking
      if (guestForm.email.value != guestForm.confirmEmail.value) {
        var $input = $('input[type=email]').addClass('is-invalid');
        $input.closest('.field-container').addClass('is-invalid')
      }

      return $formStep2.find('.is-invalid').length === 0;
    },
    step3: function step3Validation() {
      return false;
    }
  }

  function loadShuttleBusTimeSlots() {
    var template = '<a class="col" href="#" value="_time_">_time_</a>';
    var el = null;
    var data = [
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '08:00', isFull: false },
      { time: '11:59', isFull: false },
      { time: '12:00', isFull: false },
      { time: '16:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '17:00', isFull: false },
      { time: '18:00', isFull: false },
      { time: '21:00', isFull: false }
    ]

    $('#time-slots-pm, #time-slots-am').empty();
    for(var x=0; x < data.length; x++) {
      el = template.replace(/_time_/g, data[x].time);
      if (data[x].time >= '12:00') {
        $('#time-slots-pm').append(el);
      } else {
        $('#time-slots-am').append(el);
      }
    }
  }

  // hide removed guest for user to restore it
  function renderGuestInput() {
    var $availGuest = $('.guest-input-group:lt(' + guestForm.guestNum.value + ')');
    var $unavailGuest = $('.guest-input-group:gt(' + (guestForm.guestNum.value - 1) + ')');

    // re-order the guest info
    if (guestForm.guest1Name.value === '') {
      guestForm.guest1Name.value = guestForm.guest2Name.value;
      guestForm.guest2Name.value = '';
      if (guestForm.guest1Name.value) {
        $('label[for=guest1-name]').addClass('focus');
      }
    }
    if (guestForm.guest2Name.value === '') {
      guestForm.guest2Name.value = guestForm.guest3Name.value;
      guestForm.guest3Name.value = '';
      if (guestForm.guest2Name.value) {
        $('label[for=guest2-name]').addClass('focus');
      }
    }
    if (guestForm.guest3Name.value === '') {
      guestForm.guest3Name.value = guestForm.guest4Name.value;
      guestForm.guest4Name.value = '';
      if (guestForm.guest3Name.value) {
        $('label[for=guest3-name]').addClass('focus');
      }
    }
    if (guestForm.guest1Ticket.value === '') {
      guestForm.guest1Ticket.value = guestForm.guest2Ticket.value;
      guestForm.guest2Ticket.value = '';
      if (guestForm.guest1Ticket.value) {
        $('label[for=guest1-ticket]').addClass('focus');
      }
    }
    if (guestForm.guest2Ticket.value === '') {
      guestForm.guest2Ticket.value = guestForm.guest3Ticket.value;
      guestForm.guest3Ticket.value = '';
      if (guestForm.guest2Ticket.value) {
        $('label[for=guest2-ticket]').addClass('focus');
      }
    }
    if (guestForm.guest3Ticket.value === '') {
      guestForm.guest3Ticket.value = guestForm.guest4Ticket.value;
      guestForm.guest4Ticket.value = ''
      if (guestForm.guest3Ticket.value) {
        $('label[for=guest3-ticket]').addClass('focus');
      }
    }

    // show / hide the first guest remove button
    $availGuest.eq(0).find('.remove-guest').toggleClass('d-none', guestForm.guestNum.value == 1);

    // show availabe guest input and make it required
    $availGuest.removeClass('d-none');
    $availGuest.find('input').attr('required','');

    // hide unavailable guest input
    $unavailGuest.addClass('d-none');
    // reset unavailable guest state and its value
    $unavailGuest.find('input').removeAttr('required').removeClass('is-invalid').val('');
    $unavailGuest.find('label').removeClass('focus');
    // reset unavailable guest field state for error message
    $unavailGuest.find('.field-container').removeClass('is-invalid');
  }

  // fill up the range with width on dragging
  function rangeFill() {
    var isIE = /Trident|Edge/.test(window.navigator.userAgent);
    var thumbSize = $(window).width() > 1366 ? '82px' : '60px';

    // if (isIE) $('#range-container').css('height', '80px');

    $('#range-fill').css('width',
      guestForm.guestNum.value > 1
        ? 'calc((((100% - ' + thumbSize + ') / 3) * ' + (guestForm.guestNum.value - 1) + ') + ' + thumbSize + ' - (' + thumbSize + ' / 2))'
        : 0
    );
    $('#guest-num-value').text(guestForm.guestNum.value);
  }

  window.addEventListener('load', function() {
    // datepicker initialzation
    // reference: https://github.com/uxsolutions/bootstrap-datepicker
    var datepickerTCnSC = {
      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysMin: ["日", "一", "二", "三", "四", "五", "六"],
      months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: "Today",
      clear: "Clear",
      format: "mm/dd/yyyy",
      titleFormat: "yyyy年MM", /* Leverages same syntax as 'format' */
      weekStart: 0
    };

    $.fn.datepicker.dates['tc'] = datepickerTCnSC;
    $.fn.datepicker.dates['sc'] = datepickerTCnSC;
  
    $('#datepicker').datepicker({
      format: 'dd/mm/yyyy',
      language: $('html').attr('lang'),
      templates: {
        leftArrow: '<i class="icon nav-arrow-left"></i>',
        rightArrow: '<i class="icon nav-arrow-right"></i>'
      }
    });

    // render guest inputs based on number of guests in the form
    var template = $('#guest-input-template').html();
    for (var n=1; n <= maxGuestNum; n++) {
      $(guestForm).find('#fieldsets').append(template.replace(/_Index/g, n));
    }
    renderGuestInput();
    rangeFill();

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    // var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    // var validation = Array.prototype.filter.call(forms, function(form) {
    //   form.addEventListener('submit', function(event) {
    //     if (form.checkValidity() === false) {
    //       event.preventDefault();
    //       event.stopPropagation();
    //     }
    //     form.classList.add('was-validated');
    //   }, false);
    // });

    // setup mobile menu based on viewport
    mobileStickyMenu();

    // resolve yellow selector over the text (day value)
    $('#datepicker table td').wrapInner('<label class="position-relative m-0"></label>');

    // set active form for modify mode
    // todo: handle modify

    // -------------------------------------------
    // events setup
    // -------------------------------------------

    $('#shuttle-bus-input').on('click', function(e) {
      $('#shuttle-bus-service-label').attr('require-service', this.checked ? 'yes' : 'no');
    });

    // remove guest by clicking trash
    $('.remove-guest').on('click', function(e) {
      e.preventDefault();
      var $guest = $(this).closest('.guest-input-group');
      guestForm.guestNum.value--;
      // clear all value of this guest
      $guest.find('input').val('');
      // $guest.appendTo('#fieldsets');
      renderGuestInput();
      rangeFill();
    });

    $('#datepicker').on('changeMonth', function() {
      // intentionally delay as here is on before trigger
      setTimeout(function() {
        $('#datepicker table td').wrapInner('<label class="position-relative m-0"></label>');
      },100);
    });

    $('#datepicker').on('changeDate', function() {
      guestForm.dateOfVisit.value = $('#datepicker').datepicker('getFormattedDate');
      $('#dateOfVisit').text(guestForm.dateOfVisit.value);
      $('#date-of-visit-input').removeClass('is-invalid');
      $('#datepicker table td').wrapInner('<label class="position-relative m-0"></label>');
    });

    // input label movement based on input state
    $('form input').on('focus', function(e) {
      $(this).prev('.input-label').addClass('focus');
    });
    $('form input').on('blur', function(e) {
      if (!this.value)
        $(this).prev('.input-label').removeClass('focus');
    });

    // re-render guest input based on number of guests
    // and fill up the range on dragging
    $('#guest-num')
      .on('change', function(e) {
        if (guestForm.guestNum.value < maxGuestNum) {
          $('.guest-input-group').eq(guestForm.guestNum.value).find('input').val('');
        }
        renderGuestInput();
      })
      .on('input change', function(e) {
        rangeFill();
      });

    $('#form-submit').on('click',function(e) {
      // e.preventDefault();
      // guestForm.submit();
    });

    // animation control of ticket type button
    $('#ticket-type-container .btn').on('mouseover', function(e) {
      $(this).parent('.btn-group').attr('hover', $(this).index());
    });
    $('#ticket-type-container .btn').on('mouseout', function(e) {
      $(this).parent('.btn-group').removeAttr('hover');
    });

    // timeslots
    $('#time-slots .col').on('click', function(e) {
      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
      guestForm.shuttleBusTimeSlot.value = $(this).attr('value');
      e.preventDefault();
    });

    // mobile only: show bottom shadow of sticky steps when scroll down
    $(window).on('resize', function(e) {
      $('.form-layer').off('scroll.mobileStickyMenu');
      mobileStickyMenu();
    });

    // tnc scrolling handling
    $('#form-step1').on('scroll', function() {
      var scrollTop = $(this).scrollTop();
      var isHidden = scrollTop + $(this).height() > (this.scrollHeight - 298);  // 128 (btn row height) + 170 (reserved footer height)
      $('#fading-bg').toggleClass('d-none', isHidden);
    });
    
    // agreen tnc
    $('#agree-tnc').on('click', function(e) {
      agreeTnC = true;
      $('#steps, .mobile-steps').removeClass('disabled');
      $(this).addClass('d-none');
    });

    // steps and step buttons listener
    $('.step-btn').on('click', function(e) {
      e.preventDefault();
      if (!agreeTnC) return;
      var stepId = $(this).attr('href');
      if (stepId === '#form-step' + currentStep) return;
      var nextStep = Number(stepId.slice(-1));

      // validation before next step
      if (currentStep > 1 && nextStep > currentStep) {
        var isValidForm = formValidation['step' + currentStep]();
        $('#check-error').toggleClass('d-none', isValidForm);
        if (!isValidForm && env == 'production') {
          if(this.id === 'step2-submit') {
            $('#form-step2')[0].scrollTo(0, 99999);
          }
          return;
        }
      }

      // switch to next step page
      currentStep = nextStep;
      $('.form-layer').addClass('hidden').removeClass('active');
      $(stepId).removeClass('hidden').addClass('active');
      // reset all active
      $('#steps ul > li').removeClass('active');
      $('.mobile-steps > li').removeClass('active');
      // active steps to current
      for (var x=1; x <= currentStep; x++) {
        $('#steps ul > li[step="' + x + '"]').addClass('active');
        $('.mobile-steps > li[step="' + x + '"]').addClass('active');
      }

      if (currentStep == 3) {
        loadShuttleBusTimeSlots();
      }

      // get the current active element for mobile
      $stepsEl = $('.form-layer.active .mobile-steps');
    });
    
    // only accept alphabets for name (remove numbers and special chars)
    $('input[id*=name]').on('keyup', function(e) {
      if (this.value.match(/[0-9_~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g)) {
        this.value = this.value.replace(/[0-9_~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g, '');
      }
    });  

    // only accept alphabets and number for ticket number (remove special chars)
    $('input[id*=ticket]').on('keyup', function(e) {
      if (this.value.match(/[_~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g)) {
        this.value = this.value.replace(/[_~`!@#$%\^&*()+=\-\[\]\\';,/{}|\\":<>\?]/g, '');
      }
    });  

    // shuttle bus time slots navigation
    $('#time-slots-heading a').on('click', function(e) {
      e.preventDefault();
      var slot = ['am', 'pm'];
      var current = $('#time-slots-container').attr('time-slot');
      var newSlot = 0;
      var inc = this.id == 'time-slot-next' ? 1 : -1

      newSlot = slot.indexOf(current) + inc;
      // recycling the slot
      if (newSlot > slot.length) newSlot = 0;
      if (newSlot < 0) newSlot = slot.length - 1;

      $('#time-slots-container').attr('time-slot', slot[newSlot]);
    });

    // loading completed
    setTimeout(function(e) {
      $('body').removeClass('loading');
    },500);

  }, false);
})();