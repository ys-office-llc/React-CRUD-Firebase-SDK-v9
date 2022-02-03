import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs} from 'firebase/firestore';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, 'users');
    getDocs(usersCollectionRef).then((querySnapshot) => {
      console.log(querySnapshot);
    });
  }, []);

  return <div></div>;
}

export default App;
