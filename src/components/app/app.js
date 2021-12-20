import { Component } from 'react';
import AppInfo from '../app-info';
import AppFilter from '../app-filter';
import SearchPanel from '../search-panel';
import EmployeesList from '../employees-list';
import EmployeesAddForm from '../employees-add-form';
import './app.css';

class App extends Component {

  state = {
    data: [
      { name: 'John C.', salary: '300', increase: true, rise: false, id: 1 },
      { name: 'Alex M.', salary: '1300', increase: false, rise: false, id: 2 },
      { name: 'Den X.', salary: '850', increase: false, rise: false, id: 3 },
      { name: 'Eden M.', salary: '2200', increase: true, rise: false, id: 4 },
    ],
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

  render() {
    const data = this.state.data;
    return (
      <div className="app">
        <AppInfo
          totalEmployees={data.length}
          increaseEmployees={data.filter(item => item.increase).length} />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp} />
        <EmployeesAddForm
          onInsert={this.insertItem} />
      </div>
    )
  }

}

export default App;