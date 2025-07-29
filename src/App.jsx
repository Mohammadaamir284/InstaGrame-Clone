
import Routess from './routes/Routess';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <div>
         <Toaster position="top-center" reverseOrder={false} />
       <Routess/>
      </div>
    </>
  )
}

export default App
