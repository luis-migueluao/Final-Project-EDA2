import {
  gamingTree,
  softwareTree,
  subscriptionsTree,
} from "../data/menuTree";

import "../styles/Menu.css";

interface MenuProps {
  hoverMenu: string | null;
  setHoverMenu: (menu: string | null) => void;

  activeCategory: string | null;

  handleCategoryClick: (category: string) => void;
  handleSubClick: (sub: string) => void;
}

const Menu = ({
  hoverMenu,
  setHoverMenu,
  activeCategory,
  handleCategoryClick,
  handleSubClick,
}: MenuProps) => {

  const isOpen = (menu: string) => hoverMenu === menu;

  return (
    <div onMouseLeave={() => setHoverMenu(null)}>

      <div className="menu-bar">

        <span
          className={activeCategory === "gaming" ? "active-menu" : ""}
          onMouseEnter={() => setHoverMenu("gaming")}
          onClick={() => handleCategoryClick("gaming")}
        >
          Gaming
        </span>

        <span
          className={activeCategory === "software" ? "active-menu" : ""}
          onMouseEnter={() => setHoverMenu("software")}
          onClick={() => handleCategoryClick("software")}
        >
          Software
        </span>

        <span
          className={activeCategory === "subscriptions" ? "active-menu" : ""}
          onMouseEnter={() => setHoverMenu("subscriptions")}
          onClick={() => handleCategoryClick("subscriptions")}
        >
          Suscripciones
        </span>

      </div>

      {/* GAMING */}
      {isOpen("gaming") && (
        <div className="dropdown-menu-custom">

          {gamingTree.children?.map((section) => (
            <div key={section.id} className="dropdown-column">

              <h4>{section.label}</h4>

              {section.children?.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleSubClick(item.label)}
                >
                  {item.label}
                </p>
              ))}

            </div>
          ))}

        </div>
      )}

      {/* SOFTWARE */}
      {isOpen("software") && (
        <div className="dropdown-menu-custom">

          {softwareTree.children?.map((section) => (
            <div key={section.id} className="dropdown-column">

              <h4>{section.label}</h4>

              {section.children?.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleSubClick(item.label)}
                >
                  {item.label}
                </p>
              ))}

            </div>
          ))}

        </div>
      )}

      {/* SUBSCRIPTIONS */}
      {isOpen("subscriptions") && (
        <div className="dropdown-menu-custom">

          {subscriptionsTree.children?.map((section) => (
            <div key={section.id} className="dropdown-column">

              <h4>{section.label}</h4>

              {section.children?.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleSubClick(item.label)}
                >
                  {item.label}
                </p>
              ))}

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Menu;