/**
 * サイト全体で利用するデーターを管理
 * メニューの表示・非表示状態
 */
interface EasyStore {
  menuActive: boolean
}

export const easyStore = reactive<EasyStore>({
  menuActive: false,
})
