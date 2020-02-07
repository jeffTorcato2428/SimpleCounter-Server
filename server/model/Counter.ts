import { database } from "../helper/database"

const counter = database.collection("counter")

class Counter {
    static incrementCounter: () => Promise<void>
    static decrementCounter: () => Promise<void>

}

Counter.incrementCounter = async() => {
    
}

Counter.decrementCounter = async() => {
    
}