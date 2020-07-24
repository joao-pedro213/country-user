let globalUsers = [];
let globalCountries = [];
let globalUserCountries = [];
let globalFilteredUserCountries = [];

let searchInput = null;
let btnFilter = null;

async function start() {
  // await fetchUsers();
  // await fetchCountries();

  // console.time('promise p1');
  // await promiseUsers();
  // console.timeEnd('promise p1');
  // console.time('promise p2');
  // await promiseCountries();
  // console.timeEnd('promise p2');
  searchInput = document.querySelector('#search-input');
  btnFilter = document.querySelector('#search-btn');

  console.time('Load API data');
  const p1 = promiseUsers();
  const p2 = promiseCountries();
  await Promise.all([p1, p2]);
  console.timeEnd('Load API data');

  hideSpinner();
  mergeUsersAndCountries();
  render();

  configFilter();
}

async function promiseUsers() {
  return new Promise(async (resolve, reject) => {
    const users = await fetchUsers();

    setTimeout(() => {
      resolve(users);
    }, 3000);
  });
}

async function promiseCountries() {
  return new Promise(async (resolve, reject) => {
    const countries = await fetchCountries();

    setTimeout(() => {
      resolve(countries);
    }, 2000);
  });
}

async function fetchUsers() {
  const resource = await fetch('http://localhost:3002/users');
  const json = await resource.json();

  globalUsers = json.map(({ name, picture, login, nat }) => {
    return {
      userId: login.uuid,
      userCountry: nat,
      userName: name.first,
      userPicture: picture.large,
    };
  });
}

async function fetchCountries() {
  const resource = await fetch('http://localhost:3001/countries');
  const json = await resource.json();

  globalCountries = json.map(({ name, flag, alpha2Code }) => {
    return {
      countryId: alpha2Code,
      countryName: name,
      countryFlag: flag,
    };
  });
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');
  spinner.classList.add('hide');

  searchInput.removeAttribute('readonly');
  searchInput.focus();

  btnFilter.removeAttribute('disabled');
}

function mergeUsersAndCountries() {
  globalUserCountries = [];

  globalUsers.forEach((user) => {
    const country = globalCountries.find(
      (country) => country.countryId === user.userCountry
    );

    globalUserCountries.push({
      ...user,
      countryName: country.countryName,
      countryFlag: country.countryFlag,
    });
  });

  globalUserCountries.sort((a, b) => a.userName.localeCompare(b.userName));
  globalFilteredUserCountries = [...globalUserCountries];
}
function render() {
  const divUsers = document.querySelector('#users');

  if (globalFilteredUserCountries.length === 0) {
    divUsers.innerHTML = `
      <div class='row'>
        <h6 class='search-msg center'>Nenhum usuário encontrado.</h6>
      </div>
    `;
    return;
  }

  divUsers.innerHTML = `
  <div class='row'>
    ${globalFilteredUserCountries
      .map(({ countryFlag, userPicture, userName, countryName }) => {
        return `
          <div class='col s6 m4 l3'>
            <div class='flex-row bordered'>
              <img class='avatar' src='${userPicture}' alt='${userName}' />
                <div class='flex-column'>
                  <span>${userName}</span>
                  <img class='flag' src='${countryFlag}' alt='${countryName}' />
                </div>
            </div>
          </div>
      `;
      })
      .join('')}
  </div>
  `;
}

function configFilter() {
  searchInput.addEventListener('keyup', handleSearchInput);
  btnFilter.addEventListener('click', handleSearchBtn);
}

function handleSearchBtn() {
  const filterValue = searchInput.value.toLowerCase().trim();

  globalFilteredUserCountries = globalUserCountries.filter((item) => {
    return item.userName.toLowerCase().includes(filterValue);
  });

  render();
}

function handleSearchInput({ key }) {
  if (key !== 'Enter') {
    return;
  }

  handleSearchBtn();
}

start();
