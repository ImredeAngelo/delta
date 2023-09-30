import HomePage from "~pages/home";
import EventPage from "~pages/event";
import NewEvent from "~pages/new-event";
import RegisterPage from "~pages/register";

const routes = [
    { path:'/', element: HomePage, index: true },
    { path:'/new', element: NewEvent, public: true },
    { path:'/event/:id', element: EventPage, public: true },
    { path:'/register', element: RegisterPage, public: true },
]

export default routes;
export const paths = routes.map(r => r.path);