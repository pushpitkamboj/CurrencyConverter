//image change hona dropdown change ke sath
//get exhange rate pr click krne baad rate change hona

const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select") //dono select ke lie likha hai from ke lie bhi and to ke lie bhi
const button = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


//this code is for creating dropdown for all the countries
for(let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

//this code keeps the option as INR and USD by default 
        if(select.name === "from" && currCode === "INR") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "USD") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

//event to call function to update the flag and country code
select.addEventListener("change", (event) => {
    updateFlag(event.target);
});
}

//it will update the country code
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    //updating the image of flag
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = newSrc;
    };

//it will update the rates based on our input value
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    //this code will allow user to put value only above 1 and it will
    //put 1 by default if any value less then 1 is put (for eg. neg. values)
    // amtVal = Number(input);
    if (amtVal === "" || amtVal < 0 || !isFinite(amtVal)) {
        amtVal = 1;
        amount.value = "1";
    }

    //it will update the message based on the country selected by the user 
    //with the help of this customized URL which will make API calls
    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
};

    //creating event on get exchange rate button 
    button.addEventListener("click", (event) => {
    event.preventDefault();     //jo bhi default action hote h button ke like page refresh krna wo nhi honge ab whi hoga jo hum chahenge
    updateExchangeRate();
});
    //it will display the updated exchange rate received from the api on window
    window.addEventListener("load", () => {
        updateExchangeRate();
    })

