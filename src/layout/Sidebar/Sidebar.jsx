import { useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';

const Sidebar = () => {
    const [activeLinkIdx, setActiveLinkIdx] = useState(1);
    const [sidebarClass, setSidebarClass] = useState("");
    const { isSidebarOpen } = useContext(SidebarContext);

    const backgroundColors = ['#FFA500', '#FF4500', '#FF6347', '#FF7F50']; // Add more colors if needed

    useEffect(() => {
        if(isSidebarOpen){
            setSidebarClass('sidebar-change');
        } else {
            setSidebarClass('');
        }
    }, [isSidebarOpen]);

    const handleLinkClick = (index) => {
        setActiveLinkIdx(index);
        document.body.style.backgroundColor = backgroundColors[index];
    };

    return (
        <div className={ `sidebar ${sidebarClass}` }>
            <div className="user-info">
                <div className="info-img img-fit-cover">
                    <img src={ personsImgs.person_two } alt="profile image" onClick={() => window.location.href = '/profile'} />
                </div>
                <span className="info-name" onClick={() => window.location.href = '/profile'}>Lagarg</span>
            </div>

            <nav className="navigation">
                <ul className="nav-list">
                    {
                        navigationLinks.map((navigationLink,index) => (
                            <li className="nav-item" key = { navigationLink.id }>
                                <a href={navigationLink.url}
                                   className={ `nav-link ${ navigationLink.id === activeLinkIdx ? 'active' : '' }`}
                                   onClick={() => handleLinkClick(index)}
                                >
                                    <img src={ navigationLink.image } className="nav-link-icon" alt = { navigationLink.title } />
                                    <span className="nav-link-text">{ navigationLink.title }</span>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
