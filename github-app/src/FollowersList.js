import React, { Component } from 'react'

import './FollowersList.css';

export default class FollowersList extends Component {
    state = {
        isLoading: true,
        followers: [],
        error: ''
    }

    componentDidMount() {
        const {followersUrl} = this.props;

        fetch(`${followersUrl}?per_page=100`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    followers: data,
                    isLoading: false
                })
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    error: error.message
                })
            });
    }

    render() {
        const {isLoading, error, followers} = this.state;
        
        return (
            <div className="followers-list">
                <h2>Followers</h2>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                {followers.map((follower, idx) => {
                    return (
                        <div className="follower" key={idx}>
                            <h3>{follower.login}</h3>
                            <img
                                src={follower.avatar_url}
                                alt={`${follower.login}'s avatar`}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }
}
