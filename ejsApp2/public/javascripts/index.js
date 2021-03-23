let custInfo=[];
let washprice= 10;
let dryprice= 10;
let total = 0;
let info = document.getElementById('customerinfo');
let winfo = document.getElementById('washinfo');
let dinfo = document.getElementById('dryinfo');

function add(){
    FillArrayFromServer();
custInfo[0] = document.getElementById('name').value;


custInfo[1] = document.getElementById('number').value;

custInfo[2] = document.getElementById('address').value;
location.href = "#washing";
}

function washAdd(){
    custInfo[3] = document.getElementById('load').value;
    if (custInfo[3] === "Medium"){
        washprice += 1.25;
    }
    if (custInfo[3] === "Large"){
        washprice += 2.00;
    }
    custInfo[4] = document.getElementById('temp').value;

    custInfo[5] = document.getElementById('colors').value;

    custInfo[6] = document.getElementById('detergent').value;
    if (custInfo[6] === "Ecos"){
        washprice += 2.00;
    }
    total += washprice;
    location.href = "#drying";

}

function dryAdd(){
    custInfo[7] = document.getElementById('time').value;

    custInfo[8] = document.getElementById('drytemp').value;

    custInfo[9] = document.getElementById('iron').value;
    if (custInfo[9] === "Yes"){
        dryprice += 5;
    }
    total += dryprice;
    location.href = "#payment";
}

function getInfo(){
  
    info.innerHTML = "Name: " + custInfo[0] + "<br/>" + 
    "Number: " + custInfo[1] + "<br/>" +
    "Address: " + custInfo[2] + "<br/><br/>";
     winfo.innerHTML = "Washing: <br/>" +
    "Size Load: " + custInfo[3] + "<br/>" + 
    "Temp: " + custInfo[4] + "<br/>" + 
    "Color: " + custInfo[5] + "<br/>" + 
    "Detergent: " + custInfo[6] + "<br/><br/>";
    dinfo.innerHTML = "Drying: <br/> " +
    "Time: " + custInfo[7] + "<br/>" + 
    "Temp: " + custInfo[8] + "<br/>" + 
    "Iron: " + custInfo[9] + "<br/><br/>" + 
    "Total is: $" + total + "<br/><br/>";

    }

    function payOff(){
        info.innerHTML = "Thankyou for using the Luandromat! Your clothes will be done soon.";
        winfo.innerHTML = "Amount Due: $0.00 <br/><br/>";
        dinfo.innerHTML = "";
        custInfo = [];
        washprice = 10;
        dryprice = 10;
        total = 0;
    }

    function FillArrayFromServer(){
        // using fetch call to communicate with node server to get all data
        fetch('/custList')
        .then(function (theResonsePromise) {  // wait for reply.  Note this one uses a normal function, not an => function
            return theResonsePromise.json();
        })
        .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
        console.log(serverData);
        custInfo.length = 0;  // clear array
        custInfo = serverData;   // use our server json data which matches our objects in the array perfectly
        createList();  // placing this here will make it wait for data from server to be complete before re-doing the list
        })
        .catch(function (err) {
         console.log(err);
        });
    };

    