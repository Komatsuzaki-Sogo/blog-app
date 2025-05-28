import type { EndpointMap } from '~/types/endpointMap'

type ValidEndpoint = keyof EndpointMap
type GetListPerPageArgs<T extends ValidEndpoint> = {
  endpoint: T
  filters?: string
  page?: number
  pageLimit?: number
}

type GetPostCountArgs = {
  endpoint: string
  filters?: string
}

export const useMicroCMSaGetListPerPage = async <T extends ValidEndpoint>({
  endpoint,
  filters = '',
  page = 1,
  pageLimit = 100,
}: GetListPerPageArgs<T>) => {
  const offset = pageLimit * (page - 1)
  return await useMicroCMSGetList<EndpointMap[T]>(
    {
      endpoint: endpoint,
      queries: { limit: pageLimit, offset: offset, filters: filters },
    },
    {
      key: `useMicroCMSaGetListPerPage-${endpoint}-${filters}-${pageLimit}-${page}-${offset}`,
    },
  )
}

/**
 * 総記事数を取得
 */
export async function useMicroCMSGetTotalCount({ endpoint, filters = '' }: GetPostCountArgs) {
  const { data } = await useMicroCMSGetList(
    {
      endpoint,
      queries: {
        limit: 1,
        filters,
      },
    },
    {
      key: `useMicroCMSGetTotalCount-${endpoint}-${filters}-count`,
    },
  )

  return data.value?.totalCount || 0
}
