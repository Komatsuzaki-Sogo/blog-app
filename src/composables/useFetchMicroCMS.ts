import type {
  EndpointMap,
  ValidEndpoint,
  GetListPerPage,
  GetTotalCount,
} from '~/types/typeOfMicroCMS'

/**
 * microCMSから指定エンドポイントのリストデータをページ単位で取得
 *
 * @template T - 有効なmicroCMSのエンドポイント
 * @param {Object} params - パラメータオブジェクト
 * @param {T} params.endpoint - microCMSのエンドポイント名
 * @param {string} [params.filters=''] - microCMSのフィルター条件（省略可能）
 * @param {number} [params.page=1] - 現在のページ番号（1始まり）
 * @param {number} [params.pageLimit=100] - 1ページあたりの取得件数
 * @returns {Promise<ReturnType<typeof useMicroCMSGetList<EndpointMap[T]>>>} - microCMSから取得したデータ
 */
export const useFetchMicroCMSGetList = async <T extends ValidEndpoint>({
  endpoint,
  filters = '',
  page = 1,
  pageLimit = 100,
}: GetListPerPage<T>) => {
  const offset = pageLimit * (page - 1)
  return await useMicroCMSGetList<EndpointMap[T]>(
    {
      endpoint: endpoint,
      queries: { limit: pageLimit, offset: offset, filters: filters },
    },
    {
      key: `useFetchMicroCMSGetList-${endpoint}-${filters}-${pageLimit}-${page}-${offset}`,
    },
  )
}

/**
 * microCMSから指定エンドポイントのリストデータの総記事を取得
 *
 * @template T - 有効なmicroCMSのエンドポイント
 * @param {Object} params - パラメータオブジェクト
 * @param {T} params.endpoint - microCMSのエンドポイント名
 * @param {string} [params.filters=''] - microCMSのフィルター条件（省略可能）
 * @returns {Promise<number>} - 合計件数（取得できなかった場合は0）
 */
export const useFetchMicroCMSTotalCount = async <T extends ValidEndpoint>({
  endpoint,
  filters = '',
}: GetTotalCount<T>) => {
  const { data } = await useMicroCMSGetList<EndpointMap[T]>(
    {
      endpoint,
      queries: {
        limit: 1,
        filters,
      },
    },
    {
      key: `useFetchMicroCMSTotalCount-${endpoint}-${filters}-count`,
    },
  )

  return data.value?.totalCount || 0
}
