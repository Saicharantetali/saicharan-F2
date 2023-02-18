var bookList = [];
var idCounter = 1;

function issueBook() {
  var bookName = document.getElementById("book-name").value;
  var issuedTo = document.getElementById("issued-to").value;
  var date = new Date();
  var issueDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

  var table = document.getElementById("book-list");
  var row = table.insertRow(-1);
  
  var idCell = row.insertCell(0);
  var bookNameCell = row.insertCell(1);
  var issuedToCell = row.insertCell(2);
  var issueDateCell = row.insertCell(3);
  var statusCell = row.insertCell(4);

  var bookId = idCounter;
  idCounter++;

  idCell.innerHTML = bookId;
  bookNameCell.innerHTML = bookName;
  issuedToCell.innerHTML = issuedTo;
  issueDateCell.innerHTML = issueDate;
  statusCell.innerHTML = "Not Returned <span class='edit-symbol'>&#9998;</span>";
  statusCell.setAttribute("data-status", "not-returned");
  statusCell.contentEditable = true;
  statusCell.addEventListener("click", function() {
    var status = statusCell.getAttribute("data-status");
    if (status === "not-returned") {
      statusCell.innerHTML = "Returned <span class='edit-symbol'>&#9998;</span>";
      statusCell.setAttribute("data-status", "returned");
      statusCell.style.color = "green";
    } else {
      statusCell.innerHTML = "Not Returned <span class='edit-symbol'>&#9998;</span>";
      statusCell.setAttribute("data-status", "not-returned");
      statusCell.style.color = "red";
    }
    updateBookList();
  });

  var book = {
    id: bookId,
    book_name: bookName,
    issued_to: issuedTo,
    issued_time: issueDate,
    status: "not-returned"
  };
  bookList.push(book);
}

function updateBookList() {
  for (var i = 0; i < bookList.length; i++) {
    var book = bookList[i];
    var statusCell = document.querySelector("tr:nth-child(" + (i+2) + ") td:last-child");
    if (statusCell.getAttribute("data-status") !== book.status) {
      statusCell.innerHTML = (book.status === "not-returned") ? "Not Returned <span class='edit-symbol'>&#9998;</span>" : "Returned <span class='edit-symbol'>&#9998;</span>";
      statusCell.setAttribute("data-status", book.status);
      statusCell.style.backgroundColor = (book.status === "not-returned") ? "red" : "green";
    }
  }
}