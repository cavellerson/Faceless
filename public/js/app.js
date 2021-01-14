class App extends React.Component {
    render = ()=>{
        return(
            <h2>Hello World</h2>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
)