import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import http from './services/httpService';
import config from './config.json';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount(){
    const { data: posts} = await http.get(config.apiEndpoint);
    this.setState({posts});
  }

  handleAdd = async () => {
    const { data: post } = await http.post(config.apiEndpoint, {title: "houbet", body: "league of legends"});
    const posts = [post, ...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = async (post) => {
    post.title = "updated";
    const originalPosts = this.state.posts;
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = {...post};
    this.setState({posts});
    try {
      await http.put(config.apiEndpoint+'/'+post.id, post);
    } catch (error) {
      this.setState({posts: originalPosts});
    }
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p=> p !== post);
    this.setState({posts});
    try {
      await http.delete('s'+config.apiEndpoint+'/'+post.id);
    } catch (error) {
      if(error.response && error.response.status === '404')
        alert("This post has been already deleted.");
      this.setState({posts: originalPosts});
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;