import { Link, useLocation, useNavigate } from "react-router-dom"

import './navigation.css'

export const Navigation = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleNavigate = (path = '') => {
    navigate(path)
  }

  return (
    <div className="navigation">
      <div 
        className={pathname === '/parser' ? 'nav-item nav-item-active' : 'nav-item'}
        onClick={() => handleNavigate('/parser')}
      >Parser</div>
      <div 
        className={pathname === '/editor' ? 'nav-item nav-item-active' : 'nav-item'}
        onClick={() => handleNavigate('/editor')}
      >Editor</div>
    </div>
  )
}