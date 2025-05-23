/**
 * アニメーション
 */
export const useAnimation = () => {
  const animationTiming: KeyframeAnimationOptions = {
    duration: 3000,
    easing: 'ease-out',
  }

  const closingAnimationKeyframes = (height: number): Keyframe[] => [
    { height: `${height}px` },
    { height: '0px' },
  ]

  const openingAnimationKeyframes = (height: number): Keyframe[] => [
    { height: '0px' },
    { height: `${height}px` },
  ]

  return {
    animationTiming,
    closingAnimationKeyframes,
    openingAnimationKeyframes,
  }
}
