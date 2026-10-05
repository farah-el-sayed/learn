import { useEffect, useRef } from 'react'

// Shared overlay behaviour for every floating layer (Modal, Dropdown, MobileNavigation):
// Escape to close, optional background scroll lock, optional click-outside.
// Kept in one place so no overlay re-implements the listeners.
export function useDismiss({ open = true, onClose, lockScroll = false, outside = false } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!open || !onClose) return undefined
    const onKey = e => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = lockScroll ? document.body.style.overflow : null
    if (lockScroll) document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      if (lockScroll) document.body.style.overflow = previous
    }
  }, [open, onClose, lockScroll])

  useEffect(() => {
    if (!open || !outside || !onClose) return undefined
    const onPointerDown = e => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open, outside, onClose])

  return ref
}

export default useDismiss
