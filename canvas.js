window.onoff=false;
var onoffinterval_process;
var onoffinterval_info;

function szelep2refresh(x){
document.getElementById("sza2_input").value=x*100;
$("#" + "sza2" +"_output").html($("#" + "sza2" + "_input").val() + " %");
}
function strokee(){ctx.stroke();ctx.stroke();ctx.stroke();ctx.stroke();ctx.stroke();  }

function szelepcontrol(z){
    var left_valve_down;
    var right_valve_down;
    left_valve_down=60-(Number($("#sza1_input").val())/10);
    right_valve_down=(140-$('#H_input').val()*16)-(Number($("#sza2_input").val())/10);
    //console.log(right_valve_down);
    //bal szelep control kezdet
    ctx.moveTo(25, 50);
    ctx.lineTo(25, left_valve_down);
    strokee();
    //bal szelep control veg
    //jobb szelep control kezdet
    ctx.moveTo(275, 130-$('#H_input').val()*16);
    ctx.lineTo(275, right_valve_down);
    strokee();
    //jobb szelep control veg
    //bal szelep viz kezdet
    ctx.fillStyle = "blue";
    if(left_valve_down!=60){ //ha nincs zarva a szelep
        ctx.fillStyle = "blue";


        ctx.beginPath();
        ctx.moveTo(25, left_valve_down);
        ctx.lineTo(25, 60);
        ctx.lineTo(50, 60);
        ctx.fill();
        ctx.fillRect(50, 60, 2, 80);

    }
    if(z>5 && z<(5+10/16)){
        ctx.fillRect(25, 60, 25, -(z*16-80));
 
    }
    if(z>=(5+10/16)){
        ctx.fillRect(25, 60, 25, -(10));
    }
    //bal szelep viz vege

    //jobb szelep viz kezdet
    if(right_valve_down!=140-$('#H_input').val()*16){ //ha nincs lezarva a szelep
        //console.log("Jobb szelep nyitva");
        if(right_valve_down>(140-z*16)) { //feljebb van a viz szintje mint a szelep zarokapujanak also pontja
            ctx.beginPath();
            ctx.moveTo(275, right_valve_down);
            ctx.lineTo(275, 140-$('#H_input').val()*16);
            ctx.lineTo(300, 140-$('#H_input').val()*16);
            ctx.fill();
        }
        else{
            if(z>=$('#H_input').val()) {

                ctx.beginPath();
                ctx.moveTo(275, 140-z*16);
                ctx.lineTo(275, 140-$('#H_input').val()*16);
                ctx.lineTo(300, 140-$('#H_input').val()*16);
                ctx.fill();
            }
        }
    }


    if(z>(Number($('#H_input').val())) && z<(Number($('#H_input').val())+(10/16)) ){
        ctx.fillRect(250, 140-$('#H_input').val()*16, 25, -((z-(Number($('#H_input').val())))*16));
    }
    if(z>=(Number($('#H_input').val())+(10/16))){
        ctx.fillRect(250, 140-Number($('#H_input').val())*16, 25, -(10));
    }
    //jobb szelep viz vege

}

function vizrajzolasa(z) {
    ctx.fillStyle="blue";
    ctx.fillRect(50, 140, 200, -z*16); //16px = 1 meter
}
function alertrajz(){
    ctx.font="10px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("A L E R T", 150, 10);

}
function alapcanvas(){
    //bal cso kezdet
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(50, 50);
    ctx.moveTo(0, 60);
    ctx.lineTo(50, 60);
    strokee();
    //bal cso veg
    //jobb cso kezdet
    ctx.beginPath();
    ctx.moveTo(250, 130-$('#H_input').val()*16);
    ctx.lineTo(300, 130-$('#H_input').val()*16);
    ctx.moveTo(250, 130-$('#H_input').val()*16+10);
    ctx.lineTo(300, 130-$('#H_input').val()*16+10);
    strokee();
    // jobb cso veg
    //fent 2 vonal kezdet
    ctx.moveTo(50, 20);
    ctx.lineTo(50, 50);
    ctx.stroke();
    ctx.moveTo(250, 20);
    ctx.lineTo(250, 130-$('#H_input').val()*16);
    strokee();
    //fent 2 vonal veg

    //tartaly alja kezdet
    ctx.moveTo(50, 60);
    ctx.lineTo(50, 140);
    ctx.lineTo(250, 140);
    ctx.lineTo(250, 140-$('#H_input').val()*16);
    strokee();
    //tartaly alja veg
    //bal szelep kezdet
    ctx.moveTo(20, 40);
    ctx.lineTo(30, 40);
    strokee();
    ctx.beginPath();
    ctx.arc(25, 40, 5, 0, 1 * Math.PI,true);
    strokee();
    ctx.moveTo(25, 40);
    ctx.lineTo(25, 50);
    strokee();
    //bal szelep veg
    //jobb szelep kezdet
    ctx.moveTo(270, 120-$('#H_input').val()*16);
    ctx.lineTo(280, 120-$('#H_input').val()*16);
    strokee();
    ctx.beginPath();
    ctx.arc(275, 120-$('#H_input').val()*16, 5, 0, 1 * Math.PI,true);
    strokee();
    ctx.moveTo(275, 120-$('#H_input').val()*16);
    ctx.lineTo(275, 120-$('#H_input').val()*16+10);
    strokee();
    //jobb szelep veg


    szelepfelirat();

    //jobb szelep magassag
    if($('#H_input').val()>=1) {  //ha 1 meter
        ctx.moveTo(260, 140 - $('#H_input').val()*16); //fuggoleges
        ctx.lineTo(260, 140); //fuggoleges

        ctx.moveTo(255, 145 - $('#H_input').val()*16);
        ctx.lineTo(260, 140 - $('#H_input').val()*16);
        ctx.lineTo(265, 145 - $('#H_input').val()*16);

        ctx.moveTo(255, 135);
        ctx.lineTo(260, 140);
        ctx.lineTo(265, 135);
        strokee();
    }
    //jobb szelep magassag vege

    //bal szelepnel viz kezdet
    ctx.fillStyle="blue";
    ctx.fillRect(0, 50, 25, 10);
    //bal szelepnel viz vege

}

function szelepfelirat(){
    ctx.font="5px Comic Arial";

    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    if(window.language == "HU"){
        ctx.fillText("I . S Z E L E P", 25, 30);
        ctx.fillText("I . S Z E L E P", 25, 30);
        ctx.fillText("I . S Z E L E P", 25, 30);
        ctx.fillText("I . S Z E L E P", 25, 30);
        ctx.fillText("I . S Z E L E P", 25, 30);
        ctx.fillText("I . S Z E L E P", 25, 30);
    
        ctx.fillText("II . S Z E L E P", 275, 30);
        ctx.fillText("II . S Z E L E P", 275, 30);
        ctx.fillText("II . S Z E L E P", 275, 30);
        ctx.fillText("II . S Z E L E P", 275, 30);
        ctx.fillText("II . S Z E L E P", 275, 30);
        ctx.fillText("II . S Z E L E P", 275, 30);
    }
    if(window.language == "EN"){
        ctx.fillText("I . V A L V E", 25, 30);
        ctx.fillText("I . V A L V E", 25, 30);
        ctx.fillText("I . V A L V E", 25, 30);
        ctx.fillText("I . V A L V E", 25, 30);
        ctx.fillText("I . V A L V E", 25, 30);
        ctx.fillText("I . V A L V E", 25, 30);
    
        ctx.fillText("II . V A L V E", 275, 30);
        ctx.fillText("II . V A L V E", 275, 30);
        ctx.fillText("II . V A L V E", 275, 30);
        ctx.fillText("II . V A L V E", 275, 30);
        ctx.fillText("II . V A L V E", 275, 30);
        ctx.fillText("II . V A L V E", 275, 30);

    }
}


//alap canvas kezdet
window.onload = function() {
     c = document.getElementById("canvas");
    ctx = c.getContext("2d");  //->global
    alapcanvas();
    //bal szelep control kezdet
    ctx.moveTo(25, 50);
    ctx.lineTo(25, 60);
    strokee();
    //bal szelep control veg
    //jobb szelep control kezdet
    ctx.moveTo(275, 50);
    ctx.lineTo(275, 60);
    strokee();
    //jobb szelep control veg
    j=1; //global
    time=0; //global

}
function startsim() {
    onoffinterval_process = setInterval(function() { simprocess(); }, 100);
    onoffinterval_info    = setInterval(function() { siminfo(); }, 100);
    window.onoff=true;
}
function startstopsim() {
    if(window.onoff==true){
        clearInterval(onoffinterval_process);
        clearInterval(onoffinterval_info);
        window.onoff=false;
        $('.startstopsimbutton').each(function(){
            if(window.language == "HU"){
                $(this).text('Indítás');
            }
            if(window.language == "EN"){
                $(this).text('Start');
            }
        });
    }
    else{
        $('.startstopsimbutton').each(function(){
            if(window.language == "HU"){
                $(this).text('Leállítás');
            }
            if(window.language == "EN"){
                $(this).text('Stop');
            }
        });
        startsim();
    }

}










