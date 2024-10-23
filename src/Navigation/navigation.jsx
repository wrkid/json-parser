import { Link, useLocation } from "react-router-dom"

import './navigation.css'

export const Navigation = () => {
  const { pathname } = useLocation()


  return (
    <div className="navigation">
      <div className={pathname === '/parser' ? 'nav-item nav-item-active' : 'nav-item'}><Link to={'/parser'}>Parser</Link></div>
      <div className={pathname === '/editor' ? 'nav-item nav-item-active' : 'nav-item'}><Link to={'/editor'}>Editor</Link></div>
    </div>
  )
}