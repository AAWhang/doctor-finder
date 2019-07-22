export default class FindDoctor {
  doctorFinder(ailment, api_key) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url =` https://api.betterdoctor.com/2016-03-01/doctors?query=${ailment}&location=47.606%2C-122.332%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=` + api_key;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }

      request.open("GET", url, true);
      request.send();
    })
  }
}
