// Sample icon data - in a real application, this would come from your icon library
export function getIconsData() {
    const categories = {
        'arrows': {
            name: 'Arrows & Navigation',
            description: 'Direction arrows, navigation icons, and movement indicators',
            icons: [
                'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
                'ChevronUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight',
                'ArrowUpRight', 'ArrowDownLeft', 'CornerUpLeft', 'CornerDownRight',
                'Move', 'Move3d', 'Navigation', 'Compass'
            ]
        },
        'interface': {
            name: 'Interface & Controls',
            description: 'Common UI elements, buttons, and interactive controls',
            icons: [
                'Home', 'Settings', 'Menu', 'Search', 'Filter', 'ArrowUpDown',
                'Plus', 'Minus', 'X', 'Check', 'Star', 'Heart',
                'Bell', 'Bookmark', 'Flag', 'Info', 'HelpCircle', 'AlertCircle'
            ]
        },
        'communication': {
            name: 'Communication',
            description: 'Email, messaging, phone, and social interaction icons',
            icons: [
                'Mail', 'MessageCircle', 'MessageSquare', 'Send',
                'Phone', 'PhoneCall', 'Video', 'Mic', 'MicOff',
                'Share', 'Share2', 'AtSign', 'Hash', 'Link', 'ExternalLink'
            ]
        },
        'files': {
            name: 'Files & Documents',
            description: 'File types, folders, and document management icons',
            icons: [
                'File', 'FileText', 'Folder', 'FolderOpen',
                'Download', 'Upload', 'Save', 'Copy', 'Scissors', 'Clipboard',
                'Image', 'Video', 'Music', 'Archive', 'Database', 'HardDrive'
            ]
        },
        'design': {
            name: 'Design & Graphics',
            description: 'Design tools, graphics, and creative icons',
            icons: [
                'Palette', 'Brush', 'PenTool', 'Edit', 'Edit2', 'Edit3',
                'Eye', 'EyeOff', 'Layers', 'Layout', 'Grid3x3', 'Circle',
                'Square', 'Triangle', 'Hexagon', 'Zap', 'Sun', 'Moon'
            ]
        },
        'business': {
            name: 'Business & Finance',
            description: 'Business, finance, shopping, and commercial icons',
            icons: [
                'DollarSign', 'CreditCard', 'ShoppingCart', 'ShoppingBag',
                'Briefcase', 'Users', 'User', 'Building', 'Store',
                'TrendingUp', 'TrendingDown', 'BarChart', 'PieChart', 'Target', 'Award'
            ]
        },
        'technology': {
            name: 'Technology',
            description: 'Tech devices, connectivity, and digital icons',
            icons: [
                'Smartphone', 'Tablet', 'Laptop', 'Monitor', 'Printer',
                'Wifi', 'Bluetooth', 'Battery', 'Plug', 'Cpu', 'Server',
                'Cloud', 'CloudUpload', 'CloudDownload', 'Globe', 'Lock', 'Unlock'
            ]
        },
        'travel': {
            name: 'Travel & Transportation',
            description: 'Travel, maps, vehicles, and location icons',
            icons: [
                'Map', 'MapPin', 'Navigation', 'Compass', 'Car', 'Truck',
                'Plane', 'Train', 'Bike', 'Footprints', 'Ship', 'Anchor',
                'Luggage', 'Camera', 'Tent', 'Mountain', 'Trees', 'Palmtree'
            ]
        }
    };
    const totalIcons = Object.values(categories).reduce((total, category) => total + category.icons.length, 0);
    const allIcons = Object.values(categories).flatMap(category => category.icons);
    return {
        categories,
        totalIcons,
        allIcons,
        metadata: {
            totalIcons
        }
    };
}
// Helper function to search icons (simple technical name search only)
export function searchIcons(query, limit) {
    const data = getIconsData();
    const allIcons = Object.values(data.categories).flatMap(category => category.icons);
    const lowercaseQuery = query.toLowerCase();
    const matchedIcons = allIcons.filter((icon) => {
        const technicalName = icon.toLowerCase();
        return technicalName.includes(lowercaseQuery);
    });
    return limit ? matchedIcons.slice(0, limit) : matchedIcons;
}
// Helper function to get icons by category
export function getIconsByCategory(categoryId) {
    var _a;
    const data = getIconsData();
    return ((_a = data.categories[categoryId]) === null || _a === void 0 ? void 0 : _a.icons) || [];
}
// Helper function to get category for an icon
export function getIconCategory(iconName) {
    const data = getIconsData();
    for (const category of Object.values(data.categories)) {
        if (category.icons.includes(iconName)) {
            return category;
        }
    }
    return null;
}
//# sourceMappingURL=icons.js.map