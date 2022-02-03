import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection } from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    console.log(usersCollectionRef);
  }, []);

  return <div></div>;
}

export default App;
