// logs all adjectives in adjectives.js
// console.log(adjectives);

//returns a random word from the array of adjectives
let randomAdjective = (array) => {
    let rng = Math.floor(Math.random() * array.length);
    let randomAdjective = array[rng];
    return randomAdjective
}

let randomPokemon = () => {
    let rng = Math.floor(Math.random() * 150 + 1);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${rng}`).then((response) => {
        pokemon = response.data.name;
        return pokemon
    })
}

let pokemon = randomPokemon();


//successfully logs a random adjective each time function is invoked
// console.log(randomAdjective(adjectives)
// );

class App extends React.Component {
    state= {
        file: null,
        username: "",
        body: "",
        posts: [],
        votes: 0,
        preview: false,
        comment: ""
    }

    rngUsername = () => {
        randomPokemon();
        this.setState({
            username: `${randomAdjective(adjectives)} ${pokemon}`
        })
    }
    posts
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleComment = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    previewFile = () => {
        const preview = document.querySelector('#preview');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
          // convert image file to base64 string
          preview.src = reader.result;
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
    }

    handleFile = (event) => {
        this.setState({
            file: event.target.files[0],
            preview: true
        })
        console.log(event.target.files[0])
        this.previewFile()
    }

    showPreview = () => {
        document.querySelector('#preview').style.display = 'block'
    }

    cancelImage = (event) => {
        event.preventDefault();
        document.getElementById('imgsrc').value = ''
        document.getElementById('preview').src = ''
        document.querySelector('#preview').style.display = 'none'
        this.setState({
            preview: false
        })
    }

    hideButtons = (event) => {
        event.currentTarget.style.display = 'none'
    }

    getVotes = (event) => {
        let id = event.target.id
        axios
            .get(`/posts/${id}`)
            .then((response) => {
                console.log(response.data.votes)
                this.setState({
                    votes: response.data.votes
                })
            })
    }
    upvote = (event) => {
        let id = event.target.id
        axios
            .put(`/posts/${id}`, {votes: this.state.votes + 1})
            .then((response) => {
                console.log(response)
                this.setState({
                    posts: response.data.reverse()
                })
            })
    }

    downvote = (event) => {
        let id = event.target.id
        let votes = event.target.value
        axios
            .put(`/posts/${id}`, {votes: this.state.votes - 1})
            .then((response) => {
                console.log(response)
                this.setState({
                    posts: response.data.reverse()
                })
                if (votes <= -3) {
                    axios.delete(`/posts/${id}`).then((response) => {
                        this.setState({
                            posts: response.data.reverse()
                        })
                        console.log(response + "has been deleted");
                    })
                }

            })
    }

    create = (event) => {
        event.preventDefault();
        console.log(this.state.file)
        let file = this.state.file
        let formData = new FormData();
        formData.append('imgsrc', file)
        formData.append('username', this.state.username)
        formData.append('body', this.state.body)
        console.log(formData)
        axios
            .post('/posts', formData, {
                headers: {
                    'Content-Type': 'form-data'
                  }
            })
            .then(
                (response) => {
                    console.log(response)
                    this.componentDidMount()
                }
            )
    }

    hideForm = () => {
        document.querySelector('#createPostContainer').style.display = 'none'
        document.querySelector('#createPostBackground').style.display = 'none'
    }

    showPosts = () => {
        this.hideForm();
        document.querySelector('#posts').style.display = 'block'

    }

    componentDidMount = () => {
        axios.get('/posts').then((response) => {
            this.setState({
                posts: response.data.reverse()
            })
        })
    }

    comment = (event) => {
        event.preventDefault();
        document.querySelector('#comment').value = ''
        let id = event.target.id
        console.log(id);
        axios
            .put(
                `/posts/${id}`,
                {comments: [this.state.comment]})
            .then((response) => {
                this.setState({
                    posts: response.data.reverse(),
                    comment: ''
                })
            })
    }

    // dateSort = () => {
    //     console.log(this.state.posts[0].date)
    // }

    render = ()=>{
        return(
            <div>
                {/* <button onClick={this.dateSort}>Date Sort</button> */}
                <div id="main">
                <div id="createPostBackground">
                    <div id="createPostContainer">
                        <h3 id="submitTitle">submit a post to enter</h3>
                        <span>{this.state.username}</span>
                        <form
                        encType="multipart/form-data"
                        onFocus={this.rngUsername}
                        onSubmit={this.create}>

                            <input type="hidden" name="username" value={this.state.username}/>

                            {/* <label htmlFor="title">Title: </label><br/>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                onChange={this.handleChange}/><br/> */}

                            <textarea
                                name="body"
                                id="body" cols="30" rows="10" placeholder="whats on your mind..."
                                onChange={this.handleChange}>
                            </textarea><br/>

                            <input
                                type="file"
                                name="imgsrc"
                                id="imgsrc"
                                onChange={this.handleFile}
                                onClick={this.showPreview}
                                /><br/>

                            <input
                                type="submit"
                                name="submit"
                                value="Create Post"
                                onClick={this.showPosts} />
                        </form>
                        <div id="previewContainer">
                            {(this.state.preview === true)?
                            <div id="cancelDiv" title="Cancel" onClick={this.cancelImage}><ion-icon id="cancelButton"name="close-circle-outline"></ion-icon></div>
                            : null }
                            <img id="preview" src="" alt=""/>
                        </div>
                    </div>
                </div>
            </div>

            <ul id="postContainer">
            <div id="posts">
                {this.state.posts.map((post,index) => {
                    return (
                        <li className="post" key={index}>
                            <span id="author">created by: <span className="username">{post.username}</span> at <span className="date">{post.date}</span></span>
                            <br/>
                            <div className="postBody">
                                <p className="body">{post.body}</p>
                                <br/>

                                { (post.imgsrc !== 'null')?
                                <div className="imgDiv">
                                    <img className="postImg" src={post.imgsrc}/>
                                </div>:
                                null }
                                <br/>
                                <div
                                className="buttonDiv"
                                onClick={this.hideButtons}>
                                <button
                                    className="vote"
                                    id={post._id}
                                    value={post.votes}
                                    onClick={this.upvote}
                                    onMouseEnter={this.getVotes}>
                                        ↑</button>

                                <button
                                    className="vote"
                                    id={post._id}
                                    value={post.votes}
                                    onClick={this.downvote}
                                    onMouseEnter={this.getVotes}>
                                        ↓</button><br/>
                                </div>
                                <div className="voteCountDiv">
                                    <span className="voteCount">votes: {post.votes}</span><br/>
                                </div>
                            </div>
                            <div className="commentsDiv">
                                <span id="commentsTitle">Comments: </span>
                                {post.comments.map((comment, index) => {
                                return (
                                    <div className="comment" key={index}>{comment}</div>
                                    )
                                })}
                                <form
                                    onClick={this.comment}
                                    >
                                    <input
                                        id="comment"
                                        type="text" name="comments"
                                        // value={this.state.comment}
                                        onChange={this.handleComment}
                                        />
                                    <input
                                        id={post._id}
                                        type="submit"
                                        value="create comment"/>
                                </form>
                            </div>
                        </li>
                    )
                })}
            </div>
        </ul>
            </div>
        )
    }
}



ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
)

document.querySelector('#posts').style.display = 'none'
document.querySelector('#preview').style.display = 'none'
