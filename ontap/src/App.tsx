import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './layout/components/Header';
import Footer from './layout/components/Footer';
import PostForm from './layout/Post/PostForm';
import PostList from './layout/Post/PostList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path={'post'}>
          <Route index element={<PostList />} />
          {/* <Route path={':id'} element={<PostDetail />} /> */}
          <Route path={'create'} element={<PostForm />} />
          <Route path={'edit/:id'} element={<PostForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
