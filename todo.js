import express from "express"

const app = express()
const PORT = 3000
app.use(express.json())

let todos = []
let id = 35
for(let i = 1; i <= id; i++) {
    todos.push({todo: `Todo ${i}`, id: i, done: false, createdAt: Date()})
}

app.get("/api/todo", (req, res) => {
    let page = Math.floor(Number(req.query.page)) || 1
    res.json(todos.slice((page - 1) * 10, ((page - 1) * 10) + 10))
})

app.post("/api/todo", (req, res) => {
    const todo = {
        todo: req.body.todo,
        id: ++id,
        done: req.body.done,
        createdAt: Date()
    }
    if(todo.todo) {
        todos.push(todo)
        res.json("Todo addded")
    }
    else res.json("Not added!")
})

app.delete("/api/todo/:id(\\d+)", (req, res) => {
    if(todos.find(todo => todo.id === Number(req.params.id))) {
        todos = todos.filter(todo => todo.id !== Number(req.params.id))
        res.json(`Id ${req.params.id} deleted!`)
    }
    else res.json("Nothing deleted!")
})


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})