import type { MicroCMSQueries } from 'microcms-js-sdk'
import type { EndpointMap } from '~/types/endpointMap'

type ValidEndpoint = keyof EndpointMap

/**
 * 指定された MicroCMS エンドポイントからデータを非同期に取得し、Nuxt の useAsyncData と組み合わせて扱いやすく整形された結果を返すユーティリティ。
 *
 * @template T - 使用する MicroCMS のエンドポイント名。`ValidEndpoint` 型に制限される。
 * @param {T} endpoint - 取得対象の MicroCMS のエンドポイント名（例：`blog`、`news` など）。
 * @param {MicroCMSQueries} [queries] - フィルター、ソートなどのクエリオプション（任意）。
 * @returns {{
 *   dataArray: ComputedRef<EndpointMap[T][]>;
 *   errorFlag: ComputedRef<boolean>;
 *   pending: Ref<boolean>;
 * }} MicroCMS から取得されたデータ、エラーフラグ、読み込み状態を含むオブジェクト。
 *
 * @throws {Error} MicroCMS API からの取得に失敗した場合、HTTP 500 エラーをスロー。
 */
export const useFetchMicroCMS = async <T extends ValidEndpoint>(
  endpoint: T,
  queries?: MicroCMSQueries,
) => {
  const fetchGetList = async () => {
    const { data, error } = await useMicroCMSGetList<EndpointMap[T]>({
      endpoint,
      queries: {
        ...(endpoint !== 'blog-category' ? { orders: '-publishedAt' } : {}),
        ...queries,
      },
    })

    if (error.value) {
      throw createError({
        statusCode: 500,
        statusMessage: 'MicroCMS API error',
      })
    }

    return data.value
  }

  const asyncKey = queries
    ? `${endpoint}-filtered-${queries.filters ?? 'filter-none'}-${queries.offset ?? 'offset-none'}-${queries.limit ?? 'limit-none'}`
    : `${endpoint}`

  const { data, error, pending } = await useAsyncData(asyncKey, fetchGetList)

  const dataArray = computed(() => data.value?.contents || []) as ComputedRef<EndpointMap[T][]>
  const errorFlag = computed(() => !!error.value)
  const totalCount = computed(() => data.value?.totalCount || 0)

  return {
    dataArray,
    errorFlag,
    pending,
    totalCount,
  }
}
