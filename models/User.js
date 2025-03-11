import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
    name: { type: String, required: true },
    health: { 
        level: { type: Number, default: 1 }, 
        current: { type: Number, default: 100 }, 
        max: { type: Number, default: 100 } 
    },
    mana: { 
        level: { type: Number, default: 1 }, 
        current: { type: Number, default: 50 }, 
        max: { type: Number, default: 50 } 
    },
    currency: { type: Number, default: 0 },
    inventory: { type: Array, default: [] },
    lockpicking: { 
        level: { type: Number, default: 1 }, 
        xp: { type: Number, default: 0 }, 
        nextXp: { type: Number, default: 100 } 
    },
    perception: { 
        level: { type: Number, default: 1 }, 
        xp: { type: Number, default: 0 }, 
        nextXp: { type: Number, default: 100 } 
    },
    honor: { type: Number, default: 0 },
    position: { 
        type: [Number], 
        default: [3, 7], 
        validate: {
            validator: function(arr) {
                return arr.length === 2 && arr.every(num => Number.isInteger(num));
            },
            message: "Position must be an array of two integers."
        }
    },
    currentMap: { type: String, default: "map1" } 
}, { _id: false }); 

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    saved: [HeroSchema] // Ensures saved heroes follow the Hero schema
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
