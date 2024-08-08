import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { MessageForm } from './MessageForm.jsx';
import { MessageList } from './MessageList.jsx';

const DataLoader = ({ onData }) => {
  const loadData = async () => {

      const response = await axios.get('http://localhost:3005/messages');
      onData(response.data);
      loadData()
  };

  
  useEffect(() => {
    const evtSource = new EventSource("http://localhost:3005/messages");

evtSource.onmessage = (e) => {
  onData(JSON.parse(e.data))
};
  }, []);

  return (
    <h1 className="title">
      Chat application
    </h1>
  );
};

export function App() {
  const [messages, setMessages] = useState([]);

  function saveData(data) {
    setMessages(messages=>[data, ...messages]);
  }

  return (
    <section className="section content">
      <DataLoader onData={saveData} />
      <MessageForm />
      <MessageList messages={messages} />
    </section>
  );
}