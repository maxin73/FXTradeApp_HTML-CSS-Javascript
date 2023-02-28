// URL to get all currency name
// https://api.freecurrencyapi.com/v1/currencies?apikey=<API_KEY>

// URL to get all currency rate 
https://api.freecurrencyapi.com/v1/latest?apikey=<API_KEY>&base_currency=<BASE_CURRENY>

// URL to get selected currency rate
// https://api.freecurrencyapi.com/v1/latest?apikey=<API_KEY>&currencies=<SELECTED_CURRENCY>%2C<SELECTED_CURRENCY>%2C<SELECTED_CURRENCY>&base_currency=CAD

// get user id from session storage and search data from local storage
// update localStorage
$( window ).on('load', function() {

    // test data
    sessionStorage.removeItem("user_id");
    sessionStorage.setItem("user_id", "user_id");
    // localStorage.clear();
    // localStorage.setItem(
    //     'user_id', JSON.stringify({
    //         mainCurrency: 'CAD',
    //         userOwn: {
    //             USD: 100,
    //             CAD: 100
    //         }
    //     })
    // );

    const user_id = sessionStorage.getItem("user_id");
    if (!user_id) { // when session does'nt have user id
        $('#my-balance-table').remove();
        alert("Sorry, this is invalid session. Please login.");
    } else {
        let user_data = JSON.parse(localStorage.getItem(user_id));
        if (!user_data) { // when localStorage doesn't have user data
            alert("Sorry, you don't have your account. Please register.");
        } else {
            if(user_data.hasOwnProperty("userOwn")) { // check if userOwn object key exists
                showMyCurrencyList(user_data.userOwn);
            } else {
                $('#my-balance-table').remove();
                const noBalanceMsg =  $("<p></p>").text("No balance");
                $("#my-balance").append(noBalanceMsg);
            }
            // const allCurrencies = getAllCurrencies();
            const allCurrencies = {
                        "EUR": {
                          "symbol": "€",
                          "name": "Euro",
                          "symbol_native": "€",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "EUR",
                          "name_plural": "Euros"
                        },
                        "USD": {
                          "symbol": "$",
                          "name": "US Dollar",
                          "symbol_native": "$",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "USD",
                          "name_plural": "US dollars"
                        },
                        "JPY": {
                          "symbol": "¥",
                          "name": "Japanese Yen",
                          "symbol_native": "￥",
                          "decimal_digits": 0,
                          "rounding": 0,
                          "code": "JPY",
                          "name_plural": "Japanese yen"
                        },
                        "BGN": {
                          "symbol": "BGN",
                          "name": "Bulgarian Lev",
                          "symbol_native": "лв.",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "BGN",
                          "name_plural": "Bulgarian leva"
                        },
                        "CZK": {
                          "symbol": "Kč",
                          "name": "Czech Republic Koruna",
                          "symbol_native": "Kč",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "CZK",
                          "name_plural": "Czech Republic korunas"
                        },
                        "DKK": {
                          "symbol": "Dkr",
                          "name": "Danish Krone",
                          "symbol_native": "kr",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "DKK",
                          "name_plural": "Danish kroner"
                        },
                        "GBP": {
                          "symbol": "£",
                          "name": "British Pound Sterling",
                          "symbol_native": "£",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "GBP",
                          "name_plural": "British pounds sterling"
                        },
                        "HUF": {
                          "symbol": "Ft",
                          "name": "Hungarian Forint",
                          "symbol_native": "Ft",
                          "decimal_digits": 0,
                          "rounding": 0,
                          "code": "HUF",
                          "name_plural": "Hungarian forints"
                        },
                        "PLN": {
                          "symbol": "zł",
                          "name": "Polish Zloty",
                          "symbol_native": "zł",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "PLN",
                          "name_plural": "Polish zlotys"
                        },
                        "RON": {
                          "symbol": "RON",
                          "name": "Romanian Leu",
                          "symbol_native": "RON",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "RON",
                          "name_plural": "Romanian lei"
                        },
                        "SEK": {
                          "symbol": "Skr",
                          "name": "Swedish Krona",
                          "symbol_native": "kr",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "SEK",
                          "name_plural": "Swedish kronor"
                        },
                        "CHF": {
                          "symbol": "CHF",
                          "name": "Swiss Franc",
                          "symbol_native": "CHF",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "CHF",
                          "name_plural": "Swiss francs"
                        },
                        "ISK": {
                          "symbol": "Ikr",
                          "name": "Icelandic Króna",
                          "symbol_native": "kr",
                          "decimal_digits": 0,
                          "rounding": 0,
                          "code": "ISK",
                          "name_plural": "Icelandic krónur"
                        },
                        "NOK": {
                          "symbol": "Nkr",
                          "name": "Norwegian Krone",
                          "symbol_native": "kr",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "NOK",
                          "name_plural": "Norwegian kroner"
                        },
                        "HRK": {
                          "symbol": "kn",
                          "name": "Croatian Kuna",
                          "symbol_native": "kn",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "HRK",
                          "name_plural": "Croatian kunas"
                        },
                        "RUB": {
                          "symbol": "RUB",
                          "name": "Russian Ruble",
                          "symbol_native": "руб.",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "RUB",
                          "name_plural": "Russian rubles"
                        },
                        "TRY": {
                          "symbol": "TL",
                          "name": "Turkish Lira",
                          "symbol_native": "TL",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "TRY",
                          "name_plural": "Turkish Lira"
                        },
                        "AUD": {
                          "symbol": "AU$",
                          "name": "Australian Dollar",
                          "symbol_native": "$",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "AUD",
                          "name_plural": "Australian dollars"
                        },
                        "BRL": {
                          "symbol": "R$",
                          "name": "Brazilian Real",
                          "symbol_native": "R$",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "BRL",
                          "name_plural": "Brazilian reals"
                        },
                        "CAD": {
                          "symbol": "CA$",
                          "name": "Canadian Dollar",
                          "symbol_native": "$",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "CAD",
                          "name_plural": "Canadian dollars"
                        },
                        "CNY": {
                          "symbol": "CN¥",
                          "name": "Chinese Yuan",
                          "symbol_native": "CN¥",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "CNY",
                          "name_plural": "Chinese yuan"
                        },
                        "HKD": {
                          "symbol": "HK$",
                          "name": "Hong Kong Dollar",
                          "symbol_native": "$",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "HKD",
                          "name_plural": "Hong Kong dollars"
                        },
                        "IDR": {
                          "symbol": "Rp",
                          "name": "Indonesian Rupiah",
                          "symbol_native": "Rp",
                          "decimal_digits": 0,
                          "rounding": 0,
                          "code": "IDR",
                          "name_plural": "Indonesian rupiahs"
                        },
                        "ILS": {
                          "symbol": "₪",
                          "name": "Israeli New Sheqel",
                          "symbol_native": "₪",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "ILS",
                          "name_plural": "Israeli new sheqels"
                        },
                        "INR": {
                          "symbol": "Rs",
                          "name": "Indian Rupee",
                          "symbol_native": "টকা",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "INR",
                          "name_plural": "Indian rupees"
                        },
                        "KRW": {
                          "symbol": "₩",
                          "name": "South Korean Won",
                          "symbol_native": "₩",
                          "decimal_digits": 0,
                          "rounding": 0,
                          "code": "KRW",
                          "name_plural": "South Korean won"
                        },
                        "MXN": {
                          "symbol": "MX$",
                          "name": "Mexican Peso",
                          "symbol_native": "$",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "MXN",
                          "name_plural": "Mexican pesos"
                        },
                        "MYR": {
                          "symbol": "RM",
                          "name": "Malaysian Ringgit",
                          "symbol_native": "RM",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "MYR",
                          "name_plural": "Malaysian ringgits"
                        },
                        "NZD": {
                          "symbol": "NZ$",
                          "name": "New Zealand Dollar",
                          "symbol_native": "$",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "NZD",
                          "name_plural": "New Zealand dollars"
                        },
                        "PHP": {
                          "symbol": "₱",
                          "name": "Philippine Peso",
                          "symbol_native": "₱",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "PHP",
                          "name_plural": "Philippine pesos"
                        },
                        "SGD": {
                          "symbol": "S$",
                          "name": "Singapore Dollar",
                          "symbol_native": "$",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "SGD",
                          "name_plural": "Singapore dollars"
                        },
                        "THB": {
                          "symbol": "฿",
                          "name": "Thai Baht",
                          "symbol_native": "฿",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "THB",
                          "name_plural": "Thai baht"
                        },
                        "ZAR": {
                          "symbol": "R",
                          "name": "South African Rand",
                          "symbol_native": "R",
                          "decimal_digits": 2,
                          "rounding": 0,
                          "code": "ZAR",
                          "name_plural": "South African rand"
                        }
                      };
            const currencyList = Object.keys(allCurrencies);
            createSelectCurrencyList(currencyList, user_data);
        }
    }
})


// this function is executed when user entered the value user want to buy or sell
// return the value calculated based on current currency rate
async function calculateCurrency(fromCurrency, toCurrency, amount) {
    const API_KEY = "2YMkb71wlxf9VlfYcXlpoOII3MPRHGopD7TGLsIk";
    const URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&currencies=${toCurrency}&base_currency=${fromCurrency}`;
    const response = await fetch(URL);
    if (!response.ok) {
        console.log(`An error has occured: ${response.status}`);
    } else {
        const responseJson = await response.json();
        const currentRate = responseJson.data[toCurrency];
        return amount * currentRate;
    }
}


// check user's amount and buy currency
function buy(user_id, baseCurrency, baseAmount, buyCurrency, buyAmount) {

}


// check user's amount and sell currency
function sell(user_id, baseCurrency, baseAmount, sellCurrency, sellAmount) {

}

// list up user's all currency and amount based on parameter object
function showMyCurrencyList(userOwnObject) {
    $('#my-balance-table').remove();
    if(Object.keys(userOwnObject).length > 0) { //when userOwn object has data
        const myBalanceTable = $("<table class='table table-striped mx-3' id='my-balance-table'></table>");
        const thead = $("<thead><tr><th scope='col'>Currency</th><th scope='col'>Amount</th></tr></thead>");
        const tbody = $("<tbody></tbody");
        for(let key in userOwnObject){
            let eachData = `
                <tr>
                    <th scope="row">${key}</th>
                    <td>${userOwnObject[key]}</td>
                </tr>`;
            tbody.append(eachData);
        }
        myBalanceTable.append(thead, tbody);
        $("#my-balance").append(myBalanceTable);
    } else { //when userOwn object doesn't have data
        const noBalanceMsg =  $("<p></p>").text("No balance");
        $("#my-balance").append(noBalanceMsg);
    }
}

// get the currency list from API
// set each value in the select list
function createSelectCurrencyList(currencyList, user_data) {
    currencyList.forEach(currName => {
        const elem = $("<option></option>");
        elem.text(currName);
        elem.val(currName);
        $('#base-currency-select').append(elem);
        $('#change-currency-select').append(elem.clone());
    });
    $('#base-currency-select').val(user_data.mainCurrency);
    $('#change-currency-select').val(user_data.mainCurrency != 'USD' ? 'USD' : 'CAD');
}

// add event listener to input box change
$('#base-currency-select').on('change', async function (e) { 
    e.preventDefault();
    if ($('#base-currency-input').val() > 0) {
        let returnValue = await calculateCurrency($(this).val(), $('#change-currency-select').val(), $('#base-currency-input').val())
        $('#change-currency-input').val(returnValue);
    }
});

$('#base-currency-input').on('change', async function (e) { 
    e.preventDefault();
    if ($(this).val() > 0) {
        let returnValue = await calculateCurrency($('#base-currency-select').val(), $('#change-currency-select').val(), $(this).val());
        $('#change-currency-input').val(returnValue);
    }
});

$('#change-currency-select').on('change', async function (e) { 
    e.preventDefault();
    if ($('#base-currency-input').val() > 0) {
        let returnValue = await calculateCurrency($('#base-currency-select').val(), $(this).val(), $('#base-currency-input').val());
        $('#change-currency-input').val(returnValue);
    }
});

$('#change-currency-input').on('change', async function (e) { 
    e.preventDefault();
    if ($(this).val() > 0) {
        let returnValue = await calculateCurrency($('#base-currency-select').val(), $('#change-currency-select').val(), $(this).val());
        $('#base-currency-input').val(returnValue);
    }
});

async function getAllCurrencies() {
    const API_KEY = "2YMkb71wlxf9VlfYcXlpoOII3MPRHGopD7TGLsIk";
    const URL = `https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`;
    let allCurrencies = localStorage.getItem("allCurrencies");
    if (allCurrencies == null) {
        const response = await fetch( URL );
        if (!response.ok) {
            console.log(`An error has occured: ${response.status}`);
        } else {
            const responseJson = await response.json();
            localStorage.setItem("allCurrencies", responseJson.data);
            return responseJson.data;
        }
    }
}