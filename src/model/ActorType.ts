export interface ActorType {
    name: string
    healthPoint: number
    attackPoint: number
    skill?: string

    beforeDefense(): void
    afterDefense(actor: ActorType): void

    beforeAttack(): void
    attack(actor: ActorType): void
    afterAttack(actor: ActorType): void

    isDead(): boolean
    toString(): string
}



export class BaseActor implements ActorType {
    name: string
    healthPoint: number
    attackPoint: number
    skill?: string

    constructor(name: string, attackPoint: number, healthPoint: number, skill?: string) {
        this.name = name
        this.attackPoint = attackPoint
        this.healthPoint = healthPoint
        this.skill = skill
    }

    beforeDefense(): void { }
    afterDefense(actor: ActorType): void { }
    beforeAttack(): void { }
    attack(actor: ActorType): void {
        actor.healthPoint -= this.attackPoint
        this.healthPoint -= actor.attackPoint
    }
    afterAttack(actor: ActorType): void { }
    isDead(): boolean {
        return this.healthPoint <= 0
    }
    toString(): string {
        return `[${this.name}:${this.attackPoint}/${this.healthPoint} skill:${this.skill ?? '-'}]`
    }
}

export class GrowBoyActor extends BaseActor {
    constructor() {
        super('持剑勇士', 1, 5, '每次攻击、消灭敌人获得+2/+2')
    }
    grow() {
        this.attackPoint += 2
        this.healthPoint += 2
        console.log(`${this}获取成长`)
    }
    beforeAttack(): void {
        this.grow()
    }

    afterAttack(actor: ActorType): void {
        if (actor.isDead()) {
            this.grow()
        }
    }
}
