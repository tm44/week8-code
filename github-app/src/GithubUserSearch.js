import React, { Component } from 'react';
import FollowersList from './FollowersList';

class GithubUserSearch extends Component {
    state = {
        isLoading: false,
        githubUser: null,
        error: ''
    }

    searchForUser = (userName) => {
        this.setState({
            isLoading: true,
            githubUser: null,
            error: ''
        });

        fetch(`https://api.github.com/users/${userName}`)
            .then(response => {
                if (response.status === 404) {
                    throw Error('User not found');
                }

                if (response.status !== 200) {
                    throw Error('An error occurred');
                }
                
                return response.json();
            })
            .then(data => {
                this.setState({
                    isLoading: false,
                    githubUser: data
                });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.message
                });
            });
    }

    onSearch = (event) => {
        event.preventDefault();
        const searchValue = event.target[0].value;
        this.searchForUser(searchValue);
    }

    render() {
        const {isLoading, error, githubUser} = this.state;
        let content;

        if (githubUser) {
            content = (
                <div>
                    <h2>{githubUser.name}</h2>
                    <img
                        style={{ width: '100px' }}
                        src={githubUser.avatar_url}
                        alt={`${githubUser.name}'s avatar`}
                    />
                    <FollowersList followersUrl={githubUser.followers_url} />
                </div>
            );
        }

        return (
            <div>
                <h1>Github User</h1>
                <form onSubmit={this.onSearch}>
                    <input type="text" />
                    <button type="submit">Search</button>
                </form>

                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {content}
            </div>
        );
    }
}

export default GithubUserSearch;