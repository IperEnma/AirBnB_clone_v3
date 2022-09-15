
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
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    success: function (data) {
      let Bedroom = '';
      let Bathroom = '';
      let guest = '';
	  for (let count = 0; count < data.length; count++) {
        if (data[count].number_rooms > 1) {
          Bedroom = ' Bedrooms';
        } else {
		    Bedroom = ' Bedroom';
        }
        if (data[count].number_bathrooms > 1) {
          Bathroom = ' Bathrooms';
        } else {
		    Bathroom = ' Bathroom';
        }
        if (data[count].max_guest > 1) {
          guest = ' Guests';
        } else {
		    guest = ' Guest';
        }
        if (data[count].description == null) {
          data[count].description = '';
        }

        $.ajax({
          type: 'GET',
          url: 'http://0.0.0.0:5001/api/v1/users/' + data[count].user_id,
          data: JSON.stringify({}),
          dataType: 'json',
          success: function (user) {
            if (user.first_name == null) {
              first_name = 'No';
            } else {
              first_name = user.first_name;
            }
            if (user.last_name == null) {
              last_name = 'owner';
            } else {
              last_name = user.last_name;
            }
            $('.places').append(
              '<article>' +
						'<div class="title_box">' +
							'<h2>' + data[count].name + '</h2>' +
							'<div class="price_by_night">' + data[count].price_by_night + '</div>' +
						'</div>' +
						'<div class="information">' +
							'<div class="max_guest">' + data[count].max_guest + guest + '</div>' +
            				'<div class="number_rooms">' + data[count].number_rooms + Bedroom + '</div>' +
            				'<div class="number_bathrooms">' + data[count].number_bathrooms + Bathroom + '</div>' +
						'</div>' +
						'<div class="user">' +
							'<b>Owner:</b>' + ' ' + first_name + ' ' + last_name +
						'</div>' +
						'<div class="description">' +
							data[count].description +
						'</div>' +
					'</article>');
          }
        });
	   }
    },
    contentType: 'application/json',
    dataType: 'json'
	  });

  // end
});
