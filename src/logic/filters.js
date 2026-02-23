export function filterBeers(beers, search) {
  const value = search.toLowerCase()

  return beers.filter(beer =>
    beer.name.toLowerCase().includes(value)
  )
}

export function getStyles(beers) {
  const styles = beers.map(beer => beer.style)
  return ["All", ...new Set(styles)]
}
