import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from './store/users-context';

//class Component

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: ''
    }
  }


  componentDidMount() {
    // Once the component is mounted, use context to set filteredUsers
    const filteredUsers = this.context.users;
    this.setState({ filteredUsers });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      const filteredUsers = this.context ? this.context.users.filter((user) => user.name.includes(this.state.searchTerm)) : [];
      if (filteredUsers !== this.state.filteredUsers) {
        this.setState({
          filteredUsers: filteredUsers
        });
      }
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}


// functional component
// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

// return (
//   <Fragment>
//     <div className={classes.finder}>
//       <input type='search' onChange={searchChangeHandler} />
//     </div>
//     <Users users={filteredUsers} />
//   </Fragment>
// );
// };

export default UserFinder;