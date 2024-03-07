import { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners';

const LoadingPrompt = () => {
    //more that 300 funny loading prompts
    const getRandomPrompt = () => {
        const randomIndex = Math.floor(Math.random() * funnyLoadingPrompts.length);
        return funnyLoadingPrompts[randomIndex];
    };
    const funnyLoadingPrompts = [
        'Tickling the server...',
        'Summoning unicorns...',
        'Loading awesomeness...',
        'Brewing a funny cat video...',
        'Hiding from the bugs...',
        'Counting to infinity...',
        'Making the hamsters run faster...',
        'Assembling the Avengers...',
        'Finding the lost sock...',
        'Warming up the internet...',
        "Juggling digital feathers...",
        "Unleashing ninja unicorns...",
        "Calibrating laughter frequency...",
        "Hitchhiking on virtual comets...",
        "Spinning disco balls of joy...",
        "Inflating humor balloons...",
        "Tickling binary code...",
        "Summoning cosmic belly laughs...",
        "Polishing humor crystals...",
        "Wrestling comedic kangaroos...",
        "Baking cookies for loading elves...",
        "Convincing pixels to party...",
        "Guiding lost chuckles home...",
        "Training quantum hamsters...",
        "Synchronizing comedy satellites...",
        "Hatching laughter eggs...",
        "Shuffling deck of joke cards...",
        "Nudging sleeping punchlines...",
        "Hoisting sails of funny memes...",
        "Rounding up comedic asteroids...",
        "Dusting off ancient joke scrolls...",
        "Programming dance routines for ones and zeros...",
        "Assembling robotic stand-up comedians...",
        "Balancing on the humor tightrope...",
        "Mixing cosmic punch in a loading bowl...",
        "Awakening dormant dad jokes...",
        "Fingerprinting laughter fingerprints...",
        "Crafting humor origami...",
        "Rolling out the laughter carpet...",
        "Tuning up the laughter orchestra...",
        "Fishing for digital clownfish...",
        "Shaking hands with humor molecules...",
        "Dialing up the chuckle hotline...",
        "Choreographing a loading boogie...",
        "Whispering jokes to loading pixels...",
        "Counting clouds in the laughter sky...",
        "Guiding giggles through cyberspace...",
        "Harnessing the power of comedic quasars...",
        "Shaping loading screens with humor clay...",
        "Gathering comedic stardust...",
        "Convincing electrons to tap dance...",
        "Befriending algorithmic jesters...",
        "Plotting a course through the comedy cosmos...",
        "Watering the joke garden of loading...",
        "Rolling out the red carpet for comedy royalty...",
        "Stealing kisses from loading frogs...",
        "Chasing runaway punchlines...",
        "Dancing with loading fireflies...",
        "Filling loading barrels with laughter...",
        "Unleashing the laughter tsunami...",
        "Teaching loading screens to tell knock-knock jokes...",
        "Whistling the loading tune of joy...",
        "Juggling marshmallows of mirth...",
        "Balancing on the humor seesaw...",
        "Baking laughter cookies in loading ovens...",
        "Programming a symphony of loading giggles...",
        "Spinning webs of loading hilarity...",
        "Polishing comedy gemstones...",
        "Hiking up the mountain of laughter...",
        "Waving at passing comedy clouds...",
        "Arranging loading flowers in funny bouquets...",
        "Tickle the Code",
        "Giggle-Infused Bytes",
        "Jazz up the Pixels",
        "Banter in Progress",
        "Guffaw Gateway Loading",
        "Lunar Laughs Engaged",
        "Snicker Spark Ignition",
        "Express Glee Loading",
        "Emoji Tango in Motion",
        "Chuckle Byte Unleashed",
        "Funky Bytes Shuffling",
        "Silly Sync Dance",
        "Whiz Wiggle Wonders",
        "Pixel Prance Party",
        "Giddy Glide Underway",
        "Haha Matrix Initializing",
        "Joy Jig Commencing",
        "Witty Whirl Spinning",
        "Bliss Bounce Countdown",
        "Mirth Matrix Unraveling",
        "Grin Grid Activation",
        "Glee Gyrate Engaging",
        "Zany Zoom in Action",
        "Woozy Waltz Loading",
        "Quirk Queue Unveiling",
        "Joyous Jive Grooving",
        "Zest Zip Loading",
        "Zig Zaggle Unzipping",
        "Quip Quake Stirring",
        "Glee Gears Warming",
        "Scoot Scoff in Progress",
        "Bounce Banter Starting",
        "Funky Float Floating",
        "Wacky Waltz Whirling",
        "Dandy Dance Prep",
        "Meme Meander on Deck",
        "Giggle Gears Set",
        "Chuckle Cheer Initiating",
        "Whoopee Waltz Whirling",
        "Lighthearted Leap Launching",
        "Frolic Funnies Beginning",
        "Prank Parade Incoming",
        "Blink Bliss Approaching",
        "Sunny Skip Kickoff",
        "Jolly Jolt Energizing",
        "Clever Cha-Cha In Session",
        "Burst Ballet Commencing",
        "Amuse Arcade Loading",
        "Jester Jive Setting",
        "Quirky Quake Quivering",
        "Droll Dash Proceeding",
        "Twist Tickle Twirling",
        "Humor Hop Hopping",
        "Merry Mingle Starting",
        "Whimsy Waltz Waltzing",
    ];
    const [loadingPrompt, setLoadingPrompt] = useState(getRandomPrompt);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingPrompt(getRandomPrompt);
        }, 5000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []); // Empty dependency array ensures useEffect runs only once on mount


    return (
        <>
            <div className="h-[80%] w-full  max-w-3xl flex justify-center items-center flex-col">
                <HashLoader
                    color={`#0033ff`}
                />
                <div className="mt-5"><p className='text-light-3 text-center ml-[-8px] mt-2'>{loadingPrompt}</p></div>
            </div>
        </>

    )

}

export default LoadingPrompt