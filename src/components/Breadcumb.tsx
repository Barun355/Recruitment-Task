import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const routes = [
    { path: "/home", name: "Home" },
    { path: "/home/dashboardv2", name: "Dashboard V2"},
  ];

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  return (
    <nav className="breadcrumbs text-sm">
      <ol>
        {pathnames.map((_, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const routeName = routes.find((route) => route.path === to)?.name;

          return (
            <li className="cursor-pointer font-semibold" key={to}>
              {last ? (
                <span className="text-blue-800">{routeName}</span>
              ) : (
                <Link to={to} className="text-blue-400">
                  {routeName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
