$( document ).ready(function() {
    const calcText="#calculator-window > span";

    $(calcText).html("0");

    console.log( "ready!" );
    
    $(":button").on("click", function(e){
        if($(this).attr("data-action")!==undefined){
            console.log($(this).attr("data-action"));
            $(calcText).html($(this).attr("data-action")); // For testing if calculator window works
        }  else{
           console.log($(this).html());
           $(calcText).html($(this).html()); // For testing if calculator window works
        }
    });

    function calculate(num1,action,num2){
        var result;

        switch(action){
            case "add":
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case "subtract":
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case "multiply":
                result = parseFloat(num1) * parseFloat(num2);
                break;
            case "divide":
                result = parseFloat(num1) / parseFloat(num2);
                break;
            default:
                console.log("Error: "+action+" is an undefined action");
        }
        return result;
    }
    console.log(calculate(3,"multiply",2));
    console.log(calculate(4,"subtract",1));
    console.log(calculate(7,"add",7));
    console.log(calculate(2,"divide",2));
    console.log(calculate(2,"equal",2));
});

