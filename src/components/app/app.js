import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {label: 'You can filter posts by all or liked', important: false, liked:false, id: 'qwer'}, 
        {label: 'Tap on this text to mark this post as liked', important: false, liked:false, id: 'asdf'}, 
        {label: 'Use a form below, to add a new post', important: false, liked:false, id: 'zxcv'}
      ],
      term: '',
      filter: 'all'
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onToggleImportant = this.onToggleImportant.bind(this);
    this.onToggleLiked = this.onToggleLiked.bind(this);
    this.onUpdateSearch = this.onUpdateSearch.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
    this.minId = 4;
  }
  deleteItem(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const before = data.slice(0, index);
      const after = data.slice(index + 1);
      const newArr = [...before, ...after];
      return {
        data: newArr
      }
    });
  }
  addItem(body) {
    const newItem = {
      label: body, 
      important: false, 
      id: this.minId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    });
  }
  onToggleImportant(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = {...old, important: !old.important};
      const before = data.slice(0, index);
      const after = data.slice(index + 1);
      const newArr = [...before, newItem, ...after];
      return {
        data: newArr
      }
    });
  }
  onToggleLiked(id) {
    this.setState(({data}) => {
      const index = data.findIndex(elem => elem.id === id);
      const old = data[index];
      const newItem = {...old, liked: !old.liked};
      const before = data.slice(0, index);
      const after = data.slice(index + 1);
      const newArr = [...before, newItem, ...after];
      return {
        data: newArr
      }
    });
  }
  searchPost(items, term) {
    if (term.length === 0) {
      return items
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    });
  }
  filterPost(items, filter) {
    if (filter === 'liked') {
      return items.filter((item) => item.liked)
    } else {
      return items
    }
  }
  onUpdateSearch(term) {
    this.setState({term})
  }
  onFilterSelect(filter) {
    this.setState({filter})
  }
  render() {
    const {data, term, filter} = this.state;
    const allPosts = data.length;
    const likedPosts = data.filter(item => item.liked).length;
    const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
    return (
      <div className="app">
        <AppHeader
          allPosts={allPosts}
          likedPosts={likedPosts}/>
        <div className= "search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch}/>
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}/>
        </div>
        <PostList 
          posts={visiblePosts}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}/>
        <PostAddForm
          onAdd={this.addItem}/>
      </div>
    )
  }
}
