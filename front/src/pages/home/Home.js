import './Home.css'
import Header from '../header/Header';

import AllPosts from '../../components/AllPosts';

export default function Home() {
  return (
    <div>
      <Header/>
      <AllPosts/>
    </div>
  )
}
