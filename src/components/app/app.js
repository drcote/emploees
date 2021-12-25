import { Component } from 'react';
import AppInfo from '../app-info';
import AppFilter from '../app-filter';
import SearchPanel from '../search-panel';
import EmployeesList from '../employees-list';
import EmployeesAddForm from '../employees-add-form';
import './app.css';

// increase - премия
// rise - повышение

class App extends Component {

  state = {
    data: [
      { name: 'John C.', salary: '300', increase: true, rise: false, id: 1 },
      { name: 'Alex M.', salary: '1300', increase: false, rise: true, id: 2 },
      { name: 'Den X.', salary: '850', increase: false, rise: false, id: 3 },
      { name: 'Eden M.', salary: '2200', increase: true, rise: false, id: 4 },
    ],
    term: '',
    filter: 'all'
  }

  maxId = 5;

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter(elem => elem.id !== id)
      }
    })
  }

  insertItem = (name, salary) => {
    if (name.length > 3 && salary !== '') {
      const newItem = {
        name,
        salary,
        increase: false,
        rise: false,
        id: this.maxId++
      }

      this.setState(({ data }) => ({
        data: [...data, newItem]
      }))
    }
  }

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item;
      })
    }))
  }

  filteringEpm = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'more1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.name.indexOf(term) > -1
    })
  }

  onFilterSelect = (filter) => {
    this.setState({ filter });
  }

  onUpdateSearch = (term) => {
    this.setState({ term });
  }

  render() {
    const { data, term, filter } = this.state;
    let visibleData = this.filteringEpm(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo
          totalEmployees={data.length}
          increaseEmployees={data.filter(item => item.increase).length} />
        <div className="search-panel">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch} />
          <AppFilter
            active={filter}
            onFilterSelect={this.onFilterSelect} />
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp} />
        <EmployeesAddForm
          onInsert={this.insertItem} />
      </div>
    )
  }

}

export default App;