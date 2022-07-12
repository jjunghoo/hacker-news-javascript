const $container = document.getElementById("root");
const $ul = document.createElement("ul");
const $content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

const store = {
  currentPage: 1,
};

async function getData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

const newsDetail = () => {
  const id = location.hash.substring(7);

  getData(CONTENT_URL.replace("@id", id)).then((data) => {
    $container.innerHTML = `
      <h1>${data.title}</h1>

      <div>
        <a href='#/page/${store.currentPage}'>목록으로</a>
      </div>
    `;
  });
};

const newsFeed = () => {
  const newsList = [];

  newsList.push("<ul>");

  getData(NEWS_URL).then((data) => {
    console.log(`dataLength : ${data.length}`);
    for (
      let i = (store.currentPage - 1) * 10;
      i < store.currentPage * 10;
      i++
    ) {
      newsList.push(`
      <li>
        <a href='#/show/${data[i].id}'>
          ${data[i].title} (${data[i].comments_count})
        </a>
      </li>
    `);
    }
    newsList.push("</ul>");
    newsList.push(`
      <div>
        <a href='#/page/${
          store.currentPage - 1 > 0 ? store.currentPage - 1 : 1
        }'>이전 페이지</a>
        <a href='#/page/${
          store.currentPage + 1 > data.length / 10
            ? store.currentPage
            : store.currentPage + 1
        }'>다음 페이지</a>
      </div>
    `);
    $container.innerHTML = newsList.join("");
  });
};

const router = () => {
  const routePath = location.hash;

  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(location.hash.substring(7));
    console.log(store.currentPage);
    newsFeed();
  } else {
    newsDetail();
  }
};

window.addEventListener("hashchange", router);

router();
