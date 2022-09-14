$(document).ready(function () {
  // checkbox
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
  });
  // api status
  $(function () {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (String(textStatus) === String('success')) {
	  	$('#api_status').addClass('available');
	   } else {
	    $('#api_status').removeClass('available');
	   }
    });
  });

  // request post
  $(function () {
    $.post('url', function (data) {

    });
  });

  // end
});
