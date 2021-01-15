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
        randomAdjective: "",
        randomPokemon: "",
        randomUsername: ""
    }

    rngUsername = () => {
        randomPokemon();

        this.setState({
            randomAdjective: randomAdjective(adjectives),
            randomPokemon: pokemon,
            randomUsername: `${randomAdjective(adjectives)} ${pokemon}`
        })
    }

    render = ()=>{
        return(
            <div>
            <h2>One and Done</h2>
            <button onClick={this.rngUsername}>random name: </button>
            {this.state.randomUsername}
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
)
