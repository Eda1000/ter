import { useEffect, useState } from "react";

interface IScannerProps {
  onDetected: (code: string) => void;
}

const Scanner = ({ onDetected }: IScannerProps) => {
  const [barcode, setBarcode] = useState<string>();

  const onKeyDown = (event: any) => {
    let interval;

    if(interval){
      clearInterval(interval);
    }

    if(event.code === 'Enter'){
      if(barcode){
        onDetected(barcode);
      }

      setBarcode('');
      return
    }

    if(event.code !== 'Shift'){
      setBarcode(prevState => (prevState + event.key));
    }

    interval = setInterval(() => setBarcode(''), 20);
  }

  useEffect(() => {
    const unsubscribe = document.addEventListener('keydown', onKeyDown);

    return () => unsubscribe;
  }, []);

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
