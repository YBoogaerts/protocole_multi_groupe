
namespace multiGroup {
    const NO_GROUP: number = "?".charCodeAt(0);   // 63
    const GROUP_BASE: number = "a".charCodeAt(0); // 97
    let group: number = NO_GROUP;
    let groupReceiver: (message: string) => void = (m) => { }
    let globalReceiver: (message: string) => void = (m) => { }

    /**
     * Definition du code à exécuter à la réception d'un message global
     */
    export function setGlobalReceiver(handler: (message: string) => void) {
        globalReceiver = handler
    }

    /**
     * Definition du code à exécuter à la réception d'un message au groupe
     */
    export function setGroupReceiver(handler: (message: string) => void) {
        groupReceiver = handler
    }

    /**
     * Distribution du message au handler global ou de groupe en fonction 
     * de la définition du groupe dans le message reçu.
     * si group == NO_GROUP => globalReceiver
     * si group == group => groupReceiver
     * sinon message ignoré
     */
    export function receiveMessage(radioMessage: string) {
        let id = groupOf(radioMessage)
        if (id == NO_GROUP) {
            globalReceiver(messagePart(radioMessage))
        } else if (id == group) {
            groupReceiver(messagePart(radioMessage))
        }
    }
    /**
     * Permet de définir le numéro du groupe des communications par radio.
     * Le numéro de groupe sera intégré au message par la fonction 
     * "message pour le groupe".
     * il est possible de passer "aucun groupe" pour que les messages ne soient pas destinés à un groupe particulier
     * @param idGroup le numéro du groupe
     */
    export function setGroup(idGroup: number) {
        group = idGroup;
    }

    /**
     * retourne le numéro pour pas de grouppe définit
     */
    export function noGroup(): number {
        return NO_GROUP
    }

    /**
     * retourne Le numéro du groupe
     */
    export function getGroup(): number {
        return group
    }

    /**
     * Construit le le texte à envoyer quand il n'y a pas de groupe définis
     */
    export function messageToGroup(message: string): string {
        return buildMessage(group, message);
    }

    /**
     * Construit le le texte à envoyer en fonction du groupe de distribution et du message
     * 1 caractère pour le groupe
     * les caractère suivant pour le contenu
     */
    export function buildMessage(id: number, message: string): string {
        return getIdGroup(id) + message;
    }

    /**
     * retourne l'id du groupe en fonction de son numéro
     */
    export function getIdGroup(idNum: number): string {
        return String.fromCharCode(idNum == NO_GROUP ? NO_GROUP : GROUP_BASE + idNum)
    }

    /**
     * Retourne le body d'un message reçu respectant le protocole
     */
    export function messagePart(recievedString: string): string {
        return recievedString.substr(1)
    }

    /**
     * retourne le numéro du goupe de destination du message respectant le protocole
     */
    export function groupOf(recievedString: string): number {
        let id = recievedString.charCodeAt(0)
        if (id != NO_GROUP) {
            id += GROUP_BASE
        }
        return id
    }


}