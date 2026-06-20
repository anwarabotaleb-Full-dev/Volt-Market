// Pure UI micro-interaction: animates a ghost of the product image from the
// "Add to cart" button toward the navbar cart icon. Does not call any API
// or touch cart logic in any way — it only reads element positions.

export function flyToCart(sourceImgEl, targetSelector = "#cart-icon-anchor") {

  try {

    const targetEl = document.querySelector(targetSelector)

    if (!sourceImgEl || !targetEl) return

    const startRect = sourceImgEl.getBoundingClientRect()
    const endRect = targetEl.getBoundingClientRect()

    const ghost = document.createElement("div")
    ghost.className = "fly-ghost"

    const img = document.createElement("img")
    img.src = sourceImgEl.src

    ghost.appendChild(img)
    document.body.appendChild(ghost)

    const size = 64

    ghost.style.width = `${size}px`
    ghost.style.height = `${size}px`
    ghost.style.left = `${startRect.left + startRect.width / 2 - size / 2}px`
    ghost.style.top = `${startRect.top + startRect.height / 2 - size / 2}px`
    ghost.style.opacity = "1"

    requestAnimationFrame(() => {

      const endX =
        endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2)
      const endY =
        endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2)

      ghost.style.transform = `translate(${endX}px, ${endY}px) scale(0.15)`
      ghost.style.opacity = "0"
      ghost.style.width = "20px"
      ghost.style.height = "20px"

    })

    setTimeout(() => {
      ghost.remove()
      bumpCartBadge()
    }, 650)

  } catch {
    // purely cosmetic — fail silently, never block the real add-to-cart flow
  }

}

export function bumpCartBadge() {

  const badge = document.querySelector(".cart-count-badge")

  if (!badge) return

  badge.classList.remove("bump")
  // restart animation
  // eslint-disable-next-line no-unused-expressions
  void badge.offsetWidth
  badge.classList.add("bump")

}
