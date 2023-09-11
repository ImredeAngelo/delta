import HomePage from "~pages/home";
import EventPage from "~pages/event";

const routes = [
    { path:'/', element: HomePage, index: true },
    { path:'/event/:id', element: EventPage, public: true }
]

export default routes;
export const paths = routes.map(r => r.path);