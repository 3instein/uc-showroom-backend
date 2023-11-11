import { Vehicle } from "@prisma/client"

export interface Truck extends Vehicle {
    wheels: number
    cargo_capacity: number
}