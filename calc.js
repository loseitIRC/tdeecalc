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
var age = parseFloat( $("#age").val() );
var units = $("input:radio[name=units]:checked").val();
var bmr;
if ( height == '' || weight == '' || age == '' ) {
    $("#BMR").text("Please fill out all fields.");
    $("#TDEE").text("Please fill out all fields.");
    return false;
}
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
$("#BMR").text("Your BMR is " + toFixed(bmr,0) + " kcal/day");
$("#TDEE").text("Your sedentary TDEE is " + toFixed(tdee,0) + " kcal/day");
})

function toFixed(value, precision) {
var power = Math.pow(10, precision || 0);
return String(Math.round(value * power) / power);
}
