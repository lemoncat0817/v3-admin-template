export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface User {
  id?: number | string
  username?: string
  password?: string
  roleName?: string
  phone?: null
  name?: string
  createTime?: string
  updateTime?: string
}

export type Records = User[]

export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}

export interface UserCheckResponseData extends ResponseData {
  data: User
}

export interface RoleData {
  id?: number
  createTime: string
  updateTime: string
  roleName: string
  remark: null
}

export type AllRole = RoleData[]

export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}

export interface SetRoleData {
  roleIdList: number[]
  userId: number
}

export interface userInfoReponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
