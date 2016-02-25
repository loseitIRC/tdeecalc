var ttTDEE = "Total Daily Energy Expenditure (TDEE) is the <i>typical</i> amount of energy your body burns daily (sedentary)";
var ttBMR = "Basal Metabolic Rate (BMR) is the <i>minimum</i> amount of energy your body burns daily (zero activity, e.g. a coma)";

var spanBMR = '<span id="ttBMR" class="tt" data-toggle="tooltip" data-html="true" data-placement="right" title="'+ttBMR+'">BMR</span>'
var spanTDEE = '<span id="ttTDEE" class="tt" data-toggle="tooltip" data-html="true" data-placement="right" title="'+ttTDEE+'">TDEE</span>'

var calcTDEE = 'Click the above button to calculate '+spanTDEE+'.';
var calcBMR = 'Click the above button to calculate '+spanBMR+'.';

function setupTooltips() {
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
}
setupTooltips();    

$("input:radio[name=units]").click(function() {
var units = $(this).val();
 if (units == 'metric') {
  $("#inches").hide();
  $("#heightunits").text("cm");
  $("#weightunits").text("kg");
} else if (units == 'imperial') {
  $("#inches").show();
  $("#heightunits").text("ft");
  $("#weightunits").text("lb");
}
});

$("#calcbutton").click( function() { 
  var gender = $("input:radio[name=gender]:checked").val();
  var height = parseFloat( $("#height").val() );
  var inches = parseFloat( $("#height2").val() );
  var weight = parseFloat( $("#weight").val() );
  var age = parseInt( $("#age").val() );
  var units = $("input:radio[name=units]:checked").val();
  var bmr;
  if ( units == 'imperial' ) {
    height = (12*height+inches)*2.54;
    weight *= 1/2.2;
  }
  if ( isNaN(height) || isNaN(weight) || isNaN(age) || $.isEmptyObject(gender) ) {
    $("#BMR").html("Please fill out all fields.");
    $("#TDEE").html("");
    var errorColor = "rgba(249, 43, 43, 0.53)";
    $("#results").css({backgroundColor:errorColor}).delay(300).animate({backgroundColor:"transparent"},400);
    return false;
  }
  var s = 0;
  if ( gender == 'M' ) {
    s = 5;
  } else if ( gender == 'F' ) {
    s = -161;
  }
  bmr = 10*weight + 6.25*height - 5.0*age + s;
  var tdee = 1.2*bmr;
  $("#BMR").html("Your "+spanBMR+" is " + toFixed(bmr,0) + " kcal/day.");
  $("#TDEE").html("Your sedentary "+spanTDEE+" is " + toFixed(tdee,0) + " kcal/day.");
  $("#results").css({backgroundColor:"rgba(0,255,0,0.25)"}).delay(300).animate({backgroundColor:"transparent"},400);
  setupTooltips();
})

  function toFixed(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
  }

$(function() {
$("#TDEE").html(calcTDEE);
$("#BMR").html(calcBMR);
setupTooltips();
})

