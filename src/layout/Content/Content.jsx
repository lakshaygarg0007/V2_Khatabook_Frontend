import "./Content.css";
import ContentTop from '../../components/ContentTop/ContentTop';
import ContentMain from '../../components/ContentMain/ContentMain';
import Sidebar from "../Sidebar/Sidebar.jsx";

const Content = () => {
    return (
        <>
            <Sidebar/>
            <div className='main-content'>
                <ContentTop/>
                <ContentMain/>
            </div>
        </>
    )
}

export default Content
