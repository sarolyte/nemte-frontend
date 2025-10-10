import HeroSection from "./HeroSection.jsx";
import pumpkinSoup from '../../assets/pumpkin_soup.png'


export function Home() {
    return (
        <HeroSection heroTxt='Dinner ideas for busy evening' btnTxt='Explore' heroBg={pumpkinSoup } buttonLink={'a'} />
    )
}