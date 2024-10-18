import SessionCleanup from "../Components/SessionCleanup";
import useMainLayout from "./helper";

const MainOutlet = () => {
    const { } = useMainLayout()
    return <>
        <SessionCleanup />
    </>
};

export default MainOutlet