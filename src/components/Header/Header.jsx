import React,{useState,useRef} from 'react'
import {Logo,Container,Logoutbtn} from'../Index'
import {Link,useNavigate}from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { Container } from 'postcss'
function Header() {
  const collapseMenuRef = useRef(null);
  const authStatus=useSelector((state)=>state.auth.status)
  const navigate=useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  var toggleOpen = document.getElementById('toggleOpen');
  var toggleClose = document.getElementById('toggleClose');
  var collapseMenu = document.getElementById('collapseMenu');

  function handleClick() {
    // if (collapseMenu.style.display === 'block') {
      // collapseMenu.style.display = 'none';
    // } else {
      // collapseMenu.style.display = 'block';
    // }
    if (collapseMenuRef.current) {
      collapseMenuRef.current.style.display = collapseMenuRef.current.style.display === 'block' ? 'none' : 'block';
    }
  }

  // toggleOpen.addEventListener('click', handleClick);
  // toggleClose.addEventListener('click', handleClick);
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const navitems=[
    {
      name:"Home",
      slug:"/",
      active:true
    },{  name: "Login",
      slug: "/login",
      active: !authStatus,},
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ]
 
  return (
    <header class='flex shadow-sm border-2 py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[80px] tracking-wide relative z-50'>
  <div class='flex flex-wrap items-center gap-5 w-full'>
    <a href='/'><img src="https://cdn-icons-png.flaticon.com/512/5539/5539745.png" alt="logo"
        class='h-14   max-lg:mr-5' />
    </a>

    <div id="collapseMenu" ref={collapseMenuRef}
      class=' display:none rounded-xl max-lg:hidden lg:!flex lg:ml-auto max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50 lg:justify-end lg:items-center lg:space-x-4 lg:p-4 lg:bg-white  lg:rounded-md lg:absolute lg:right-0 lg:top-full lg:mt-2 lg:w-48 lg:z-50'>
      <button id="toggleClose" class='lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3' onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 fill-black" viewBox="0 0 320.591 320.591">
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"></path>
        </svg>
      </button>

      <ul
        class=' rounded-md   lg:flex gap-4 max-lg:space-y-3 max-lg:fixed max-lg:bg-slate-100 max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:right-0 max-lg:p-6 max-lg:h-full  max-lg:overflow-auto z-50'>
         {navitems.map((item)=>
    item.active && (item.slug!='/signup' || item.slug!='/login')?(<li key={item.name}  class="text-md hover:bg-gray-300 text-gray-900 block px-4 py-2 rounded-md">
      <button onClick={()=>{navigate(item.slug)}}
        className='inline-bock px-6 py-2 duration-200  hover: rounded'>{item.name}</button>
    </li>):null
  )}
  {authStatus&& (<li className=''>
    <Logoutbtn/>
  </li>)}
      </ul>
    </div>

    <div class='flex items-center max-lg:ml-auto space-x-6'>
     
        {navitems.map((item )=>
    item.active && (item.slug=='/signup' || item.slug=='/login')?(<li key={item.name}  class="text-md text-gray-900 block px-4 py-2 rounded-md">
      <button onClick={()=>{navigate(item.slug)}}
        className='px-4 py-2 text-[15px] rounded font-semibold text-[#007bff] border-2 border-[#007bff] hover:bg-[#007bff] transition-all ease-in-out duration-300 bg-transparent hover:text-white'>{item.name}</button>
    </li>):null
  )}

      <button id="toggleOpen" class='lg:hidden' onClick={handleClick}>
        <svg class="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
    </div>
  </div>
</header>
  )
}

export default Header
