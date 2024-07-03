$( document ).ready(function() {
    const calcText="#calculator-window > span";

    $(calcText).html("0");

    console.log( "ready!" );
    
    $(":button").on("click", function(){
        if($(this).attr("data-action")!==undefined){
            console.log($(this).attr("data-action"));
            $(calcText).html($(this).attr("data-action")); // For testing if calculator window works
        }  else{
           console.log($(this).html());
           $(calcText).html($(this).html()); // For testing if calculator window works
        }
    });
    
});
