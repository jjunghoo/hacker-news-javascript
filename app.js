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

window.addEventListener("hashchange", () => {
  const id = location.hash.substring(1);
  const title = document.createElement("h1");

  getData(CONTENT_URL.replace("@id", id)).then((data) => {
    title.innerText = data.title;

    $content.appendChild(title);
  });
});

getData(NEWS_URL).then((data) => {
  for (let i = 0; i < 10; i++) {
    const $li = document.createElement("li");
    const $a = document.createElement("a");

    $a.href = `#${data[i].id}`;
    $a.innerText = `${data[i].title} (${data[i].comments_count})`;

    $li.appendChild($a);
    $ul.appendChild($li);
  }
});

$container.appendChild($ul);
$container.appendChild($content);
