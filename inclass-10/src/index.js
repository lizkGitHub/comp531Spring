//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

let taskId = 1;

class ToDoItem extends React.Component {

    constructor(props) {   
        super(props)
        this.state = {
            done: false
        }
    }

    toggleDone() {
        this.setState({
            done: !this.state.done
        })
    }

    render() { return (

        /*
        h("li", { id: `task${_taskId++}`}, [
            h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        ])
        */

        <li id={'task'+(taskId++)} key={taskId}>
            <i className="check glyphicon glyphicon-check"
                onClick={() => this.toggleDone()}>
            </i>
            <span className={this.state.done ? "completed" : ""}>
                {typeof(this.props.text) === "string" ? this.props.text : ""}
            </span>
            <i className="destroy glyphicon glyphicon-remove" 
                onClick={() => this.props.remove()}>
            </i>
        </li>



    )}
}

class ToDos extends React.Component {

    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
    }

    addTodo(text) {
        // IMPLEMENT ME!
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text:this.newText.value}
            ]
        })
        this.newText.value = ''
    }

    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    render() { return (


        <div>
            <input id="newTODO" type="text" placeholder="To Do" ref={(node) => this.newText = node}></input>
            <button onClick={() => this.addTodo()}>Add Item</button>
            <span className="submit">
                <a href="https://webdev-rice.herokuapp.com" target="_blank">Submit your exercise</a>
            </span>
            <ul className="todo">
                {this.state.todoItems.map((x, i) => 
                    <ToDoItem key={x.id} text={x.text} remove={() => this.removeTodo(x.id)}/>)}
            </ul>
        </div>
        // Hint: <input ... ref={ (node) => this.... = node } />
        /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
