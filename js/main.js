const Url = "http://localhost:8000/api/v1/titles/";

// get and display data from top rated film
function getMostRatedFilmData() {
    //get front element by id
    const img = document.getElementById('best_film__img');
    const title = document.getElementById('best_film__title');
    const description = document.getElementById('best_film__description');
    //get data from the best imdb_score film
    fetch(Url + "?sort_by=-imdb_score")
        .then(res => res.json())
        .then(data => {
            img.src = data["results"][0]["image_url"]
            title.textContent = data["results"][0]["title"]
            film_url = data["results"][0]["url"]
            fetch(film_url)
                .then(res => res.json())
                .then(data => {
                    description.textContent = data["description"]
                })
        })
        .catch((err) => console.log('Error'))
}

function getFilmsFromCategoryImg(category_url, category, first_page, second_page, id) {
    fetch(Url + category_url)
        .then(res => res.json())
        .then(data => {
            const next_page = data["next"]
            // get films data from first page 
            for (let i = first_page; i < 5; i++) {
                let class_name = "category_template__display_" + i
                let category_id = document.getElementById(category);
                let template = document.importNode(category_id.content, true);
                let img = template.getElementById(category + "__img")

                img.src = data["results"][i]["image_url"]
                document.getElementById("category_" + id).appendChild(template)
            }
            fetch(next_page)
                .then(res => res.json())
                .then(data => {
                    // get films data from second page
                    for (let i = 0; i < second_page; i++) {
                        let category_id = document.getElementById(category);
                        let template = document.importNode(category_id.content, true);
                        let img = template.getElementById(category + "__img")
                        img.src = data["results"][i]["image_url"]
                        document.getElementById("category_" + id).appendChild(template)
                    }
                })          
        })
}

getMostRatedFilmData()
//category top rated films
getFilmsFromCategoryImg("?sort_by=-imdb_score", "category_template", 1, 3, "rated")
//category history films
getFilmsFromCategoryImg("?sort_by=-imdb_score&genre=history", "category_template", 0, 2, "history")
//category adventure films
getFilmsFromCategoryImg("?sort_by=-imdb_score&genre=adventure", "category_template", 0, 2, "adventure")
//category anime films
getFilmsFromCategoryImg("?sort_by=-imdb_score&genre=animation", "category_template", 0, 2, "anime")