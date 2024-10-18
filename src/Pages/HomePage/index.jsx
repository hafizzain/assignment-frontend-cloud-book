import useHomeHelper from "./helper";
import Navbar from '@/Components/Element/Navbar';

function HomePage() {
    return (
        <>
            <main className="w-full bg-[#fff] relative">
                <section className="h-[100vh] max-w-[1440px] w-full mx-auto px-[15px] md:px-[20px]">
                    <Navbar />
                </section>
            </main>
        </>
    );
}

export default HomePage;