import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import './Posts.css';

class Posts extends Component {
  constructor(props){
    super(props);
    this.state={
      posts:[]
    }
  }

  componentDidMount () {
      axios.get( '/posts' )
          .then( response => {
              const posts = response.data.slice(0, 4);
              const updatedPosts = posts.map(post => {
                  return {
                      ...post,
                      author: 'Max'
                  }
              });
              this.setState({posts: updatedPosts});
              // console.log( response );
          } )
          .catch(error => {
              // console.log(error);
              // this.setState({error: true});
          });
  }

  postSelectedHandler = (id) => {
      this.setState({selectedPostId: id});
  }

  render(){
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
    if (!this.state.error) {
        posts = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />;
        });
    }

    return(
      <div>
        <section className="Posts">
          {posts}
        </section>
      </div>
    );
  }
}

export default Posts;
