import { useState } from 'react';

function App() {
  const[ definitions, setDefinitions ] = useState([]);

  function handleSubmit(event: any) {

    event.preventDefault();
    const word = event.target.elements.word.value;

    fetch(`${import.meta.env.VITE_CANISTER_URL}/dict/${word}`, {method: "POST"})
      .then(
        response => {
          return response.json()
        }
      )
      .then((json) => {
        setDefinitions(json.definitions)
      });
  }

  const renderItem = (item: string) => {
    return (
      <>
        <div>{item}</div>
        <br/>
      </>
    );
  }

  return (
    <main>
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="word">Search your Word: &nbsp;</label>
        <input id="word" alt="word" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{definitions.map(renderItem)}</section>
    </main >
  );
}

export default App;
