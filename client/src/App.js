import './App.css';

import { PostCreate, PostList } from './components';

function App() {
  return (
    <div className="App">
      <PostCreate />

      <hr />

      <PostList />
    </div>
  );
}

export default App;
