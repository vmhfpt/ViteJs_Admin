import Navigo from "navigo";
import Dashboard from "../components/dashboard";
import Product from "../components/product";
import Category from "../components/category";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header";


const router = new Navigo("/");
let targe = document.querySelector('#app');

const handleLayOut = (data) => {
    if(data.layout == false) return data.component(data.param);
    return `
      ${Header()}
      ${data.component(data.param)}
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
    // router.on("/product/edit/:id", function (match) {
    //     targe.innerHTML = handleLayOut({component :  ProductEdit, param : match.data})
    // });
    // router.on("/product/add", function () {
    //     targe.innerHTML = handleLayOut({component : ProductAdd})
    // });
    
    router.resolve();
    
}
export default Router;