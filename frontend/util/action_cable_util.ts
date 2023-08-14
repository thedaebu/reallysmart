import actionCable, { Cable } from "actioncable";

const cableName: string = process.env.NODE_ENV === "development" ?
    `ws://${window.location.hostname}:3000/cable` :
    "wss://reallysmart.onrender.com/cable";
const cable: Cable = actionCable.createConsumer(cableName);
const cableApp: {cable: Cable} = {cable};

export default cableApp