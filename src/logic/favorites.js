let favorites = JSON.parse(localStorage.getItem("favorites")) || []

export function isFavorite(name) {
  return favorites.includes(name)
}

export function toggleFavorite(name) {
  if (isFavorite(name)) {
    favorites = favorites.filter(fav => fav !== name)
  } else {
    favorites.push(name)
  }

  localStorage.setItem("favorites", JSON.stringify(favorites))
}

export function getFavorites() {
  return favorites
}
