import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address}) => {
  return (
    <NavLink to={address} end>
      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  )
}

export default MenuItem
