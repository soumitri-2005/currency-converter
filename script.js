//for toggling the theme
const toggle = document.querySelector(".switch .input");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
});

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    toggle.checked = savedTheme === "dark";
  }
});

toggle.addEventListener("change", () => {
  const theme = toggle.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});

//for currency converter
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//for calculating the exchange rate
const baseRatesUSD = {
  AED: 3.67,
  AFN: 86.5,
  ALL: 107.5,
  AMD: 386,
  ANG: 1.79,
  AOA: 825,
  ARS: 190,
  AUD: 1.5,
  AZN: 1.7,
  BAM: 1.9,
  BBD: 2,
  BDT: 107,
  BGN: 1.9,
  BHD: 0.38,
  BIF: 2090,
  BMD: 1,
  BND: 1.33,
  BOB: 6.9,
  BRL: 5.3,
  BSD: 1,
  CAD: 1.35,
  CHF: 0.91,
  CLP: 810,
  CNY: 7.3,
  COP: 4050,
  CRC: 535,
  CZK: 22,
  DKK: 7.2,
  DOP: 56.5,
  EGP: 30.9,
  ETB: 53,
  EUR: 0.92,
  FJD: 2.2,
  GBP: 0.78,
  GEL: 2.6,
  GHS: 11,
  GTQ: 7.7,
  HKD: 7.85,
  HNL: 24,
  HRK: 7,
  HUF: 370,
  IDR: 14800,
  ILS: 3.5,
  INR: 80,
  IQD: 1460,
  IRR: 42105,
  ISK: 140,
  JMD: 155,
  JOD: 0.71,
  JPY: 134,
  KES: 110,
  KWD: 0.31,
  KZT: 480,
  LAK: 18800,
  LKR: 360,
  LTL: 3.1,
  LVL: 0.6,
  MAD: 10,
  MDL: 19.5,
  MKD: 56,
  MMK: 2100,
  MNT: 3450,
  MOP: 8,
  MUR: 44,
  MVR: 15,
  MWK: 1050,
  MXN: 18,
  MYR: 4.7,
  MZN: 63,
  NAD: 18,
  NGN: 460,
  NOK: 10,
  NPR: 131,
  NZD: 1.6,
  OMR: 0.38,
  PAB: 1,
  PEN: 3.8,
  PHP: 56,
  PKR: 285,
  PLN: 4.5,
  PYG: 7000,
  QAR: 3.64,
  RON: 4.6,
  RSD: 108,
  RUB: 80,
  SAR: 3.75,
  SCR: 14.5,
  SDG: 600,
  SEK: 10,
  SGD: 1.33,
  SYP: 2500,
  THB: 34,
  TND: 2.9,
  TRY: 26,
  TWD: 30,
  TZS: 2310,
  UAH: 37,
  UGX: 3700,
  USD: 1,
  UYU: 40,
  UZS: 11500,
  VEF: 248000,
  VND: 24000,
  YER: 250,
  ZAR: 18,
  ZMW: 21,
  ZWL: 810,
};

function getRate(from, to) {
  if (from === to) return 1;
  if (from === "USD") return baseRatesUSD[to] || null;
  if (to === "USD") return 1 / (baseRatesUSD[from] || 1);

  const rateFromUSD = baseRatesUSD[to];
  const rateToUSD = baseRatesUSD[from];

  if (!rateFromUSD || !rateToUSD) return null;

  return rateFromUSD / rateToUSD;
}

//for options
for (let select of dropdowns) {
  for (let currCode in countryList) {
    //so first we will create a variable called newOption and changing it's text and value(these are two predefined properties) to it's corresponding currCode
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
      //selected bcz it will showed us in the screen
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    //now adding it
    select.append(newOption);
  }

  //for changing the flag with the changing in options
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//upadating exchange rate
const updateExchangeRate = () => {
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);

  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  if (fromCurr.value === toCurr.value) {
    msg.innerText = `${amtVal} ${fromCurr.value} = ${amtVal} ${toCurr.value}`;
    return;
  }

  let rate = getRate(fromCurr.value, toCurr.value);

  if (!rate) {
    msg.innerText = `Exchange rate not available for ${fromCurr.value} to ${toCurr.value}`;
    return;
  }

  let finalAmount = (amtVal * rate).toFixed(2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

//function for updating the flag
const updateFlag = (element) => {
  let currCode = element.value; //getting the value of currency code
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc; //changing the flag
};

//adding events
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
