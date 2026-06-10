import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { 
  FolderIcon, 
  ComputerIcon, 
  FileTextIcon, 
  ProjectsFolderIcon, 
  SkillsIcon, 
  GlobeIcon 
} from './Icons';

// Initial nested virtual file system matching Rishi's portfolio files and structures
const INITIAL_FS = {
  'C:': {
    type: 'dir',
    label: 'Local Disk (C:)',
    children: {
      'Users': {
        type: 'dir',
        label: 'Users',
        children: {
          'Rishi': {
            type: 'dir',
            label: 'Rishi',
            children: {
              'Desktop': { type: 'dir', label: 'Desktop', children: {} },
              'Downloads': { type: 'dir', label: 'Downloads', children: {} },
              'Pictures': { type: 'dir', label: 'Pictures', children: {} },
              'OneDrive': {
                type: 'dir',
                label: 'OneDrive - Personal',
                children: {
                  'Apps': { type: 'dir', label: 'Apps', children: {} },
                  'Attachments': {
                    type: 'dir',
                    label: 'Attachments',
                    children: {
                      'Screenshot_2026-06-06_222243.png': { type: 'file', content: '[Image Data: Screen capture of portfolio UI layout with the context menu active]' },
                      'doc_icccvs.txt': { type: 'file', content: 'Document: doc_icccvs\nStatus: Approved\nAuthor: Rishi Biswas\nDescription: Core system specification details for Retro OS platform.' },
                      'surprise.txt': { type: 'file', content: 'Surprise! You successfully navigated to the OneDrive Attachments directory. You have discovered a secret file!' },
                      'api.txt': { type: 'file', content: 'Portfolio API Endpoints:\n- GET /api/projects - Returns list of showcase projects\n- GET /api/skills - Returns developer tech stack\n- POST /api/contact - Sends contact message' },
                      'src': {
                        type: 'dir',
                        label: 'src',
                        children: {
                          'main.js': { type: 'file', content: 'console.log("Welcome to Rishi Biswas Portfolio OS");' }
                        }
                      },
                      'gemini_generated_video_3b359045.txt': { type: 'file', content: '[Video Log: Video generated during UI design iteration showing CRT monitor previews]' }
                    }
                  },
                  'Desktop': { type: 'dir', label: 'Desktop', children: {} },
                  'Documents': {
                    type: 'dir',
                    label: 'Documents',
                    children: {
                      'Anish_cv.txt': { type: 'file', content: 'Anish Biswas - CV Summary:\n- Full Stack Software Developer\n- 3+ years experience with React, Node.js, and SQL databases\n- Specializes in building secure SaaS platforms.' }
                    }
                  },
                  'Pictures': { type: 'dir', label: 'Pictures', children: {} },
                  'Scans': { type: 'dir', label: 'Scans', children: {} },
                  'Videos': { type: 'dir', label: 'Videos', children: {} }
                }
              },
              'Skills': {
                type: 'dir',
                label: 'Skills',
                isSkills: true,
                children: {
                  'Frontend_Skills.txt': { type: 'file', content: 'Skills in Frontend Development:\n- React & Next.js\n- JavaScript (ES6+) & TypeScript\n- HTML5 & CSS3 / Vanilla CSS\n- Responsive Design & Media Queries\n- TailwindCSS & Bootstrap\n- State Management (Zustand, Redux)' },
                  'Backend_Skills.txt': { type: 'file', content: 'Skills in Backend Development:\n- Node.js & Express.js\n- Python & FastAPI / Django\n- RESTful APIs & GraphQL\n- Authentication (JWT, OAuth)\n- Middleware & Server routing' },
                  'Database_Skills.txt': { type: 'file', content: 'Skills in Database Management:\n- PostgreSQL & MySQL\n- MongoDB & Redis\n- ORMs (Prisma, Mongoose, Sequelize)\n- Query optimization & Schema design' },
                  'Cloud_DevOps.txt': { type: 'file', content: 'Skills in Cloud & DevOps:\n- Amazon Web Services (S3, EC2, Lambda)\n- Docker containerization\n- Git, GitHub & GitLab\n- CI/CD Pipelines (GitHub Actions)\n- Hosting (Vercel, Netlify, Heroku)' }
                }
              },
              'Projects': {
                type: 'dir',
                label: 'Projects',
                isProjects: true,
                children: {
                  'Portfolio_OS': {
                    type: 'dir',
                    label: 'Portfolio_OS',
                    children: {
                      'README.md': { type: 'file', content: '# Portfolio OS\nA retro-style Windows 95/98 desktop simulator built with React, Framer Motion, and Zustand.\nFeatures a virtual file explorer, context menu, custom icons, CRT theme preview, and responsive window docking.' },
                      'package.json': { type: 'file', content: '{\n  "name": "portfolio-os",\n  "version": "1.0.0",\n  "private": true,\n  "dependencies": {\n    "react": "^18.3.1",\n    "react-dom": "^18.3.1",\n    "framer-motion": "^11.2.10",\n    "zustand": "^4.5.2"\n  }\n}' }
                    }
                  },
                  'ECommerce_App': {
                    type: 'dir',
                    label: 'ECommerce_App',
                    children: {
                      'README.md': { type: 'file', content: '# Retro E-Commerce Shop\nA fullstack shopping application using React, Node.js, Express, and MongoDB.\nIncludes checkout system integrated with Stripe payments API.' }
                    }
                  },
                  'AI_Chat_Bot': {
                    type: 'dir',
                    label: 'AI_Chat_Bot',
                    children: {
                      'README.md': { type: 'file', content: '# Intelligent Assistant Bot\nAn AI chatbot application leveraging Python, OpenAI API, and FastAPI.\nOptimized for streaming completions and persistent history.' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  'F:': {
    type: 'dir',
    label: 'New Volume (F:)',
    children: {
      'Backup': {
        type: 'dir',
        label: 'Backup',
        children: {
          'Anish_CV.txt': { type: 'file', content: 'Anish Biswas - CV Summary:\n- Full Stack Software Developer\n- 3+ years experience with React, Node.js, and SQL databases\n- Specializes in building secure SaaS platforms.' },
          'Rishi_CV.txt': { type: 'file', content: 'Rishi Biswas - CV Summary:\n- Full Stack Web Developer\n- Highly skilled in building production-ready scalable user interfaces\n- Expert in React, Zustand, and AWS Cloud Deployments.' }
        }
      }
    }
  }
};

// Map path array to Windows path string
const getPathString = (pathArray) => {
  if (pathArray.length === 0) return '';
  if (pathArray[0] === 'Quick access') return 'Quick access';
  if (pathArray[0] === 'Network') return 'Network' + (pathArray.length > 1 ? '\\' + pathArray.slice(1).join('\\') : '');
  if (pathArray[0] === 'This PC') {
    if (pathArray.length === 1) return 'This PC';
    const drive = pathArray[1];
    const rest = pathArray.slice(2);
    return drive + (rest.length > 0 ? '\\' + rest.join('\\') : '\\');
  }
  return pathArray.join('\\');
};

// Parse Windows path string to path array
const parsePathString = (pathString) => {
  const cleanStr = pathString.trim();
  if (!cleanStr) return null;
  
  if (cleanStr.toLowerCase() === 'quick access') {
    return ['Quick access'];
  }
  if (cleanStr.toLowerCase() === 'this pc') {
    return ['This PC'];
  }
  if (cleanStr.toLowerCase() === 'network') {
    return ['Network'];
  }
  if (cleanStr.toLowerCase().startsWith('network\\')) {
    return ['Network', ...cleanStr.split('\\').slice(1)];
  }

  const driveMatch = cleanStr.match(/^([a-zA-Z]:)(.*)$/);
  if (driveMatch) {
    const drive = driveMatch[1].toUpperCase();
    const rest = driveMatch[2];
    const segments = rest.split('\\').filter(Boolean);
    return ['This PC', drive, ...segments];
  }

  return null;
};

// Get dynamic relative location string from path array
const getRelativeLoc = (pathArray) => {
  if (pathArray.length <= 1) return 'Root';
  
  const folderSegments = pathArray.slice(0, -1);
  
  // Check OneDrive prefix
  const oneDrivePrefix = ['This PC', 'C:', 'Users', 'Rishi', 'OneDrive'];
  let isOneDrive = true;
  for (let i = 0; i < oneDrivePrefix.length; i++) {
    if (folderSegments[i] !== oneDrivePrefix[i]) {
      isOneDrive = false;
      break;
    }
  }
  
  if (isOneDrive) {
    const remaining = folderSegments.slice(oneDrivePrefix.length);
    return ['OneDrive - Personal', ...remaining].join('\\');
  }
  
  // Otherwise, remove drive prefix ['This PC', '<Drive>:']
  if (folderSegments[0] === 'This PC' && folderSegments.length > 1) {
    const remaining = folderSegments.slice(2);
    return remaining.join('\\');
  }
  
  return folderSegments.join('\\') || 'Root';
};

// Recent files definition
const INITIAL_RECENT_FILES = [
  { name: 'doc_icccvs.txt', path: ['This PC', 'C:', 'Users', 'Rishi', 'OneDrive', 'Attachments', 'doc_icccvs.txt'], relativeLoc: 'OneDrive - Personal\\Attachments' },
  { name: 'Rishi_CV.txt', path: ['This PC', 'F:', 'Backup', 'Rishi_CV.txt'], relativeLoc: 'Backup' },
  { name: 'Screenshot_2026-06-06_222243.png', path: ['This PC', 'C:', 'Users', 'Rishi', 'OneDrive', 'Attachments', 'Screenshot_2026-06-06_222243.png'], relativeLoc: 'OneDrive - Personal\\Attachments' },
  { name: 'Frontend_Skills.txt', path: ['This PC', 'C:', 'Users', 'Rishi', 'Skills', 'Frontend_Skills.txt'], relativeLoc: 'Users\\Rishi\\Skills' },
  { name: 'README.md', path: ['This PC', 'C:', 'Users', 'Rishi', 'Projects', 'Portfolio_OS', 'README.md'], relativeLoc: 'Users\\Rishi\\Projects\\Portfolio_OS' },
  { name: 'Anish_CV.txt', path: ['This PC', 'F:', 'Backup', 'Anish_CV.txt'], relativeLoc: 'Backup' },
  { name: 'surprise.txt', path: ['This PC', 'C:', 'Users', 'Rishi', 'OneDrive', 'Attachments', 'surprise.txt'], relativeLoc: 'OneDrive - Personal\\Attachments' }
];

export const FileExplorer = () => {
  const [fs, setFs] = useState(INITIAL_FS);
  const [currentPath, setCurrentPath] = useState(['Quick access']);
  const [history, setHistory] = useState([['Quick access']]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('Home');
  const openTextFile = useStore((state) => state.openTextFile);
  const [recentFilesList, setRecentFilesList] = useState(INITIAL_RECENT_FILES);

  const addToRecentFiles = (name, path) => {
    setRecentFilesList(prev => {
      const filtered = prev.filter(r => r.name !== name || JSON.stringify(r.path) !== JSON.stringify(path));
      const newRecent = {
        name,
        path,
        relativeLoc: getRelativeLoc(path)
      };
      return [newRecent, ...filtered].slice(0, 10);
    });
  };

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, targetItem: null, type: null });

  // Address Bar Edit States
  const [isEditingPath, setIsEditingPath] = useState(false);
  const [typedPath, setTypedPath] = useState('');

  // Frequent folders definition (Quick Access links)
  const frequentFolders = [
    { name: 'Desktop', path: ['This PC', 'C:', 'Users', 'Rishi', 'Desktop'] },
    { name: 'Downloads', path: ['This PC', 'C:', 'Users', 'Rishi', 'Downloads'] },
    { name: 'Documents', path: ['This PC', 'C:', 'Users', 'Rishi', 'Documents'] },
    { name: 'Pictures', path: ['This PC', 'C:', 'Users', 'Rishi', 'Pictures'] },
    { name: 'Skills', path: ['This PC', 'C:', 'Users', 'Rishi', 'Skills'], isSkills: true },
    { name: 'Projects', path: ['This PC', 'C:', 'Users', 'Rishi', 'Projects'], isProjects: true },
    { name: 'OneDrive - Personal', path: ['This PC', 'C:', 'Users', 'Rishi', 'OneDrive'] },
    { name: 'Attachments', path: ['This PC', 'C:', 'Users', 'Rishi', 'OneDrive', 'Attachments'] },
  ];


  // Resolve directory node
  const resolveNode = (pathArray) => {
    if (pathArray.length === 1 && pathArray[0] === 'Quick access') {
      return { type: 'dir', label: 'Quick access', children: {} };
    }
    if (pathArray.length === 1 && pathArray[0] === 'Network') {
      return { type: 'dir', label: 'Network', children: {} };
    }
    let segments = pathArray;
    if (pathArray[0] === 'This PC') {
      segments = pathArray.slice(1);
    }
    if (segments.length === 0) {
      return { type: 'dir', label: 'This PC', children: fs };
    }
    let current = { children: fs };
    for (let segment of segments) {
      if (current && current.children && current.children[segment]) {
        current = current.children[segment];
      } else {
        return null;
      }
    }
    return current;
  };

  const currentNode = resolveNode(currentPath);

  // Navigate helper
  const navigateTo = (path) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
    setSelectedItems([]);
    setSearchQuery('');
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
      setSelectedItems([]);
      setSearchQuery('');
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
      setSelectedItems([]);
      setSearchQuery('');
    }
  };

  const handleUp = () => {
    if (currentPath.length > 1) {
      const newPath = currentPath.slice(0, currentPath.length - 1);
      navigateTo(newPath);
    } else if (currentPath.length === 1 && currentPath[0] !== 'Quick access') {
      navigateTo(['Quick access']);
    }
  };

  // Click file or folder selection
  const handleItemClick = (name, e) => {
    e.stopPropagation();
    if (e.ctrlKey || e.shiftKey) {
      setSelectedItems(prev => 
        prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]
      );
    } else {
      setSelectedItems([name]);
    }
  };

  // Double click logic
  const handleItemDoubleClick = (name, item, e) => {
    e.stopPropagation();
    if (item.type === 'dir') {
      navigateTo([...currentPath, name]);
    } else if (item.type === 'file') {
      openTextFile(name, item.content);
      addToRecentFiles(name, [...currentPath, name]);
    }
  };

  // Tree icon picker
  const getIcon = (name, node) => {
    if (node.isSkills || name === 'Skills') return <SkillsIcon size={32} />;
    if (node.isProjects || name === 'Projects') return <ProjectsFolderIcon size={32} />;
    if (node.type === 'dir') {
      if (name === 'This PC' || name === 'C:' || name === 'F:') return <ComputerIcon size={32} />;
      if (name === 'Network') return <GlobeIcon size={32} />;
      return <FolderIcon size={32} />;
    }
    return <FileTextIcon size={32} />;
  };

  // Ribbon Operations
  const handleNewFolder = () => {
    const isRoot = currentPath.length === 1 && (currentPath[0] === 'Quick access' || currentPath[0] === 'This PC' || currentPath[0] === 'Network');
    if (isRoot || currentPath.length === 0) {
      alert('Cannot create folder here.');
      return;
    }
    const folderName = prompt('Enter new folder name:', 'New Folder');
    if (!folderName) return;

    setFs(prevFs => {
      const newFs = JSON.parse(JSON.stringify(prevFs));
      let current = { children: newFs };
      for (let segment of currentPath) {
        current = current.children[segment];
      }
      current.children = current.children || {};
      if (current.children[folderName]) {
        alert('An item with this name already exists.');
        return prevFs;
      }
      current.children[folderName] = {
        type: 'dir',
        label: folderName,
        children: {}
      };
      return newFs;
    });
  };

  const handleDelete = () => {
    if (selectedItems.length === 0) return;

    if (searchQuery !== '') {
      const itemsToDelete = [];
      for (let name of selectedItems) {
        const match = searchResults.find(r => r.name === name);
        if (match) {
          const parentPath = match.path.slice(0, -1);
          const isParentRoot = parentPath.length === 1 && (parentPath[0] === 'Quick access' || parentPath[0] === 'This PC' || parentPath[0] === 'Network');
          if (isParentRoot) {
            alert('Cannot delete system drives or virtual elements.');
            return;
          }
          itemsToDelete.push({ parentPath, name });
        }
      }
      if (itemsToDelete.length === 0) return;
      if (!confirm(`Are you sure you want to delete ${itemsToDelete.length} item(s)?`)) return;

      setFs(prevFs => {
        const newFs = JSON.parse(JSON.stringify(prevFs));
        for (let { parentPath, name } of itemsToDelete) {
          let current = { children: newFs };
          const lookupPath = parentPath[0] === 'This PC' ? parentPath.slice(1) : parentPath;
          let ok = true;
          for (let segment of lookupPath) {
            if (current && current.children && current.children[segment]) {
              current = current.children[segment];
            } else {
              ok = false;
              break;
            }
          }
          if (ok && current.children) {
            delete current.children[name];
          }
        }
        return newFs;
      });
      setSelectedItems([]);
      return;
    }

    if (currentPath[0] === 'Quick access') {
      const recentSelected = selectedItems.filter(name => 
        recentFilesList.some(r => r.name === name)
      );
      if (recentSelected.length > 0) {
        if (confirm(`Remove ${recentSelected.length} item(s) from Recent Files?`)) {
          setRecentFilesList(prev => prev.filter(r => !recentSelected.includes(r.name)));
          setSelectedItems(prev => prev.filter(name => !recentSelected.includes(name)));
        }
        return;
      }
      alert('Cannot delete system drives or virtual elements.');
      return;
    }

    const isRoot = currentPath.length === 1 && (currentPath[0] === 'Quick access' || currentPath[0] === 'This PC' || currentPath[0] === 'Network');
    if (isRoot || currentPath.length === 0) {
      alert('Cannot delete system drives or virtual elements.');
      return;
    }
    if (!confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)) return;

    setFs(prevFs => {
      const newFs = JSON.parse(JSON.stringify(prevFs));
      let current = { children: newFs };
      for (let segment of currentPath) {
        current = current.children[segment];
      }
      for (let name of selectedItems) {
        delete current.children[name];
      }
      return newFs;
    });
    setSelectedItems([]);
  };

  const handleRename = () => {
    if (selectedItems.length !== 1) return;
    const oldName = selectedItems[0];

    if (searchQuery !== '') {
      const match = searchResults.find(r => r.name === oldName);
      if (!match) return;
      const parentPath = match.path.slice(0, -1);
      const isParentRoot = parentPath.length === 1 && (parentPath[0] === 'Quick access' || parentPath[0] === 'This PC' || parentPath[0] === 'Network');
      if (isParentRoot) {
        alert('Cannot rename system drives or virtual elements.');
        return;
      }
      const newName = prompt('Rename item to:', oldName);
      if (!newName || newName === oldName) return;

      setFs(prevFs => {
        const newFs = JSON.parse(JSON.stringify(prevFs));
        let current = { children: newFs };
        const lookupPath = parentPath[0] === 'This PC' ? parentPath.slice(1) : parentPath;
        let ok = true;
        for (let segment of lookupPath) {
          if (current && current.children && current.children[segment]) {
            current = current.children[segment];
          } else {
            ok = false;
            break;
          }
        }
        if (ok && current.children) {
          if (current.children[newName]) {
            alert('An item with this name already exists.');
            return prevFs;
          }
          current.children[newName] = current.children[oldName];
          current.children[newName].label = newName;
          delete current.children[oldName];
        }
        return newFs;
      });
      setSelectedItems([newName]);
      return;
    }

    const isRoot = currentPath.length === 1 && (currentPath[0] === 'Quick access' || currentPath[0] === 'This PC' || currentPath[0] === 'Network');
    if (isRoot || currentPath.length === 0) {
      alert('Cannot rename system drives or virtual elements.');
      return;
    }
    const newName = prompt('Rename item to:', oldName);
    if (!newName || newName === oldName) return;

    setFs(prevFs => {
      const newFs = JSON.parse(JSON.stringify(prevFs));
      let current = { children: newFs };
      for (let segment of currentPath) {
        current = current.children[segment];
      }
      if (current.children[newName]) {
        alert('An item with this name already exists.');
        return prevFs;
      }
      current.children[newName] = current.children[oldName];
      current.children[newName].label = newName;
      delete current.children[oldName];
      return newFs;
    });
    setSelectedItems([newName]);
  };

  const handleProperties = () => {
    if (selectedItems.length !== 1) return;
    const name = selectedItems[0];
    let node = null;
    let locationString = getPathString(currentPath);
    
    if (searchQuery !== '') {
      const match = searchResults.find(r => r.name === name);
      if (match) {
        node = match.item;
        locationString = getPathString(match.path.slice(0, -1));
      }
    } else if (currentPath[0] === 'Quick access') {
      const freq = frequentFolders.find(f => f.name === name);
      if (freq) {
        node = resolveNode(freq.path);
        locationString = getPathString(freq.path.slice(0, -1));
      } else {
        const recent = recentFilesList.find(r => r.name === name);
        if (recent) {
          const fileNode = resolveNode(recent.path);
          node = fileNode;
          locationString = getPathString(recent.path.slice(0, -1));
        }
      }
    } else if (currentNode && currentNode.children) {
      node = currentNode.children[name];
    }

    if (!node) return;

    let details = `Name: ${name}\nType: ${node.type === 'dir' ? 'System Folder' : 'Text File'}\n`;
    if (node.type === 'file') {
      details += `Size: ${node.content ? node.content.length : 0} characters (bytes)\n`;
    } else {
      const childrenCount = node.children ? Object.keys(node.children).length : 0;
      details += `Contains: ${childrenCount} items\n`;
    }
    details += `Location: ${locationString}`;
    alert(`File Properties:\n-------------------------\n${details}`);
  };

  const handleSelectAll = () => {
    let allNames = [];
    if (searchQuery !== '') {
      allNames = searchResults.map(r => r.name);
    } else if (currentPath[0] === 'Quick access') {
      allNames = [...frequentFolders.map(f => f.name), ...recentFilesList.map(r => r.name)];
    } else if (currentNode && currentNode.children) {
      allNames = Object.keys(currentNode.children);
    }

    if (allNames.length === 0) return;

    const areAllSelected = allNames.every(name => selectedItems.includes(name));
    if (areAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allNames);
    }
  };

  const handleSelectNone = () => {
    setSelectedItems([]);
  };

  // Get active directory items filtered by search (if search is not active, returns all children)
  const getFilteredItems = () => {
    if (!currentNode || !currentNode.children) return [];
    return Object.entries(currentNode.children);
  };

  const filteredItems = getFilteredItems();

  // Get recursive search results if search query is entered
  const getSearchResults = (query) => {
    if (!query) return [];
    
    let searchRoots = [];
    if (currentPath.length === 1 && (currentPath[0] === 'Quick access' || currentPath[0] === 'This PC')) {
      if (fs['C:']) searchRoots.push({ node: fs['C:'], basePathArray: ['This PC', 'C:'] });
      if (fs['F:']) searchRoots.push({ node: fs['F:'], basePathArray: ['This PC', 'F:'] });
    } else {
      const node = resolveNode(currentPath);
      if (node) {
        searchRoots.push({ node, basePathArray: currentPath });
      }
    }

    let results = [];
    const searchNode = (node, q, path) => {
      if (!node || !node.children) return;
      Object.entries(node.children).forEach(([name, child]) => {
        const childPath = [...path, name];
        if (name.toLowerCase().includes(q.toLowerCase())) {
          results.push({
            name,
            path: childPath,
            item: child
          });
        }
        if (child.type === 'dir') {
          searchNode(child, q, childPath);
        }
      });
    };

    searchRoots.forEach(({ node, basePathArray }) => {
      searchNode(node, query, basePathArray);
    });

    return results;
  };

  const searchResults = getSearchResults(searchQuery);

  // Address Input Handlers
  const handleAddressBarClick = (e) => {
    if (e.target.classList.contains('fe-address-input-wrapper') || e.target.classList.contains('fe-address-breadcrumbs-empty')) {
      setIsEditingPath(true);
      setTypedPath(getPathString(currentPath));
    }
  };

  const handleAddressInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      const parsedPath = parsePathString(typedPath);
      if (parsedPath) {
        const node = resolveNode(parsedPath);
        if (node) {
          navigateTo(parsedPath);
          setIsEditingPath(false);
        } else {
          alert(`Windows cannot find '${typedPath}'. Check the spelling and try again.`);
        }
      } else {
        alert(`Windows cannot find '${typedPath}'. Check the spelling and try again.`);
      }
    } else if (e.key === 'Escape') {
      setIsEditingPath(false);
    }
  };

  return (
    <div 
      className="file-explorer-container win-border-inset" 
      onClick={() => { 
        setSelectedItems([]); 
        setIsEditingPath(false); 
        setContextMenu({ visible: false, x: 0, y: 0, targetItem: null, type: null });
      }}
    >
      {/* Ribbon Tabs Row */}
      <div className="fe-ribbon-tabs">
        <div 
          className={`fe-ribbon-tab ${activeTab === 'Home' ? 'active' : ''}`}
          onClick={() => setActiveTab('Home')}
        >
          Home
        </div>
        <div 
          className={`fe-ribbon-tab ${activeTab === 'Share' ? 'active' : ''}`}
          onClick={() => setActiveTab('Share')}
        >
          Share
        </div>
        <div 
          className={`fe-ribbon-tab ${activeTab === 'View' ? 'active' : ''}`}
          onClick={() => setActiveTab('View')}
        >
          View
        </div>
      </div>

      {/* Ribbon Body View */}
      <div className="fe-ribbon-body">
        {activeTab === 'Home' && (
          <>
            <div className="fe-ribbon-group">
              <div className="fe-ribbon-btn disabled">
                <span className="fe-ribbon-icon">📌</span>
                <span className="fe-ribbon-label">Pin Access</span>
              </div>
              <div 
                className={`fe-ribbon-btn ${selectedItems.length === 0 ? 'disabled' : ''}`}
                onClick={() => {
                  if (selectedItems.length > 0) alert(`Copied to Clipboard: ${selectedItems.join(', ')}`);
                }}
              >
                <span className="fe-ribbon-icon">📝</span>
                <span className="fe-ribbon-label">Copy</span>
              </div>
              <div className="fe-ribbon-btn disabled">
                <span className="fe-ribbon-icon">📋</span>
                <span className="fe-ribbon-label">Paste</span>
              </div>
            </div>

            <div className="fe-ribbon-group">
              <div 
                className={`fe-ribbon-btn ${selectedItems.length === 0 ? 'disabled' : ''}`}
                onClick={handleDelete}
              >
                <span className="fe-ribbon-icon">❌</span>
                <span className="fe-ribbon-label">Delete</span>
              </div>
              <div 
                className={`fe-ribbon-btn ${selectedItems.length !== 1 ? 'disabled' : ''}`}
                onClick={handleRename}
              >
                <span className="fe-ribbon-icon">✏️</span>
                <span className="fe-ribbon-label">Rename</span>
              </div>
              <div 
                className="fe-ribbon-btn"
                onClick={handleNewFolder}
              >
                <span className="fe-ribbon-icon">📁</span>
                <span className="fe-ribbon-label">New Folder</span>
              </div>
            </div>

            <div className="fe-ribbon-group">
              <div 
                className={`fe-ribbon-btn ${selectedItems.length !== 1 ? 'disabled' : ''}`}
                onClick={handleProperties}
              >
                <span className="fe-ribbon-icon">🔍</span>
                <span className="fe-ribbon-label">Properties</span>
              </div>
            </div>

            <div className="fe-ribbon-group">
              <div className="fe-ribbon-btn" onClick={handleSelectAll}>
                <span className="fe-ribbon-icon">☑️</span>
                <span className="fe-ribbon-label">Select All</span>
              </div>
              <div className="fe-ribbon-btn" onClick={handleSelectNone}>
                <span className="fe-ribbon-icon">🔲</span>
                <span className="fe-ribbon-label">Deselect</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Share' && (
          <div className="fe-ribbon-group">
            <div 
              className={`fe-ribbon-btn ${selectedItems.length === 0 ? 'disabled' : ''}`}
              onClick={() => alert(`Emailing files: ${selectedItems.join(', ')}`)}
            >
              <span className="fe-ribbon-icon">📧</span>
              <span className="fe-ribbon-label">Email</span>
            </div>
            <div 
              className={`fe-ribbon-btn ${selectedItems.length === 0 ? 'disabled' : ''}`}
              onClick={() => alert(`Zipping files into backup archive.`)}
            >
              <span className="fe-ribbon-icon">🤐</span>
              <span className="fe-ribbon-label">Zip</span>
            </div>
          </div>
        )}

        {activeTab === 'View' && (
          <div className="fe-ribbon-group">
            <div className="fe-ribbon-btn" onClick={() => alert('Grid View active')}>
              <span className="fe-ribbon-icon">🖼️</span>
              <span className="fe-ribbon-label">Large Icons</span>
            </div>
            <div className="fe-ribbon-btn" onClick={() => alert('List View active')}>
              <span className="fe-ribbon-icon">📜</span>
              <span className="fe-ribbon-label">List details</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation & Address Bar */}
      <div className="fe-nav-bar" onClick={e => e.stopPropagation()}>
        <button 
          className={`fe-nav-btn ${historyIndex === 0 ? 'disabled' : ''}`}
          onClick={handleBack}
          title="Back"
        >
          ⬅️
        </button>
        <button 
          className={`fe-nav-btn ${historyIndex === history.length - 1 ? 'disabled' : ''}`}
          onClick={handleForward}
          title="Forward"
        >
          ➡️
        </button>
        <button 
          className="fe-nav-btn"
          onClick={handleUp}
          title="Up to Parent"
        >
          📁
        </button>
        <button 
          className="fe-nav-btn"
          onClick={() => navigateTo(currentPath)}
          title="Refresh"
        >
          🔄
        </button>

        {/* Path Breadcrumbs / Address Input */}
        <div 
          className="fe-address-input-wrapper win-border-inset"
          onClick={handleAddressBarClick}
          style={{ cursor: 'text' }}
        >
          <span style={{ fontSize: '11px', color: '#808080', marginRight: '4px' }}>💻</span>
          {isEditingPath ? (
            <input 
              type="text" 
              className="fe-address-input" 
              value={typedPath}
              onChange={(e) => setTypedPath(e.target.value)}
              onKeyDown={handleAddressInputKeyDown}
              onBlur={() => setTimeout(() => setIsEditingPath(false), 200)}
              autoFocus
              onFocus={(e) => e.target.select()}
            />
          ) : (
            <div className="fe-address-breadcrumbs" style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', overflow: 'hidden' }}>
              {currentPath.map((segment, index) => {
                const segmentPath = currentPath.slice(0, index + 1);
                return (
                  <React.Fragment key={index}>
                    {index > 0 && <span style={{ margin: '0 4px', color: '#808080', fontSize: '9px' }}>▶</span>}
                    <span 
                      className="fe-breadcrumb-segment" 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo(segmentPath);
                      }}
                      style={{ cursor: 'pointer', fontSize: '11px' }}
                    >
                      {segment === 'This PC' ? 'This PC' : segment === 'C:' ? 'Local Disk (C:)' : segment === 'F:' ? 'New Volume (F:)' : segment}
                    </span>
                  </React.Fragment>
                );
              })}
              <div className="fe-address-breadcrumbs-empty" style={{ flexGrow: 1, height: '100%', minWidth: '20px' }} />
            </div>
          )}
        </div>

        {/* Search Box */}
        <div className="fe-search-input-wrapper win-border-inset">
          <span style={{ fontSize: '10px', color: '#808080', marginRight: '4px' }}>🔍</span>
          <input 
            type="text" 
            className="fe-search-input" 
            placeholder="Search active folder"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Split pane (Sidebar + Grid Content) */}
      <div className="fe-split-pane" onClick={e => e.stopPropagation()}>
        {/* Sidebar Navigation */}
        <div className="fe-sidebar">
          {/* Quick Access Section */}
          <div className="fe-sidebar-section">
            <div 
              className={`fe-sidebar-item ${currentPath.length === 1 && currentPath[0] === 'Quick access' ? 'active' : ''}`}
              onClick={() => navigateTo(['Quick access'])}
            >
              <span className="fe-sidebar-icon">⭐</span>
              <span>Quick access</span>
            </div>
            
            {/* Quick Access Indented shortcuts */}
            {frequentFolders.slice(0, 6).map(f => (
              <div 
                key={f.name}
                className={`fe-sidebar-item ${currentPath.join('\\') === f.path.join('\\') ? 'active' : ''}`}
                onClick={() => navigateTo(f.path)}
                style={{ paddingLeft: '28px' }}
              >
                <span className="fe-sidebar-icon">
                  {f.name === 'Skills' ? <SkillsIcon size={14} /> : f.name === 'Projects' ? <ProjectsFolderIcon size={14} /> : <FolderIcon size={14} />}
                </span>
                <span>{f.name}</span>
              </div>
            ))}
          </div>

          {/* OneDrive - Personal Section */}
          <div className="fe-sidebar-section">
            <div 
              className={`fe-sidebar-item ${currentPath.join('\\') === 'This PC\\C:\\Users\\Rishi\\OneDrive' ? 'active' : ''}`}
              onClick={() => navigateTo(['This PC', 'C:', 'Users', 'Rishi', 'OneDrive'])}
            >
              <span className="fe-sidebar-icon">☁️</span>
              <span style={{ fontWeight: 'bold' }}>OneDrive - Personal</span>
            </div>

            {/* OneDrive Subfolders (Apps, Attachments, Desktop, Documents, Pictures, Scans, Videos) */}
            {['Apps', 'Attachments', 'Desktop', 'Documents', 'Pictures', 'Scans', 'Videos'].map(sub => {
              const path = ['This PC', 'C:', 'Users', 'Rishi', 'OneDrive', sub];
              return (
                <div 
                  key={sub}
                  className={`fe-sidebar-item ${currentPath.join('\\') === path.join('\\') ? 'active' : ''}`}
                  onClick={() => navigateTo(path)}
                  style={{ paddingLeft: '28px' }}
                >
                  <span className="fe-sidebar-icon">📁</span>
                  <span>{sub}</span>
                </div>
              );
            })}
          </div>

          {/* This PC Section */}
          <div className="fe-sidebar-section">
            <div 
              className={`fe-sidebar-item ${currentPath.join('\\') === 'This PC' ? 'active' : ''}`}
              onClick={() => navigateTo(['This PC'])}
            >
              <span className="fe-sidebar-icon">🖥️</span>
              <span>This PC</span>
            </div>

            {/* C: Drive */}
            <div 
              className={`fe-sidebar-item ${currentPath.join('\\') === 'This PC\\C:' ? 'active' : ''}`}
              onClick={() => navigateTo(['This PC', 'C:'])}
              style={{ paddingLeft: '28px' }}
            >
              <span className="fe-sidebar-icon">💽</span>
              <span>Local Disk (C:)</span>
            </div>

            {/* F: Drive */}
            <div 
              className={`fe-sidebar-item ${currentPath.join('\\') === 'This PC\\F:' ? 'active' : ''}`}
              onClick={() => navigateTo(['This PC', 'F:'])}
              style={{ paddingLeft: '28px' }}
            >
              <span className="fe-sidebar-icon">💾</span>
              <span>New Volume (F:)</span>
            </div>
          </div>

          {/* Network Section */}
          <div className="fe-sidebar-section">
            <div 
              className={`fe-sidebar-item ${currentPath.join('\\') === 'Network' ? 'active' : ''}`}
              onClick={() => navigateTo(['Network'])}
            >
              <span className="fe-sidebar-icon">🌐</span>
              <span>Network</span>
            </div>
          </div>
        </div>

        {/* Main Grid display area */}
        <div className="fe-main-pane" onClick={() => setSelectedItems([])}>
          {searchQuery !== '' ? (
            <div className="fe-search-results-container">
              <div className="fe-search-results-title">
                Search Results in "{getPathString(currentPath)}" for "{searchQuery}"
              </div>
              {searchResults.length === 0 ? (
                <div style={{ padding: '20px', fontSize: '11px', color: '#808080' }}>
                  No items match your search.
                </div>
              ) : (
                <div className="fe-recent-list fe-search-list">
                  <div className="fe-recent-header">
                    <div className="fe-recent-header-col" style={{ flex: 2 }}>Name</div>
                    <div className="fe-recent-header-col" style={{ flex: 3 }}>Location</div>
                    <div className="fe-recent-header-col" style={{ flex: 1.5 }}>Type</div>
                    <div className="fe-recent-header-col" style={{ flex: 1 }}>Size</div>
                  </div>
                  {searchResults.map(result => {
                    const isSelected = selectedItems.includes(result.name);
                    const folderPath = getPathString(result.path.slice(0, -1));
                    const fileType = result.item.type === 'dir' ? 'File folder' : 'Text Document';
                    const fileSize = result.item.type === 'file' ? `${result.item.content ? result.item.content.length : 0} bytes` : '';
                    
                    return (
                      <div 
                        key={result.path.join('\\')}
                        className={`fe-recent-row ${isSelected ? 'selected' : ''}`}
                        onClick={(e) => handleItemClick(result.name, e)}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          if (result.item.type === 'dir') {
                            navigateTo(result.path);
                          } else {
                            openTextFile(result.name, result.item.content);
                            addToRecentFiles(result.name, result.path);
                          }
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedItems([result.name]);
                          setContextMenu({
                            visible: true,
                            x: e.clientX,
                            y: e.clientY,
                            targetItem: { name: result.name, item: result.item, path: result.path },
                            type: 'grid'
                          });
                        }}
                      >
                        <div className="fe-col-name" style={{ flex: 2 }}>
                          <span style={{ fontSize: '14px', marginRight: '4px' }}>
                            {result.item.type === 'dir' ? '📁' : '📄'}
                          </span>
                          <span>{result.name}</span>
                        </div>
                        <div className="fe-col-path" style={{ flex: 3 }}>{folderPath}</div>
                        <div className="fe-col-type" style={{ flex: 1.5 }}>{fileType}</div>
                        <div className="fe-col-size" style={{ flex: 1 }}>{fileSize}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : currentPath.length === 1 && currentPath[0] === 'Quick access' ? (
            <>
              {/* Frequent folders group */}
              <div className="fe-grid-group">
                <div className="fe-grid-title">Frequent folders (8)</div>
                <div className="fe-grid-items">
                  {frequentFolders.map(folder => (
                    <div 
                      key={folder.name}
                      className={`fe-item ${selectedItems.includes(folder.name) ? 'selected' : ''}`}
                      onClick={(e) => handleItemClick(folder.name, e)}
                      onDoubleClick={() => navigateTo(folder.path)}
                    >
                      <div className="fe-item-icon">
                        {folder.name === 'Skills' ? <SkillsIcon size={32} /> : folder.name === 'Projects' ? <ProjectsFolderIcon size={32} /> : folder.name.includes('OneDrive') ? <span style={{ fontSize: '26px' }}>☁️</span> : folder.name.includes('Disk') || folder.name.includes('Volume') ? <ComputerIcon size={32} /> : <FolderIcon size={32} />}
                      </div>
                      <div className="fe-item-name">{folder.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent files list group */}
              <div className="fe-grid-group">
                <div className="fe-grid-title">Recent files ({recentFilesList.length})</div>
                <div className="fe-recent-list">
                  <div className="fe-recent-header">
                    <div className="fe-recent-header-col" style={{ flex: 2 }}>Name</div>
                    <div className="fe-recent-header-col" style={{ flex: 3 }}>Location</div>
                  </div>
                  {recentFilesList.map(file => (
                    <div 
                      key={file.name}
                      className={`fe-recent-row ${selectedItems.includes(file.name) ? 'selected' : ''}`}
                      onClick={(e) => handleItemClick(file.name, e)}
                      onDoubleClick={(e) => {
                        e.stopPropagation();
                        const fileNode = resolveNode(file.path);
                        if (fileNode) {
                          openTextFile(file.name, fileNode.content);
                          addToRecentFiles(file.name, file.path);
                        }
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedItems([file.name]);
                        setContextMenu({
                          visible: true,
                          x: e.clientX,
                          y: e.clientY,
                          targetItem: file,
                          type: 'recent'
                        });
                      }}
                    >
                      <div className="fe-col-name">
                        <span style={{ fontSize: '12px' }}>📄</span>
                        <span>{file.name}</span>
                      </div>
                      <div className="fe-col-path">{file.relativeLoc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Standard folder browser rendering */
            <div className="fe-grid-items">
              {currentNode && currentNode.children && Object.keys(currentNode.children).length > 0 ? (
                filteredItems.map(([name, item]) => (
                  <div 
                    key={name}
                    className={`fe-item ${selectedItems.includes(name) ? 'selected' : ''}`}
                    onClick={(e) => handleItemClick(name, e)}
                    onDoubleClick={(e) => handleItemDoubleClick(name, item, e)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedItems([name]);
                      setContextMenu({
                        visible: true,
                        x: e.clientX,
                        y: e.clientY,
                        targetItem: { name, item },
                        type: 'grid'
                      });
                    }}
                  >
                    <div className="fe-item-icon">
                      {getIcon(name, item)}
                    </div>
                    <div className="fe-item-name">{name}</div>
                  </div>
                ))
              ) : (
                <div style={{ padding: '20px', fontSize: '11px', color: '#808080' }}>
                  This folder is empty.
                </div>
              )}
            </div>
          )}


        </div>
      </div>

      {/* Status Bar */}
      <div className="fe-status-bar" onClick={e => e.stopPropagation()}>
        <div className="fe-status-left">
          <span>
            {searchQuery !== ''
              ? `${searchResults.length} search result(s) found`
              : currentPath[0] === 'Quick access' 
                ? `${frequentFolders.length + recentFilesList.length} items` 
                : `${filteredItems.length} items`}
          </span>
          {selectedItems.length > 0 && (
            <span style={{ color: '#005a9c', fontWeight: 'bold' }}>
              {selectedItems.length} item(s) selected
            </span>
          )}
        </div>
        <div>
          <span>☁️ OneDrive Synced</span>
        </div>
      </div>
      {/* File Explorer Custom Context Menu */}
      {contextMenu.visible && (
        <div 
          className="win-border-outset fe-context-menu"
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 10000,
            backgroundColor: '#d4d0c8',
            padding: '2px',
            width: '180px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'recent' ? (
            <>
              <div 
                className="context-menu-item"
                onClick={() => {
                  setRecentFilesList(prev => prev.filter(r => r.name !== contextMenu.targetItem.name));
                  setSelectedItems([]);
                  setContextMenu({ visible: false, x: 0, y: 0, targetItem: null, type: null });
                }}
              >
                <span>Remove from recent files</span>
              </div>
              <div className="context-menu-divider" style={{ height: '1px', backgroundColor: '#808080', margin: '4px 2px' }} />
              <div 
                className="context-menu-item"
                onClick={() => {
                  setContextMenu({ visible: false, x: 0, y: 0, targetItem: null, type: null });
                  handleProperties();
                }}
              >
                <span>Properties</span>
              </div>
            </>
          ) : (
            <>
              <div 
                className="context-menu-item"
                onClick={() => {
                  setContextMenu({ visible: false, x: 0, y: 0, targetItem: null, type: null });
                  handleRename();
                }}
              >
                <span>Rename</span>
              </div>
              <div 
                className="context-menu-item"
                onClick={() => {
                  setContextMenu({ visible: false, x: 0, y: 0, targetItem: null, type: null });
                  handleDelete();
                }}
              >
                <span>Delete</span>
              </div>
              <div className="context-menu-divider" style={{ height: '1px', backgroundColor: '#808080', margin: '4px 2px' }} />
              <div 
                className="context-menu-item"
                onClick={() => {
                  setContextMenu({ visible: false, x: 0, y: 0, targetItem: null, type: null });
                  handleProperties();
                }}
              >
                <span>Properties</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
