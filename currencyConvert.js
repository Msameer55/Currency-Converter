// const URL = 'https://currency-api.pages.dev/gh/fawazahmed0/currency-api@1/latest/currencies'
const API_KEY = '18065f60ca6faa5cbec189fe' ;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest` ;


const selectDropDown = document.querySelectorAll("select");
const btn = document.querySelector("#btn");


for (let i = 0; i < selectDropDown.length; i++) {
    const select = selectDropDown[i];   
    for (const currCode in countryList) {
        let newOption = document.createElement('option');
        newOption.value = currCode;
        newOption.innerText = currCode;
        if (select.name === 'from' && currCode === 'USD') {
            newOption.selected = 'selected';
        } else if (select.name === 'to' && currCode === 'PKR') {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener('change', (event) => {
        updateFlag(event.target);
    });
}


const updateFlag = (elem) => {
    let currCode = elem.value;
    let countryCode = countryList[currCode];
    let  newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = elem.parentElement.querySelector('img');
    img.src = newSrc;
    
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector("#amount");
    let amountVal  = amount.value;
    if(amountVal === '' || amountVal < 1){
        amountVal = 1
        amount.value = '1';
    }
    const fromCurrency = document.querySelector("#fromSelect").value;
    const toCurrency = document.querySelector("#toSelect").value;

    const exchangeRate = await getData(fromCurrency, toCurrency);
    if (exchangeRate) {
        const convertedAmount = (amountVal * exchangeRate).toFixed(2);

        const currencyValue = document.querySelector(".currency-value p");
        currencyValue.textContent = `${amountVal} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }



    console.log(amountVal);
})

const getData = async (fromCurrency, toCurrency) => {
    const url = await fetch(`${BASE_URL}/${fromCurrency}`);
    const data = await url.json();
    const rate = data.conversion_rates[toCurrency];
    return rate;
}