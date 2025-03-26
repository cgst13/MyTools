window.onload = async function () {
    await fetchPenaltyData();
    setCurrentMonth();

    document.querySelectorAll(".billing-table input").forEach(input => {
        input.addEventListener("input", calculateRow);
    });

    document.getElementById("assessedValue").addEventListener("input", function () {
        document.querySelectorAll(".billing-table tr").forEach((row, index) => {
            if (index === 0) return;
            calculateRow.call(row.cells[2].querySelector("input"));
        });
    });

    document.getElementById("addBillBtn").addEventListener("click", addBillToList);
};

// Function to add bill to list
function addBillToList() {
    let name = document.getElementById("name").value.trim();
    let td = document.getElementById("td").value.trim();
    let address = document.getElementById("address").value.trim();
    let assessedValue = document.getElementById("assessedValue").value.trim();

    if (!name || !td || !address || !assessedValue) {
        alert("Please enter all customer details before adding to bill!");
        return;
    }

    let billingRows = document.querySelectorAll(".billing-table tr");
    if (billingRows.length <= 1) {
        alert("Please add at least one billing entry before adding to bill!");
        return;
    }

    let totalFullPayment = document.getElementById("totalFullPayment").innerText;
    let totalPenalty = document.getElementById("totalPenalty").innerText;
    let overallTotal = document.getElementById("overallTotal").innerText;

    let fromYear = document.querySelector(".billing-table tr:nth-child(2) td:first-child input").value || "N/A";
    let toYear = document.querySelector(".billing-table tr:nth-child(2) td:nth-child(2) input").value || "N/A";
    let yearCovered = (fromYear && toYear) ? `${fromYear} - ${toYear}` : "N/A";

    let bill = {
        name, td, address, assessedValue, yearCovered, totalFullPayment, totalPenalty, overallTotal
    };

    bills.push(bill);
    updateBillList();
    resetForm();
}

// Function to reset form fields after adding bill
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("td").value = "";
    document.getElementById("address").value = "";
    document.getElementById("assessedValue").value = "";

    document.querySelectorAll(".billing-table input[type='number']").forEach(input => input.value = "");

    document.getElementById("totalFullPayment").innerText = "0.00";
    document.getElementById("totalPenalty").innerText = "0.00";
    document.getElementById("overallTotal").innerText = "0.00";
}
