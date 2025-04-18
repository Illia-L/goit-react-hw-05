import { Link } from 'react-router-dom'
import css from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <p className={css.title}>
      Page not found.
      <Link to='/' className={css.link}>Go to Home</Link>
    </p>
  )
}

export default NotFoundPage

