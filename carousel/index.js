(async function (){
    let data = await fetch("./data.json") 
    let img_data = await data.json();
    console.log(img_data);

    let con = document.querySelector(".carousel_continer");

    let counter=0;

    img_data.forEach((ele, i) => {
        let img = document.createElement("img")
        img.setAttribute("class", "img_carousel")
        img.setAttribute("src", ele.src);
        let translate = `translate(${100*i}%)`
        img.style.transform = translate;
        console.log(img)
        con.append(img);
    });

    const next = document.getElementById("next");
    const prev = document.getElementById("previous");
    const images = Array.from(document.getElementsByClassName("img_carousel"))
    
    next.addEventListener("click", ()=>{
        counter--;
        console.log(counter)
        images.forEach((ele, i)=>{
            let translate = `translate(${100 * (i+counter)}%)`;
            ele.style.transform = translate;
        })
        if(counter== -1*(img_data.length - 1)){
            next.disabled = true;
        }
        if(prev.disabled){
            prev.disabled = false;
        }
    })

    prev.addEventListener("click", () => {
      counter++;
      console.log(counter)
      images.forEach((ele, i) => {
        let translate = `translate(${100 * (i + counter)}%)`;
        ele.style.transform = translate;
      });
        if (counter == 0) {
          prev.disabled = true;
        }
        if(next.disabled){
            next.disabled = false
        }
    });
    // const parentNode = next.parentNode;
    // parentNode.children[1].style.display = "none";
})()