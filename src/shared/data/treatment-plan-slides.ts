import type { ImageSource } from "expo-image";

export const BEFORE_AFTER_SLIDES: {
    id: string;
    beforeImage: ImageSource;
    afterImage: ImageSource;
}[] = [
    { id: "1", beforeImage: require("@/assets/images/client1beforeimage.webp"), afterImage: require("@/assets/images/client1afterimage.webp") },
    { id: "2", beforeImage: require("@/assets/images/client2beforeimage.webp"), afterImage: require("@/assets/images/client2afterimage.webp") },
    { id: "3", beforeImage: require("@/assets/images/client3beforeimage.webp"), afterImage: require("@/assets/images/client3afterimage.webp") },
];
