import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
var api_key = process.env.exports.apiKey;



$(function(){

  $(".card").click(function() {
    alert(api_key);

    function catMaker() {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `https://aws.random.cat/meow`;

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

  catMaker()
        .then(function(response) {
            let body = JSON.parse(response);
            let catty = body.file;
            $('#cats').html(`<img src='${catty}'>`);
            return insultMaker();
          })
        .then(function(response) {
          let insult = response;
          $('#insult').html(`${insult}`);
          return bitTracker();
        })
        .then(function(response) {
          let coinVal = JSON.parse(response);
          $('#coins').html(`1 btc = $${coinVal.market_data.current_price.usd} USD`);
          return kanyeQuote();
        })
        .then(function(response) {
          let coinVal = JSON.parse(response);
          $('#kanye').html(`Kanye says: "${coinVal.quote}"`);
        });


  });
});
