document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector("form");
  let table = document.getElementById("table");

  let data = {
    child: { ages: [], total: 0, count: 0 },
    adult: { ages: [], total: 0, count: 0 },
    elderly: { ages: [], total: 0, count: 0 },
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let ageInput = document.querySelector(".person-age");
    let agePerson = parseInt(ageInput.value);

    if (agePerson < 0) {
      alert("Por favor, insira uma agePerson válida.");
      return;
    }

    ageInput.value = "";

    categoryAge(agePerson, data);
    updateTable();
  });

  function categoryAge(agePerson, data) {
    if (agePerson < 18) {
      data.child.ages.push(agePerson);
      data.child.total += agePerson;
      data.child.count++;
    } else if (agePerson < 60) {
      data.adult.ages.push(agePerson);
      data.adult.total += agePerson;
      data.adult.count++;
    } else {
      data.elderly.ages.push(agePerson);
      data.elderly.total += agePerson;
      data.elderly.count++;
    }
  }

  function updateTable() {
    let childRow = table.rows[1];
    let adultRow = table.rows[2];
    let elderlyRow = table.rows[3];

    function updateRow(row, category) {
      let { count, total, ages } = data[category];
      row.cells[1].textContent = count;
      row.cells[2].textContent = count ? (total / count).toFixed(2) : "0";
      row.cells[3].textContent = ages.join(", ");
    }

    updateRow(childRow, "child");
    updateRow(adultRow, "adult");
    updateRow(elderlyRow, "elderly");

    let geralMedia =
      (data.child.total + data.adult.total + data.elderly.total) /
      (data.child.count + data.adult.count + data.elderly.count);
    document.querySelector(".geral span").textContent = geralMedia.toFixed(2);
  }
});
