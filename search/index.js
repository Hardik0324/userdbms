(function search(){
    const text_search = document.getElementById("search")
    console.log(text_search)
    let timer=true;
    function search_prod(text){
        if(timer){
            console.log(text);
            timer=false;
        }
        setTimeout(()=>{
            timer=true
        }, 600)
    }

    text_search.addEventListener("input", (e)=>search_prod(e.target.value))
})();
