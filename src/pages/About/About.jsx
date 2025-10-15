import GridGallery from "../../components/GridGallery/GridGallery";
import TextBlock from "../../components/TextBlock/TextBlock.jsx";

import styles from "./About.module.css";

//images for gallery
import ShrimpRice from "../../assets/Shrimp_Rice_and_Zucchini_Skillet.png";
import ChickenMasala from "../../assets/Buttery_Chicken_Masala.png";
import CreamyChicken from "../../assets/Creamy_Chicken_with_Rice.png";
import OvenVegetables from "../../assets/Oven_Baked_Vegetables_with_Chicken.png";
import NoodleSoup from "../../assets/Chicken_and_Noodle_Soup.png";
import VeganCurry from "../../assets/Vegan_Sweet_Potato_Curry.png";
import FreshSalad from "../../assets/Fresh_Vegetable_Salad.png";
import LazyCake from "../../assets/Lazy_Cake_with_Coconut_Cream.png";
import BananaSmoothie from "../../assets/Banana_Smoothie.png";


export default function About() {
  return (
    <div>
      <div className={styles.textSection} >
        <TextBlock
            className={styles.textBlock}
          title="About Nemte"
          paragraphs={[
            `Life is full - work, plans, people, moments. Cooking shouldn’t compete with all that, it should fit into it. Inspired by the Danish love for simplicity, Nemte celebrates easy, delicious food made without stress. Recipes here are for people who want great taste, fast clean up and time for themselves, for laughter, for doing nothing at all.`,
            `Nemte is place for good food that is beautifully uncomplicated. Because life is already busy enough - dinner doesn’t have to be.`,
          ]}
        />
        <TextBlock
          title="Lorem ipsum dolor sit amet"
          paragraphs={[
            `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus ex tortor, at elementum erat sagittis quis. Donec odio ipsum, convallis eget justo eu, tempus vehicula nisl. Etiam rutrum pretium neque, vel pretium erat vestibulum elementum. Nullam ac tellus elit.`,
            `Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi non neque hendrerit, viverra ipsum pharetra, mollis sem. Fusce egestas, augue non eleifend euismod, neque felis viverra nisl, sit amet accumsan ante ante eget tortor. Sed pellentesque, enim in porta congue, neque libero vulputate nulla, in vehicula sem est a mi. `,
            `Fusce enim massa, gravida ut ligula ac, feugiat dignissim ipsum. Quisque consequat elementum tempus.`,
          ]}
        />
      </div>

      <GridGallery
        images={[
          { src: ShrimpRice, alt: "Shrimp Rice" },
          { src: ChickenMasala, alt: "Chicken Masala" },
          { src: CreamyChicken, alt: "Creamy Chicken" },
          { src: OvenVegetables, alt: "Oven Vegetables" },
          { src: NoodleSoup, alt: "Noodle Soup" },
          { src: VeganCurry, alt: "Vegan Curry" },
          { src: FreshSalad, alt: "Fresh Salad" },
          { src: LazyCake, alt: "Lazy Cake" },
          { src: BananaSmoothie, alt: "Banana Smoothie" },
        ]}
      />
    </div>
  );
}
