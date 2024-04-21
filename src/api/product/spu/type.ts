export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface SpuData {
  id?: number | string
  spuName: string
  description: string
  category3Id: number | string
  tmId: number | string
  spuSaleAttrList: null | SaleAttr[]
  spuImageList: null | SpuImage[]
}

export type Records = SpuData[]

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

export interface TradeMark {
  id: number
  tmName: string
  logoUrl: string
}

export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}

export interface SpuImage {
  id?: number
  imgName?: string
  imgUrl?: string
  spuId?: number
  createdTime?: string
  updatedTime?: string
  name?: string
  url?: string
}

export interface SpuHasImage extends ResponseData {
  data: SpuImage[]
}

export interface SaleAttrValue {
  baseSaleAttrId: number | string
  id?: number
  isChecked?: null
  saleAttrName?: string
  saleAttrValueName: string
  spuId?: number
  createdTime?: null
  updatedTime?: null
}

export type spuSaleAttrValueList = SaleAttrValue[]

export interface SaleAttr {
  baseSaleAttrId: number | string
  id?: number
  saleAttrName: string
  spuId?: number
  createdTime?: null
  updatedTime?: null
  spuSaleAttrValueList: spuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
  saleIdAndValueId?: string
}

export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}

export interface Attr {
  attrId: number | string
  valueId: number | string
}

export interface saleAttr {
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuData {
  category3Id: number | string
  tmId: number | string
  spuId?: number | string
  skuName: string
  price: number | string
  weight: number | string
  skuDesc: string
  skuDefaultImg: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleAttr[]
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
