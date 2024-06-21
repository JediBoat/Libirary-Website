const mastercardpat = /^(5[1-5])[0-9]{14}$/
const cvcpat = /^\d{3,4}$/g
let inputindex = 0;
var outputresult;

const payingbutton=document.getElementById("paying");
payingbutton.addEventListener("click",vaildating);

function vaildating()
{
    let usercardnum = document.getElementById("cardnum").value;
    let cvcnum = document.getElementById("scode").value;
    let inputmonth = document.getElementById("month").value;
    let inputyear = document.getElementById("year").value;
    

    usercardnum = usercardnum.toString();
    cvcnum = cvcnum.toString();
    inputmonth = inputmonth.toString();
    inputyear = inputyear.toString();

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = new Date();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    year = year.toString();
    let index = months.indexOf(month);

    

    for(let checkmonth = 0; checkmonth < months.length; checkmonth++){
       if(months[checkmonth] == inputmonth){
        inputindex = months.indexOf(months[checkmonth]);
       }
    }

    console.log(usercardnum, cvcnum, month,inputmonth,inputyear,year,inputindex, index );

    if(( inputyear == year && index >= inputindex))
    {
        document.getElementById("confirmingbook").innerHTML ="Invaild details. Please re-fill in the form";
    } 
    else if(inputyear >= year && (usercardnum.match(mastercardpat)) && (cvcnum.match(cvcpat))) {
        document.getElementById("confirmingbook").innerHTML ="Vaild details. "
        usercardnum = Number(usercardnum);
        inputyear = Number(inputyear);
        console.log(usercardnum, inputyear , (inputindex+  1), cvcnum);

        fetch("https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard", {
            method: "POST",
            body: JSON.stringify({
                master_card: usercardnum,
                exp_year: inputyear,
                exp_month: inputindex,
                cvv_code: cvcnum
                
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
              .then((response) => response.json())
              .then((json) =>  console.log(json)) 
              .catch(error => {console.log(error)});

        let cardmessage = usercardnum.toString();
        let sliceresult = cardmessage.slice(12, 16);
        outputresult = ("**** **** **** " + sliceresult);

        localStorage.setItem("cardnumber", outputresult);
        // window.location.href = "success.html";
        window.open("success.html");

    } 
    else{
        document.getElementById("confirmingbook").innerHTML ="Invaild details. Please re-fill in the form";
    }
    
}

