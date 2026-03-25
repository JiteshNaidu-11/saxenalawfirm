# Saxena Law Firm - Refactored Component Structure

## 📁 Project Structure

```
saxenalawfirm/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AttorneyPage.jsx
│   │   │   ├── FocusPage.jsx
│   │   │   ├── BlogPage.jsx
│   │   │   └── BlogPostPage.jsx
│   │   └── common/
│   │       └── CommonComponents.jsx
│   ├── hooks/
│   │   └── useInView.js
│   ├── data/
│   │   ├── constants.js        (Color palette)
│   │   ├── team.js            (Team data)
│   │   ├── focusAreas.js      (Practice areas)
│   │   └── blog.js            (Blog posts)
│   ├── styles/
│   │   └── globalStyles.js    (Global CSS)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── SaxenaLawFirm.jsx (original monolithic file)
```

## 🎯 What's Been Refactored

### Before
- Single 1243-line `SaxenaLawFirm.jsx` file
- Everything mixed together: data, components, styles, hooks

### After
- **Separated by concerns**: Data, Components, Styles, Hooks
- **Organized components**:
  - `Navbar.jsx` - Navigation component
  - `pages/` folder - All page components
  - `common/` folder - Reusable components
- **Centralized data**: Each data type in its own file
- **Custom hooks**: Reusable hooks in separate module
- **Global styles**: Extracted to a dedicated file

## 🚀 Running the Project

```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
```

The app runs on `http://127.0.0.1:5173/`

## 📄 Components Overview

### Pages
- **HomePage** - Main landing page with all sections
- **AttorneyPage** - Individual attorney profile details
- **FocusPage** - Practice area details
- **BlogPage** - Blog listing page
- **BlogPostPage** - Individual blog post view

### Common Components
- **FadeIn** - Intersection observer animation wrapper
- **SLabel** - Section label component
- **SHeading** - Section heading component

## 🎨 Data Files

- **constants.js** - Color palette (C object)
- **team.js** - Team member profiles
- **focusAreas.js** - Practice areas with articles
- **blog.js** - Blog posts with full content

## ⚙️ Key Features Maintained

✅ All original functionality preserved  
✅ Same visual design and animations  
✅ Mobile responsive  
✅ Global CSS styles system  
✅ Smooth page transitions  
✅ Scroll animations with IntersectionObserver  

## 🔄 Easy to Extend

Now it's much easier to:
- Add new pages (create in `components/pages/`)
- Add new sections (create component files)
- Update data (modify files in `data/`)
- Share components (use `components/common/`)
- Reuse hooks (use or create in `hooks/`)
