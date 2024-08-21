import { useState } from 'react';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event: any) {
    event.preventDefault();
    const national_id = event.target.elements.nid.value;
    fetch(`${import.meta.env.VITE_CANISTER_URL}/test/results/${national_id}`)
      .then(response => response.json()).then((json) => {
        setGreeting(json.pcr_test_result)
      });
  }

  return (
    <main>
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="nid">Enter your National ID: &nbsp;</label>
        <input id="nid" alt="nid" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main >
  );
}

export default App;
