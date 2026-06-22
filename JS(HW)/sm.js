const userCard = document.getElementById("userCard");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let users = [];
let currentIndex = 0;

// 取得隨機使用者
async function fetchUsers() {
    try {
        const response = await fetch(
            "https://randomuser.me/api/?results=5"
        );

        const data = await response.json();

        // 整理成指定格式
        users = data.results.map(user => ({
            avatar: user.picture.large,
            name: `${user.name.first} ${user.name.last}`,
            email: user.email
        }));

        // 頁面載入後顯示第一位
        renderUser();
    } catch (error) {
        console.error(error);

        userCard.innerHTML = `
      <p>資料載入失敗</p>
    `;
    }
}

// 顯示使用者
function renderUser() {
    const user = users[currentIndex];

    userCard.innerHTML = `
    <img src="${user.avatar}" alt="${user.name}">
    <h2>${user.name}</h2>
    <p>${user.email}</p>
  `;
}

// 下一位
nextBtn.addEventListener("click", () => {
    if (users.length === 0) return;

    currentIndex++;

    if (currentIndex >= users.length) {
        currentIndex = 0;
    }

    renderUser();
});

// 上一位
prevBtn.addEventListener("click", () => {
    if (users.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = users.length - 1;
    }

    renderUser();
});

// 初始化
fetchUsers();