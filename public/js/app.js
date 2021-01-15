// logs all adjectives in adjectives.js
// console.log(adjectives);
//returns a random word from the array of adjectives
let randomAdjective = (array) => {
    let rng = Math.floor(Math.random() * array.length);
    let randomAdjective = array[rng];
    return randomAdjective
}

//successfully logs a random adjective each time function is invoked
// console.log(randomAdjective(adjectives)
// );

class App extends React.Component {
    state= {
        randomAdjective: ""
    }

    showAdjective = (event) => {
        //testing if random name works on click
        console.log(randomAdjective(adjectives));
        this.setState({
            randomAdjective: randomAdjective(adjectives)
        })
    }

    render = ()=>{
        return(
            <div>
            <h2>One and Done</h2>
            <button onClick={this.showAdjective}>random name: {this.state.randomAdjective}</button>
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
)
