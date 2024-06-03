import "../whac-a-mole.css";

export const board = () => {
  const divContainer = document.querySelector(".container");
  const divGrid = document.createElement("div");

  divGrid.classList.add("div-grid");

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cells");
    cell.setAttribute("data-index", i);
    divGrid.appendChild(cell);
  }
  divContainer.appendChild(divGrid);

};
