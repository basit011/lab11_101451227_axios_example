import React, { Component } from 'react';
import axios from 'axios';

class UserList extends Component {
    state = {
        users: [],
        loading: true
    };

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                console.log(res.data);
                const users = res.data.results;
                this.setState({ 
                    users,
                    loading: false 
                });
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                this.setState({ loading: false });
            });
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div className="user-list-container">
                <h1>User List</h1>
                {loading ? (
                    <p>Loading...</p> 
                ) : (
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>
                                <h2>{user.name.first} {user.name.last}</h2>
                                <p><strong>Username:</strong> {user.login.username}</p>
                                <p><strong>Gender:</strong> {user.gender}</p>
                                <p><strong>Time Zone Description:</strong> {user.location?.timezone?.description || 'Not available'}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Birth Date and Age:</strong> {user.dob.date} ({user.dob.age})</p>
                                <p><strong>Register Date:</strong> {user.registered.date}</p>
                                <p><strong>Phone#:</strong> {user.phone}</p>
                                <p><strong>Cell#:</strong> {user.cell}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default UserList;
