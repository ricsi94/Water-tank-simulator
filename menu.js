var interval;
function update(x) {
    if (x=="sza1" || x=="sza2"){
        $("#" + x +"_output").html($("#" + x + "_input").val());
    }
    if (x=="H"){
        $("#" + x +"_output").html($("#" + x + "_input").val());
    }
    if (x=="z_szab"){
        $("#" + x +"_output").html($("#" + x + "_input").val());
    }
    if (x=="cv1"){
        $("#" + x +"_output").html($("#" + x + "_input").val());
    }
    if (x=="cv2"){
        $("#" + x +"_output").html($("#" + x + "_input").val());
    }
    if (x=="Kp"){
        $("#" + x +"_output").html($("#" + x + "_input").val());
    }
    if (x=="Ki"){
        $("#" + x +"_output").html($("#" + x + "_input").val());
    }
    if (x=="Kd"){
        $("#" + x +"_output").html($("#" + x + "_input").val());
    }


}
function down(x) {
     interval = setInterval(function() { update(x); }, 100);
}
function up() {
    clearInterval(interval);
}
function switch_change(){
    if($('#switch_button').is(':checked')){
        $('#H_input').val(0);
    }
}

