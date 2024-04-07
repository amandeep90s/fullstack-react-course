import Button from './Button';
import Display from './Display';

const App = () => {
  return (
    <>
      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
        <Button type='ZERO' label='0' />
      </div>
    </>
  );
};

export default App;
