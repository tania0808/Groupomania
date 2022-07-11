import Header from '../../components/header/Header';
import AllPosts from '../../components/AllPosts';
import LocalContextProvider from '../../Context/LocalContext';

export default function Home() {
  return (
    <LocalContextProvider >
      <div className='bg-light '>
        <Header/>
        <AllPosts/>
      </div>
    </LocalContextProvider>
  )
}
