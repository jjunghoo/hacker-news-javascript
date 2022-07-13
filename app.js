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
  let template = `
    <div>
      <h1>Hacker News</h1>
      <ul>
        {{__news_feed__}}
      </ul>
      <div>
        <a href='#/page/{{__prev_page__}}'>이전 페이지</a>
        <a href='#/page/{{__next_page__}}'>다음 페이지</a>
      </div>
    </div>
  `;

  getData(NEWS_URL).then((data) => {
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

    template = template.replace("{{__news_feed__}}", newsList.join(""));
    template = template.replace(
      "{{__prev_page__}}",
      store.currentPage > 1 ? store.currentPage - 1 : 1
    );
    template = template.replace("{{__next_page__}}", store.currentPage + 1);
    $container.innerHTML = template;
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
