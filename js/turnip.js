var price = {};
var buyPrice;
var monPriceAM;
var base;
var increaseFlag = 0;

function increaseBefore() {
    var increase = false;
    for (var i = 2; i <= 8; i++) {
        if (price[i] > monPriceAM) {
            console.log("increased");
            increase = true;
            increaseFlag = i;
            return increase;
        }
    }
    
    return increase;
}

function guess() {
    var type0 = document.getElementById("type0"); // 波型
    var type1 = document.getElementById("type1"); // 三期型
    var type2 = document.getElementById("type2"); // 遞減型
    var type3 = document.getElementById("type3"); // 四期型

    if (base >= 0.9) { // Random or Small Spike
        type0.style.display = "block";
        type3.style.display = "block";

        if (price[2] != "" && price[3] != "") {
            console.log("got here!");
            
            if (price[2] / buyPrice < 0.8 || price[3] / buyPrice < 1.4) {
                // 波型
                type3.style.display = "none";
            } else if (price[2] / buyPrice >= 0.8 && price[3] / buyPrice >= 1.4) {
                // 四期型
                type0.style.display = "none";
            }
        }
    } else if (base < 0.9 && base >= 0.85) { // Small Spike or Large Spike or Decreasing
        type1.style.display = "block";
        type2.style.display = "block";
        type3.style.display = "block";

        // check if price increases before thu p.m.
        var increase = increaseBefore();

        if (increase) {
            // 三期or四期
            if (price[increaseFlag+1] / buyPrice >= 1.4) {
                // 三期
                type2.style.display = "none";
                type3.style.display = "none";
            } else {
                // 四期
                type1.style.display = "none";
                type2.style.display = "none";
            }
        } else if (!increase && price[8] != " ") {
            // 遞減
            type1.style.display = "none";
            type3.style.display = "none";
        }
    } else if (base < 0.85 && base >= 0.8) { // Small Spike
        // 四期型
        type3.style.display = "block";
    } else if (base < 0.8 && base >= 0.6) { // Small Spike or Random
        type0.style.display = "block";
        type3.style.display = "block";

        var increase = increaseBefore();

        if ((increaseFlag - 1) >= 3) {
            // 四期
            type0.style.display = "none";
        }

        if (price[2] != "" && ((monPriceAM / buyPrice) - (price[2] / buyPrice)) > 0.05) {
            // 波型
            type3.style.display = "none";
        }

    } else if (base < 0.6) { // Small Spike
        // 四期型
        type3.style.display = "block";
    }
}

function predict() {
    /** Read the prices in the form */
    const formElement = document.getElementById("form");
    var tempPrice = {};

    buyPrice = formElement[0].value;
    for (var i= 1; i <= 12; i++) {
        tempPrice[i] = formElement[i].value;
    }

    /** Change readed price in correct order */
    price[1] = tempPrice[1];
    price[2] = tempPrice[7];
    price[3] = tempPrice[2];
    price[4] = tempPrice[8];
    price[5] = tempPrice[3];
    price[6] = tempPrice[9];
    price[7] = tempPrice[4];
    price[8] = tempPrice[10];
    price[9] = tempPrice[5];
    price[10] = tempPrice[11];
    price[11] = tempPrice[6];
    price[12] = tempPrice[12];


    monPriceAM = price[1];

    /** Calculate base ratio */
    base = monPriceAM / buyPrice;

    /** Guess the type */
    guess();
}

