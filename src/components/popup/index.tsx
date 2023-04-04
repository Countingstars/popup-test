import { FC, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: FC<PopupProps> = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        padding: 16,
        background: '#f44336',
        color: 'white',
        borderRadius: 4,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.3s ease-out',
        transform: `translateY(${isOpen ? 0 : -100}%)`,
        zIndex: 9999,
        cursor: 'pointer',
      }}
      onClick={() => {
        setIsOpen(false);
        onClose();
      }}
    >
      {message}
    </div>
  );
};

const PopupContainer = () => {
  const [popups, setPopups] = useState<string[]>([]);

  const addPopup = (text: string) => {
    setPopups((prev) => [...prev, text]);
  };

  const removePopup = (text: string) => {
    setPopups((prev) => prev.filter((item) => item !== text));
  };

  return (
    <div style={{ position: 'fixed', top: 0, right: 0 }}>
      {popups.map((text) => (
        <Popup key={text} message={text} onClose={() => removePopup(text)} />
      ))}
    </div>
  );
};

const debounce = (func: any, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

export const popup = (text: string) => {
  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClickCount(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleClick = (text: string) => {
    setClickCount((prev) => prev + 1);
    if (clickCount === 0) {
      const container = document.createElement('div');
      document.body.appendChild(container);
      ReactDOM.render(<PopupContainer />, container);
    }
    addPopup(text);
  };

  const addPopup = (text: string) => {
    handleClickDebounced(text);
  };

  const handleClickDebounced = debounce(handleClick, 500);

  return { addPopup }
}

