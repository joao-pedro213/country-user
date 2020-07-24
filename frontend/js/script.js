let globalUsers = [];
let globalCountries = [];
let globalUserCountries = [];

async function start() {
  await fetchUsers();
  await fetchCountries();

  hideSpinner();
  mergeUsersAndCountries();
  render();
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

  //console.log(globalUsers);
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

  //console.log(globalCountries);
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');
  spinner.classList.add('hide');
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

  console.log(globalUserCountries);
}
function render() {
  const divUsers = document.querySelector('#users');

  divUsers.innerHTML = `
  <div class='row'>
    ${globalUserCountries
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

start();
