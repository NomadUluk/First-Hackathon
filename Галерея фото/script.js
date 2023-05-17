const ulElement = document.querySelector("ul");

ulElement.addEventListener("wheel", (event) => {
  event.preventDefault();
  ulElement.scrollLeft += event.deltaY * 5;
});