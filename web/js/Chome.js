let cookies
async function init() {
    cookies = decodeURIComponent(document.cookie).split("; ").reduce((prev, current) => {
        const [name, ...value] = current.split('=');
        prev[name] = value.join('=');
        return prev;
    }, {})
    console.log(document.cookie);
    console.log(cookies)
}




async function checkEvenment() {
    console.log(cookies.event)
    if (!("event" in cookies) || !cookies.event) {
        setEvenment()
        return
    }
    /*
    const response = await fetch("/php/Shome.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            funcName: "getEvById",
            data: cookies.event
        })

    })
    let dEv = await response.json()
    console.log(dEv)
    const banner = document.getElementById("banner")

    let evdiv = document.createElement("div")
    evdiv.id = "evdiv"
    banner.appendChild(evdiv)

    const ev = document.createElement("p")
    ev.id = "evVal"
    ev.value = cookies.event
    ev.innerHTML = dEv.title
    evdiv.appendChild(ev)
    */
    checkTourn()

}

async function setEvenment() {

    document.cookie = "event =";
    delete cookies["event"];
    document.cookie = "tourn ="
    delete cookies["tourn"]
    const banner = document.getElementById("banner")
    banner.innerHTML = ""
    const main = document.getElementById("mainpage")
    main.innerHTML = ""

    const form = document.createElement("form")
    main.appendChild(form)

    const response = await fetch("/php/Shome.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ funcName: "getEv" })

    })

    let lEvents = await response.json()
    for (let [cid, value] of Object.entries(lEvents)) {
        let radio = document.createElement("input")
        radio.type = "radio"
        radio.id = `Ev${cid}`
        radio.name = `selectEv`
        let obj = {}
        obj["id"] = cid
        obj["data"] = value
        radio.value = JSON.stringify(obj)
        let lab = document.createElement("label")
        lab.htmlFor = radio.id
        lab.innerHTML = value.title
        form.appendChild(radio)
        form.appendChild(lab)
        form.innerHTML += "</br>"
    }

    const submit = document.createElement("button")
    submit.addEventListener("click", submitEvenement)
    submit.id = "submEv"
    submit.name = "submit"
    submit.innerHTML = "submit"
    main.appendChild(submit)
}

function createEvenement() {

}

async function submitEvenement() {
    const choosenEv = document.querySelector('input[name="selectEv"]:checked')
    if (choosenEv === null) {
        const submButton = document.getElementById("submEv")
        const warningp = document.createElement("p")
        warningp.id = "WarningSubmEv"
        const warning = document.createTextNode("Aucun Evenement Selectioner")
        warningp.appendChild(warning)
        submButton.parentNode.insertBefore(warningp, submButton)
        return
    }
    const oChoosenEv = await JSON.parse(choosenEv.value)
    cookies["event"] = oChoosenEv.id;
    document.cookie = "event =" + encodeURIComponent(oChoosenEv.id);
    const banner = document.getElementById("banner")

    let evdiv = document.createElement("div")
    evdiv.id = "evdiv"
    banner.appendChild(evdiv)

    const ev = document.createElement("p")
    ev.id = "evVal"
    ev.value = oChoosenEv.id
    ev.innerHTML = oChoosenEv.data.title
    evdiv.appendChild(ev)


    checkTourn()

}

function checkTourn() {
    if (!("tourn" in cookies) || !cookies.tourn) {
        setTourn()
    }
    listActMatches()
}


async function setTourn() {
    document.cookie = "tourn ="
    delete cookies["tourn"]
    const banner = document.getElementById("banner")
    const main = document.getElementById("mainpage")
    main.innerHTML = ""

    const form = document.createElement("form")
    main.appendChild(form)

    const response = await fetch("/php/Shome.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ funcName: "getTo" })

    }
    )

    let lTourn = await response.json()
    for (let [key, value] of Object.entries(lTourn)) {
        let radio = document.createElement("input")
        radio.type = "radio"
        radio.id = `To${key}`
        radio.name = `selectTo`
        let obj = {}
        obj[key] = value
        radio.value = JSON.stringify(obj)
        let lab = document.createElement("label")
        lab.htmlFor = radio.id
        lab.innerHTML = value.title
        form.appendChild(radio)
        form.appendChild(lab)
        form.innerHTML += "</br>"
    }
}

async function listActMatches() {

}

function createRound() {

}

function editMatches(selectedM) {
    document.cookie = "match = " + selectedM
}

init()