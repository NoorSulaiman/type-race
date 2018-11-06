import { reConnectHandler } from "./handlers/reConnectHandler";
import { roundHandler } from "./handlers/roundHandler";
import { waitingPlayerHandler } from "./handlers/waitingPlayerHandler";

export function typeRace(email, players, socket) {
    players.push({ socket, email })
    waitingPlayerHandler(players, socket)
    reConnectHandler(email, players, socket)
    if (players.length && players.length % 2 === 0) {
        roundHandler(players, socket)
    }
}