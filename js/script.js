const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {
      image: 'images/drink.jpg',
      text: "I'm Thirsty"
    },
    {
      image: 'images/food.jpg',
      text: "I'm Hungry"
    },
    {
      image: 'images/tired.jpg',
      text: "I'm Tired"
    },
    {
      image: 'images/hurt.jpg',
      text: "I'm Hurt"
    },
    {
      image: 'images/happy.jpg',
      text: "I'm Happy"
    },
    {
      image: 'images/angry.jpg',
      text: "I'm Angry"
    },
    {
      image: 'images/sad.jpg',
      text: "I'm Sad"
    },
    {
      image: 'images/scared.jpg',
      text: "I'm Scared"
    },
    {
      image: 'images/outside.jpg',
      text: 'I Want To Go Outside'
    },
    {
      image: 'images/home.jpg',
      text: 'I Want To Go Home'
    },
    {
      image: 'images/school.jpg',
      text: 'I Want To Go To School'
    },
    {
      image: 'images/grandma.jpg',
      text: 'I Want To Go To Grandmas'
    }
  ];

data.forEach(createBox);

//Create Speech Boxes
function createBox(item){
    const box = document.createElement('div');

    const { image, text } = item;
    
    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    //speak event
    box.addEventListener('click', () => {
      setTextMessage(text);
      speakText();

      //add active effect
      box.classList.add('active');
      setTimeout(()=> box.classList.remove('active'), 800);

    })


    main.appendChild(box);
}

//Init speech synthesis
const message = new SpeechSynthesisUtterance();



//Store voices
let voices = [];

function getVoices(){
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);

  });
}

// set the text
function setTextMessage(text){
  message.text = text;
};

//speak the text
function speakText() {
    speechSynthesis.speak(message);
}

//set the voice 
function setVoice(e){
  message.voice = voices.find(voice => voice.name === e.target.value );
}

//voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);


//toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

//toggle text box
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

//change voice
voicesSelect.addEventListener('change', setVoice);

//read text
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
})

getVoices();