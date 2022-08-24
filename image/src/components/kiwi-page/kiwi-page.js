import Heading from "../heading/heading.js";
import KiwiImage from "../kiwi-image/kiwi-image.js";

class KiwiPage {
  render() {
    const heading = new Heading();
    heading.render();
    const kiwi = new KiwiImage();
    kiwi.render();
    import("CaptionApp/Caption").then((CaptionModule) => {
      const ImageCaption = CaptionModule.default;
      const imageCaption = new ImageCaption();
      imageCaption.render("This is image caption");
    });
  }
}

export default KiwiPage;
