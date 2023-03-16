import { useState } from 'react';
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  // state = {
  //   query: '',
  // };
  const handleInput = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast('Please enter a value to search!');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  // render() {
  //   // const { handleInput, handleSubmit } = this;
  //   const { query } = this.state;
  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles.SearchButton}>
          <BiSearch style={{ width: 25, height: 25 }} />
          <span className={styles.SearchFormButtonLabel}></span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          name="query"
          value={query}
          onChange={handleInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
