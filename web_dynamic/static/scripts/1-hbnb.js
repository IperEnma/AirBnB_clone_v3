$(document).ready(function () {
  const dict = {};
  $('input:checkbox').change(function () {
    if (this.checked) {
      dict[$(this).attr('data-id')] = $(this).attr('data-name');
	  $('.amenities h4').empty();
    } else {
	  delete dict[$(this).attr('data-id')];
	  $('.amenities h4').empty();
    }

	  let length = Object.keys(dict).length;
	  Object.entries(dict).forEach(([key, value]) => {
      if (length > 1) {
		  $('.amenities h4').append(value);
		  $('.amenities h4').append(', ');
      } else {
		  $('.amenities h4').append(value);
      }
      length -= 1;
	  });
	  console.log(dict);
  });
});
