import { LayoutGrid } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CATEGORY_ICONS, CATEGORY_STYLES } from '../data/resources';

const Sidebar = ({ resources, activeCategory, setActiveCategory, isOpen, onClose }) => {
  const categories = ["All", ...new Set(resources.map(r => r.category))];

  const getIcon = (cat) => {
    if (cat === 'All') return <LayoutGrid size={18} />;
    const iconName = CATEGORY_ICONS[cat] || CATEGORY_ICONS['Default'] || 'Folder';
    const IconComponent = LucideIcons[iconName] || LucideIcons.Folder;
    return <IconComponent size={18} />;
  };

  const getCategoryStyle = (cat) => {
    const style = CATEGORY_STYLES[cat] || CATEGORY_STYLES.Default;
    return {
      '--category-color': style.color,
      '--category-bg': style.bg,
      '--category-border': style.border
    };
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand area removed as per request */}

      <nav className="flex-1 overflow-y-auto">
        <div className="nav-label">Main Library</div>
        {categories.map(cat => (
          <div 
            key={cat}
            className={`nav-item ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            style={getCategoryStyle(cat)}
          >
            <div className="nav-item-icon">
              {getIcon(cat)}
            </div>
            <span className="nav-item-text">{cat}</span>
          </div>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;
