exercise1();
document.getElementById("ex-2-btn").onclick = () => {
  exercise2();
};
document.getElementById("ex-3-btn").onclick = () => {
  exercise3();
};
document.getElementById("ex-4-btn").onclick = () => {
  exercise4();
};
exercise5();
exercise6();

function exercise1() {
  url = new URL("https://localhost");

  url.protocol = "https:";
  url.hostname = "api.openweathermap.org";
  url.pathname = "data/2.5/weather";
  url.searchParams.set("q", "Sydney");
  url.searchParams.set("appid", "ac5d516646126253361022bafa972296");
  url.searchParams.set("mode", "json");
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "se");

  document.getElementById("ex-1-out").innerText = url;
  return url;
}

function exercise2() {
  fetch(exercise1())
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      const prettyJSON = JSON.stringify(JSON.parse(text), null, " ");
      document.getElementById("ex-2-out").innerText = prettyJSON;
    });
}

function exercise3() {
  xhr = new XMLHttpRequest();
  xhr.open("GET", exercise1());
  xhr.responseType = "text";
  xhr.onload = (event) => {
    let text = event.target.response;
    let prettyJSON = JSON.stringify(JSON.parse(text), null, " ");
    document.getElementById("ex-3-out").innerText = prettyJSON;
  };
  xhr.send();
}

function exercise4() {
  fetch(exercise1())
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let weatherInfo = json.weather[0];
      let weatherMain = weatherInfo.main;
      let weatherDisc = weatherInfo.description;
      let weatherIcon = weatherInfo.icon;

      let mainContent = json.main;
      let mainFeelsLike = mainContent.feels_like;
      let mainTemp = mainContent.temp;

      let iconURL = new URL("http://openweathermap.org");
      iconURL.pathname = `/img/wn/${weatherIcon}@4x.png`;

      document.getElementById("ex-4-out").innerHTML = /*HTML*/ `
      <h3>"${weatherMain}"</h3>
      <img src="${iconURL}">
      <p>"${weatherDisc}"</p>
      <p>Is: "${mainTemp}", Feels like: "${mainFeelsLike}"</p>
      `;
    });
}

function exercise5() {
  url = new URL("http://jsonplaceholder.typicode.com/users/1");
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      document.getElementById("ex-5-author").textContent = json.name;
    });

  url.pathname = "/posts";

  fetch(url)
    .then((respone) => {
      return respone.json();
    })
    .then((json) => {
      let post = json[0];

      document.getElementById("ex-5-title").textContent = post.title;
      document.getElementById("ex-5-content").textContent = post.body;
    });

  const commentsUrl = new URL(
    "http://jsonplaceholder.typicode.com/posts/3/comments"
  );

  commentsUrl.searchParams.set("_limit", 4);

  fetch(commentsUrl)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      document.getElementById("ex-5-comments").innerHTML = "";
      for (let comment of json) {
        document.getElementById("ex-5-comments").insertAdjacentHTML(
          "afterbegin",
          /*HTML*/ `
         <div class ="comment">
            <h3>"${comment.name}"</h3>
            <p>"${comment.body}"</p>
         </div>
        `
        );
      }
    });
}

let id = 0;

function exercise6() {
  pokemonURL = new URL("https://pokeapi.co/api/v2/pokemon");
  pokemonURL.searchParams.set("limit", 151);

  fetch(pokemonURL)
    .then((response) => {
      return response.json();
    })
    .then((pokemons) => {
      let allPokemons = pokemons.results;
      document.getElementById("ex-6-name").innerText = allPokemons[id].name;

      fetch(allPokemons[id].url)
        .then((resp) => {
          return resp.json();
        })
        .then((info) => {
          //console.log(info.sprites.front_default);
          let sprite = info.sprites.front_default;
          document.getElementById("ex-6-sprite").src = sprite;
        });
    });

  flavourURL = new URL("https://pokeapi.co/api/v2/pokemon-species");
  flavourURL.searchParams.set("limit", 151);

  fetch(flavourURL)
    .then((response) => {
      return response.json();
    })
    .then((flavour) => {
      let allFlavour = flavour.results;
      fetch(allFlavour[id].url)
        .then((resp) => {
          return resp.json();
        })
        .then((specificFlavour) => {
          let pokeFlavour = specificFlavour.flavor_text_entries;
          document.getElementById("ex-6-flavortext").textContent =
            pokeFlavour[0].flavor_text;
        });
    });
}

document.getElementById("ex-6-next").onclick = () => {
  if (id === 150) {
    id = -1;
  }
  id++;
  exercise6();
};

document.getElementById("ex-6-prev").onclick = () => {
  id--;
  if (id === -1) {
    id = 150;
  }
  exercise6();
};
