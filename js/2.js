// responsive table is no need for this page, so override func.js which create responsive table
$(document).ready(function() {
  $('table.hidden-lg').remove();
  $('table.hidden-xs').removeClass('hidden-xs');
});