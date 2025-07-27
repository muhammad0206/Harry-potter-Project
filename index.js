const HpDiv = document.getElementById("hp");
// const query1 = document.getElementById("search1"); was use to search name.
const query2 = document.getElementById("search2");
const query3 = document.getElementById("search3");

const GET_ALL_API_URL = "https://hp-api.onrender.com/api/characters";
const GET_CHARACTER_API_URL = "https://hp-api.onrender.com/api/character";

const btn = document.getElementById("btn");
let bdy = document.getElementById("body");

const selectOptions = document.getElementById("search3");

const displayHp = (data) => {
  const { name, id, image, actor, alternate_names, house, wand, dateOfBirth } =
    data;

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

  hpName = name;
  hpId = id;
  hpImg = image;
  HpActor = actor;
  alt_name = alternate_names[0];
  alt_name_2 = alternate_names[1];
  home = house;
  wood = wand.wood;
  core = wand.core;
  length = wand.length;
  birth = dateOfBirth;

  if (birth === undefined || birth === null) {
    birth = "not mentioned";
  }

  if (wood === "" || wood === undefined || wood === null) {
    wood = "P&C";
  }

  if (core === "" || core === undefined || core === null) {
    core = "P&C";
  }

  if (length === "" || length === undefined || length === null) {
    length = "P&C";
  }

  if (query3.value === "select") {
    alert("please select name");
  }

  hpHTML = `
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
  if (hpImg === "") {
    HpDiv.innerHTML = "No picture found";
  } else {
    HpDiv.innerHTML = hpHTML;
  }

  window.addEventListener("scroll", () => {
    const wand = document.getElementById("wand");
    const wandPosition = wand.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (wandPosition < screenHeight) {
      wand.classList.add("animate");
    }
  });
};

const getHp = async (selectValue) => {
  const response = await fetch(`${GET_CHARACTER_API_URL}/${selectValue}`);
  const data = await response.json();
  displayHp(data[0]);
};

const getAlLCharacters = async () => {
  try {
    const response = await fetch(GET_ALL_API_URL);
    const data = await response.json();

    data.forEach((character, index) => {
      const option = document.createElement("option");
      option.value = character.id;
      option.textContent = character.name;
      selectOptions.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
};

btn.addEventListener("click", () => {
  const selectValue = selectOptions.value;
  getHp(selectValue);
});

document.addEventListener("DOMContentLoaded", () => {
  // after page load
  getAlLCharacters();
});
