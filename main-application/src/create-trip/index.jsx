
function CreateTrip() {
    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 mx-10">
            <h2 className=" font-bold text-3xl ">
                Tell us the Topic so we can assist you efficently.
            </h2>

            <p className="mt-3 text-gray-400 text-md"> Just provide some basic information on the topic and AI will generate a customized notes based on your preferences.</p>

            <div className="mt-[50px]">
                <div>
                    <h2 className="text-md my-3 font-medium">What is Topic of choice (AI, ML, OS, DBMS, Software Engineering ...)</h2>
                </div>

            </div>

        </div>
    )
}

export default CreateTrip