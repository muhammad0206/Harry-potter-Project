const HpDiv = document.getElementById("hp");
// const query1 = document.getElementById("search1"); was use to search name.
const query2 = document.getElementById("search2");
const query3 = document.getElementById("search3");
const API_URL = "https://hp-api.onrender.com/api/characters";
const btn = document.getElementById("btn");
let bdy = document.getElementById("body");

const displayHp = (data) =>{
    let hpName;
    let hpId;
    let hpImg;
    let HpActor;
    let alt_name;
    let alt_name_2;
    let home;
    let wood;
    let core;
    let length;
    let birth;


    for(let i = 0; i < data.length; i++){
        if(data[i].actor.toLowerCase() == query2.value.toLowerCase().trim() || data[i].name.toLowerCase() == query3.value.toLowerCase().trim()){
            hpName = data[i].name;
            hpId = data[i].id;
            hpImg = data[i].image;
            HpActor = data[i].actor;
            alt_name = data[i].alternate_names[0];
            alt_name_2 = data[i].alternate_names[1];
            home = data[i].house;
            wood = data[i].wand.wood;
            core = data[i].wand.core;
            length = data[i].wand.length;
            birth = data[i].dateOfBirth;
            break;
        }
    }
    if(birth === undefined || birth === null ){
        birth = "not mentioned"
    }

    if(wood === "" || wood === undefined || wood === null){
        wood = "P&C"
    }

    if(core === "" || core === undefined || core === null){
        core = "P&C"
    }

    if(length === "" || length === undefined || length === null){
        length = "P&C"
    }

    if(query3.value === "select"){
        alert("please select name");
    }

    hpHTML =
     `
     <div class="demo">
        <div class="info">
            <h1 style="font-size: 20px;">${hpName}</h1>
            <img src="${hpImg}" class="gambar">
            <table class="jadual">
                <tr>
                    <th class="title">actor name:</th>
                    <td class="content"><a href="https://www.youtube.com/results?search_query=can+make+sql+file+using+excel" target="_blank">${HpActor}<a/></td>
                </tr>
                <tr>
                    <th class="title">atl name:</th>
                    <td class="content">${alt_name},${alt_name_2}</td>
                </tr>
                <tr>
                    <th class="title">house:</th>
                    <td class="content">${home}</td>
                </tr>
            </table>
        </div>

        <table>
            <tr>
                <th colspan = 3 ><span class="wand" id="wand">wand</span></th>
            </tr>
            <tr>
                <th>wood</th>
                <th>core</th>
                <th>length</th>
            </tr>
            <tr>
                <td><span class="wood">${wood}</span></td>
                <td><span class="core">${core}</span></td>
                <td><span class="length">${length}</span></td>
            </tr>
        </table>

         <table>
            <tr>
                <th colspan = 3>birth Day</th>
            </tr>
            <tr>
                <td>${birth}</td>
            </tr>
        </table>
     </div>
    `;
    if(hpImg === ""){
       HpDiv.innerHTML = "No picture found"; 
    }else{
        HpDiv.innerHTML = hpHTML;
    }

    window.addEventListener("scroll", ()=>{
        const wand = document.getElementById("wand");
        const wandPosition = wand.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if(wandPosition < screenHeight){
            wand.classList.add("animate");
        }
    });

}


const getHp = async () =>{
    const response = await fetch(API_URL);
    const Status = response.status;
    const data = await response.json();
    displayHp(data);
}



btn.addEventListener("click",() =>{
    getHp();
});


