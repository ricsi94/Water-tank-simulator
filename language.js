//global variable language
var language = "HU";

$('[language="en"]').hide();

$('#languageselect').change(function() 
{ 
    var selected = this.value;
    if(selected == "magyar"){
        $('[language="en"]').hide();
        $('[language="hu"]').show();

        $('.startstopsimbutton').each(function(){
            if(window.onoff==true){
                $(this).text('Leállítás'); 
            }
            if(window.onoff==false){
                $(this).text('Indítás'); 
            }  
        });

        
        document.title = "Tartály Szimulátor";
        window.language = "HU";

        ctx.clearRect(5, 25, 40, 7);
        ctx.clearRect(255, 25, 40, 7);
        szelepfelirat();

    }
    if(selected == "english"){
        $('[language="hu"]').hide();
        $('[language="en"]').show();

        $('.startstopsimbutton').each(function(){
            if(window.onoff==true){
                $(this).text('Stop'); 
            }
            if(window.onoff==false){
                $(this).text('Start'); 
            }  
        });

        
        document.title = "Tank Simulator";
        window.language = "EN";

        ctx.clearRect(5, 25, 40, 7);
        ctx.clearRect(255, 25, 40, 7);
        szelepfelirat();

    }
});
