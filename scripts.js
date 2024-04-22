/*Accessing the form whose header colors will be changed*/

let form = document.getElementById('change-color');   
let header = document.querySelector('.header');

/*Function to change color*/

function changeColor(event) {
    event.preventDefault();     //Preventing the browser to perform it's default actions//
    
    let colorSelect = document.getElementById('color');
    let color = colorSelect.value;

    if (color === 'randomcolor') {
        // Generate a random color
        let randomColor = getRandomColor();
        header.style.backgroundColor = randomColor;
    } else {
        // Clear the inline background color style
        header.style.backgroundColor = '';

        // Change the class of header based on the selected color
        header.className = 'header ' + color;
    }
}

// Function to generate a random color//
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Adding an event to submit button which executes function changeColor when pressed//
form.addEventListener('submit', changeColor); 


/*Rotating kite

let kite = document.querySelector(".flex-container .shape") //Accessing the container//

    kite.addEventListener('click', function() {        //Adding an event when the shape is clicked//
    kite.style.transform = "rotate(45deg)";         //Transform function to rotate it to 45 deg//
        
        kite.addEventListener('click', function(){  //Adding an event when the shape is clicked
        kite.style.transform= "rotate(0deg)";       //Transform function to rotate it to back to it's original position//
        });
    });*/



//Function to fetch weather using weather API//
// Source: https://yahoo-weather5.p.rapidapi.com/weather?location=//

function fetchWeather() {
    var user_country = document.getElementById("state").value;
    var api_url = "https://yahoo-weather5.p.rapidapi.com/weather?location=" + encodeURIComponent(user_country) + "&format=json&u=f";

    //Fetching key and host to make the url work//
    fetch(api_url, {
      headers: {
        "X-RapidAPI-Key": "448f868c03mshbade7fb646f5009p1d4104jsnfc7728c9e686",
        "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com"
      }
    })

    .then(response => response.json())
    .then(data => {
      var temperature_op=data.current_observation.condition.temperature //to print only the temperature
      document.getElementById("response_text").value = "Temperature: " + temperature_op + "°F"; //print in the text area
    })
    .catch(error => {
      document.getElementById("response_text").value = "Error fetching weather data: " + error; //error handling
    });
  }


//Function to run animation on canvas//

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;   // Setting canvas width //
canvas.height = window.innerHeight-278; // Setting canvas height//
const ctx = canvas.getContext('2d'); //Accessing all 2d elements on canvas// 


//Function to store the values of the circle//

function Circle (x, y, r, dy) {
    this.x = x;     ////Storing the value of one side
    this.y = y;     //Storing the value of another side
    this.r = r ;    //Storing the value of radius
    this.dy= dy;    //Storing the value of Vertical velocity
    
    //Json function to parse the Circle values// 
    this.draw = function() {    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
    ctx.fillStyle='white';
    ctx.fill();
    }

    //Function to make the object bounce back when it touches the corner of the canvas//
    this.update = function(){
    if (this.y + this.r > canvas.height || this.y - this.r < 0){    
        this.dy= -this.dy;
    }

    this.y += this.dy;
    this.draw(); //Executing the function to draw the circle//
    }
}

var Circles = [];   //empty array which allow data to be pushed into it// 


for( var i=0; i < 800; i++) {               //For loop to make multiple circles// 
    var r = 4;                             //assigning a value to the radius of the circle// 
    var x = Math.random() * canvas.width;   //Assigning a math function for Random value for x-axis//
    var y = Math.random() * canvas.height;  //Assigning a math function for Random value for y-axis//
    var dy = 2;    
   
    Circles.push(new Circle(x, y, r, dy));
}

//Function to animate the object//
function animate(){

    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear the canvas each time//

    for (i=0; i < Circles.length; i++){ 

        Circles[i].update();
    }
}

animate(); //Execute the animation function defined above//



