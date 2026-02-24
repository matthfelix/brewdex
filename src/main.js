import "./style.css"
import { beers } from "./data/beers.js"
import { isFavorite, toggleFavorite } from "./logic/favorites.js"
import { filterBeers, getStyles } from "./logic/filters.js"
import { safeText } from "./utils/safeText.js"
import { renderPanel } from "./ui/renderPanel.js"
import { renderStyleFilters } from "./ui/renderStyleFilters.js"

//
// ==========================
// ESTADO GLOBAL
// ==========================
//
let selectedBeer = null
let showOnlyFavorites = false
let selectedStyle = "All"

const SELECTED_BEER_KEY = "brewdex:selectedBeer"

//
// ==========================
// ELEMENTOS DO DOM
// ==========================
//
const list = document.getElementById("beer-list")
const search = document.getElementById("search")
const filterFavoritesBtn = document.getElementById("filter-favorites")
const panel = document.getElementById("beer-details")
const favoritesTotal = document.getElementById("favorites-total")
const styleContainer = document.getElementById("style-filters")
const sortSelect = document.getElementById("sort")

//
// ==========================
// PERSISTÊNCIA
// ==========================
//
function saveSelectedBeer(name) {
  localStorage.setItem(SELECTED_BEER_KEY, name)
}

function loadSelectedBeer() {
  return localStorage.getItem(SELECTED_BEER_KEY)
}

//
// ==========================
// CONTADOR DE FAVORITOS
// ==========================
//
function updateFavoritesCount() {
  const total = beers.filter(beer => isFavorite(beer.name)).length
  favoritesTotal.textContent = total
}

//
// ==========================
// EVENTOS
// ==========================
//
filterFavoritesBtn.addEventListener("change", () => {
  showOnlyFavorites = filterFavoritesBtn.checked
  renderBeers()
})

// Se havia cerveja salva, renderiza o painel
if (selectedBeer) {
  const beerObj = beers.find(b => b.name === selectedBeer)
  if (beerObj) {
    renderPanel(panel, beerObj)
  }
}

let searchTimeout

search.addEventListener("input", () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    renderBeers()
  }, 200)
})

sortSelect.addEventListener("change", () => {
  renderBeers()
})

styleContainer.addEventListener("click", e => {
  if (!e.target.dataset.style) return
  selectedStyle = e.target.dataset.style
  renderBeers()
})

//
// ==========================
// RENDERIZAÇÃO PRINCIPAL
// ==========================
//
function renderBeers() {
  let beersToRender = [...beers]

  // 1. Busca
  beersToRender = filterBeers(beersToRender, search.value)

  // 2. Filtro por estilo
  if (selectedStyle !== "All") {
    beersToRender = beersToRender.filter(
      beer => beer.style === selectedStyle
    )
  }

  // 3. Favoritos
  if (showOnlyFavorites) {
    beersToRender = beersToRender.filter(beer =>
      isFavorite(beer.name)
    )
  }

  // 4. Ordenação
  const sort = sortSelect.value

  beersToRender.sort((a, b) => {
    // Favoritos no topo sempre
    const aFav = isFavorite(a.name)
    const bFav = isFavorite(b.name)
    if (aFav !== bFav) return aFav ? -1 : 1

    // Depois ordenação selecionada
    if (sort === "name") {
      return a.name.localeCompare(b.name)
    }

    if (sort === "rating") {
      return b.rating - a.rating
    }

    if (sort === "abv") {
      return parseFloat(b.abv) - parseFloat(a.abv)
    }

    return 0
  })

  // Nenhum resultado
  if (beersToRender.length === 0) {
    list.innerHTML = `
      <p class="text-slate-400 text-center mt-10">
        Nenhuma cerveja encontrada 🍺
      </p>
    `
    updateFavoritesCount()
    return
  }

  list.innerHTML = ""

  beersToRender.forEach(beer => {
    const card = document.createElement("div")
    const isActive = selectedBeer === beer.name

    card.className = `
      p-4 rounded-xl cursor-pointer transition flex justify-between items-start shadow
      ${isActive ? "bg-amber-600 text-white" : "bg-white hover:bg-amber-100"}
    `

    card.innerHTML = `
      <div class="flex gap-3">
        <img
          src="${beer.image}"
          alt="${safeText(beer.name)}"
          class="w-16 h-16 object-contain rounded-lg bg-white p-1 shadow"
        />
        <div>
          <h3 class="text-xl font-bold ${isActive ? "text-white" : "text-orange-500"}">
            ${safeText(beer.name)}
          </h3>
          <p class="text-sm">${safeText(beer.style)}</p>
          <p class="mt-1">${safeText(beer.abv)} ABV</p>
        </div>
      </div>
      <button class="favorite text-2xl">
        ${isFavorite(beer.name) ? "⭐" : "☆"}
      </button>
    `

    // Clique no card
    card.addEventListener("click", () => {
      selectedBeer = beer.name
      saveSelectedBeer(beer.name)
      renderBeers()
      renderPanel(panel, beer)

      // 👇 Scroll automático no mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          document
            .getElementById("beer-details")
            ?.scrollIntoView({ behavior: "smooth" })
        }, 50)
      }
    })

    // Clique no favorito
    card.querySelector(".favorite").addEventListener("click", e => {
      e.stopPropagation()
      toggleFavorite(beer.name)
      renderBeers()
    })

    list.appendChild(card)
  })

  updateFavoritesCount()
}

//
// ==========================
// INICIALIZAÇÃO
// ==========================
//
const savedBeer = loadSelectedBeer()
if (savedBeer) selectedBeer = savedBeer

// Render inicial dos filtros
const styles = getStyles(beers)
renderStyleFilters(styleContainer, styles, selectedStyle)

// Primeira renderização
renderBeers()
updateFavoritesCount()
