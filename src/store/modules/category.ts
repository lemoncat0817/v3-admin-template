import { defineStore } from 'Pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr/index'
import { ref } from 'vue'
import type { CategoryResponseData } from '@/api/product/attr/type'

const useCategoryStore = defineStore('category', () => {
  const category1 = ref<any>([])
  const c1Id = ref<number | string>('')
  const category2 = ref<any>([])
  const c2Id = ref<number | string>('')
  const category3 = ref<any>([])
  const c3Id = ref<number | string>('')

  const getC1 = async () => {
    const result: CategoryResponseData = await reqC1()
    if (result.code === 200) {
      category1.value = result.data
    }
  }

  const getC2 = async (category1Id: number | string) => {
    const result: CategoryResponseData = await reqC2(category1Id)
    if (result.code === 200) {
      category2.value = result.data
    }
  }

  const getC3 = async (category2Id: number | string) => {
    const result: CategoryResponseData = await reqC3(category2Id)
    if (result.code === 200) {
      category3.value = result.data
    }
  }

  

  return {
    c1Id,
    c2Id,
    c3Id,
    getC1,
    getC2,
    getC3,
    category1,
    category2,
    category3,
  }
})

export default useCategoryStore
