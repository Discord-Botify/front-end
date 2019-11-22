import '../App.css';
import { useCookies } from 'react-cookie';


function Logout(){
    const [cookies, setCookie, removeCookie] = useCookies(['stoken']);
    removeCookie('stoken');
    return null;
}
export default Logout;