import { useEffect, useState } from 'react';
import css from './Search.module.css';

function Search({ paramSearch, setSearchParams }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(paramSearch);
  }, [paramSearch]);

  function handleSubmit(e) {
    e.preventDefault()

    if (!search) return;

    setSearchParams({ search });
  }

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
    >
      <input
        className={css.input}
        type='text'
        name='search'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <button
        className={css.button}
        type='submit'
      >
        Search
      </button>
    </form>
  );
}

export default Search;
