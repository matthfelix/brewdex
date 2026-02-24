export function renderStyleFilters(container, styles, selectedStyle) {
  container.innerHTML = ""

  const allStyles = styles.includes("All")
    ? styles
    : ["All", ...styles]

  allStyles.forEach(style => {
    const btn = document.createElement("button")
    btn.dataset.style = style
    btn.textContent = style

    const isActive = style === selectedStyle

    btn.className = `
      px-3 py-2 rounded-lg border text-base font-semibold transition
      ${
        isActive
          ? "bg-amber-500 text-white border-amber-600"
          : "bg-white text-black border-black hover:bg-amber-100"
      }
    `

    container.appendChild(btn)
  })
}