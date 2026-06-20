// NOTE: ecommerce.routemisr.com (the API this app talks to) does not expose
// a reviews endpoint — only aggregate `ratingsAverage` / `ratingsQuantity`
// on each product. To add a genuine "write a review" feature without
// touching the real API or inventing a fake backend call, reviews are
// stored locally per-browser. They sit alongside (not instead of) the
// real API rating fields wherever they're shown.

const STORAGE_KEY = "freshcarts_reviews"

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function writeAll(all) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function getReviews(productId) {
  const all = readAll()
  return all[productId] || []
}

export function addReview(productId, review) {

  const all = readAll()
  const existing = all[productId] || []

  const newReview = {
    id: `${Date.now()}`,
    name: review.name || "Anonymous",
    rating: review.rating,
    comment: review.comment,
    date: new Date().toISOString()
  }

  all[productId] = [newReview, ...existing]

  writeAll(all)

  return all[productId]
}

export function getLocalAverage(productId) {

  const reviews = getReviews(productId)

  if (!reviews.length) return null

  const sum = reviews.reduce((acc, r) => acc + Number(r.rating), 0)

  return sum / reviews.length
}
