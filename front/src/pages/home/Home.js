import './Home.css'
import Header from '../header/Header';

import AllPosts from '../../components/AllPosts';

export default function Home() {
  return (
    <div className='bg-light '>
      <Header/>
      <AllPosts/>
    </div>
  )
}
