const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field, control){
        this.field = field;
        this.control = control 
        
    }
    //user input 
    userInput() {
        let x = 0;
        let y = 0;
        this.print(this.field);

        while(this.control[y][x] === pathCharacter || this.control[y][x] === fieldCharacter) {
            const direction = prompt('Which direction would you like to move? Please ennter N for North, S for  South, E for East, or W for West. \n');
          
          if (direction.toUpperCase() === 'N') {
            if (y === 0) {
              console.log('You cannot move any further North. Please choose another direction')
            } else {
              y -=1
            }
          } else if (direction.toUpperCase() === 'S') {
              if (y >= this.control.length) {
                console.log('You cannot move any further South. Please choose another direction')
              } else {
                y +=1
              }
            } else if (direction.toUpperCase() === 'W') {
              if (x === 0) {
                console.log('You cannot move any further West. Please choose another direction')
              } else {
                x -= 1
              }
            } else if (direction.toUpperCase() === 'E') {
              if (x >= this.control[y].length) {
                console.log('You cannot move any further East. Please choose another direction')
              } else {
                x += 1
              }
            } else {
              console.log('Invalid entry. Please enter N, S, E, or W')
            } 
            if (this.control[y][x] === hat) {
              console.log('You found the hat! You win!')
            } else if (this.control[y][x] === hole) {
              console.log('You fell in a hole. Game Over')
            } else {
              this.field[y][x] = pathCharacter;
              this.print(this.field);
            }
          } 
    }

    print(){
        this.field.forEach(( element ) => console.log(element.join('')));
    }

    //generate field with hat and holes
    static generateField(height, width, holes){
        let newField = [];
        for(let i = 0; i < height; i++){
            newField.push([]);
            for(let j = 0; j < height; j++){
                newField[i].push(fieldCharacter)
            };
        };
        newField[0][0] = pathCharacter;
        let hatX = Math.floor(Math.random() * width);
        let hatY = Math.floor(Math.random() * height);
        newField[hatY][hatX] = hat;

        for(let k = holes; k > 0; k--){
            let holeX = hatX;
            let holeY = hatY;
            while(holeX === hatX){
                holeX = Math.floor(Math.random() * width)
            };
            while(holeY === hatY){
                holeY = Math.floor(Math.random() * height)
            };
            newField[holeY][holeX] = hole;
        }
        return newField;
    }
   static generateBlankField(height, width){
    let newField = [];
    for (let i = 0; i < height; i++) {
        newField.push([]);
        for (let j = 0; j < height; j++) {
            newField[i].push(fieldCharacter)
        };
      };
      newField[0][0] = pathCharacter;
      return newField;
   }
    
}

let myField; 

//creat the blank field for the user to see 
const blankField = Field.generateBlankField(5, 5)
//create the field with the hat and holes 
const newField = Field.generateField(5, 5, 1);
console.log(blankField);

//instantiate a Field object using newField = hatAndHole and field = blankField
myField = new Field(newField, blankField)
//call playGame Method
myField.userInput();