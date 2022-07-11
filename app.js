const $container = document.getElementById("root");
const $ul = document.createElement("ul");
const $content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

window.addEventListener("hashchange", () => {
  console.log("해시가 변경됨");
  const id = location.hash.substring(1);
  console.log(id);

  const title = document.createElement("h1");
  fetch(CONTENT_URL.replace("@id", id))
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      title.innerText = data.title;

      $content.appendChild(title);
    });
});

fetch(NEWS_URL)
  .then((response) => response.json())
  .then((data) => {
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
