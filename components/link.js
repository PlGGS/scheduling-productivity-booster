import { useRouter } from 'next/router';

function Link({ children, href, underline }) {
  const router = useRouter();
  const style = {
      marginRight: 10,
      'textDecoration': underline ? router.pathname === href ? 'underline' : 'none' : 'none', //underline current page
      'fontSize': '24px',
      color: '#333'
  }

  const handleClick = (e) => {
      e.preventDefault()
      if (href !== null)
          router.push(href)
  }

  return (
      <a href={href} onClick={handleClick} style={style}>
          {children}
      </a>
  )
}

export default Link;