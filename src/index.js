import generateJoke from './generateJoke';
import './styles/main.scss'
import laughing from './assets/laughing.svg'

const laughImg = document.getElementById('laughImg');
laughImg.src = laughing;

//console.log("Hello World")
console.log(generateJoke());