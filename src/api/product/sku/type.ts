export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Attr {
  attrId: number | string
  valueId: number | string
  id?: number
  valueName?: string
}

export interface saleAttr {
  saleAttrId: number | string
  saleAttrValueId: number | string
  saleAttrValueName?: string
  id?: number
}

export interface skuImage {
  id?: number
  imgName?: string
  imgUrl?: string
  isDefault?: number
  skuId?: number
  spuImgId?: number
}

export interface SkuData {
  category3Id?: number | string
  tmId?: number | string
  spuId?: number | string
  skuName?: string
  price?: number | string
  weight?: number | string
  skuDesc?: string
  skuDefaultImg?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleAttr[]
  isSale?: number
  id?: number
  skuImageList?: skuImage[]
}

export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}
