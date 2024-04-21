export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface RoleData {
  roleName: string
  id?: number
  createTime?: string
  updateTime?: string
  remark?: null
}

export type Records = RoleData[]

export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    searchCount: boolean
    pages: number
    maxLimit: null
    countId: null
  }
}

export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: MenuList
  select: boolean
}

export type MenuList = MenuData[]

export interface MenuResponseData extends ResponseData {
  data: MenuList
}
