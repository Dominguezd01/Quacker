import image1 from "./assets/Avatars/1.svg"
import image2 from "./assets/Avatars/2.svg"
import image3 from "./assets/Avatars/3.svg"
import image4 from "./assets/Avatars/4.svg"
import image5 from "./assets/Avatars/5.svg"
import image6 from "./assets/Avatars/6.svg"

const images = {
    image1: image1,
    image2: image2,
    image3: image3,
    image4: image4,
    image5: image5,
    image6: image6,
}

export function getImage(imageName) {
    console.log(imageName)
    return images[imageName] != null ? images[imageName] : image1
}
