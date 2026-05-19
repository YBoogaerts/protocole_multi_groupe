// les tests vont ici ; cela ne sera pas compilé si ce paquet est utilisé en tant qu'extension.
let groupmessage : string =""
let personnalMessage : string =""

function inittest(){
     groupmessage = ""
     personnalMessage = ""
    multiGroup.setGlobalReceiver((m) => assert("to global", m === "test"))
    multiGroup.setGroupReceiver((m) => personnalMessage = m)
    radio.onReceivedString((m)=>{
       console.log(radio.receivedPacket(RadioPacketProperty.SerialNumber))
        console.log(m)
        multiGroup.receiveMessage(m)
        }
    )
}

function testMesaggeGlobal(){
    
    radio.sendString(multiGroup.messageToGroup("test"))
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
input.onButtonPressed(Button.A, testMesaggeGlobal)