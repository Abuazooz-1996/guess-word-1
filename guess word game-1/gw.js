//setting the game
let game_name="Guess The Word";
document.title=game_name;
document.querySelector("h1").innerHTML=game_name;
document.querySelector("footer").innerHTML=`${game_name} Game Created by Ahmed Hael`;


//setting Gameoptions
let number_of_tries=6;
let number_of_letter=6;
let current_try=1;
let numberofhints=2;


///manage hint
document.querySelector(".hint span").innerHTML=numberofhints
const gethintbutton=document.querySelector(".hint");
gethintbutton.addEventListener("click",gethint);

function generate_input(){
    const input_containers=document.querySelector(".inputs");
    ///creat main div tries
    for(let i=1; i<=number_of_tries;i++){
        const trydiv=document.createElement("div");
        trydiv.classList.add(`try-${i}`);
        trydiv.innerHTML=`<span>Try ${i}</span>`
        if( i !==1)trydiv.classList.add("disabled-inputs")
            
        ///creat boxes
        for(let j=1;j<=number_of_letter;j++){
            const boxes=document.createElement("input");
            boxes.type="text";
            boxes.id=`guess-${i}-letter-${j}`;
            boxes.setAttribute("maxlength","1");
            trydiv.appendChild(boxes);
        }
        input_containers.appendChild(trydiv);
    }
    input_containers.children[0].children[1].focus();

    //disable all inputs except first line
    const inputInDisableddiv=document.querySelectorAll(".disabled-inputs input");
    inputInDisableddiv.forEach((inp)=>(inp.disabled = true));

    ///convert input to uppercase
    const allinputs=document.querySelectorAll("input");
    allinputs.forEach((input,index)=>{
        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
            // console.log(index);
            ///to get next index
            // console.log(allinputs[index+1])
            const nextindex=allinputs[index+1];
            if(nextindex)nextindex.focus();
        })
        // input.addEventListener("keydown",function(event){
        //     console.log(event);
        //     const currentindex=Array.from(allinputs).indexOf(event.target);//or this belong to the same function
        //     console.log(currentindex);
        // })
    })

}
///manage words
const words=["create","update","delete","master","branch","Elzero","school"];
const randomwords=words[Math.floor(Math.random()*words.length)].toLowerCase();
themessagearea=document.querySelector(".message");


buttoncheck=document.querySelector(".check");
buttoncheck.addEventListener("click",handlewords)

console.log(randomwords);
function handlewords(){
    let succesaguess=true;
    for(let i=1;i<=number_of_letter;i++){
        const inputfiled=document.querySelector(`#guess-${current_try}-letter-${i}`);
        //get the letter of field   
        const letter=inputfiled.value.toLowerCase();
        const actualletter=randomwords[i-1];
        console.log(inputfiled);
        ///game logic
        if(letter===actualletter){     
            inputfiled.classList.add("yes-in-place");
        }else if(randomwords.includes(letter)&& letter!==""){
            inputfiled.classList.add("not-in-place");
                    succesaguess=false;
        }else{
                inputfiled.classList.add("not");
                succesaguess=false;
        } 
    }
    ///check if user win or lose
    if(succesaguess){
                themessagearea.innerHTML=`You Win The Word Is <span>${randomwords}<span/>`;
                ///add disabled on all try divs
                let alldivininputs=document.querySelectorAll(".inputs > div");
                alldivininputs.forEach((div)=>{div.classList.add("disabled-inputs")});
                ///disabled button check
                buttoncheck.disabled=true;
                gethintbutton.disabled=true;
                if(numberofhints===2){
                  themessagearea.innerHTML=`Congras You Didnot Use Hints
                  The Word Is <span>${randomwords}<span/>`;
                }
    }else{
                document.querySelector(`.try-${current_try}`).classList.add("disabled-inputs");
                const currenttryinputs=document.querySelectorAll(`.try-${current_try} input`);
                //enter to each element inside current try and add disabled
                currenttryinputs.forEach((input)=>{input.disabled=true});
                //add current try///each press to check button will increase one
                current_try++
                // document.querySelector(`.try-${current_try}`).classList.remove("disabled-inputs");
                // console.log(current_try)

                ///enter to next try
                const nexttryinputs=document.querySelectorAll(`.try-${current_try} input`);
                nexttryinputs.forEach((input)=>{input.disabled=false});

                let el=document.querySelector(`.try-${current_try}`);
                if(el){
                ///remover class disabled inputs
                   document.querySelector(`.try-${current_try}`).classList.remove("disabled-inputs");
                   el.children[1].focus();
                }else{
                ///disabled button check
                   buttoncheck.disabled=true;
                   gethintbutton.disabled=true;

                   themessagearea.innerHTML=`You Lose The Word Is <span>${randomwords}<span/>`;
 
                }
    }
}
// const inputfiled=document.querySelector(`#guess-${current_try}-letter-${i}`);
// console.log(inputfiled);
// inputfiled.classList.add("new");

function gethint(){
    if(numberofhints > 0){
       numberofhints--;
       document.querySelector(".hint span").innerHTML=numberofhints;
    }
    if(numberofhints===0){
        gethintbutton.disabled=true;
 
    }
    const endisabledinputs=document.querySelectorAll("input:not([disabled])");
    const  emptyendisabledinputs=Array.from(endisabledinputs).filter((input)=>input.value==="");
    // console.log(emptyendisabledinputs);  
    if(emptyendisabledinputs.length>0){
        const randomindex=Math.floor(Math.random()*emptyendisabledinputs.length);
        const randominputs=emptyendisabledinputs[randomindex];
        const indextofill=Array.from(endisabledinputs).indexOf(randominputs);

        console.log(randomindex);
        console.log(randominputs);
        console.log(indextofill);
        if(indextofill!==-1){
            randominputs.value=randomwords[indextofill].toUpperCase()

        }



    }
  



}
function handlebackspace(event){
    if(event.key==="Backspace"){
       const notdisabledinputs=document.querySelectorAll(`input:not([disabled]`);
       const currentindex= Array.from(notdisabledinputs).indexOf(document.activeElement);
       if(currentindex>0){
        const currentinput=notdisabledinputs[currentindex];
        const previnput=notdisabledinputs[currentindex-1];
        currentinput.value="";
        previnput.value="";
        previnput.focus();
       }
    }

}
document.addEventListener("keydown",handlebackspace);
window.onload=function(){
    generate_input()
}