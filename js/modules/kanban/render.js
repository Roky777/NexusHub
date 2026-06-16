/* =====================================
   KANBAN RENDER
   Turns the board state into DOM.

   Rendering is "dumb": it only reads the
   state and builds elements. All user
   actions are handled in kanban.js through
   event delegation, so this file never
   touches state directly.
===================================== */

import { getBoard } from "./state.js";

// Escape user text so it can't inject HTML.
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Build a single card element.
function renderCard(card, columnId, isLastColumn) {
  const cardEl = document.createElement("div");
  cardEl.className = "kanban-card";
  cardEl.draggable = true;
  cardEl.dataset.cardId = card.id;
  cardEl.dataset.columnId = columnId;

  cardEl.innerHTML = `
    <p class="kanban-card-text">${escapeHtml(card.text)}</p>

    <div class="kanban-card-actions">
      ${
        isLastColumn
          ? ""
          : `<button class="kanban-card-btn" data-action="move-card" title="Move to next column" aria-label="Move card to next column">→</button>`
      }
      <button class="kanban-card-btn" data-action="edit-card" title="Edit card" aria-label="Edit card">✎</button>
      <button class="kanban-card-btn" data-action="delete-card" title="Delete card" aria-label="Delete card">✕</button>
    </div>
  `;

  return cardEl;
}

// Build a single column element with its cards.
function renderColumn(column, isLastColumn) {
  const columnEl = document.createElement("div");
  columnEl.className = "kanban-column";
  columnEl.dataset.columnId = column.id;

  columnEl.innerHTML = `
    <div class="kanban-column-header" style="background:${column.color}">
      <h3 class="kanban-column-title">${escapeHtml(column.title)}</h3>
      <span class="kanban-column-count">${column.cards.length}</span>
      <button class="kanban-column-delete" data-action="delete-column" title="Delete column" aria-label="Delete column">✕</button>
    </div>

    <div class="kanban-card-list" data-column-id="${column.id}"></div>

    <form class="kanban-add-card" data-column-id="${column.id}">
      <input
        type="text"
        class="kanban-add-card-input"
        placeholder="Add a card..."
        aria-label="New card text"
      />
      <button type="submit" class="kanban-add-card-btn">+</button>
    </form>
  `;

  // Fill the card list.
  const list = columnEl.querySelector(".kanban-card-list");

  column.cards.forEach((card) => {
    list.appendChild(renderCard(card, column.id, isLastColumn));
  });

  return columnEl;
}

// Render the whole board into the given container.
export function renderBoard(boardEl) {
  const board = getBoard();

  boardEl.innerHTML = "";

  board.columns.forEach((column, index) => {
    const isLastColumn = index === board.columns.length - 1;
    boardEl.appendChild(renderColumn(column, isLastColumn));
  });

  // "Add column" control sits after the columns.
  const addColumnEl = document.createElement("form");
  addColumnEl.className = "kanban-add-column";
  addColumnEl.innerHTML = `
    <input
      type="text"
      class="kanban-add-column-input"
      placeholder="New column title..."
      aria-label="New column title"
    />
    <button type="submit" class="kanban-add-column-btn">+ Add Column</button>
  `;

  boardEl.appendChild(addColumnEl);
}
