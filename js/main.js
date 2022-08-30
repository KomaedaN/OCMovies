const Url = "http://localhost:8000/api/v1/titles/";

function getMostRatedFilmData() {
    //get front element by id
    const img = document.getElementById('best_film__img');
    const title = document.getElementById('best_film__title')
    const description = document.getElementById('best_film__description')
    //get data from the best imdb_score film
    fetch(Url + "?sort_by=-imdb_score")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            img.src = data["results"][0]["image_url"]
            title.textContent = data["results"][0]["title"]
            film_url = data["results"][0]["url"]
            fetch(film_url)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    description.textContent = data["description"]
                })
    })
}

getMostRatedFilmData()