(function(){
    const hr = document.querySelector(".input__hour");
    const min = document.querySelector(".input__min");
    const sec = document.querySelector(".input__sec");

    const start = document.querySelector(".btn__start");
    const pause = document.querySelector(".btn__pause");
    const reset = document.querySelector(".btn__reset");

    let interval;

    start.addEventListener("click", ()=>{
        if(hr.value==0 && min.value==0 && sec.value==0){
            return;
        }

        start.style.display = "none";
        pause.style.display = "block";

        interval = setInterval(()=>{
            startTimer();
        }, 1000)
    })

    reset.addEventListener("click", ()=>{
        hr.value = "";
        min.value = "";
        sec.value = "";
        start.style.display = "block";
        pause.style.display = "none";
        clearInterval(interval);
    })

    pause.addEventListener("click", ()=>{
        start.style.display = "block";
        pause.style.display = "none";
        clearInterval(interval);
    })

    function startTimer(){
        if(Number(sec.value) > 59){
            min.value = (Number(min.value) + 1).toString();
            sec.value = (sec.value - 59).toString();
        }

        if (Number(min.value) > 59) {
          console.log(Number(hr.value));
          hr.value = (Number(hr.value) + 1).toString();
          min.value = (min.value - 59).toString();
        }


        if(sec.value!=0){
            sec.value = sec.value - 1;
        }
        else if(min.value!=0 && sec.value==0){
            min.value = min.value - 1;
            sec.value = "59";
        }
        else if(hr.value!=0 && min.value==0){
            hr.value = hr.value - 1;
            min.value = "59";
            sec.value = "59"
        }
        else{
            hr.value = "";
            min.value = "";
            sec.value = "";
            clearInterval(interval);
        }
    }
})()