import { useState, useEffect } from 'react';

const PreLoaderfull = () => {
    const messages = [
        "Did you know? AI can analyze vast amounts of data in the blink of an eye!",
        "Did you know? AI can assist in making predictions based on historical data!",
        "Did you know? AI can personalize your shopping experience by analyzing your preferences!",
        "Did you know? AI is being used to enhance medical diagnoses and treatments!",
        "Did you know? AI can optimize logistics and supply chain operations in real time!",
        "Did you know? AI can help automate routine tasks, freeing up time for creativity!",
        "Did you know? AI can drive innovation in industries like finance, healthcare, and education!",
        "Did you know? AI can improve customer service through chatbots and virtual assistants!",
        "Did you know? AI can enhance security by detecting fraud and cyber threats!",
        "Did you know? AI can assist in scientific research by processing large datasets quickly!",
    ];
    
    const names = [
        "Alice Johnson",
        "Bob Smith",
        "Charlie Brown",
        "Diana Prince",
        "Ethan Hunt",
        "Fiona Gallagher",
        "George Miller",
        "Hannah Montana",
        "Ian Malcolm",
        "Jasmine Sullivan",
    ];

    const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

    const [currentMessage, setCurrentMessage] = useState(messages[getRandomIndex(messages)]);
    const [currentName, setCurrentName] = useState(names[getRandomIndex(names)]);

    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly select a new message and name
            setCurrentMessage(messages[getRandomIndex(messages)]);
            setCurrentName(names[getRandomIndex(names)]);
        }, 15000); // Change message every 15 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [messages, names]);

    return (
        <div className='fixed inset-0 z-[99999] flex justify-center items-center bg-[#fcfcfc]'>
            <div className="flex flex-col space-y-6 justify-center items-center">
                <div className="preloader-wrapper">
                    <video
                        src="/Assets/Videos/SEO-Loader.mp4"
                        width="100%"
                        height="100%"
                        style={{ position: 'relative', maxWidth: '480px', maxHeight: '480px' }}
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
                <div className="text-2xl bg-[#FFEEEB] p-4 rounded-md overflow-hidden max-w-[600px] text-center">
                    <p className="animate-text">{`"${currentMessage}"`}</p>
                    <p className="mt-2 text-2xl font-semibold text-[#891559]">{currentName}</p>
                </div>
            </div>
        </div>
    );
}

export default PreLoaderfull;
