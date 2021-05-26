import React, { Component } from 'react';

class GithubUserFirstIteration extends Component {
    state = {
        isLoading: true,
        githubUser: null,
        error: false
    }

    componentDidMount() {
        fetch('https://api.github.com/users/bhague1281')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    githubUser: data
                });
            })
            .catch(() => {
                this.setState({
                    isLoading: false,
                    error: true
                });
            });
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
                </div>
            );
        }

        return (
            <div>
                <h1>Github User</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error. Please refresh and try again</p>}
                {content}
            </div>
        );
    }
}

export default GithubUserFirstIteration;