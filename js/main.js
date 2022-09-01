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
                current_film_id = data["results"][i]["id"]
                film_data = this.getDataFromFilmId(current_film_id)
                console.log(film_data)
                image_data = data["results"][i]["image_url"]
                title_data = data["results"][i]["title"]
                
                
                let information_div = document.createElement('div');
                information_div.id = current_film_id

                document.getElementById("category_" + id).appendChild(information_div)

                let category_id = document.getElementById(category);
                let template = document.importNode(category_id.content, true);
                let img = template.getElementById(category + "__img");

                img.src = image_data
                
                document.getElementById(current_film_id).appendChild(template)

                let title = document.getElementById("category_template__title");
                let image = document.getElementById("category_template__img_div");
                let date = document.getElementById("category_template__date");

                title.id = "title_" + current_film_id;
                image.id = "image_" + current_film_id;
                date.id = "date_" + current_film_id;

                title.textContent = title_data
                image.src = image_data
                

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

function getDataFromFilmId(id) {
    return fetch(Url + id)
        .then(res => res.json())
        .then(data => {
            const image_data = data["image_url"];
            const title_data = data["title"];
            const date_data = data["date_published"];
            const rated_data = data["rated"];
            const imdb_data = data["imdb_score"];
            return [title_data, date_data]
        })
        .catch((err) => console.log(err))
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

