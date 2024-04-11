import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home Page</h2>
  </div>
);

const Notes = () => (
  <div>
    <h2>Notes Page</h2>
  </div>
);

const Users = () => (
  <div>
    <h2>Users Page</h2>
  </div>
);

const App = () => {
  const padding = { padding: 5 };

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>
          Home
        </Link>
        <Link style={padding} to='/notes'>
          Notes
        </Link>
        <Link style={padding} to='/users'>
          Users
        </Link>
      </div>

      <Routes>
        <Route path='/notes' element={<Notes />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  );
};

export default App;
