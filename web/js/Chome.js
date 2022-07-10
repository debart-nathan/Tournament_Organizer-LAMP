let cookies 
async function init(){
    cookies= document.cookie.split(";");
    
}




function checkEvenment(){
    if(!("event" in cookies || cookies["event"]=="")){
        setEvenment()
    }else{
        checkTourn()
    }
}

async function setEvenment(){
    console.log("setEvent")
    document.cookie ="event =";
    delete cookies["event"];
    document.cookie ="tourn ="
    delete cookies["tourn"]
    const banner= document.getElementById("banner")
    banner.innerHTML=""
    const main=document.getElementById("mainpage")
    main.innerHTML = ""

    const form=document.createElement("form")
    main.appendChild(form)
    
    const response= await fetch("/php/Shome.php",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({funcName:"getEv"})
            
        }
    )
   
    let lEvents=await response.json()
    for(let [key,value] of Object.entries(lEvents)){
        let radio= document.createElement("input")
        radio.type="radio"
        radio.id=`Ev${key}`
        radio.name=`selectEv`
        let obj={}
        obj[key]=value
        radio.value=JSON.stringify(obj)
        let lab= document.createElement("label")
        lab.htmlFor=radio.id
        lab.innerHTML=value.title
        form.appendChild(radio)
        form.appendChild(lab)
        form.innerHTML+="</br>"
    }
    
    
}

function createEvenement(){

}

function submitEvenement(){
    const choosenEv=document.getElementById("selectedEvent")
    cookies.event=choosenEv.value;
    document.cookie ="event = "+choosenEv.value;
    checkTourn()

}

function checkTourn(){
    console.log("checkTourn")
    if(!("tourn" in cookies)){
        setTourn()
    }
    listActMatches()
}




async function listActMatches(){

}

function createRound(){

}

function editMatches(selectedM){
    document.cookie ="match = "+selectedM
}

init()