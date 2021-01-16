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
        posts: []
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

    handleFile = (event) => {
        this.setState({
            file: event.target.files[0]
        })
        console.log(event.target.files[0])
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

    cancelImage = (event) => {
        event.preventDefault(); 
        document.getElementById('imgsrc').value = ''
        document.getElementById('preview').src = ''
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


    render = ()=>{
        return(
            <div>
            <h2 id="title">One and Done</h2>
                <div id="createPostContainer">
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
                        
                        <label htmlFor="imgsrc">Select Image:</label><br/>
                        <input 
                            type="file" 
                            name="imgsrc"
                            id="imgsrc"
                            onChange={this.handleFile}
                            onChange={this.previewFile}/><br/>

                        <button title="Cancel" onClick={this.cancelImage}><span>cancel</span></button>

                        <input
                            type="submit"
                            name="submit"
                            value="Create Post" />    
                    </form>
                    <img id="preview" src="" alt=""/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
)
