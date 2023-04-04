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
        tr.innerHTML = `<td>${jsonElem.art}</td>
                        <td>${jsonElem.brand}</td>
                        <td>${jsonElem.d_deliv}</td>
                        <td>${jsonElem.gid}</td>
                        <td>${jsonElem.is_returnable}</td>
                        <td>${jsonElem.kr}</td>
                        <td>${jsonElem.name}</td>
                        <td>${jsonElem.num}</td>
                        <td>${jsonElem.price}</td>
                        <td>${jsonElem.whse}</td>`;
        tbody.append(tr)
    });

    table.append(tbody);
    wrap.innerHTML = '';
    wrap.append(table);
}