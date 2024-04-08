import { fakerZH_CN as faker } from '@faker-js/faker';

export interface RoleType {
    id: React.Key
    roleName: string
    userCount: number
    createdBy: string
    createdAt: string
}

function createRole(roleName?: string): RoleType {
    return {
        id: faker.number.int(1000),
        roleName: roleName || faker.person.jobType(),
        userCount: faker.number.int(10),
        createdBy: faker.person.fullName(),
        createdAt: faker.date.anytime().toLocaleString(),
    }
}

const data: RoleType[] = [...Array(10).keys()].map(() => createRole())

export default data