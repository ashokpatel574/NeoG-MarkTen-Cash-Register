"use strict";

{
  const errorMessage = document.querySelector(".error");
  const notesContainer = document.querySelector(".notes-container");
  const cashContainer = document.querySelector(".cash");
  const tableInput = document.querySelectorAll(".noteOutput");

  const btnBill = document.querySelector(".btn-bill");
  const btnCalculate = document.querySelector(".btn-calculate");
  const btnReset = document.querySelector(".btn-reset");

  // Event handler's for the button
  btnBill.addEventListener("click", bill_clickHandler);
  btnCalculate.addEventListener("click", cash_clickHandler);
  btnReset.addEventListener("click", reset_clickHandler);

  // Callback function, if user enters (next button on page) for bill amount
  function bill_clickHandler(e) {
    const billInput = document.querySelector(".bill-input");
    // Getting bill input and cash input value in Number format.
    let billInputValue = parseInt(billInput.value);

    // if bill amount is empty throws error message
    if (!billInputValue || billInputValue <= 0) {
      errorMessageDisplay(
        "Error: Please enter the value appropriately.",
        "red"
      );
    }

    if (billInputValue > 0) {
      errorMessage.innerText = "";
      cashContainer.style.display = "block";
    }
  }

  // Callback function, if user enters (calculate button on page) for return amount calculation
  function cash_clickHandler(e) {
    const billInput = document.querySelector(".bill-input");
    const cashInput = document.querySelector(".cash-input");

    // Getting bill input and cash input value in Number format.
    let billInputValue = parseInt(billInput.value);
    let cashInputValue = parseInt(cashInput.value);
    const notes = [2000, 500, 100, 20, 10, 5, 2, 1];
    let requiredNotes = [];

    // if cash amount is false value or less than bill amount
    if (
      !cashInputValue ||
      cashInputValue < billInputValue ||
      !billInputValue ||
      billInputValue <= 0
    ) {
      errorMessageDisplay(
        "Error: Please enter the value appropriately.",
        "red"
      );
    }

    // if cash amount is equal to bill amount
    if (cashInputValue === billInputValue) {
      errorMessageDisplay("No amount to be returned", "red");
    }

    // if cash amount is more than bill amount
    if (cashInputValue > billInputValue) {
      if (!billInputValue || billInputValue <= 0) {
        errorMessageDisplay(
          "Error: Please enter the value appropriately.",
          "red"
        );
      } else {
        let amount = cashInputValue - billInputValue;
        errorMessage.innerText = `Amount to be returned: Rs. ${amount} /-`;
        errorMessage.style.color = "#209cee";
        notesContainer.style.display = "block";

        for (let i = 0; i < notes.length; i++) {
          requiredNotes[i] = Math.floor(amount / notes[i]);
          amount = amount - notes[i] * requiredNotes[i];
        }

        tableInput.forEach((item, i) => {
          item.innerText = requiredNotes[i];
        });
      }
    }
  }

  // Callback function, if user enters reset button page
  function reset_clickHandler(e) {
    const billInput = document.querySelector(".bill-input");
    const cashInput = document.querySelector(".cash-input");
    billInput.value = "";
    cashInput.value = "";
    errorMessage.innerText = "";
    cashContainer.style.display = "none";
    notesContainer.style.display = "none";
  }

  function errorMessageDisplay(message, textColor) {
    errorMessage.innerText = message;
    errorMessage.style.color = textColor;
    tableInput.forEach((item) => {
      item.innerText = 0;
    });
  }
}
