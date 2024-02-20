console.log("in script");

   try{ 
    var allInputs = document.getElementsByTagName("input");
    
    for(var x=0;x<allInputs.length;x++)
        if(allInputs[x].value == but)
            allInputs[x].style.color = "red";
   }
   catch(error){
    console.log(error);
   }
