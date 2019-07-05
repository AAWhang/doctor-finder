import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
var api_key = process.env.exports.apiKey;
// var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?query=${ailment}&location=37.773,-122.413,100&skip=2&limit=10&user_key=' + api_key;

function doctorFinder() {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let ailment = $("#querySearch").val();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${ailment}&location=37.773,-122.413,100&skip=2&limit=10&user_key=` + api_key;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };

    request.open("GET", url, true);
    request.send();
  });
}

function insultMaker() {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://evilinsult.com/generate_insult.php?lang=en&type=plain`;

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };

    request.open("GET", url, true);
    request.send();
    });
}

function bitTracker() {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.coingecko.com/api/v3/coins/bitcoin`;

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };

    request.open("GET", url, true);
    request.send();
  });
}

function kanyeQuote() {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.kanye.rest`;

    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };

    request.open("GET", url, true);
    request.send();
  });
}

$(function(){

  $("#ailSubmit").click(function() {

  doctorFinder()
        .then(function(response) {
            let body = JSON.parse(response);
            let catty = body.meta.total;
            alert(catty);
            $('#insult').html(`${catty}`);
            return insultMaker();
          })
        .then(function(response) {
          let insult = response;
          $('#insult').append(`${insult}`);
          return bitTracker();
        })
        .then(function(response) {
          let coinVal = JSON.parse(response);
          $('#coins').html(`1 btc = $${coinVal.market_data.current_price.usd} USD`);
          return kanyeQuote();
        })
        .then(function(response) {
          let kanye = JSON.parse(response);
          $('#kanye').html(`Kanye says: "${kanye.quote}"`);
        });

    event.preventDefault();

  });
});
