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
if ( isNaN(height) || isNaN(inches) || isNaN(weight) || isNaN(age) ) {
    $("#BMR").text("Please fill out all fields.");
    $("#TDEE").text("Please fill out all fields.");
    return false;
}
var bmr;
if ( units == 'imperial' ) {
    height = (12*height+inches)*2.54;
    weight *= 1/2.2;
}
var s = 0;
if ( gender == 'M' ) {
    s = 5;
} else if ( gender == 'F' ) {
    s = -161;
}
bmr = 10*weight + 6.25*height - 5.0*age + s;
var tdee = 1.2*bmr;
$("#BMR").html("Your BMR<sup id=\"ttBMR\" class=\"tt\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"right\" title=\"Basal Metabolic Rate (BMR) is the <i>minimum</i> amount of energy your body burns daily (zero activity, e.g. a coma)\">?</sup> is " + toFixed(bmr,0) + " kcal/day");
$("#TDEE").html("Your sedentary TDEE<sup id=\"ttTDEE\" class=\"tt\" data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"right\" title=\"Total Daily Energy Expenditure (TDEE) is the <i>typical</i> amount of energy your body burns daily (sedentary)\">?</sup> is " + toFixed(tdee,0) + " kcal/day");
setupTooltips();
})

function toFixed(value, precision) {
var power = Math.pow(10, precision || 0);
return String(Math.round(value * power) / power);
}
