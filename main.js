const cheats = {}
let xOffset= 10
let yOffset = 93

function startCheats() {
    // Variables
    const orgGameOver = Runner.instance_.gameOver
    

    // Define cheats
    cheats.FLOAT = (y) => {
        Runner.instance_.tRex.groundYPos = y
        Runner.instance_.tRex.yPos=y
    }

    cheats.DEATHFLOAT = () => {
        Runner.instance_.gameOver = () => {
            Runner.instance_.tRex.yPos=10
            Runner.instance_.tRex.jumping = true
        }
    }

    cheats.MAXSPEED=(maxspeed) => {
        Runner.config.MAX_SPEED = maxspeed
    }
    cheats.ACCELERATION=(acceleration)=> {
        Runner.config.ACCELERATION = acceleration
    }


    // Create UI interface
    const div = document.createElement("div")
    div.style.color="white"
    div.style.backgroundColor = "white"
    div.style.width="500px";
    div.style.height="500px"
    div.style.left="0px"
    div.style.top="0px"
    div.style.position="absolute"
    div.style.borderRadius="20px"
    document.body.appendChild(div)

    const DEATHFLOATCONFIG = document.createElement("input")
    DEATHFLOATCONFIG.type="checkbox"
    DEATHFLOATCONFIG.style.left="10px"
    DEATHFLOATCONFIG.style.top="10px"
    DEATHFLOATCONFIG.style.position="absolute"
    DEATHFLOATCONFIG.style.opacity=100
    div.appendChild(DEATHFLOATCONFIG)

    const FLOATCONFIG = document.createElement("input")
    FLOATCONFIG.type="checkbox"
    FLOATCONFIG.style.left="10px"
    FLOATCONFIG.style.top="33px"
    FLOATCONFIG.style.position="absolute"
    FLOATCONFIG.style.opacity=100
    div.appendChild(FLOATCONFIG)

    const DEATHFLOATTEXT = document.createElement("p")
    DEATHFLOATTEXT.style.left="33px"
    DEATHFLOATTEXT.style.top="10px"
    DEATHFLOATTEXT.style.position="absolute"
    DEATHFLOATTEXT.style.margin="0"
    DEATHFLOATTEXT.style.padding="0"
    DEATHFLOATTEXT.style.opacity=100
    DEATHFLOATTEXT.style.color="black"
    DEATHFLOATTEXT.innerText="DEATH FLOAT"
    div.appendChild(DEATHFLOATTEXT)

    const FLOATTEXT = document.createElement("p")
    FLOATTEXT.style.left="33px"
    FLOATTEXT.style.top="33px"
    FLOATTEXT.style.color="black"
    FLOATTEXT.style.margin="0"
    FLOATTEXT.style.padding="0"
    FLOATTEXT.style.position="absolute"
    FLOATTEXT.style.opacity=100
    FLOATTEXT.innerHTML="FLOAT"
    div.appendChild(FLOATTEXT)

    const MAXSPEEDCONFIG = document.createElement("input")
    MAXSPEEDCONFIG.type="text"
    MAXSPEEDCONFIG.placeholder="Enter maxspeed (HAS TO BE A NUMBER)"
    MAXSPEEDCONFIG.style.left="10px"
    MAXSPEEDCONFIG.style.top="56px"
    MAXSPEEDCONFIG.style.position="absolute"
    MAXSPEEDCONFIG.style.opacity=100
    div.appendChild(MAXSPEEDCONFIG)

    const CURRENTSPEEDTEXT = document.createElement("p")
    CURRENTSPEEDTEXT.style.left="200px"
    CURRENTSPEEDTEXT.style.top="56px"
    CURRENTSPEEDTEXT.style.color="black"
    CURRENTSPEEDTEXT.style.margin="0"
    CURRENTSPEEDTEXT.style.padding="0"
    CURRENTSPEEDTEXT.style.position="absolute"
    CURRENTSPEEDTEXT.style.opacity=100
    CURRENTSPEEDTEXT.innerHTML="Current speed: " + Runner.instance_.currentSpeed
    div.appendChild(CURRENTSPEEDTEXT)

    setInterval(() => {
        CURRENTSPEEDTEXT.innerHTML="Current speed: " + Runner.instance_.currentSpeed
    })

    const ACCELERATIONINPUTCONFIG = document.createElement("input");
    ACCELERATIONINPUTCONFIG.type = "text";
    ACCELERATIONINPUTCONFIG.placeholder = "Enter acceleration (HAS TO BE A NUMBER)";
    ACCELERATIONINPUTCONFIG.style.cssText = "left: 10px; top: 79px; position: absolute; opacity: 100%;";

    div.appendChild(ACCELERATIONINPUTCONFIG);


    const JUMPPOWERCONFIG = document.createElement("input")
    JUMPPOWERCONFIG.type = "text";
    JUMPPOWERCONFIG.placeholder = "Enter Jump power (HAS TO BE A NUMBER)";
    Object.assign(JUMPPOWERCONFIG.style, {left:"10px", top:"102px", opacity:"100%", position:"absolute"})
    div.appendChild(JUMPPOWERCONFIG)


    // Add event listener
    DEATHFLOATCONFIG.addEventListener("click", ()=> {
        if (DEATHFLOATCONFIG.checked) {
            cheats.DEATHFLOAT()
        }
        else {
            Runner.instance_.gameOver=orgGameOver
        }
    })

    FLOATCONFIG.addEventListener("click", ()=> {
        if (FLOATCONFIG.checked) {
            cheats.FLOAT(10)
        }
        else {
            cheats.FLOAT(93)
        }
    })

    MAXSPEEDCONFIG.addEventListener("focusout", () => {
        cheats.MAXSPEED(parseFloat(MAXSPEEDCONFIG.value))
    })
    ACCELERATIONINPUTCONFIG.addEventListener("focusout", () => {
        cheats.ACCELERATION(parseFloat(ACCELERATIONINPUTCONFIG.value))
    })
    JUMPPOWERCONFIG.addEventListener("focusout",()=>{Runner.instance_.tRex.setJumpVelocity(parseFloat(JUMPPOWERCONFIG.value))})

    document.addEventListener("keypress", (ev) => {
        switch (ev.key) {
            case "d":
                xOffset+=5
                break;
            case "a":
                xOffset-=5
                break;
            case "w":
                yOffset-=5
                break;
            case "s":
                yOffset+=5
                break;
            default:
                break;
        }
    })

    setInterval(()=>{Runner.instance_.tRex.xPos=xOffset;if(FLOATCONFIG.checked==true){cheats.FLOAT(yOffset);}})
}

startCheats()
