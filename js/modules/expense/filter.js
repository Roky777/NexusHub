import { transactionList } from "./storage.js";
import { renderTable } from "./transection.js";

export function initFilters() {

  document
    .getElementById("filter-all")
    .addEventListener("click", () => {
      renderTable(transactionList);
    });

  document
    .getElementById("filter-income")
    .addEventListener("click", () => {
      renderTable(
        transactionList.filter(
          (t) => t.type === "income"
        )
      );
    });

  document
    .getElementById("filter-expense")
    .addEventListener("click", () => {
      renderTable(
        transactionList.filter(
          (t) => t.type === "expense"
        )
      );
    });
}