import { ActorType } from "./ActorType";

export class ActorTeam {
    store: ActorType[]
    index: number

    constructor(actors: ActorType[]) {
        this.store = actors
        this.index = 0
    }

    reset(): void {
        this.index = 0
    }

    getActors(): ActorType[] {
        return this.store.filter((value: ActorType) => !value.isDead())
    }

    defense(): ActorType {
        const actors = this.getActors()
        const sel = Math.floor(Math.random() * actors.length)
        return actors[sel]
    }

    pop(): ActorType | undefined {
        if (this.index-1 >= this.store.length) {
            return undefined
        }
        this.index++
        const actor = this.store[this.index - 1]
        if(!actor) return undefined
        if (actor.isDead()) {
            return this.pop()
        }
        return actor
    }

    isOver(): boolean {
        return this.getActors().length === 0
    }
}