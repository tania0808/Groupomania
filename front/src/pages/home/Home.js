import Header from '../../components/header/Header';
import AllPosts from '../../components/post/AllPosts';
import LocalContextProvider from '../../context/LocalContext';

/**
 * Home page
 * @returns HTML of home page
 */
export default function Home() {
  return (
    <LocalContextProvider >
      <div className='bg-light h-100'>
        <Header/>
        <AllPosts/>
      </div>
    </LocalContextProvider>
  )
}
