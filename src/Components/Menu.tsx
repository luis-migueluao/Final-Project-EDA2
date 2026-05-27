import { useMemo } from "react";
import { GeneralTree, type  TreeNode } from "../Helpers/GeneralTree";
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

  const gamingTreeInstance = useMemo(() => new GeneralTree(gamingTree), []);
  const softwareTreeInstance = useMemo(() => new GeneralTree(softwareTree), []);
  const subscriptionsTreeInstance = useMemo(() => new GeneralTree(subscriptionsTree), []);

  const isOpen = (menu: string) => hoverMenu === menu;

  // 2. Método auxiliar para renderizar las columnas usando algoritmos del árbol
  const renderDropdownColumns = (treeInstance: GeneralTree) => {
    // Usamos el método de búsqueda de nuestra estructura para conseguir la raíz de forma segura
    const rootNode = treeInstance.findNodeById(treeInstance.root.id);
    
    if (!rootNode || !rootNode.children) return null;

    return rootNode.children.map((section: TreeNode) => (
      <div key={section.id} className="dropdown-column">
        <h4>{section.label}</h4>
        
        {section.children?.map((item: TreeNode) => (
          <p
            key={item.id}
            onClick={() => {
              
              const clickedNode = treeInstance.findNodeById(item.id);
              if (clickedNode) {
                handleSubClick(clickedNode.label);
              }
            }}
          >
            {item.label}
          </p>
        ))}
      </div>
    ));
  };

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
          Subscriptions
        </span>
      </div>

      {isOpen("gaming") && (
        <div className="dropdown-menu-custom">
          {renderDropdownColumns(gamingTreeInstance)}
        </div>
      )}

      {isOpen("software") && (
        <div className="dropdown-menu-custom">
          {renderDropdownColumns(softwareTreeInstance)}
        </div>
      )}

      {isOpen("subscriptions") && (
        <div className="dropdown-menu-custom">
          {renderDropdownColumns(subscriptionsTreeInstance)}
        </div>
      )}
    </div>
  );
};

export default Menu;