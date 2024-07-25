$( document ).ready(function() {
    const calcText="#calculator-window > span";
    var number1;
    var number2;
    var action;
    let equalCount=0;
    let decimalCount=0;
    let numberCount=0;
    var firstNumber=true;
    var negated=false;
    var tempNum;
    var tempNum2;
    let digitCount=0;
    var error=false;
    
    $(calcText).html("0");

    console.log( "ready!" );
    
    $(":button").on("click", function(e){

        if(!($(this).attr("data-action")!==undefined)){//&&digitCount<10){
            if(firstNumber && numberCount===0 && (decimalCount===0||equalCount===1)){
                reset();
                firstNumber = false;
                error=false;
            }
           $(calcText).append($(this).html());
           
        } else if($(this).attr("data-action")==="negate"&&!error) {
           negated=!negated;
           //console.log(digitCount);
           //console.log("negated");
           console.log(digitCount);
            console.log(negated);
            console.log(numberCount+"\n");
           
           if(negated && numberCount===0 && $(calcText).html().slice(0,1)!=="-"){
               $(calcText).prepend("-");
               digitCount++;
               console.log(digitCount);
               console.log(negated);
               console.log(numberCount+"\n");

           } else if(negated && numberCount===1){
               tempNum=$(calcText).html().slice(number1.length+3);
               $(calcText).html($(calcText).html().slice(0,number1.length+3)+"-"+tempNum);
               digitCount++;
           } else if(!negated && numberCount===0 && $(calcText).html().slice(0,1)==="-"){
               $(calcText).html($(calcText).html().slice(1));
               digitCount--;
           } else{
               tempNum=$(calcText).html().slice(number1.length+4);
               $(calcText).html($(calcText).html().slice(0,number1.length+3)+tempNum);
               digitCount--;
           }
            
        } else if($(this).attr("data-action")==="decimal" && decimalCount<1){
            $(calcText).append($(this).html());
            decimalCount++;

        } else if($(this).attr("data-action")==="clear"){
            fullReset();
            
        } else if(numberCount!==1 && $(calcText).html()!==""&&!error){
            number1 = $(calcText).html();
            negated=false;
            switch($(this).attr("data-action")){
                case "add":
                    $(calcText).append(" + ");
                    action="add";
                    numberCount++;
                    decimalCount = 0;
                    digitCount=0;
                    break;
                case "subtract":
                    $(calcText).append(" - ");
                    action="subtract";
                    numberCount++;
                    decimalCount = 0;
                    digitCount=0;
                    break;
                case "multiply":
                    $(calcText).append(" × ");
                    action="multiply";
                    numberCount++;
                    decimalCount = 0;
                    digitCount=0;
                    break;
                case "divide":
                    $(calcText).append(" ÷ ");
                    action="divide";
                    numberCount++;
                    decimalCount = 0;
                    digitCount=0;
                    break;
                default:
                    break;
            }
            
         } else{
            let checkLength=$(calcText).html().slice(number1.length+3);
            
            if($(this).attr("data-action")==="equal" &&  checkLength !== "" && numberCount===1){
                number2 = checkLength;
                
                // console.log(number1);
                // console.log(number2);
                // console.log(action);
                let answer = calculate(number1,action,number2);
                $(calcText).html(answer);
                firstNumber=true;
                decimalCount=1;                    
                numberCount=0;
                if(answer=="ERROR: Division by Zero"){
                    error=true;                    
                }
                equalCount=1;
                if(answer!="ERROR: Division by Zero"){
                    number1=calculate(number1,action,number2);
                    if(answer<0){
                        negated=true
                    } else{
                        negated=false;
                    }
                    digitCount=0;
                }
            }
            console.log("bruh");
        }
    });

    function calculate(num1,action,num2){
        var result;
        let zeroError=false;
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
                console.log(result);
                if(result=="Infinity"||result=="-Infinity"||(num1==0&&num2==0)){
                     zeroError=true;
                     result="ERROR: Division by Zero";
                }
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
        firstNumber=true;
        negated=false;
        digitCount=0;
        error=false;
    }

    function reset(){
        $(calcText).html("");
        number2="";
        action="";
        decimalCount=0;
        numberCount=0;
        equalCount=0;
        negated=false;
        digitCount=0;
    }
});
