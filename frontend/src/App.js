import globalStyles from './styles/globalStyles';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  witdh: 100%;
  max-witdh: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;



function app (){
  return (
    <>
    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM.LEFT} />
      <globalStyles />
    </>
  );
};

export default app;