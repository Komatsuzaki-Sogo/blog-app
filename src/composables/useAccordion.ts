/**
 * アコーディオンの動き
 * @param detailsRefKey
 * @param contentRefKey
 */
export const useAccordion = (detailsRefKey: string, contentRefKey: string) => {
  const isOpened = ref(false)
  const animStatus = ref<'idle' | 'running'>('idle')
  const detailsRef = useTemplateRef<HTMLDetailsElement>(detailsRefKey)
  const contentRef = useTemplateRef<HTMLElement>(contentRefKey)

  const { animationTiming, closingAnimationKeyframes, openingAnimationKeyframes } = useAnimation()

  const closeContent = () => {
    const content = contentRef.value
    const details = detailsRef.value
    if (!details || !content) return

    isOpened.value = false
    animStatus.value = 'running'

    const height = content.offsetHeight
    const animation = content.animate(closingAnimationKeyframes(height), animationTiming)
    animation.onfinish = () => {
      details.open = false
      animStatus.value = 'idle'
    }
  }

  const openContent = () => {
    const content = contentRef.value
    const details = detailsRef.value
    if (!details || !content) return

    details.open = true
    isOpened.value = true
    animStatus.value = 'running'

    const height = content.offsetHeight
    const animation = content.animate(openingAnimationKeyframes(height), animationTiming)
    animation.onfinish = () => {
      animStatus.value = 'idle'
    }
  }

  const onClickSummary = () => {
    if (animStatus.value === 'running') {
      return
    }

    if (detailsRef.value?.open) {
      closeContent()
    } else {
      openContent()
    }
  }

  return {
    isOpened,
    openContent,
    closeContent,
    onClickSummary,
  }
}
