'use strict';

// put your own value below!
const searchURL = 'https://developer.nps.gov/api/v1/parks?&api_key=93AAUgO1Q7k7MvvLD5DGidG2mG4momKhx0bh1ZLU';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href="${responseJson.data[i].url}" target="_blank">Visit ${responseJson.data[i].fullName} Online</a></p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getParkList (state, maxResults=10) {
  const params = {
    stateCode: state,
    limit: maxResults,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '&' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const state = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParkList(state, maxResults);
  });
}

$(watchForm);