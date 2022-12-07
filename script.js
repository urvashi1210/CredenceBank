'use strict';


// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];


//https://bankist.netlify.app/

//we use OBJECTS as data from WEB APIs comes in the form of objects
//we then use an array for all objects


// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//-------------




//METHODS-(Methods are functions called on objects)
//Array Methods-mostly  same as string methods(string is a character array)
let arr=['a','b','c','d','e'];

//1.slice()
console.log(arr.slice(2));//returns a new array from beg parameter to end parameter without mutating the original array
console.log(arr.slice(2,4));//before the end(here,4)index
//end-beg is exactly the length we get here
console.log(arr.slice(-2));//2 indices from the end
console.log(arr.slice(1,-2));//from index no 1 to the index before last 2 indices
console.log(...arr);//only spreads all elements
console.log([...arr]);//makes an array of spreaded elements

//2.splice():same as slice() except that 1.it MUTATES the original array and 2.end parameter here signifies the no of elements to be spliced
//used usually to delete(usually the last) element
console.log(arr.splice(-1));
arr.splice(1,2);//delete 2(SECOND PARAMETER) elements starting from index 1(FIRST PARAMETER)
console.log(arr);

//3.reverse():MUTATES the original array
console.log(arr.reverse());
console.log(arr);

//4.concat():   
const arr2=[1,2,3];
const letters=arr.concat(arr2);
console.log(letters);
console.log([...arr,...arr2]);

//JOIN:
console.log(letters.join('-'));

//push,shift,pop,indexOf,includes,etc.

//----------







//forEach method: BETTER than for of loop(function>loop) EXCEPT when you need to BREAK or CONTINUE the loop

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for(const [i,movement] of movements.entries()){
  if(movement>0){
    console.log(`Movement ${i+1}:You deposited ${movement}`);
  }
  else{
    console.log(`Movement ${i+1}You withdrew ${Math.abs(movement)}`);
  }
}

//forEach() passes to the callback function 3 parameters:value,index and entire array(you may omit one of the parameters..NEED NOT WORRY!)
movements.forEach(function(movement,index,array){
  if(movement>0){
    console.log(`Movement ${index+1}:You deposited ${movement}`);
  }
  else{
    console.log(`Movement ${index+1}:You withdrew ${Math.abs(movement)}`);
  }
}) 


//---------

//Creating DOM elements
//make a habit of making functions for each thing and passing in required values as parameters

const displayMovements=function(movements,sort=false){
  containerMovements.innerHTML='';//to remove the already existing transactions in html code
  //.innerHTML is same as .textContent

  const movs=sort?movements.slice().sort((a,b)=>a-b):movements;

  movs.forEach(function(mov,i){
    const type=mov>0?`deposit`:`withdrawal`;
    const html=`
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}
        </div>
        <div class="movements__value">${mov}€
        </div>
    </div>`;
containerMovements.insertAdjacentHTML('afterbegin',html);
//Easiest way to add element(which is an HTML task) is to create a string and then add it to a section by selecting its class and using insertAdjacentHTML method
//there are 4 (1.beforebegin 2.afterbegin 3.beforeend 4.afterend) options
  });
};
displayMovements(account1.movements);
console.log(containerMovements.innerHTML);

//-----------







//CODING CHALLENGE

const dogsJulia1=[3,5,2,12,7];
const dogsKate1=[4,1,15,8,3];
const dogsJulia2=[9,16,6,8,3];
const dogsKate2=[10,5,6,1,4];

const checkDogs=function(dogsJulia,dogsKate){
const dogsJuliaCopy=[...dogsJulia.slice(1,dogsJulia.length-2)];
const data=[...dogsJuliaCopy,...dogsKate];
data.forEach(function(dog,i){
dog<3?console.log(`Dog number ${i+1} is still a puppy🐶`):console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`);
});
};

checkDogs(dogsJulia1,dogsKate1);
checkDogs(dogsJulia2,dogsKate2);

//-------




//Data transformation methods - Map,Filter and Reduce : returns a new array by using a CALLBACK FUNCTION similar to forEach() method while getting access to value,index and array like forEach() method

//Map method: returns a new array which contains in each position the results of applying a callback function WITHOUT MUTATING the ORIGINAL array

const eurToUsd=1.1;
const movementsUSD=movements.map(function(mov){
  return mov*eurToUsd;
  // return 23;
})
console.log(movements);
console.log(movementsUSD);

//alter:this is looping and manually creating while map() is FUNCTIONAL PROGRAMMING
//FUNCTIONAL PROGRAMMING>looping
const movementsUSDfor=[];
for(const mov of movements)movementsUSDfor.push(mov*eurToUsd);
console.log(movementsUSDfor);

//map with arrow instead of callback function
const movementsArrow=movements.map(mov=>mov*eurToUsd);
console.log(movementsArrow); 

//forEach() creates SIDE EFFECT (have to console.log as it usually doesn't return or MUTATES the original array as a side effect) UNLIKE map() method

//SIDE EFFECT: doing some work WITHOUT RETURNING ANYTHING (whether it is console.log() or mutation in original)
//----------










//using map():computing usernames

//create a property username for all accounts(no return hence side effect hence forEach() over map())

//IMP:Create a method for all tasks

const computeUsername=function(accs){
accs.forEach(function(acc){
  acc.username=acc.owner.toLowerCase().split(' ').map(function(name){return name[0]}).join('');
})
}

computeUsername(accounts);
console.log(accounts);//to see the new property Username being created

//--------







//FILTER() METHOD:

const deposits=movements.filter(function(mov){return mov>0;
});
console.log(movements);
console.log(deposits);

//can be done using forEach() but 1.functions>loops(time complexity) and 2.CHAINING OF METHODS can be done using functions but not loops(e.g. owner.split(' ').map(gjbvigh))

//-------




//reduce() method-
//reduce():First parameter:Callback Function, Second parameter:initial value of the accumulator
//the first parameter of the callback function here is the ACCUMULATOR then value,index,array
const balance=movements.reduce(function(acc,cur,i,arr){
  console.log(`Iteration no. ${i}: ${acc}`);
  return acc+cur;
},0);
console.log(balance);

//alter:
let balance2=0;
for(const mov of movements)balance2+=mov;
console.log(balance2);

//implementation: print balance(total deposit-total withdrawal):for some reason didnt work

/*const printBalance=function(accs){
  accs.forEach(function(acc){acc.movements.reduce(function(def,mov){
    // console.log(mov);
    // console.log(def);
    return def+mov;
  },0)});
}
let final=0;
final=final+printBalance(accounts);
console.log(final);

const computeBalance=function(movs){
  movs.reduce(function(acc,mov){
    return acc+mov;
  },0)
}
console.log(computeBalance(movements));*/

//max value
const max=movements.reduce((acc,mov)=>{
if(acc>mov)
return acc;
else
return mov},movements[0]);
console.log(max);
//take default mov[0] instead of 0 as there might be negative values

//-------











//coding challenge #2

const calcAverageHumanAge=function(ages){ 
const humanAges=ages.map(age=>age<=2?2*age:16+age*4);
console.log(humanAges);//an array of humanAges
const adults=humanAges.filter(humanAge=>humanAge>=18)
console.log(adults);
const sum=adults.reduce(function(acc,def){
  return acc+def
},0);
const average=sum/adults.length;
console.log(average);
//alter:
const average2=adults.reduce((acc,age,i,arr)=>acc+age/arr.length,0);
console.log(average2);
//alter:
const average3=adults.reduce((acc,age,i,arr)=>acc+age/adults.length,0);
console.log(average3);
}
calcAverageHumanAge([5,2,4,1,15,8,3]);//testcase

//----







//MAGIC:CHAINING METHODS-try optimising the number of methods and dont use it with methods mutating the original array e.g. reverse() and splice() methods

//PIPELINE
const eurToUsd_=1.1;
const totalDepositUsd=movements
.filter(mov=>mov>0)
.map(mov=>mov*eurToUsd_)  
.reduce((acc,mov)=>acc+mov,0);
console.log(totalDepositUsd);

//implementation:

const calcDisplaySummary=function(account){
  const incomes=account.movements
  .filter(mov=>mov>0)
  .reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent=`${incomes}₤`;

  let out=account.movements
  .filter(mov=>mov<0)
  .reduce((acc,mov)=>acc+mov,0);
  // out=out*-1;
  labelSumOut.textContent=`${Math.abs(out)}£`;

  const interest=account.movements
  .filter(mov=>mov>0)
  .map(deposit=>deposit*account.interestRate/100)
  .filter(int=>int>=1)
  .reduce((acc,mov)=>acc+mov,0);
  labelSumInterest.textContent=`${account.interestRate}₤`;
  
labelBalance.textContent=`${Math.trunc(incomes+out)} £`;

};
calcDisplaySummary(account1);
//display totaldeposits(in)total withdrawn(out) and interets(on deposists above 1% interest)

const calcDisplayBalance=function(acc){
  acc.balance=acc.movements.reduce((acc,mov)=>acc+mov,0);
  labelBalance.textContent=`${acc.balance}€`;
}

//-----------






//find(condition accepting a callback and returning a boolean value) method

const firstWithdrawal=movements.find(mov=>mov<0);//returns the first value satisfying the condition(unlike filter() returns all values satisfying the condition)
console.log(movements);
console.log(firstWithdrawal);

const account=accounts.find(acc=>acc.owner==='Jessica Davis');
console.log(account);

//------









//IMPLEMENTING LOGIN(on clicking arrow button or pressing Enter key)

const updateUI=function(acc){
  
  //Display movements
  displayMovements(acc.movements);

  //Display summary
  calcDisplaySummary(acc);

  //Display balance
  calcDisplayBalance(acc);

}
//Event handler
let currentAccount;
btnLogin.addEventListener('click',function(e){
  e.preventDefault();//Prevent form from submitting 
  
currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value)
console.log(currentAccount);
//find() returns undefined if no element matches this condition

if(currentAccount?.pin===Number(inputLoginPin.value)){
  //?. is optional chaining(pin property will only be read if currentAccount exists(find method retuned a legit account))

  //Displaying UI and a WELCOME MESSAGE
  labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(` `)[0]} !`;
  containerApp.style.opacity=100;

  //Clear input fields(empty username and password fields once submitted)
  inputLoginUsername.value=inputLoginPin.value='';//every element is a class that have style,font,value,etc properties
  
  inputLoginPin.blur();//blurs the cursor which was previously still at PIN button after form submission

  //update UI
  updateUI(currentAccount);
  console.log('LOGIN');

}
else{
  labelWelcome.textContent=`Oops! That wasn't a valid one 😕`;
  inputLoginUsername.value=inputLoginPin.value='';
  inputLoginPin.blur();
}
});
//in HTML,the default behavior of the SUBMIT button is to reload the page. So, we give the addEventListener() function's callback function() an event parameter. But this only triggers the login everytime we press enter after selecting any of the fields of that section or if the arrow has been selected

//in FORMS, if we select any of the field and press Enter key, it gets submitted 

//--------







//IMPLEMENTING TRANSFER

btnTransfer.addEventListener('click',function(e){

  e.preventDefault();

  const amount=Number(inputTransferAmount.value);
  const receiverAccount=accounts.find(acc=>acc.username===inputTransferTo.value);
  
  console.log(amount,receiverAccount);
  //Clear input fields
  inputTransferAmount.value=inputTransferTo.value='';

  //Blur the cursor
  inputTransferAmount.blur();

 if(amount>0 && amount<=currentAccount.balance && receiverAccount && receiverAccount?.username!==currentAccount.username){
  //Optional chaining does undefined!==inputTransferTo.value hence gives true value

  console.log(`TRANSFER SUCCESSFUL`);

  //Doing the transfer

  currentAccount.movements.push(-amount);
  receiverAccount.movements.push(amount);

  //Update UI
  updateUI(currentAccount);  

 }

});

//------------











//The findIndex() method-returns the index of the found element and not the element itself

//Close an account- Deletion of an account element from accounts array. To delete an array element, we use the splice() method that needs index as parameter

btnClose.addEventListener('click',function(e){
  e.preventDefault();

  if(inputCloseUsername.value===currentAccount.username && Number(inputClosePin.value)===currentAccount.pin){
    
    const index=accounts.findIndex(acc=>acc.username===currentAccount.username); 
    console.log(index);

    //delete account
    accounts.splice(index,1);//delete 1(parameter 2) from index(parameter 1) //mutates the original array
  
    console.log(accounts);
  //hide UI
  containerApp.style.opacity=0;
  }

  inputCloseUsername.value=inputClosePin.value='';

})

//------












//some and every method:
//some() 's rea name should be any() method - if there's ANY value satisfying that, it will RETURN TRUE 

console.log(movements);

//EQUALITY
console.log(movements.includes(-130));

//CONDITION:
const anyDeposits=movements.some(mov=>mov>0);
console.log(anyDeposits);
//EQUALITY can also be checked as in:
console.log(movements.some(mov=>mov===-130));

//LOAN GRANT CRITERIA: Only if the bank account has at least 1 deposit which is greater than or equal to 10% of the requested loan amount

btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amount=Number(inputLoanAmount.value);

  if(amount>0 && currentAccount.movements.some(mov=>mov>=amount*0.1)){

  //add a positive movement
    currentAccount.movements.push(amount);

  //update UI
   updateUI(currentAccount);
  }
  inputLoanAmount.value='';
  // inputLoanAmount.blur();//needless

})

//EVERY()-returns true if all elements match the condition in our callback() function

console.log(account1.movements.every(mov=>mov>0));//false
console.log(account4.movements.every(mov=>mov>0));//true

//Alter - separate callback - DRY Approach(Don't Repeat Yourself)
//If you want to change yourself then you may change it at one place hence DRY principle is useful
const deposit=mov=>mov>0;//deposit is an arrow function here
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//-------













//flat()and flatMap() method

const array=[[[1,2],3],[4,5,6],7,8];
console.log(array.flat());//FLAT() removed the nested array(ONE LEVEL DEEP) and flattened it
console.log(array.flat(2));

const overallBalance=accounts
.map(acc=>acc.movements)
.flat()
.reduce((acc,mov)=>acc+mov,0);
console.log(overallBalance);

//turns out using map then flat is an extremely common practice. Hence, comes flatMap() method

//However, flatMap() can "ONLY GO ONE LEVEL DEEP", unlike flat()

const overallBalance2=accounts
.flatMap(acc=>acc.movements)
.reduce((acc,mov)=>acc+mov,0);
console.log(overallBalance);

//-----------












//sort : JS built-in function

//Strings
const owners=['Jonas','Zach','Adam','Martha'];
console.log(owners.sort());
console.log(owners);

//Numbers:
console.log(movements);
console.log(movements.sort());//sorts as STRING so first come all negative no then sorting happens on basis of numeric values
//CORRECT way to use sort() on numbers: 
//return <0, A,B (keep order)
//return >0, B,A (switch order)
movements.sort((a,b)=>{
  if(a>b)
  return 1;
  else
  return -1;
});
console.log(movements);
//descending:
movements.sort((a,b)=>{
  if(a<b)
  return 1;
  else
  return -1;
});
console.log(movements);

//Alter:
//ascending
console.log(movements.sort((a,b)=>a-b));//If a>b, a-b>0 and if a<b, a-b<0
//descending
console.log(movements.sort((a,b)=>b-a));

//ENABLING THE SORT BUTTON ON THE SCREEN->

//Steps:

//1. Go to displayMovements() and add second parameter sort=false because you want to sort only when user clicks
//2. Create a copy of movements array(you do not want to change the order of the original array) using SLICE()
//slice() is used to create copy of an Array
//Alter of slice() could be spread operator to create copy of an array
//3. Use the sort method
//4.Use the copied array further in the function
//5.Call displayMovements() when user clicks on Sort and set second parameter to true

//IMPLEMENTATION:

let sortState=false;
//we want to preserve the sort state hence global (coz we want to unsort the array on second click means sort if unsorted and unsort if sorted)
btnSort.addEventListener('click',function(e){
e.preventDefault;

displayMovements(currentAccount.movements,!sortState);

sortState=sortState?false:true;

})

//----







//More ways of creating and filling arrays

console.log([1,2,3]);
console.log(new Array(1,2,3));

//when we pass only one argument in new Array() function, it creates an empty array of that length
const x=new Array(7);
console.log(x);

console.log(x.map(()=>5));//no function works on this array now except fill() method


//fill() method works on any array (mechanism: like slice() method)
// x.fill(1);//fills entire array with 1
// x.fill(1,3);//fills 1 from index number 3 onwards
x.fill(1,3,5);//fills the array with 1 from index 3 onwards till index number before 5
console.log(x);

const arr3=[1,2,3,4,5,6];
arr3.fill(20,1,4)
console.log(arr3);

//creating array programtically:

// Array.from(): called from as it is used to create an array from maps,sets or strings
//here we are not calling the from() function on any array but on the Array constructor itself

//from() method is being called on Array() method

const y=Array.from({length:7},()=>1);
console.log(y);
//CLEANER METHOD THAN FILL()

const z=Array.from({length:7},(_,i,__)=>i+1);//this callback() method is like map method's callback function() hence gets access to 1.current element 2.index 3.array
console.log(z);

//Convention: Use _ for throwaway variables (not to be used)

//Generating 100 dice rolls
const dice=Array.from({length:100},(()=>Math.trunc(Math.random()*(6-1+1)+1)));
console.log(dice);

//random() syntax: Math.random()*(max-min+1)+min;

//To get data from UI in the form of an array
labelBalance.addEventListener('click',function(){
  const movementsUI=Array
  .from(document.querySelectorAll('.movements__value'))
  .map(el=>Number(el.textContent.replace('€','')))
//querySelectorAll returns a node list that we convert to array
console.log(movementsUI);//map wouldn't work directly on querySelectorAll() as it gives a nodelist but here it has been converted to an array hence it does
//EventHandler can be attached to anything not just buttons

//another way to create array from querySelectorAll is to destructure
const movementsUI2=[...document.querySelectorAll('.movements__value')];
});

//--------











//SUMMARY: WHEN TO USE WHICH ARRAY METHOD(23 studied so far)

//---------












//Coding Challenge

const dogs=[
  {
    weight:22,curFood:250,owners:['Alice','Bob']
  },
  {
    weight:8,curFood:200,owners:['Matilda'],
  },
  {
  weight:13,curFood:275,owners:['Sarah','John'],
  },
  {
  weight:32,curFood:348,owners:['Michael']
  } 
];

//1
dogs.forEach(dog=>dog.recFood=dog.weight**0.75*28);

//2
const Sarahdog=dogs.find(dog=>dog.owners.includes('Sarah'));
console.log(`Sarah's dog eats too ${Sarahdog.curFood>Sarahdog.recFood?`much`:`little`}`);

//3
const ownersEatTooMuch=dogs.filter(dog=>{return dog.curFood>dog.recFood}).flatMap(dog=>dog.owners);

const ownersEatTooLittle=dogs.filter(dog=>{return dog.curFood<dog.recFood}).flatMap(dog=>dog.owners);

console.log(ownersEatTooMuch,ownersEatTooLittle);

//4
console.log(`${ownersEatTooMuch.join(' add ')}'s eat too much `);
console.log(`${ownersEatTooLittle.join(' add ')}'s eat too little`);

//5
console.log(dogs.some(dog=>dog.curFood===dog.recFood));

//6
console.log(dogs.some(dog=>dog.curFood>dog.recFood*0.90&&dog.curFood<dog.recFood*1.1));

//7.
const okayFood=dogs.filter(dog=>dog.curFood>dog.recFood*0.90&&dog.curFood<dog.recFood*1.1);
console.log(okayFood);

//8
const dogsSorted=dogs.slice().sort((a,b)=>a.recFood-b.recFood);
console.log(dogsSorted);

