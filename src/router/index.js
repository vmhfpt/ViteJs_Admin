import Navigo from "navigo";
import Dashboard from "../components/dashboard";
import Product from "../components/product";
import Category from "../components/category";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Order from "../components/order";
import OrderDetail from "../components/orderDetail";
import Statistic from "../components/statistic/statistic";
import Login from "../components/admin/login";
import authService from "../service/authService";
export const router = new Navigo("/");
let targe = document.querySelector('#app');

const handleLayOut = async (data, params) => {
   
    if(data.auth == true){
       
        var login = JSON.parse(localStorage.getItem("login"));
        if(login == null){
               return Login();
        }else {
            try {
                await authService.authencationToken(login.access_token);
            } catch (error) {
                return Login();
            }
        }
    }


    if(data.layout == false) return data.component(params);
    return `
      ${Header()}
      ${data.component(params)}
      ${Footer()}
    `;
}


const Router = () => {
  



    router.on('/',async  function () {
        targe.innerHTML = await handleLayOut({component : Dashboard, auth : true})
    });
    router.on('/login',async function () {
        targe.innerHTML = await handleLayOut({component : Login, layout : false})
    });
    router.on("/product",async function () {
        targe.innerHTML = await handleLayOut({component : Product, auth : true})
    });
    router.on("/category",async function () {
        targe.innerHTML = await handleLayOut({component : Category, auth : true})
    });
    router.on("/order",async function () {
        targe.innerHTML = await handleLayOut({component : Order, auth : true})
    });
    router.on("/order/:id",async function ({ data }) {
        targe.innerHTML = await handleLayOut({component : OrderDetail, auth : true}, data )
    });
    router.on("/statistic",async function ({ data }) {
        targe.innerHTML = await handleLayOut({component : Statistic, auth : true}, data )
    });
    
    router.resolve();
    
}
document.body.addEventListener('click', (e) => {

    var parentATag = e.target.closest('a[data-navigo]');
    if(parentATag) {
        var hrefValue = parentATag.getAttribute('href');
        e.preventDefault();
        router.navigate(hrefValue);
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", 
        });
    } 
});
export default Router;