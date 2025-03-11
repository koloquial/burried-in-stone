import Map from "./Map";
import { map1 } from "../maps/map1";

class Hero {
    constructor(name) {
        this.name = name;
        this.health = { level: 1, current: 100, max: 100 };
        this.mana = { level: 1, current: 50, max: 50 };
        this.currency = 0;
        this.inventory = [];
        this.lockpicking = { level: 1, xp: 0, nextXp: 100 };
        this.perception = { level: 1, xp: 0, nextXp: 100 };
        this.honor = 0;
        this.position = [3, 7]; 
        this.currentMap = new Map(map1); 
    }
}

export default Hero;
