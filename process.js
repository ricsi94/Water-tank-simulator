
function elsofutas() {
    var eredmenytomb=[];

    HU_letoltes = "";
    EN_letoltes = "";
    
    Z0=0;
    P0=1;
    P1=2.5
    dt=0.01;
    g=9.81;
    A=10; //3.6 meter atmorovel
    Tbe=333;
    T=313;
    ro = 0.000003 * Math.pow(Tbe, 3) - 0.0046 * Math.pow(Tbe, 2) + 1.5594 * T + 874.54;

    q=30000000;

    //-------------Eredmenyek:
    Z=Z0;
    F1=0;
    F2=0;
    cel="";
    szelepallas1=0;
    szelepallas2=0;
    H = Number($('#H_input').val());
    cv11=2;
    cv22=10;
    elozohiba=0;
    hiba=0;
    integ=0;
    deri=0;;
    Kp=50;
    Ki=0.01;
    Kd=0.01;

    eredmenytomb.push(time);
    eredmenytomb.push(Z);
    eredmenytomb.push(F1);
    eredmenytomb.push(F2);
    eredmenytomb.push(cel);
    eredmenytomb.push(szelepallas1);
    eredmenytomb.push(szelepallas2);
    eredmenytomb.push(H);
    eredmenytomb.push(cv11);
    eredmenytomb.push(cv22);
    eredmenytomb.push(Kp);
    eredmenytomb.push(Ki);
    eredmenytomb.push(Kd);



    return eredmenytomb;


}
function tobbifutas(el_z) {

    Kp=document.getElementById("Kp_input").value;
    Ki=document.getElementById("Ki_input").value;
    Kd=document.getElementById("Kd_input").value;

    H = Number($('#H_input').val());
    if(el_z>7){
        szelepallas1=0;
        document.getElementById('sza1_input').value=0;
        alertrajz();
    }
    else {
        szelepallas1=$('#sza1_input').val()/100;
    }

    szelepallas2=$('#sza2_input').val()/100;

    if(el_z>5){
        pbeszu = P0 + ro * g * (el_z-4)/100000;
    }
    if(el_z<=5){      //5 meter magasan van kezdetben a csonk ( 5 * 16 = 80 ) ( 1 meter = 16 px )
        pbeszu = P0;
    }


    if(el_z>H){
        pkisze= P0 + ro * g * (el_z-H)/100000;
    }
    if(el_z<=H){
        pkisze= P0;
    }

    cv11= document.getElementById("cv1_input").value;
    cv22= document.getElementById("cv2_input").value;
    F1=szelepallas1 * cv11 * Math.pow(P1-pbeszu,0.5);


    cel=document.getElementById("z_szab_input").value;
    szintszab=$('#switch_button').is(':checked');
    hiba=cel-z;
    integ=integ+hiba*dt;
    deri=(hiba-elozohiba)/dt;

    if (hiba==0){
        integ=0;
    }
    abs=Math.abs(hiba);
    if (abs > 40){
        integ=0;
    }
    if(szintszab==true){

        szelepallas2= -(Kp*hiba+Ki*integ+Kd*deri);
        if(szelepallas2<0){szelepallas2=0;}
        if(szelepallas2>1){szelepallas2=1;}
        F2=szelepallas2 * cv22 * Math.pow(pkisze-P0,0.5);


        if (F2 < 0){
            F2=0;
        }
        elozohiba=hiba;
        szelep2refresh(szelepallas2);
    }
    if(szintszab==false){
        F2=szelepallas2 * cv22 * Math.pow(pkisze-P0,0.5);
        cel="";
    }



    z=dt*(1/A)*(F1-F2)+el_z;
    if(z<0.0){
        z=0.0;
    }
    if ( Number.isNaN(z)){ z = 0;}

    eredmenytomb = [];
    eredmenytomb.push(time);
    eredmenytomb.push(z);
    eredmenytomb.push(F1);
    eredmenytomb.push(F2);
    eredmenytomb.push(cel);
    eredmenytomb.push(szelepallas1);
    eredmenytomb.push(szelepallas2);
    eredmenytomb.push(H);
    eredmenytomb.push(cv11);
    eredmenytomb.push(cv22);
    eredmenytomb.push(Kp);
    eredmenytomb.push(Ki);
    eredmenytomb.push(Kd);

    return eredmenytomb;


}
function simprocess(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    alapcanvas();

    if(j==1){
        ideiglenestomb=[];
        ideiglenestomb = elsofutas();
        time=ideiglenestomb[0];
        z = ideiglenestomb[1];
        F1 = ideiglenestomb[2];
        F2 = ideiglenestomb[3];
        cel = ideiglenestomb[4];
        szelepallas1 = ideiglenestomb[5];
        szelepallas2 = ideiglenestomb[6];
        H = ideiglenestomb[7];
        cv11 = ideiglenestomb[8];
        cv22 = ideiglenestomb[9];
        Kp = ideiglenestomb[10];
        Ki = ideiglenestomb[11];
        Kd = ideiglenestomb[12];

        HU_letoltes += "Idő ( mp )";
        HU_letoltes += "," + "Vízszint ( méter )";
        HU_letoltes += "," + "Belépő térfogatáram ( m3/h )";
        HU_letoltes += "," + "Kilépő térfogatáram ( m3/h )";
        HU_letoltes += "," + "Vízszint szabályozás ( méter )";
        HU_letoltes += "," + "1. Szelepállás ( % )";
        HU_letoltes += "," + "2. Szelepállás ( % )";
        HU_letoltes += "," + "Szelep magasság ( méter )";
        HU_letoltes += "," + "CV1";
        HU_letoltes += "," + "CV2";
        HU_letoltes += "," + "Kp";
        HU_letoltes += "," + "Ki";
        HU_letoltes += "," + "Kd";
        HU_letoltes += '\r\n';

        HU_letoltes += time;
        HU_letoltes += "," + z;
        HU_letoltes += "," + F1;
        HU_letoltes += "," + F2;
        HU_letoltes += "," + cel;
        HU_letoltes += "," + szelepallas1;
        HU_letoltes += "," + szelepallas2;
        HU_letoltes += "," + H;
        HU_letoltes += "," + cv11;
        HU_letoltes += "," + cv22;
        HU_letoltes += "," + Kp;
        HU_letoltes += "," + Ki;
        HU_letoltes += "," + Kd;
        HU_letoltes += '\r\n';





        EN_letoltes += "Time ( second )";
        EN_letoltes += "," + "Water level ( meter )";
        EN_letoltes += "," + "Flow in volume ( m3/h )";
        EN_letoltes += "," + "Flow out volume ( m3/h )";
        EN_letoltes += "," + "Water level regulation ( meter )";
        EN_letoltes += "," + "1. Valve Position ( % )";
        EN_letoltes += "," + "2. Valve Position ( % )";
        EN_letoltes += "," + "Valve height ( meter )";
        EN_letoltes += "," + "CV1";
        EN_letoltes += "," + "CV2";
        EN_letoltes += "," + "Kp";
        EN_letoltes += "," + "Ki";
        EN_letoltes += "," + "Kd";
        EN_letoltes += '\r\n';

        EN_letoltes += time;
        EN_letoltes += "," + z;
        EN_letoltes += "," + F1;
        EN_letoltes += "," + F2;
        EN_letoltes += "," + cel;
        EN_letoltes += "," + szelepallas1;
        EN_letoltes += "," + szelepallas2;
        EN_letoltes += "," + H;
        EN_letoltes += "," + cv11;
        EN_letoltes += "," + cv22;
        EN_letoltes += "," + Kp;
        EN_letoltes += "," + Ki;
        EN_letoltes += "," + Kd;
        EN_letoltes += '\r\n';
    }
    else{
        ideiglenestomb=[];
        ideiglenestomb = tobbifutas(el_z);
        time=ideiglenestomb[0];
        z = ideiglenestomb[1];
        F1 = ideiglenestomb[2];
        F2 = ideiglenestomb[3];
        cel = ideiglenestomb[4];
        szelepallas1 = ideiglenestomb[5];
        szelepallas2 = ideiglenestomb[6];
        H = ideiglenestomb[7];
        cv11 = ideiglenestomb[8];
        cv22 = ideiglenestomb[9];
        Kp = ideiglenestomb[10];
        Ki = ideiglenestomb[11];
        Kd = ideiglenestomb[12];

        HU_letoltes += time;
        HU_letoltes += "," + z;
        HU_letoltes += "," + F1;
        HU_letoltes += "," + F2;
        HU_letoltes += "," + cel;
        HU_letoltes += "," + szelepallas1;
        HU_letoltes += "," + szelepallas2;
        HU_letoltes += "," + H;
        HU_letoltes += "," + cv11;
        HU_letoltes += "," + cv22;
        HU_letoltes += "," + Kp;
        HU_letoltes += "," + Ki;
        HU_letoltes += "," + Kd;
        HU_letoltes += '\r\n';

        EN_letoltes += time;
        EN_letoltes += "," + z;
        EN_letoltes += "," + F1;
        EN_letoltes += "," + F2;
        EN_letoltes += "," + cel;
        EN_letoltes += "," + szelepallas1;
        EN_letoltes += "," + szelepallas2;
        EN_letoltes += "," + H;
        EN_letoltes += "," + cv11;
        EN_letoltes += "," + cv22;
        EN_letoltes += "," + Kp;
        EN_letoltes += "," + Ki;
        EN_letoltes += "," + Kd;
        EN_letoltes += '\r\n';

    }
    szelepcontrol(z);
    vizrajzolasa(z);

    el_z=z;
    j=j+1;
    time=time+dt;
}