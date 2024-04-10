import { ActorTeam } from "./ActorTeam";
import { ActorType } from "./ActorType";

export function battle(attacker: ActorType, defender: ActorType) {
    attacker.beforeAttack()
    defender.beforeDefense()
    console.log(`${attacker.name}:[${attacker.attackPoint}/${attacker.healthPoint}] 攻击 ${defender.name}:[${defender.attackPoint}/${defender.healthPoint}]`)
    attacker.attack(defender)
    attacker.afterAttack(defender)
    defender.afterDefense(attacker)
}

export function delay(ms?: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export class BattleBox {
    blueTeam: ActorTeam
    redTeam: ActorTeam
    isBlue: boolean = true

    constructor(blueTeam: ActorTeam, redTeam: ActorTeam,) {
        this.blueTeam = blueTeam
        this.redTeam = redTeam
    }

    battle(): boolean {
        const attackTeam = this.isBlue ? this.blueTeam : this.redTeam
        const defenseTeam = this.isBlue ? this.redTeam : this.blueTeam

        if (attackTeam.isOver() || defenseTeam.isOver()) {
            return false
        }
        if (attackTeam.getActors().filter(value => value.attackPoint !== 0).length === 0
            && defenseTeam.getActors().filter(value => value.attackPoint !== 0).length === 0) {
            return false
        }
        const attackName = this.isBlue ? '蓝方' : '红方'
        const defenseName = this.isBlue ? '红方' : '蓝方'
        console.log(`${attackName}开始攻击`)
        let attacker = attackTeam.pop()
        if (!attacker) {
            attackTeam.reset()
            attacker = attackTeam.pop()!
        }
        const defender = defenseTeam.defense()

        battle(attacker, defender)

        if (attacker.isDead()) {
            console.log(`${attackName}${attacker}退出战局`)
        } else {
            console.log(`${attackName}${attacker}存活`)
        }
        if (defender.isDead()) {
            console.log(`${defenseName}[${defender}]退出战局`)
        } else {
            console.log(`${defenseName}${defender}存活`)
        }

        this.isBlue = !this.isBlue
        return true
    }

    async next() {
        const show = (team: ActorTeam) => team.getActors().map((value: ActorType) => value.toString())
        console.log(`蓝方成员\n${show(this.blueTeam)}`)
        console.log(`红方成员\n${show(this.redTeam)}`)
        await delay(1000)
        console.log('战斗开始')
        await delay(1000)
        let round = 0
        while (this.battle() && round < 100) {
            round++
            await delay(1000)
        }
        console.log('战斗结束')
        console.log(`蓝方成员\n${show(this.blueTeam)}`)
        console.log(`红方成员\n${show(this.redTeam)}`)
        const result = this.blueTeam.isOver() ? this.redTeam.isOver() ? '平局' : '红方获胜' : '蓝方获胜'
        console.log(result)
    }

}