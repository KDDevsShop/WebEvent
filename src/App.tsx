import { Button } from './components/ui/button';
import { Loader2Icon } from 'lucide-react';

function App() {
  return (
    <>
      <div>
        <Button className='bg-red-500 hover:bg-red-600'>
          <Loader2Icon className='animate-spin' />
          Hello
        </Button>
      </div>
    </>
  );
}

export default App;
