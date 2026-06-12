import { transactionList } from "./storage.js";

const incomecard = document.getElementById("total-income");
const expensecard = document.getElementById("total-expense");
const balancecard = document.getElementById("balance");
const transactioncard = document.getElementById("no-of-expense");

const foodBar = document.getElementById("for-food");
const transportBar = document.getElementById("for-transport");
const shoppingBar = document.getElementById("for-shopping");
const billsBar = document.getElementById("for-bills");
const othersBar = document.getElementById("for-others");

function getColor(percent) {
  if (percent < 50) return "green";
  if (percent < 85) return "yellow";
  return "red";
}

export function updateCards() {
  const income = transactionList
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactionList
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  incomecard.textContent = `₹${income}`;
  expensecard.textContent = `₹${expense}`;
  balancecard.textContent = `₹${balance}`;
  transactioncard.textContent = transactionList.length;

  updateBars(expense);
}

export function updateBars(totalExpense) {
  let food = 0;
  let transport = 0;
  let shopping = 0;
  let bills = 0;
  let others = 0;

  transactionList.forEach((t) => {
    if (t.type === "expense") {
      if (t.category === "food") food += t.amount;
      else if (t.category === "transport") transport += t.amount;
      else if (t.category === "shopping") shopping += t.amount;
      else if (t.category === "bills") bills += t.amount;
      else if (t.category === "others") others += t.amount;
    }
  });

  const foodPercent = totalExpense ? (food / totalExpense) * 100 : 0;
  const transportPercent = totalExpense ? (transport / totalExpense) * 100 : 0;
  const shoppingPercent = totalExpense ? (shopping / totalExpense) * 100 : 0;
  const billsPercent = totalExpense ? (bills / totalExpense) * 100 : 0;
  const othersPercent = totalExpense ? (others / totalExpense) * 100 : 0;

  foodBar.style.width = foodPercent + "%";
  foodBar.style.backgroundColor = getColor(foodPercent);

  transportBar.style.width = transportPercent + "%";
  transportBar.style.backgroundColor = getColor(transportPercent);

  shoppingBar.style.width = shoppingPercent + "%";
  shoppingBar.style.backgroundColor = getColor(shoppingPercent);

  billsBar.style.width = billsPercent + "%";
  billsBar.style.backgroundColor = getColor(billsPercent);

  othersBar.style.width = othersPercent + "%";
  othersBar.style.backgroundColor = getColor(othersPercent);
}