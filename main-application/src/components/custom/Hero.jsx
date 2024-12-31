
import { Button } from "../ui/button"
import { Link } from "react-router-dom"


function Hero() {
    return (
        <>
            <div className="flex items-center mx-56 gap-9 mt-16">
                <h2 className="font-extrabold text-[44px] text-center">
                    <span className="text-blue-800">Learn and Grow with AI:</span>
                    <p>Get Optimised notes at Your FingerTips</p>

                    <p className="text-sm text-gray-500 text-center mt-12"> Click below to move the search page and get the optimised and detailed notes for college topics</p>
                </h2>

            </div >


            <div className="flex items-center justify-center mt-12 ">

                <Link to="/search-page">
                    <div className="">
                        <Button>Make/Save your own notes</Button>

                    </div>
                </Link>

                <Link to="/generate-page">
                    <div className="ps-20">
                        <Button>Generate with AI and prompt</Button>

                    </div>
                </Link>


            </div>
        </>

    )
}

export default Hero