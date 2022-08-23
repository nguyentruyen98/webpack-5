import image from "./image.jpg";
import "./kiwi-image.scss";
class KiwiImage {
  render() {
    const img = document.createElement("img");
    img.src = image;
    img.alt = "Kiwi";
    img.classList.add("image");

    const bodyDomEl = document.querySelector("body");
    bodyDomEl.appendChild(img);
  }
}
export default KiwiImage;
