import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string
type OrganizationId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
    organizationId: OrganizationId
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
      organizationId: OrganizationId
    }
  }
