import $ from 'jquery';

$(document).ready(() => {
  $.getJSON('specials-data/current.json', (currentData) => {
    $('.month').html(currentData.month);
    $.getJSON(
      `specials-data/${
        currentData.year
      }/${currentData.month.toLowerCase()}.json`,
      (data) => {
        function listSpecials(array, tableId) {
          $(`#${tableId} > tbody`).html('');
          array.forEach((item) => {
            // Clear the loading text
            $(`#${tableId} > tbody`).append(`
              <tr>
                <td>${item.name}</td>
                <td>$${item.price}</td>
              </tr>
              <tr>
                <td colspan="2">${item.description}</td>
              </tr>
            `);
          });
        }
        listSpecials(data.appetizers, 'appetizers-table');
        listSpecials(data.entrees, 'entrees-table');
      },
    );
  });
});
