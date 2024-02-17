
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import auth from './firebase/firebase.config';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserFail, setUserSuccess} from './features/auth.slice';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {

       

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUserSuccess(user.email)) ;

      }else{
        dispatch(setUserFail())
      }
    });

  }, [])


  return (
    <div>
      <RouterProvider router={router} />

    </div>

  );
}

export default App;
