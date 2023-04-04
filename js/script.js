let form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    formSubmitAction(form, e);
});

async function formSubmitAction(form, e) {
    e.preventDefault();

    const formData = new FormData(form);

    form.classList.add('_sending');
    const response = await fetch('../test/ajax.php', {
        method: 'POST',
        body: formData
    });
    if (response.ok) {
        let responseResult = await response.json();
        console.log(responseResult)
        createTable(responseResult)
        form.classList.remove('_sending');
    } else {
        alert("Ошибка");
        form.classList.remove('_sending');
    }
}

function createTable(json) {
    let wrap = document.querySelector('.wrap');
    let table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    let tbody = document.createElement('tbody');

    json.forEach(jsonElem => {
        let tr = document.createElement('tr');
        let tdBrand = document.createElement('td');
        let tdName = document.createElement('td');

        tdName.innerHTML = jsonElem.name;
        tdBrand.innerHTML = jsonElem.brand;

        tr.append(tdBrand)
        tr.append(tdName)

        tbody.append(tr)
    });

    table.append(tbody);
    wrap.innerHTML = '';
    wrap.append(table);
}