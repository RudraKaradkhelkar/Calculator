$( document ).ready(function() {
    const calcText="#calculator-window > span";
    var number1;
    var number2;
    var action;
    let decimalCount=0;
    let numberCount=0;
    var firstNumber = true;
    
    $(calcText).html("0");

    console.log( "ready!" );
    
    $(":button").on("click", function(e){
        if(!($(this).attr("data-action")!==undefined)){
            if(firstNumber && numberCount===0){
                reset();
                firstNumber = false;
            }
           $(calcText).append($(this).html());

        } else if($(this).attr("data-action")==="decimal" && decimalCount<1){
            $(calcText).append($(this).html());
            decimalCount++;

        } else if($(this).attr("data-action")==="clear"){
            fullReset();
            
        } else if(numberCount!==1 && $(calcText).html()!==""){
            number1 = $(calcText).html();
            
            switch($(this).attr("data-action")){
                case "add":
                    $(calcText).append(" + ");
                    action="add";
                    numberCount++;
                    decimalCount = 0;
                    break;
                case "subtract":
                    $(calcText).append(" - ");
                    action="subtract";
                    numberCount++;
                    decimalCount = 0;
                    break;
                case "multiply":
                    $(calcText).append(" × ");
                    action="multiply";
                    numberCount++;
                    decimalCount = 0;
                    break;
                case "divide":
                    $(calcText).append(" ÷ ");
                    action="divide";
                    numberCount++;
                    decimalCount = 0;
                    break;
                default:
                    break;
            }
            
         } else{
            let checkLength=$(calcText).html().slice(number1.length+3);

            if($(this).attr("data-action")==="equal" &&  checkLength !== "" && numberCount===1){
                number2 = checkLength;
                console.log(number1);
                console.log(number2);
                console.log(action);
                $(calcText).html(calculate(number1,action,number2));
                firstNumber=true;
                numberCount=0;
                number1=calculate(number1,action,number2);
            }
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
    // console.log(calculate(3,"multiply",2));
    // console.log(calculate(4,"subtract",1));
    // console.log(calculate(7,"add",7));
    // console.log(calculate(2,"divide",2));
    // console.log(calculate(2,"equal",2));

    function fullReset(){
        $(calcText).html("0");
        number1="";
        number2="";
        action="";
        decimalCount=0;
        numberCount=0;
        firstNumber = true;
    }

    function reset(){
        $(calcText).html("");
        number2="";
        action="";
        decimalCount=0;
        numberCount=0;
    }
});
