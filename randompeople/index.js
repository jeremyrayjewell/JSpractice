function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

document.documentElement.style.setProperty('--main-color', getRandomColor());
document.documentElement.style.setProperty('--secondary-color', getRandomColor());

var img = document.createElement('img');
var face = Math.floor(Math.random() * 10000);
img.src = 'https://robohash.org/' + face + '?set=set1';

var faceDiv = document.querySelector('.face'); // select the div with class 'face'
faceDiv.appendChild(img); 

var personName = document.createElement('h1');
fetch('https://api.parser.name/?api_key=ce79b520ec80240922f14889e1fe6e91&endpoint=generate')
    .then(response => response.json())
    .then(data => {
        var personName = document.createElement('h1');
        personName.textContent = data.data[0].name.firstname.name + ' ' + data.data[0].name.lastname.name;
        document.body.appendChild(personName);
    })
    .catch(error => console.error('Error:', error));

// var personStory = document.createElement('p');

