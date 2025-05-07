/**
 * サイト全体で利用するデーターを管理
 */
interface EasyStore {
  // メニューの表示・非表示状態
  menuActive: boolean
}

export const easyStore = reactive<EasyStore>({
  menuActive: false,
})