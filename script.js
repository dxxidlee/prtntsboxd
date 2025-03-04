document.addEventListener('DOMContentLoaded', () => {
    const genreButtons = document.querySelectorAll('.genre-btn');
    const countryButtons = document.querySelectorAll('.country-btn');
    const popup = document.getElementById('recommendation-popup');
    const closeBtn = document.querySelector('.close-btn');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');
    const bigCircle = document.querySelector('.big-circle');

    let selectedGenre = null;
    let selectedCountry = null;

    const recommendations = {
        '(01) Action': {
            '(01) United States': { title: 'Mad Max: Fury Road', description: 'A high-octane post-apocalyptic chase film that reinvented action cinema.' },
            '(02) France': { title: 'La Femme Nikita', description: 'Luc Besson\'s stylish thriller about a criminal turned government assassin.' },
            '(03) Italy': { title: 'The Good, the Bad and the Ugly', description: 'Sergio Leone\'s epic spaghetti western masterpiece.' },
            '(04) Japan': { title: 'Battle Royale', description: 'A brutal, influential action thriller about teenagers forced to fight to the death.' },
            '(05) South Korea': { title: 'The Man from Nowhere', description: 'A stylish revenge thriller about a mysterious pawnshop owner.' },
            '(06) Spain': { title: 'Cell 211', description: 'An intense prison thriller about a guard trapped in a riot.' },
            '(07) Sweden': { title: 'Let the Right One In', description: 'A unique blend of horror and action about a young vampire.' },
            '(08) Russia': { title: 'Night Watch', description: 'A supernatural action film about the forces of light and darkness.' },
            '(09) China': { title: 'Hero', description: 'Zhang Yimou\'s visually stunning martial arts epic.' },
            '(10) Poland': { title: 'The Mighty Angel', description: 'A gritty drama with intense action sequences.' }
        },
        '(02) Comedy': {
            '(01) United States': { title: 'The Royal Tenenbaums', description: 'Wes Anderson\'s quirky tale of a dysfunctional family of geniuses.' },
            '(02) France': { title: 'Amélie', description: 'A whimsical comedy about a shy waitress changing lives in Montmartre.' },
            '(03) Italy': { title: 'Life Is Beautiful', description: 'A touching tragicomedy about maintaining hope in dire circumstances.' },
            '(04) Japan': { title: 'Tampopo', description: 'A "ramen western" celebrating food, life, and love.' },
            '(05) South Korea': { title: 'The Host', description: 'A monster movie that blends horror with family comedy.' },
            '(06) Spain': { title: 'Women on the Verge of a Nervous Breakdown', description: 'Almodóvar\'s colorful farce about love and chaos.' },
            '(07) Sweden': { title: 'A Man Called Ove', description: 'A heartwarming comedy about a grumpy widower.' },
            '(08) Russia': { title: 'Ivan Vasilievich Changes Profession', description: 'A beloved Soviet time-travel comedy.' },
            '(09) China': { title: 'Kung Fu Hustle', description: 'Stephen Chow\'s martial arts comedy masterpiece.' },
            '(10) Poland': { title: 'Day of the Wacko', description: 'A dark comedy about a neurotic teacher.' }
        },
        '(03) Drama': {
            '(01) United States': { title: 'The Tree of Life', description: 'Terrence Malick\'s philosophical meditation on existence and grace.' },
            '(02) France': { title: 'Portrait of a Lady on Fire', description: 'A subtle and passionate period drama about forbidden love.' },
            '(03) Italy': { title: '8½', description: 'Fellini\'s masterpiece about a director\'s creative crisis.' },
            '(04) Japan': { title: 'Drive My Car', description: 'A haunting meditation on love, loss, and art.' },
            '(05) South Korea': { title: 'Poetry', description: 'A touching drama about an elderly woman discovering poetry.' },
            '(06) Spain': { title: 'Pain and Glory', description: 'Almodóvar\'s semi-autobiographical film about creativity and memory.' },
            '(07) Sweden': { title: 'Wild Strawberries', description: 'Bergman\'s meditation on life, death, and memory.' },
            '(08) Russia': { title: 'The Return', description: 'A powerful drama about two brothers and their estranged father.' },
            '(09) China': { title: 'In the Mood for Love', description: 'Wong Kar-wai\'s masterpiece about unrequited love.' },
            '(10) Poland': { title: 'Three Colors: Blue', description: 'Kieslowski\'s meditation on liberty and grief.' }
        },
        '(04) Horror': {
            '(01) United States': { title: 'The VVitch', description: 'A meticulously crafted period horror about a Puritan family.' },
            '(02) France': { title: 'Raw', description: 'A visceral coming-of-age body horror about cannibalism.' },
            '(03) Italy': { title: 'Suspiria (1977)', description: 'Argento\'s technicolor nightmare about a dance academy.' },
            '(04) Japan': { title: 'Cure', description: 'A hypnotic psychological horror about mysterious murders.' },
            '(05) South Korea': { title: 'The Wailing', description: 'A complex horror about evil forces in a rural village.' },
            '(06) Spain': { title: 'The Others', description: 'A sophisticated ghost story about perception and reality.' },
            '(07) Sweden': { title: 'Hour of the Wolf', description: 'Bergman\'s only horror film about an artist\'s descent into madness.' },
            '(08) Russia': { title: 'Viy', description: 'A folk horror based on Gogol\'s novella.' },
            '(09) China': { title: 'A Chinese Ghost Story', description: 'A supernatural romance with horror elements.' },
            '(10) Poland': { title: 'Demon', description: 'A wedding celebration turns into a Jewish folk horror tale.' }
        },
        '(05) Sci-Fi': {
            '(01) United States': { title: 'Primer', description: 'A complex time travel story about ethics and friendship.' },
            '(02) France': { title: 'La Jetée', description: 'An influential short film about time travel and memory.' },
            '(03) Italy': { title: 'The 10th Victim', description: 'A retro-futuristic satire about televised murder games.' },
            '(04) Japan': { title: 'Akira', description: 'A cyberpunk masterpiece about power and revolution.' },
            '(05) South Korea': { title: 'The Host', description: 'A monster movie with environmental themes.' },
            '(06) Spain': { title: 'Timecrimes', description: 'A clever time travel thriller about causality.' },
            '(07) Sweden': { title: 'Aniara', description: 'A space odyssey about humanity\'s future.' },
            '(08) Russia': { title: 'Stalker', description: 'Tarkovsky\'s philosophical science fiction masterpiece.' },
            '(09) China': { title: 'The Wandering Earth', description: 'An epic about moving Earth to a new solar system.' },
            '(10) Poland': { title: 'On the Silver Globe', description: 'Zulawski\'s ambitious unfinished sci-fi epic.' }
        },
        '(06) Romance': {
            '(01) United States': { title: 'Eternal Sunshine of the Spotless Mind', description: 'A unique love story about memory and relationships.' },
            '(02) France': { title: 'The Lovers on the Bridge', description: 'A passionate love story between two homeless people.' },
            '(03) Italy': { title: 'L\'Avventura', description: 'Antonioni\'s modernist take on love and alienation.' },
            '(04) Japan': { title: 'Still Walking', description: 'A gentle story about family bonds and love.' },
            '(05) South Korea': { title: 'The Handmaiden', description: 'A twisting tale of love and deception.' },
            '(06) Spain': { title: 'Talk to Her', description: 'Almodóvar\'s unconventional story about love and connection.' },
            '(07) Sweden': { title: 'Summer with Monika', description: 'Bergman\'s naturalistic romance.' },
            '(08) Russia': { title: 'The Cranes Are Flying', description: 'A wartime romance about love and sacrifice.' },
            '(09) China': { title: 'Chungking Express', description: 'Wong Kar-wai\'s dreamy tale of urban romance.' },
            '(10) Poland': { title: 'Cold War', description: 'A passionate love story spanning decades.' }
        },
        '(07) Thriller': {
            '(01) United States': { title: 'Mulholland Drive', description: 'Lynch\'s masterpiece of psychological horror.' },
            '(02) France': { title: 'Hidden', description: 'A mysterious thriller about surveillance and guilt.' },
            '(03) Italy': { title: 'Deep Red', description: 'A stylish giallo about brutal murders.' },
            '(04) Japan': { title: 'High and Low', description: 'Kurosawa\'s kidnapping thriller examining class.' },
            '(05) South Korea': { title: 'Oldboy', description: 'A twisted revenge thriller about imprisonment.' },
            '(06) Spain': { title: 'The Invisible Guest', description: 'A complex murder mystery with multiple twists.' },
            '(07) Sweden': { title: 'The Seventh Seal', description: 'Bergman\'s medieval thriller about death.' },
            '(08) Russia': { title: 'Brother', description: 'A gritty crime thriller about post-Soviet life.' },
            '(09) China': { title: 'Infernal Affairs', description: 'The original version of The Departed.' },
            '(10) Poland': { title: 'Knife in the Water', description: 'Polanski\'s taut psychological thriller.' }
        },
        '(08) Fantasy': {
            '(01) United States': { title: 'Pan\'s Labyrinth', description: 'A dark fairy tale set against the Spanish Civil War.' },
            '(02) France': { title: 'The City of Lost Children', description: 'A surreal fantasy about stolen dreams.' },
            '(03) Italy': { title: 'Tale of Tales', description: 'A dark fantasy based on fairy tales.' },
            '(04) Japan': { title: 'Spirited Away', description: 'Miyazaki\'s masterpiece about a girl in a spirit world.' },
            '(05) South Korea': { title: 'A Tale of Two Sisters', description: 'A psychological fantasy horror.' },
            '(06) Spain': { title: 'The Spirit of the Beehive', description: 'A poetic fantasy about childhood.' },
            '(07) Sweden': { title: 'Border', description: 'A unique fantasy about identity and belonging.' },
            '(08) Russia': { title: 'Hard to Be a God', description: 'A medieval sci-fi fantasy epic.' },
            '(09) China': { title: 'Journey to the West', description: 'A fantasy based on classical literature.' },
            '(10) Poland': { title: 'The Hourglass Sanatorium', description: 'A surreal fantasy about time and memory.' }
        },
        '(09) Mystery': {
            '(01) United States': { title: 'Chinatown', description: 'Polanski\'s noir masterpiece about corruption.' },
            '(02) France': { title: 'La Ceremonie', description: 'Chabrol\'s psychological mystery.' },
            '(03) Italy': { title: 'The Bird with the Crystal Plumage', description: 'Argento\'s debut mystery thriller.' },
            '(04) Japan': { title: 'The Woman in the Dunes', description: 'An existential mystery about captivity.' },
            '(05) South Korea': { title: 'Mother', description: 'Bong Joon-ho\'s mystery about maternal love.' },
            '(06) Spain': { title: 'Open Your Eyes', description: 'A psychological mystery about reality.' },
            '(07) Sweden': { title: 'The Girl with the Dragon Tattoo', description: 'A complex mystery about violence and justice.' },
            '(08) Russia': { title: 'Solaris', description: 'Tarkovsky\'s mysterious sci-fi masterpiece.' },
            '(09) China': { title: 'Black Coal, Thin Ice', description: 'A noir mystery in northern China.' },
            '(10) Poland': { title: 'The Double Life of Veronique', description: 'Kieslowski\'s mysterious meditation on identity.' }
        },
        '(10) Animation': {
            '(01) United States': { title: 'Fantastic Planet', description: 'A surreal animated sci-fi about human-alien relations.' },
            '(02) France': { title: 'Persepolis', description: 'An animated autobiography about growing up in Iran.' },
            '(03) Italy': { title: 'Allegro non Troppo', description: 'A satirical take on Disney\'s Fantasia.' },
            '(04) Japan': { title: 'Perfect Blue', description: 'Kon\'s psychological thriller about identity.' },
            '(05) South Korea': { title: 'The King of Pigs', description: 'A dark animated drama about school violence.' },
            '(06) Spain': { title: 'Wrinkles', description: 'A touching story about aging and friendship.' },
            '(07) Sweden': { title: 'The Wolf House', description: 'A stop-motion nightmare about escape.' },
            '(08) Russia': { title: 'Hedgehog in the Fog', description: 'A poetic short about adventure.' },
            '(09) China': { title: 'Big Fish & Begonia', description: 'A mythological tale about sacrifice.' },
            '(10) Poland': { title: 'The Wolf House', description: 'An experimental animated horror.' }
        }
    };

    function handleGenreSelection(genre) {
        selectedGenre = genre;
        genreButtons.forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
        updateBigCircle();
        checkForRecommendation();
    }

    function handleCountrySelection(country) {
        selectedCountry = country;
        countryButtons.forEach(btn => btn.classList.remove('selected'));
        event.target.classList.add('selected');
        updateBigCircle();
        checkForRecommendation();
    }

    function updateBigCircle() {
        let text = [];
        if (selectedGenre) text.push(selectedGenre);
        if (selectedCountry) text.push(selectedCountry);
        
        if (text.length > 0) {
            bigCircle.textContent = text.join(' + ');
            bigCircle.style.display = 'flex';
            bigCircle.style.justifyContent = 'center';
            bigCircle.style.alignItems = 'center';
        } else {
            bigCircle.textContent = '';
        }
    }

    function checkForRecommendation() {
        if (selectedGenre && selectedCountry) {
            const recommendation = recommendations[selectedGenre][selectedCountry];
            popupTitle.textContent = recommendation.title;
            popupContent.textContent = recommendation.description;
            popup.style.display = 'block';
        }
    }

    genreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            handleGenreSelection(event.target.textContent);
        });
    });

    countryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            handleCountrySelection(event.target.textContent);
        });
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
}); 