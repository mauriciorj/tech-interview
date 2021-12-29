import { Routes, Route } from 'react-router-dom';
import Main from './container/main';
import Questions from './container/questions';
import ControlledEditor from './container/richTextEditor';

const RoutesManager = () => (
  <Routes>
    <Route path='/' element={<Main />} />
    <Route path='/questions/:id' element={<Questions />} />
    <Route path='/richText' element={<ControlledEditor />} />
  </Routes>
);

export default RoutesManager;
