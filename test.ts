// les tests vont ici ; cela ne sera pas compilé si ce paquet est utilisé en tant qu'extension.
let groupmessage : string =""
let personnalMessage : string =""

function inittest(){
     groupmessage = ""
     personnalMessage = ""
    multiGroup.setGlobalReceiver((m) => assert("to global", m === "global"))
    multiGroup.setGroupReceiver((m) => assert("to perso", m === "perso"))
    radio.onReceivedString((m)=>{
       console.log(radio.receivedPacket(RadioPacketProperty.SerialNumber))
        console.log(m)
        multiGroup.receiveMessage(m)
        }
    )
}

function testMesaggeGlobal() {

    radio.sendString(multiGroup.messageToGroup("global"))
    inittest()
}
function testMesaggeperso() {
    multiGroup.setGroup(3)
    radio.sendString(multiGroup.buildMessage(3,"perso"))
    inittest()
}
function testGroupid(){
   assert("nogroup id",multiGroup.noGroup() == multiGroup.groupOf( multiGroup.messageToGroup("test")))
}

function assert(nom: string, condition: boolean) {
    if (condition) {
        console.log("✔️ PASSED: " + nom)
    } else {

        console.log("❌ FAILED: " + nom)
    }
}
radio.setTransmitSerialNumber(true)
testGroupid()
inittest()
testMesaggeGlobal()
inittest()
testMesaggeperso()