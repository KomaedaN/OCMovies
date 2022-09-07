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

function getSecondPageId(category_url, page, second_number, id) {
    fetch(category_url)
        .then(res => res.json())
        .then(data => {
            const second_page_url = data["next"]
            getFilmsFromCategory(second_page_url, page, second_number, id)
        })
}

async function getFilmsFromCategory(category_url, first_number, seconde_number, id) {
    fetch(category_url)
        .then(res => res.json())
        .then(async data => { 
            // get films data from first page
            for (let i = first_number; i < seconde_number; i++) {
                const current_film_id = data["results"][i]["id"];
                const current_film_data = await getDataFromFilmId(current_film_id);//get all data from id 
                            
                //assign data
                let image_data = current_film_data[0];

                let information_div = document.createElement('div');
                information_div.id = "film_" + current_film_id;
                information_div.classList.add("carousel__card");
                document.getElementById("category_" + id).appendChild(information_div);
        
                let category_id = document.getElementById("category_template");
                let template = document.importNode(category_id.content, true);
                let img = template.getElementById("category_template__img");
                img.src = image_data    
                document.getElementById("film_" + current_film_id).appendChild(template);

                insertFilmData(current_film_data, current_film_id);
                
                }
    })
}

async function getDataFromFilmId(id) {
    return await fetch(Url + id)
        .then(res => res.json())
        .then(data => {
            const image = data["image_url"];
            const title = data["title"];
            const genres = data["genres"]
            const date = data["date_published"];
            const rated = data["rated"];
            const imdb = data["imdb_score"];
            const directors = data["directors"];
            const actors = data["actors"]
            const duration = data["duration"]
            const countries = data["countries"]
            const reviews_from_critics = data["reviews_from_critics"]
            const long_description = data["long_description"]

            return [image, title, genres, date, rated, imdb, directors, actors, duration, countries, reviews_from_critics, long_description]
        })
        .catch((err) => console.log(err))
}


async function insertFilmData(current_film_data, current_film_id) {
    const information_template = document.getElementById("all_data")
    const div_template = document.importNode(information_template.content, true);
    document.getElementById("display_film_data").appendChild(div_template);

    let display_div = document.getElementById("category_template__display");
    let btn = document.getElementById("btn_display");
    let btn_display_none = document.getElementById("btn_none_");
    //attribut current film id 
    display_div.id = "display_" + current_film_id;
    btn.id = current_film_id;
    btn_display_none.id = "btn_none_" + current_film_id

    document.getElementById("btn_none_" + current_film_id).classList.add(current_film_id)

    let title = document.getElementById("display_" + current_film_id).querySelector("#category_template__title");
    let genres = document.getElementById("display_" + current_film_id).querySelector("#category_template__genres");
    let image = document.getElementById("display_" + current_film_id).querySelector("#category_template__img_div");
    let date = document.getElementById("display_" + current_film_id).querySelector("#category_template__date");
    let rated = document.getElementById("display_" + current_film_id).querySelector("#category_template__rated");
    let imdb = document.getElementById("display_" + current_film_id).querySelector("#category_template__imdb");
    let directors = document.getElementById("display_" + current_film_id).querySelector("#category_template__directors");
    let actors = document.getElementById("display_" + current_film_id).querySelector("#category_template__actors");
    let duration = document.getElementById("display_" + current_film_id).querySelector("#category_template__duration");
    let countries = document.getElementById("display_" + current_film_id).querySelector("#category_template__countries");
    let reviews_from_critics = document.getElementById("display_" + current_film_id).querySelector("#category_template__reviews_from_critics");
    let description = document.getElementById("display_" + current_film_id).querySelector("#category_template__description");

    
    //assign all information 
    image.src = current_film_data[0]
    title.textContent = current_film_data[1];
    genres.textContent = "GENRES: " + current_film_data[2];
    date.textContent = "DATE DE SORTIE: " + current_film_data[3];
    rated.textContent = "RATED: " + current_film_data[4];
    imdb.textContent = "SCORE IMDB: " + current_film_data[5];
    directors.textContent = "REALISATEUR: " + current_film_data[6];
    actors.textContent = "LISTE DES ACTEURS: " + current_film_data[7];
    duration.textContent = "DUREE: " + current_film_data[8] + " minutes";
    countries.textContent = "PAYS D'ORIGINE: " + current_film_data[9];
    reviews_from_critics.textContent = "RESULTAT AU BOX OFFICE: " + current_film_data[10];
    description.textContent = current_film_data[11];
}

async function displayInforamtion(id) {
    document.getElementById("display_" + id).classList.add("category_template__display_true");
}

async function displayInforamtionNone(id) {
    film_id = document.getElementById(id).className;
    document.getElementById("display_" + film_id).classList.remove("category_template__display_true");;
}


let index = 0;

async function displayItems(category, carousel_value) {
    const carousel_width = document.getElementById("carousel_" + category).offsetWidth;
    const category_container = document.getElementById("category_" + category);
    if (carousel_value == 'previous') {
        index--;
        const transform_value =  carousel_width * index;
        category_container.style.transform = `translateX(-${transform_value}px)`;
        verifyTranslateX(transform_value, carousel_width, category_container, category)
        if(index == 0) {
            document.getElementById("previous_" + category).classList.remove('show');
        }
    }
    else if (carousel_value == 'next') {
        index++;
        const transform_value =  carousel_width * index;
        category_container.style.transform = `translateX(-${transform_value}px)`;
        verifyTranslateX(transform_value, carousel_width, category_container, category);
        document.getElementById("previous_" + category).classList.add('show');
    }
    
}

async function verifyTranslateX(transform_value, carousel_width, category_container, category) {
    document.getElementById("next_" + category).classList.remove('hide');
    const card_width = category_container.offsetWidth;
    if (card_width - transform_value < carousel_width) {
        document.getElementById("next_" + category).classList.add('hide');
    }
}

getMostRatedFilmData("?sort_by=-imdb_score")
//category top rated films
getFilmsFromCategory("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", 1, 5, "rated")
getSecondPageId("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", 0, 3, "rated")
//category history films
getFilmsFromCategory("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=history", 0, 5, "history")
getSecondPageId("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=history", 0, 2, "history")
//category adventure films
getFilmsFromCategory("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=adventure", 0, 5, "adventure")
getSecondPageId("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=adventure", 0, 2, "adventure")
//category anime films
getFilmsFromCategory("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=animation", 0, 5, "anime")
getSecondPageId("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=animation", 0, 2, "anime")

/*async function createButtonLeftRight(id) {
    const create_btn_l = document.createElement('img')
    const create_btn_r = document.createElement('img')
    create_btn_l.id = "l_" + id 
    create_btn_r.id = "r_" + id 
    create_btn_l.src = "btn.jpg"
    create_btn_r.src = "btn.jpg"
    document.getElementById("category_" + id).appendChild(create_btn_l)
    document.getElementById("category_" + id).appendChild(create_btn_r)
}
*/