$(document).ready(function() {
  $.fn.makeTipEventListeners();
  $.fn.makeCustomTipEventListener();
  $.fn.makeResetEventListener();
  $.fn.makeInputEventListener("people-input");
  $.fn.makeInputEventListener("bill-input");
});

$.fn.makeResetEventListener = function() {
  $(".reset_button").click(function() {
    $(".people-input").val("");
    $(".bill-input").val("");
    $("#total_tip_amount").text("$0.00");
    $("#total_tip_amount_per_person").text("$0.00");
    $("#custom_tip_percentage_bttn").val("Custom");
    $(".cantBeZeroPara").hide();
  });
};

$.fn.makeInputEventListener = function(input) {
  const inputClass = $(`${"." + input}`);
  const inputWarningTextID = `${"#" + input}`;
  inputClass.focusout(function() {
    if (!$.fn.isNumberGreaterThanZero(inputClass.val())) {
      $(`${inputWarningTextID + "_zero_para"}`).show();
    } else {
      $(`${inputWarningTextID + "_zero_para"}`).hide();
      const tipPercentage = $('input[name="tip"]:checked').val();
      if (tipPercentage === undefined) {
        $.fn.updateTipUI($("#custom_tip_percentage_bttn").val());
      } else {
        $.fn.updateTipUI(tipPercentage);
      }
    }
  });
};

$.fn.makeTipEventListeners = function() {
  document.querySelectorAll(".tip_bttn").forEach(bttn => {
    bttn.addEventListener("click", event => {
      const tipPercentage = parseInt(bttn.value);
      if ($(".people-input").val() <= 0) {
        $("#people_number_zero_para").show();
      }
      if ($(".bill-input").val() <= 0) {
        $("#bill_zero_para").show();
      } else {
        $.fn.updateTipUI(tipPercentage);
      }
    });
  });
};

$.fn.makeCustomTipEventListener = function() {
  $("#custom_tip_percentage_bttn").click(function() {
    this.value = "";
    $("input[type=radio]").prop("checked", false);
    $.fn.checkForFocusOut();
  });
};

$.fn.checkForFocusOut = function() {
  $("#custom_tip_percentage_bttn").focusout(function() {
    $.fn.updateTipUI($("#custom_tip_percentage_bttn").val());
  });
};

$.fn.updateTipUI = function(tipPercentage) {
  if (
    $.fn.isNumberGreaterThanZero($(".bill-input").val()) &&
    $.fn.isNumberGreaterThanZero($(".people-input").val())
  ) {
    const tipTotal = $.fn.calculateTipTotal(tipPercentage);
    const tipTotalPerPerson = $.fn.calculateTipTotalPerPerson(tipPercentage);
    $.fn.updateTipTotal(tipTotal);
    $.fn.updateTipTotalPerPerson(tipTotalPerPerson);
  }
};

$.fn.calculateTipTotal = function(tip) {
  return $(".bill-input").val() * (tip / 100);
};

$.fn.calculateTipTotalPerPerson = function(tip) {
  return $(".bill-input").val() * (tip / 100) / $(".people-input").val();
};

$.fn.updateTipTotal = function(tipTotal) {
  $("#total_tip_amount").text(tipTotal.toFixed(2));
};

$.fn.updateTipTotalPerPerson = function(tipTotalPerPerson) {
  $("#total_tip_amount_per_person").text(tipTotalPerPerson.toFixed(2));
};

$.fn.isNumberGreaterThanZero = function(val) {
  return val > 0 && !isNaN(val);
};
