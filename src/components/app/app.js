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
      { name: 'John C.', salary: '300', increase: true, id: 1 },
      { name: 'Alex M.', salary: '1300', increase: false, id: 2 },
      { name: 'Den X.', salary: '850', increase: false, id: 3 },
      { name: 'Eden M.', salary: '2200', increase: true, id: 4 },
    ]
  }

  deleteItem = (id) => {
    this.setState(({data}) => {
      return {
        data: data.filter(elem => elem.id !== id)
      }
    })
  }

 render() {
  return (
    <div className="app">
      <AppInfo />
      <div className="search-panel">
        <SearchPanel />
        <AppFilter />
      </div>
      <EmployeesList
        data={this.state.data}
        onDelete={id => this.deleteItem(id)} />
      <EmployeesAddForm />
    </div>
  )
 }

}

export default App;