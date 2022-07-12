const $container = document.getElementById("root");
const $ul = document.createElement("ul");
const $content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

const newsDetail = () => {
  const id = location.hash.substring(1);

  getData(CONTENT_URL.replace("@id", id)).then((data) => {
    $container.innerHTML = `
      <h1>${data.title}</h1>

      <div>
        <a href='#'>목록으로</a>
      </div>
    `;
  });
};

const newsFeed = () => {
  const newsList = [];

  newsList.push("<ul>");

  getData(NEWS_URL).then((data) => {
    for (let i = 0; i < 10; i++) {
      newsList.push(`
      <li>
        <a href='#${data[i].id}'>
          ${data[i].title} (${data[i].comments_count})
        </a>
      </li>
    `);
    }
    newsList.push("</ul>");

    $container.innerHTML = newsList.join("");
  });
};

const router = () => {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else {
    newsDetail();
  }
};

window.addEventListener("hashchange", router);

router();
