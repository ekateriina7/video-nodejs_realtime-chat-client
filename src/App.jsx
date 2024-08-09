import { useEffect, useState } from 'react';
import './App.css';
import { MessageForm } from './MessageForm.jsx';
import { MessageList } from './MessageList.jsx';

const DataLoader = ({ onData }) => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3005/messages');

    socket.addEventListener('message', (event) => {
      const text = JSON.parse(event.data);
      onData(text);
    });

    return () => {
      socket.close();
    };
  }, []);

  return <h1 className='title'>Chat application</h1>;
};

export default DataLoader;

export function App() {
  const [messages, setMessages] = useState([]);

  function saveData(data) {
    setMessages((prevMessages) => [data, ...prevMessages]);
  }

  return (
    <section className='section content'>
      <DataLoader onData={saveData} />
      <MessageForm />
      <MessageList messages={messages} />
    </section>
  );
}
