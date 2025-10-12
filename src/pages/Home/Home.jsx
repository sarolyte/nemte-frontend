import HeroSection from "./HeroSection/HeroSection.jsx";
import pumpkinSoup from '../../assets/pumpkin_soup.png'
import RecipeSection from "./RecipeSection/RecipeSection.jsx";
import PhilosophySection from "./PhilosophySection/PhilosophySection.jsx";


export function Home() {
    return (
        <>
            <HeroSection heroTxt='Dinner ideas for busy evening' btnTxt='Explore' heroBg={pumpkinSoup } buttonLink='#recipes' />
            <PhilosophySection title='You love food - just not the mess that follows' text='Find recipes that make cooking fit your schedule, not the other way around. Simple meals, easy cleanup, and time left to just be.'/>
            <RecipeSection/>
            
        </>
    )
}