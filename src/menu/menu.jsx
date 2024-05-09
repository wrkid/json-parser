import './menu.css'

export const ContextMenu = ({shown, type, menuHandler, saveHandler}) => {

  return (
    <div className={`${shown ? 'bg' : 'bg-hide'}`} onClick={() => menuHandler(false)}>
      {type === 'set' && <div className='menu-conatiner'>
        <h3 className='menu-title'>Save json</h3>
        <input className='input-name' placeholder='Type name'/>
      </div>}
      {type === 'choose' && <div className='menu-conatiner'>
        <h3 className='menu-title'>Choose saved</h3>
      </div>}
    </div>
  )
}