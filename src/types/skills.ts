import { Technology, Skills } from "@prisma/client"

export type SkillsResponseType = Skills & {
    technology :Technology[]
}