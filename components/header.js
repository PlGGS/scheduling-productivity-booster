import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import LogInOrOut from '../components/logInOrOut';
import Link from './link';

const Header = (props) => (
    <div id="bar">
        <link rel="stylesheet" href="https://indestructibletype.com/fonts/Jost.css" type="text/css" charSet="utf-8" />
        <div id="resources">
            <div id="home">
                <ul>
                    <li><motion.div style={{ 'paddingLeft': '6px' }} whileHover={{ scale: 1.05 }}><Link href="/"><b>SPB</b></Link></motion.div></li>
                    <li style={{ 'paddingLeft': '10px', 'paddingRight': '20px', 'fontSize': '24px', 'color': '#333' }}>||</li>
                    <li id="page"><motion.div initial={{ scale: [1.02, 1] }} whileHover={{ scale: 1.02 }}><Link href="/dashboard" underline='true'>Dashboard</Link></motion.div></li>
                    <li id="page"><motion.div initial={{ scale: [1.02, 1] }} whileHover={{ scale: 1.02 }}><Link href="/peerFeedback" underline='true'>Peer Feedback</Link></motion.div></li>
                    <li id="page"><motion.div initial={{ scale: [1.02, 1] }} whileHover={{ scale: 1.02 }}><Link href="/help" underline='true'>Help</Link></motion.div></li>
                    <li id="page"><motion.div initial={{ scale: [1.02, 1] }} whileHover={{ scale: 1.02 }}><Link href="/contact" underline='true'>Contact</Link></motion.div></li>
                </ul>
            </div>
        </div>
        <div id="pages">
            <ul>
                <li id="menu">
                    <Menu href='/menu'>
                        <motion.div
                            whileTap={{ rotate: -180 }}
                            initial={{ rotate: [180, 90, 0], scale: [1.02, 1] }}
                            whileHover={{ scale: 1.02 }}
                            style={{ originX: 0.6 }}>
                            <div id="button"></div>
                        </motion.div>
                    </Menu>
                </li>
            </ul>
        </div>
        <div id="resources">
            <div id="login">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <LogInOrOut />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        {props.children}
        <style jsx>{`
            #bar {
                padding: 30px;
                padding-bottom: 5px;
                background: #fff;
                list-style: none;
                display: flex;
            }
            #pages {
                margin: 0 auto;
            }
            #button {
                display:none;
            }
            #resources {
            }
            #resources #home ul li {
              font-size: 24px;
              color: #333;
              padding-left: 10px;
              padding-right: 10px;
            }
            #login table tbody tr td {
                margin: 0 auto;
                color: #333;
            }
            #login table tr td a {
                color: #333;
            }
            #menu {
                display: none;
            }
            div ul {
                list-style: none;
                padding-left: 0px;
                display: flex;
            }
            #icon:hover {
                color: #18bc9c;
                -webkit-transition: all 0.2s ease-in;
                    -moz-transition: all 0.2s ease-in;
                    -ms-transition: all 0.2s ease-in;
                    -o-transition: all 0.2s ease-in;
                    transition: all 0.2s ease-in;
            }

            /* Smartphones (portrait and landscape) ----------- */
            @media (max-device-width : 1024px) {
                #page {
                    display: none;
                }
                #menu {
                    display: inherit;
                    transform: translate(-15%, 35%)
                }
                #button {
                    display: inherit;
                    position: relative;
                    top: -5px;
                    content: "";
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    border-right: 0.2em solid black;
                    border-top: 0.2em solid black;
                    transform: rotate(135deg) scale(1.4, 1.4);
                    margin-right: 0.5em;
                    margin-left: 1.0em;
                    -webkit-transition: all 0.2s ease-in;
                        -moz-transition: all 0.2s ease-in;
                        -ms-transition: all 0.2s ease-in;
                        -o-transition: all 0.2s ease-in;
                        transition: all 0.2s ease-in;
                }
            }
        `}</style>
    </div>
);

function Menu({ children, href }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick}>
            {children}
        </a>
    );
}

export default Header;