$(document).ready( function() {
    // setTimeout(function() {
    //     $('.main .container .title, .main .container .subtitle, .main .container button, .social').addClass('show-me');
    // }, 350);
    $(window).on('scroll', function(){
    animateElements();
    //   if ($(this).scrollTop() > 100) {
    //       $('.scrollup').fadeIn();
    //   } else {
    //       $('.scrollup').fadeOut();
    //   }
    });
    var paymentMethod = "venmo";
    $('form #submit').addClass('disabled');
    $('form input').on('change, keyup', function(e) {
      if (!$('form input').val()) {
        $('form #submit').addClass('disabled');
      } else {
        $('form #submit').removeClass('disabled');
      }
    });
  $('input[type="radio"] + img').on('click', function(e) {
    // console.log(e);
    // console.log($(this).prev());
    var radioId = $(this).prev()[0].id;
    // console.log(radioId);
    if (radioId == 'squareCash') {
      $('p#cash_notice').addClass('showCash');
    } else {
      $('p#cash_notice').removeClass('showCash');
    }
    $(this).prev().prop('checked', 'checked');
    switch (radioId) {

      case 'squareCash':
        paymentMethod = "square";
        break;
      case 'payPal':
        paymentMethod = "pp";
        break;
      case 'cashPay':
        paymentMethod = "cash"
        break;
      default:
        break;
    }
  });
  $('#submit').on('click', function(e) {
    e.preventDefault();
    var amount = $('#donation-amount');
    var whoThis = $("#fromWho");
    // console.log(amount.val());
    $form = $("#Donate");
    if (!whoThis.val() && !amount.val()) {
      whoThis.addClass('error');
      amount.addClass('error');
    } else if (!whoThis.val()){
      whoThis.addClass('error');
    } else if (!amount.val()) {
      amount.addClass('error');
    } else {
      runGS();
      console.log(amount);
      switch (paymentMethod) {

        case 'square':
          window.open('https://www.epay.bg/v3main/paylogin?min=6627863615&total='+amount.val()+'&checksum=68c37c33350eab47fd37786eeb1ea9e1a39feb19&descr=%D0%91%D1%8F%D0%B3%D0%B0%D0%BC%20%D0%B8%20%D0%94%D0%B0%D1%80%D1%8F%D0%B2%D0%B0%D0%BC&encoding=utf8&url_ok=https%3A%2F%2Fwww.epay.bg%2Fv3main%2Ffront%3Fp%3Dthanks&url_cancel=https%3A%2F%2Fwww.epay.bg%2Fv3main%2Ffront%3Fp%3Dcancel','_blank');
          break;
        case 'pp':
          window.open('https://www.paypal.me/INedkov/'+amount.val(),'_blank');
          break;
        case 'cashPay':
          break;
        default:
          break;
      }
    }
  });
  var navigationItems = $('.main .container a#donate');
  navigationItems.on('click', function(event){
      event.preventDefault();
      smoothScroll($(this.hash));
  });
  function animateElements() {
    var htmlHeight = $('html').height();
    var wScroll = $(this).scrollTop();
    if (wScroll > 120) {
        $('.main .container').fadeOut();
    } else {
        $('.main .container').fadeIn();
    }
    console.log(wScroll);
  //   if(wScroll > ($('section.letter').offset().top - ($(window).height() / 1.2))) {
  //     $('.letter-header, .letter p').each(function(i){
  //         setTimeout(function() {
  //             $('.letter-header, .letter p').eq(i).addClass('show-me');
  //         }, 400 * (i+1));
  //     });
  //   }
  //   if(wScroll > ($('section.donate').offset().top - ($(window).height() / 2))) {
  //     $('form .wrapper').each(function(i){
  //         setTimeout(function() {
  //             $('form .wrapper').eq(i).addClass('show-me');
  //         }, 250 * (i+1));
  //     });
  //   }
  // }
  // });
  }
  function smoothScroll(target) {
    $('body,html').animate({
        'scrollTop':target.offset().top
    }, {
        duration: 1200,
        easing: 'easeInOutExpo'
    });
  }
});