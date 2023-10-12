import Navigo from "navigo";
import Dashboard from "../components/dashboard";
import Product from "../components/product";
import Category from "../components/category";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";
import Order from "../components/order";
import OrderDetail from "../components/orderDetail";
import Statistic from "../components/statistic/statistic";

const router = new Navigo("/");
let targe = document.querySelector('#app');

const handleLayOut = (data, params) => {
    
    if(data.layout == false) return data.component(params);
    return `
      ${Header()}
      ${data.component(params)}
      ${Footer()}
    `;
}


const Router = () => {
    router.on('/', function () {
        targe.innerHTML = handleLayOut({component : Dashboard})
    });
    router.on("/product", function () {
        targe.innerHTML = handleLayOut({component : Product})
    });
    router.on("/category", function () {
        targe.innerHTML = handleLayOut({component : Category})
    });
    router.on("/order", function () {
        targe.innerHTML = handleLayOut({component : Order})
    });
    router.on("/order/:id", function ({ data }) {
        targe.innerHTML = handleLayOut({component : OrderDetail}, data )
    });
    router.on("/statistic", function ({ data }) {
        targe.innerHTML = handleLayOut({component : Statistic}, data )
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