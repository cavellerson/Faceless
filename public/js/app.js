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
        preview: false
    }

    rngUsername = () => {
        randomPokemon();
        this.setState({
            username: `${randomAdjective(adjectives)} ${pokemon}`
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
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

    componentDidMount = () => {
        axios.get('/posts').then((response) => {
            this.setState({
                posts: response.data
            })
        })
    }

    upvote = (event) => {
        this.setState({
            votes: this.state.votes + 1
        })
        axios.put(`/posts/${event.target.value}`, this.state.votes).then((response) => {
            console.log(`${response.data.votes} has been UPVOTED`);
        })
    }


    downvote = (event) => {
        this.setState({
            votes: this.state.votes - 1
        })

        axios.put(`/posts/${event.target.value}`, this.state.votes).then((response) => {
            console.log(`${response.data} has been DOWNVOTED`);
            if (this.state.votes === -3) {
                axios.delete(`/posts/${event.target.value}`).then((response) => {
                    console.log(`${response.data.votes} has been deleted`);
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
                    // this.setState({
                    //     username: "",
                    //     posts: response.data
                    // })
                }
            )
    }

    hideForm = () => {
        document.querySelector('#createPostContainer').style.display = 'none'
        document.querySelector('#createPostBackground').style.display = 'none'
    }


    showPosts = () => {
        this.hideForm();
        document.querySelector('.posts').style.display = 'block'

    }


    componentDidMount = () => {
        axios.get('/posts').then((response) => {
            this.setState({
                posts: response.data
            })
        })
    }


    render = ()=>{
        return(
            <div>
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

                            {(this.state.preview === true)?
                            <button title="Cancel" onClick={this.cancelImage}><span>cancel</span></button>
                            : null }

                            <input
                                type="submit"
                                name="submit"
                                value="Create Post"
                                onClick={this.showPosts} />
                        </form>
                        <div id="previewContainer">
                            <img id="preview" src="" alt=""/>
                        </div>
                    </div>
                </div>
            </div>

            <ul>
            <div className="posts">
                {this.state.posts.map((post,index) => {
                    return (
                        <li key={index}>
                            {post.username}
                        <br/>
                            {post.body}
                        <br/>
                        <img src={post.imgsrc}/>
                        <br/>
                        <button value={post._id} onClick={this.upvote}>↑ {this.state.votes}</button>
                        <button value={post._id} onClick={this.downvote}>↓ {this.state.votes}</button>
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

document.querySelector('.posts').style.display = 'none'
document.querySelector('#preview').style.display = 'none'