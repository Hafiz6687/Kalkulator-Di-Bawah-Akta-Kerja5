
// =========================================
// GLOBAL MONEY FUNCTIONS
// =========================================


// Convert RM / Formula input into number
// Support:
// 2500
// 2500+300
// =2500+300

function parseMoney(value){

    if(value === null || value === undefined){
        return 0;
    }


    value = value
    .toString()
    .trim();


    if(value === ""){
        return 0;
    }


    value = value
    .replace(/RM/gi,"")
    .replace(/,/g,"")
    .trim();


    // Allow incomplete typing
    // Example: =2500+
    if(
        value === "=" ||
        value.endsWith("+") ||
        value.endsWith("-") ||
        value.endsWith("*") ||
        value.endsWith("/")
    ){

        return 0;

    }


    value = value.replace("=","");


    try{

        let result =
        Function(
            "return " + value
        )();


        if(
            typeof result !== "number" ||
            isNaN(result)
        ){

            return 0;

        }


        return result;


    }

    catch(error){

        return 0;

    }

}




// Format RM

function formatRM(value){

    return "RM " +
    Number(value)
    .toLocaleString(
        "en-MY",
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    );

}





// =========================================
// UPDATE JUMLAH UPAH
// =========================================


function updateSalaryTotal(
    basicID,
    allowanceID,
    totalID
){


    let basicElement =
    document.getElementById(
        basicID
    );


    let allowanceElement =
    document.getElementById(
        allowanceID
    );


    let totalElement =
    document.getElementById(
        totalID
    );



    if(
        !basicElement ||
        !allowanceElement ||
        !totalElement
    ){

        return 0;

    }



    let basic =
    parseMoney(
        basicElement.value
    );



    let allowance =
    parseMoney(
        allowanceElement.value
    );



    let total =
    basic + allowance;



    totalElement.value =
    formatRM(total);



    return total;


}



// =========================================
// MASTER SALARY SYNC
// ORP → ALL CALCULATORS
// =========================================


const salarySyncList = [


{
basic:"otBasicSalary",
allowance:"otAllowance",
total:"otTotalSalary"
},


{
basic:"otRHBasicSalary",
allowance:"otRHAllowance",
total:"otRHTotalSalary"
},


{
basic:"basicSalary",
allowance:"allowance",
total:"totalSalary"
},

{
basic:"ggnBasicSalary",
allowance:"ggnAllowance",
total:"ggnTotalSalary"
},


{
basic:"rhBasicSalary",
allowance:"rhAllowance",
total:"rhTotalSalary"
},


{
basic:"rhLebihBasicSalary",
allowance:"rhLebihAllowance",
total:"rhLebihTotalSalary"
},


{
basic:"phBasicSalary",
allowance:"phAllowance",
total:"phTotalSalary"
},


{
basic:"otPHBasicSalary",
allowance:"otPHAllowance",
total:"otPHTotalSalary"
}


];





function syncSalaryFromORP(){


    let basic =
    parseMoney(
        document.getElementById(
            "orpBasicSalary"
        ).value
    );



    let allowance =
    parseMoney(
        document.getElementById(
            "orpAllowance"
        ).value
    );



    let total =
    basic + allowance;




    document.getElementById(
        "orpTotalSalary"
    ).value =
    formatRM(total);

// ===============================
// SYNC ORP KE CUTI TAHUNAN & SAKIT
// ===============================

let ORP =
total / 26;



    salarySyncList.forEach(
        function(item){


            let basicField =
            document.getElementById(
                item.basic
            );


            let allowanceField =
            document.getElementById(
                item.allowance
            );


            let totalField =
            document.getElementById(
                item.total
            );



            if(basicField){

                basicField.value =
                basic;

            }



            if(allowanceField){

                allowanceField.value =
                allowance;

            }



            if(totalField){

                totalField.value =
                formatRM(total);

            }



        }
    );


}
// =========================================
// GET ORP (WITHOUT PRESSING KIRA)
// =========================================

function getORP(){

    let total =
    updateSalaryTotal(
        "orpBasicSalary",
        "orpAllowance",
        "orpTotalSalary"
    );

    return total / 26;

}
// =========================================
// KALKULATOR ORP
// =========================================


function calculateORP(){


    let total =
    updateSalaryTotal(
        "orpBasicSalary",
        "orpAllowance",
        "orpTotalSalary"
    );



    let ORP =
    total / 26;



    document.getElementById(
        "orpResultTotal"
    ).innerHTML =
    formatRM(total);



    document.getElementById(
        "orpResult"
    ).innerHTML =
    formatRM(ORP);



    // AUTO SYNC SEMUA KALKULATOR

    syncSalaryFromORP();


}

// =========================================
// GET ORP (WITHOUT PRESSING BUTTON)
// =========================================

function getORP(){

    const gaji = parseMoney(document.getElementById("basicSalary").value);

    const elaun = parseMoney(document.getElementById("allowance").value);

    if(isNaN(gaji) || isNaN(elaun)){

        return null;

    }

    return (gaji + elaun) / 26;

}



// =========================================
// KALKULATOR OT HARI BIASA
// =========================================


function calculateOTBiasa(){


    let total =
    updateSalaryTotal(
        "otBasicSalary",
        "otAllowance",
        "otTotalSalary"
    );



    let hours =
    Number(
        document.getElementById(
            "otHours"
        ).value
    );



    let normalHours =
    Number(
        document.getElementById(
            "normalWorkingHours"
        ).value
    );



    if(
        total <=0 ||
        hours <=0 ||
        normalHours <=0
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }



    let ORP =
    total / 26;



let normalHourly =
ORP / normalHours;


let otHourly =
normalHourly * 1.5;


let amount =
otHourly * hours;




    document.getElementById(
        "otResultTotal"
    ).innerHTML =
    formatRM(total);



    document.getElementById(
        "otORP"
    ).innerHTML =
    formatRM(ORP);



 document.getElementById(
    "otHourly"
).innerHTML =
formatRM(otHourly);


    document.getElementById(
        "otAmount"
    ).innerHTML =
    formatRM(amount);



}





// =========================================
// KALKULATOR OT HARI REHAT
// =========================================


function calculateOTRH(){


    let total =
    updateSalaryTotal(
        "otRHBasicSalary",
        "otRHAllowance",
        "otRHTotalSalary"
    );



    let hours =
    Number(
        document.getElementById(
            "otRHHours"
        ).value
    );



    let normalHours =
    Number(
        document.getElementById(
            "otRHNormalWorkingHours"
        ).value
    );



    if(
        total <=0 ||
        hours <=0 ||
        normalHours <=0
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }




    let ORP =
    total / 26;



    let hourly =
    ORP / normalHours;



    let amount =
    hourly * 2 * hours;




    document.getElementById(
        "otRHResultTotal"
    ).innerHTML =
    formatRM(total);



    document.getElementById(
        "otRHORP"
    ).innerHTML =
    formatRM(ORP);


document.getElementById(
    "otRHHourly"
).innerHTML =
formatRM(hourly * 2);

    document.getElementById(
        "otRHAmount"
    ).innerHTML =
    formatRM(amount);



}





// =========================================
// KALKULATOR SEKSYEN 18A
// =========================================

function calculate18A(){


    let total =
    updateSalaryTotal(
        "basicSalary",
        "allowance",
        "totalSalary"
    );


    let startDate =
    document.getElementById(
        "startDate"
    ).value;


    let endDate =
    document.getElementById(
        "endDate"
    ).value;



    if(
        total <= 0 ||
        startDate === "" ||
        endDate === ""
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }



    let start =
    new Date(startDate);


    let end =
    new Date(endDate);



    // Check tarikh tempoh upah

    if(end < start){

        alert(
            "Tarikh Tempoh Upah tidak boleh lebih awal daripada Tarikh Mula Kerja."
        );

        return;

    }



    // Bilangan hari bekerja

    let workDays =
    Math.floor(
        (
            end - start
        )
        /
        (1000 * 60 * 60 * 24)
    ) + 1;



    // Bilangan hari bulan kalendar
    // Berdasarkan bulan Tarikh Mula Kerja

    let calendarDays =
    new Date(
        start.getFullYear(),
        start.getMonth() + 1,
        0
    )
    .getDate();



    // Kadar sehari

    let daily =
    total / calendarDays;



    // Bayaran upah

    let amount =
    daily * workDays;



    // Paparan keputusan


document.getElementById(
    "resultTotalSalary"
).innerHTML =
formatRM(total);


    document.getElementById(
        "workDays"
    ).innerHTML =
    workDays + " hari";



    document.getElementById(
        "calendarDays"
    ).innerHTML =
    calendarDays + " hari";



    document.getElementById(
        "section18ADaily"
    ).innerHTML =
    formatRM(daily);



    document.getElementById(
        "amount18A"
    ).innerHTML =
    formatRM(amount);


}

function resetSeksyen18A(){

    document.getElementById("startDate").value = "";

    document.getElementById("endDate").value = "";


    document.getElementById("workDays").innerHTML =
    "0 hari";


    document.getElementById("calendarDays").innerHTML =
    "0 hari";


    document.getElementById("section18ADaily").innerHTML =
    "RM 0.00";


    document.getElementById("amount18A").innerHTML =
    "RM 0.00";


}
// =========================================
// KALKULATOR CUTI TAHUNAN
// =========================================


function calculateCutiTahunan(){


let ORP = getORP();

    let days =
    Number(
        document.getElementById(
            "annualLeaveDays"
        ).value
    );



    if(
        ORP <= 0 ||
        days <= 0
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }



    let amount =
    ORP * days;



    document.getElementById(
        "annualLeaveORP"
    ).innerHTML =
    formatRM(ORP);



    document.getElementById(
        "annualLeaveAmount"
    ).innerHTML =
    formatRM(amount);


}

// =========================================
// KALKULATOR CUTI SAKIT
// =========================================

function calculateCutiSakit(){


let ORP = getORP();

    
    let days =
    Number(
        document.getElementById(
            "sickLeaveDays"
        ).value
    );


    if(
        ORP <= 0 ||
        days <= 0
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }


    let amount =
    ORP * days;


    document.getElementById(
        "sickLeaveORP"
    ).innerHTML =
    formatRM(ORP);



    document.getElementById(
        "sickLeaveAmount"
    ).innerHTML =
    formatRM(amount);

}
// =========================================
// KALKULATOR GAJI GANTI NOTIS
// =========================================


function calculateGGN(){


    let total =
    updateSalaryTotal(
        "ggnBasicSalary",
        "ggnAllowance",
        "ggnTotalSalary"
    );



    let period =
    Number(
        document.getElementById(
            "period"
        ).value
    );



    let type =
    document.getElementById(
        "type"
    ).value;



    let month =
    document.getElementById(
        "noticeMonth"
    ).value;



    let year =
    document.getElementById(
        "noticeYear"
    ).value;




    if(
        total<=0 ||
        period<=0 ||
        type===""

    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }



    let daysInMonth = 30;



    if(
        month!=="" &&
        year!==""
    ){

        daysInMonth =
        new Date(
            Number(year),
            Number(month)+1,
            0
        )
        .getDate();

    }



    let days = 0;

    let amount = 0;



    if(type==="month"){


        days =
        period * daysInMonth;


        amount =
        total * period;


    }


    else if(type==="week"){


        days =
        period * 7;


        amount =
        (
            total / daysInMonth
        )
        *
        days;


    }


    else if(type==="day"){


        days =
        period;


        amount =
        (
            total / daysInMonth
        )
        *
        days;


    }




    document.getElementById(
        "days"
    ).innerHTML =
    days + " hari";



    document.getElementById(
        "amount"
    ).innerHTML =
    formatRM(amount);



}

function resetGGN(){

    document.getElementById("period").value = "";

    document.getElementById("type").value = "";

    document.getElementById("noticeMonth").value = "";

    document.getElementById("noticeYear").value = "";


    document.getElementById("days").innerHTML =
    "0 hari";


    document.getElementById("amount").innerHTML =
    "RM 0.00";

}



// =========================================
// AUTO CREATE YEAR DROPDOWN GGN
// =========================================


function loadNoticeYear(){


    let yearSelect =
    document.getElementById(
        "noticeYear"
    );



    if(!yearSelect){

        return;

    }




    let currentYear =
    new Date()
    .getFullYear();




    for(
        let year=currentYear-5;
        year<=currentYear+10;
        year++
    ){


        let option =
        document.createElement(
            "option"
        );


        option.value =
        year;


        option.text =
        year;



        yearSelect.appendChild(
            option
        );


    }


}






// =========================================
// KALKULATOR KERJA HARI REHAT
// 1/2 HARI @ KURANG
// =========================================

function calculateHariRehat(){

    let total =
    updateSalaryTotal(
        "rhBasicSalary",
        "rhAllowance",
        "rhTotalSalary"
    );


    let days =
    Number(
        document.getElementById(
            "rhDays"
        ).value
    );


    if(
        total <= 0 ||
        days <= 0
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }


    let ORP =
    total / 26;


    // Kadar sehari bekerja pada Hari Rehat
    // (1/2 hari @ kurang)
    let dailyRate =
    ORP * 0.5;


    let amount =
    dailyRate * days;


    document.getElementById(
        "rhResultTotal"
    ).innerHTML =
    formatRM(total);


    document.getElementById(
        "rhORP"
    ).innerHTML =
    formatRM(ORP);


    document.getElementById(
        "rhDaily"
    ).innerHTML =
    formatRM(dailyRate);


    document.getElementById(
        "rhAmount"
    ).innerHTML =
    formatRM(amount);

}






// =========================================
// KALKULATOR KERJA HARI REHAT
// LEBIH 1/2 HARI
// =========================================


function calculateHariRehatLebih(){


    let total =
    updateSalaryTotal(
        "rhLebihBasicSalary",
        "rhLebihAllowance",
        "rhLebihTotalSalary"
    );



    let days =
    Number(
        document.getElementById(
            "rhLebihDays"
        ).value
    );




    if(
        total<=0 ||
        days<=0
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }





    let ORP =
    total / 26;



    let amount =
    ORP *
    days;





    document.getElementById(
        "rhLebihResultTotal"
    ).innerHTML =
    formatRM(total);



    document.getElementById(
        "rhLebihORP"
    ).innerHTML =
    formatRM(ORP);



    document.getElementById(
        "rhLebihDaily"
    ).innerHTML =
    formatRM(ORP);



    document.getElementById(
        "rhLebihAmount"
    ).innerHTML =
    formatRM(amount);



}




// =========================================
// KALKULATOR KERJA PADA HARI KELEPASAN
// =========================================

function calculatePH(){

    let total =
    updateSalaryTotal(
        "phBasicSalary",
        "phAllowance",
        "phTotalSalary"
    );

    let days =
    Number(
        document.getElementById(
            "phDays"
        ).value
    );

    if(
        total <= 0 ||
        days <= 0
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }

    let ORP =
    total / 26;

    // Kadar sehari pada Hari Kelepasan = ORP × 2
    let daily =
    ORP * 2;

    let amount =
    daily * days;

    document.getElementById(
        "phResultTotal"
    ).innerHTML =
    formatRM(total);

    document.getElementById(
        "phORP"
    ).innerHTML =
    formatRM(ORP);

    document.getElementById(
        "phDaily"
    ).innerHTML =
    formatRM(daily);

    document.getElementById(
        "phAmount"
    ).innerHTML =
    formatRM(amount);

}



// =========================================
// KALKULATOR OT HARI KELEPASAN
// =========================================


function calculateOTPH(){


    let total =
    updateSalaryTotal(
        "otPHBasicSalary",
        "otPHAllowance",
        "otPHTotalSalary"
    );



    let hours =
    Number(
        document.getElementById(
            "otPHHours"
        ).value
    );



    let normalHours =
    Number(
        document.getElementById(
            "otPHWorkingHours"
        ).value
    );



    if(
        total <= 0 ||
        hours <= 0 ||
        normalHours <= 0
    ){

        alert(
            "Sila masukkan maklumat lengkap."
        );

        return;

    }


let ORP =
total / 26;

// Kadar sejam biasa
let hourly =
ORP / normalHours;

// Kadar sejam OT Hari Kelepasan (×3)
let otHourly =
hourly * 3;

let amount =
otHourly * hours;

document.getElementById(
    "otPHResultTotal"
).innerHTML =
formatRM(total);

document.getElementById(
    "otPHORP"
).innerHTML =
formatRM(ORP);

document.getElementById(
    "otPHHourly"
).innerHTML =
formatRM(otHourly);

document.getElementById(
    "otPHAmount"
).innerHTML =
formatRM(amount);

    }

// =========================================
// RESET HELPER
// =========================================

function resetText(id, value=""){

    let element =
    document.getElementById(id);

    if(element){

        element.value = value;

    }

}



function resetResult(id, value="RM 0.00"){

    let element =
    document.getElementById(id);

    if(element){

        element.innerHTML = value;

    }

}

// =========================================
// RESET OT HARI BIASA
// =========================================

function resetOTBiasa(){


    document.getElementById(
        "otHours"
    ).value = "";


    document.getElementById(
        "normalWorkingHours"
    ).value = "";


    document.getElementById(
        "otResultTotal"
    ).innerHTML =
    "RM 0.00";


    document.getElementById(
        "otORP"
    ).innerHTML =
    "RM 0.00";


    document.getElementById(
        "otHourly"
    ).innerHTML =
    "RM 0.00";


    document.getElementById(
        "otAmount"
    ).innerHTML =
    "RM 0.00";


}

// =========================================
// RESET SEKSYEN 18A
// =========================================

function reset18A(){


    resetText(
        "basicSalary"
    );


    resetText(
        "allowance"
    );


    resetText(
        "startDate"
    );


    resetText(
        "endDate"
    );


    resetText(
        "totalSalary",
        "RM 0.00"
    );



    resetResult(
        "resultTotalSalary"
    );


    resetResult(
        "section18ADaily"
    );


    resetResult(
        "amount18A"
    );



    resetResult(
        "workDays",
        "0 hari"
    );


    resetResult(
        "calendarDays",
        "0 hari"
    );


}

// =========================================
// RESET CUTI TAHUNAN
// =========================================

function resetCutiTahunan(){


    resetText(
        "annualLeaveDays"
    );


    resetResult(
        "annualLeaveORP"
    );


    resetResult(
        "annualLeaveAmount"
    );


}

// =========================================
// RESET CUTI SAKIT
// =========================================

function resetCutiSakit(){


    resetText(
        "sickLeaveDays"
    );


    resetResult(
        "sickLeaveORP"
    );


    resetResult(
        "sickLeaveAmount"
    );


}

// =========================================
// RESET GAJI GANTI NOTIS
// =========================================

function resetGGN(){

    resetText("period");


    resetResult(
        "days",
        "0 hari"
    );


    resetResult(
        "amount"
    );


    let selects = [
        "type",
        "noticeMonth",
        "noticeYear"
    ];


    selects.forEach(function(id){

        let element =
        document.getElementById(id);


        if(element){

            element.selectedIndex = 0;

        }

    });

}
// =========================================
// RESET OT HARI REHAT
// =========================================

function resetOTRH(){


    resetText(
        "otRHHours"
    );


    resetText(
        "otRHNormalWorkingHours"
    );


    resetResult(
        "otRHResultTotal"
    );


    resetResult(
        "otRHORP"
    );


    resetResult(
        "otRHHourly"
    );


    resetResult(
        "otRHAmount"
    );


}

// =========================================
// RESET MASTER ORP
// RESET SEMUA KALKULATOR
// =========================================

function resetORP(){


    // =========================
    // RESET ORP
    // =========================

    document.getElementById(
        "orpBasicSalary"
    ).value="";


    document.getElementById(
        "orpAllowance"
    ).value="";


    document.getElementById(
        "orpTotalSalary"
    ).value="RM 0.00";


    document.getElementById(
        "orpResultTotal"
    ).innerHTML="RM 0.00";


    document.getElementById(
        "orpResult"
    ).innerHTML="RM 0.00";


     
    // =========================
    // RESET SEMUA SALARY INPUT
    // =========================

    salarySyncList.forEach(function(item){


        let basic =
        document.getElementById(
            item.basic
        );


        let allowance =
        document.getElementById(
            item.allowance
        );


        let total =
        document.getElementById(
            item.total
        );



        if(basic){

            basic.value="";

        }


        if(allowance){

            allowance.value="";

        }


        if(total){

            total.value="RM 0.00";

        }


    });

// =========================
// RESET SEKYSEN 18A RESULT
// =========================


if(
document.getElementById(
"resultTotalSalary"
)
){

document.getElementById(
"resultTotalSalary"
).innerHTML =
"RM 0.00";

}


if(
document.getElementById(
"totalSalary"
)
){

document.getElementById(
"totalSalary"
).value =
"RM 0.00";

}

    // =========================
    // RESET HASIL KIRAAN
    // =========================


    let resultIDs = [

        "otResultTotal",
        "otORP",
        "otHourly",
        "otAmount",

        "otRHResultTotal",
        "otRHORP",
        "otRHHourly",
        "otRHAmount",

        "s18AResultTotalSalary",
        "section18ADaily",
        "amount18A",

        "days",
        "amount",

        "rhResultTotal",
        "rhORP",
        "rhDaily",
        "rhAmount",

        "rhLebihResultTotal",
        "rhLebihORP",
        "rhLebihDaily",
        "rhLebihAmount",

        "phResultTotal",
        "phORP",
        "phDaily",
        "phAmount",

        "otPHResultTotal",
        "otPHORP",
        "otPHHourly",
        "otPHAmount"

    ];



    resultIDs.forEach(function(id){


        let element =
        document.getElementById(id);


        if(element){

            element.innerHTML =
            "RM 0.00";

        }


    });

// =========================
// RESET SEMUA INPUT KALKULATOR
// =========================


let inputIDs = [

    "otHours",
    "otRHHours",

    "startDate",
    "endDate",

    "period",

    "annualLeaveDays",
    "sickLeaveDays",

    "rhDays",
    "rhLebihDays",

    "phDays",

    "otPHHours"

];



inputIDs.forEach(function(id){

    let element =
    document.getElementById(id);


    if(element){

        element.value = "";

    }

});

// =========================
// RESET DROPDOWN
// =========================


let selectIDs = [

    "normalWorkingHours",

    "otRHNormalWorkingHours",

    "otPHWorkingHours",

    "type",

    "noticeMonth",

    "noticeYear"

];


selectIDs.forEach(function(id){

    let element =
    document.getElementById(id);


    if(element){

        element.selectedIndex = 0;

    }

});

    // Reset Seksyen 18A info

    if(document.getElementById("workDays")){

        document.getElementById(
            "workDays"
        ).innerHTML =
        "0 hari";

    }


    if(document.getElementById("calendarDays")){

        document.getElementById(
            "calendarDays"
        ).innerHTML =
        "0 hari";

    }


}


// =========================================
// RESET HARI REHAT 1/2 HARI
// =========================================


function resetHariRehat(){


    document.getElementById(
        "rhDays"
    ).value="";



    document.getElementById(
        "rhResultTotal"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "rhORP"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "rhDaily"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "rhAmount"
    ).innerHTML="RM 0.00";


}






// =========================================
// RESET HARI REHAT LEBIH 1/2 HARI
// =========================================


function resetHariRehatLebih(){


    document.getElementById(
        "rhLebihDays"
    ).value="";



    document.getElementById(
        "rhLebihResultTotal"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "rhLebihORP"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "rhLebihDaily"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "rhLebihAmount"
    ).innerHTML="RM 0.00";


}






// =========================================
// RESET HARI KELEPASAN
// =========================================


function resetPH(){


    document.getElementById(
        "phDays"
    ).value="";



    document.getElementById(
        "phResultTotal"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "phORP"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "phDaily"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "phAmount"
    ).innerHTML="RM 0.00";


}







// =========================================
// RESET OT HARI KELEPASAN
// =========================================


function resetOTPH(){


    document.getElementById(
        "otPHHours"
    ).value="";



    document.getElementById(
        "otPHWorkingHours"
    ).value="";



    document.getElementById(
        "otPHResultTotal"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "otPHORP"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "otPHHourly"
    ).innerHTML="RM 0.00";



    document.getElementById(
        "otPHAmount"
    ).innerHTML="RM 0.00";


}



// =========================================
// SEK 18A - LIMIT TARIKH TEMPOH UPAH
// =========================================

document.getElementById("startDate").addEventListener(
"change",
function(){

    let startDate = new Date(this.value);

    if(isNaN(startDate)){
        return;
    }

    let year = startDate.getFullYear();
    let month = startDate.getMonth();

    // Minimum = Tarikh Mula Kerja
    let minDate = new Date(
        year,
        month,
        startDate.getDate()
    );

    // Maximum = Hari terakhir bulan berikutnya
    let maxDate = new Date(
        year,
        month + 2,
        0
    );

    let endDate =
    document.getElementById("endDate");

    endDate.min = formatDate(minDate);

    endDate.max = formatDate(maxDate);

    endDate.value = "";

    // Open calendar starting from Tarikh Mula Kerja month
    endDate.defaultValue = formatDate(minDate);

});

// =========================================
// SEK 18A - LIMIT TARIKH TEMPOH UPAH
// CURRENT MONTH + NEXT MONTH ONLY
// =========================================


let startDateInput =
document.getElementById("startDate");


let endDateInput =
document.getElementById("endDate");



if(startDateInput && endDateInput){


startDateInput.addEventListener(
"change",
function(){


    let start =
    new Date(this.value);



    if(!isNaN(start)){


        let year =
        start.getFullYear();


        let month =
        start.getMonth();



        // Minimum:
        // Tarikh mula kerja

        let minDate =
        new Date(
            year,
            month,
            start.getDate()
        );



        // Maximum:
        // Hari terakhir bulan berikutnya

        let maxDate =
        new Date(
            year,
            month + 2,
            0
        );



        endDateInput.min =
        formatDate(minDate);



        endDateInput.max =
        formatDate(maxDate);



        // Reset tarikh lama

        endDateInput.value="";


    }


});


}


// FORMAT DATE YYYY-MM-DD

function formatDate(date){


    let y =
    date.getFullYear();



    let m =
    String(
        date.getMonth()+1
    )
    .padStart(2,"0");



    let d =
    String(
        date.getDate()
    )
    .padStart(2,"0");



    return `${y}-${m}-${d}`;


}

// =========================================
// AUTO UPDATE JUMLAH UPAH
// SEMASA USER MENAIK INPUT
// =========================================


document.addEventListener(
"DOMContentLoaded",
function(){



    loadNoticeYear();



    let inputGroups = [


        [
            "orpBasicSalary",
            "orpAllowance",
            syncSalaryFromORP
        ],



        [
            "otBasicSalary",
            "otAllowance",
            function(){

                updateSalaryTotal(
                    "otBasicSalary",
                    "otAllowance",
                    "otTotalSalary"
                );

            }
        ],



        [
            "otRHBasicSalary",
            "otRHAllowance",
            function(){

                updateSalaryTotal(
                    "otRHBasicSalary",
                    "otRHAllowance",
                    "otRHTotalSalary"
                );

            }
        ],



[
    "basicSalary",
    "allowance",
    function(){

        updateSalaryTotal(
            "basicSalary",
            "allowance",
            "totalSalary"
        );

    }
],

        [
            "ggnBasicSalary",
            "ggnAllowance",
            function(){

                updateSalaryTotal(
                    "ggnBasicSalary",
                    "ggnAllowance",
                    "ggnTotalSalary"
                );

            }
        ],



        [
            "rhBasicSalary",
            "rhAllowance",
            function(){

                updateSalaryTotal(
                    "rhBasicSalary",
                    "rhAllowance",
                    "rhTotalSalary"
                );

            }
        ],



        [
            "rhLebihBasicSalary",
            "rhLebihAllowance",
            function(){

                updateSalaryTotal(
                    "rhLebihBasicSalary",
                    "rhLebihAllowance",
                    "rhLebihTotalSalary"
                );

            }
        ],



        [
            "phBasicSalary",
            "phAllowance",
            function(){

                updateSalaryTotal(
                    "phBasicSalary",
                    "phAllowance",
                    "phTotalSalary"
                );

            }
        ],



        [
            "otPHBasicSalary",
            "otPHAllowance",
            function(){

                updateSalaryTotal(
                    "otPHBasicSalary",
                    "otPHAllowance",
                    "otPHTotalSalary"
                );

            }
        ]

    ];






    inputGroups.forEach(
        function(group){



            let basic =
            document.getElementById(
                group[0]
            );



            let allowance =
            document.getElementById(
                group[1]
            );



            if(basic){


                basic.addEventListener(
                    "input",
                    group[2]
                );


            }



            if(allowance){


                allowance.addEventListener(
                    "input",
                    group[2]
                );


            }



        }
    );



});





// =========================================
// END SCRIPT.JS
// =========================================
