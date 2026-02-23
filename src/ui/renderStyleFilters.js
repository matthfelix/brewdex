export function renderStyleFilters(container, styles, activeStyle) {
  container.innerHTML = ""

  styles.forEach(style => {
    const btn = document.createElement("button")
    btn.textContent = style === "All" ? "Todas" : style
    btn.dataset.style = style

    btn.className = `
      style-btn px-3 py-1 rounded-full border transition
      ${
        activeStyle === style
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-white hover:bg-orange-100"
      }
    `

    container.appendChild(btn)
  })
}
