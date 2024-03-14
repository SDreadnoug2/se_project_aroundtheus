/*fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "4135af44-f1c9-452d-8222-e09e3e6f1c85",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

class Api {
  constructor(options) {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
*/
