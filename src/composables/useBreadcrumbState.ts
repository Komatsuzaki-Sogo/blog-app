/**
 * パンくずリストの取得する
 */
import type { BreadcrumbItem } from '~/types/breadcrumb'

export const useBreadcrumbState = () => useState<BreadcrumbItem[]>('breadcrumb', () => [])
