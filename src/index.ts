import express, {Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config ();

const app = express ();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface Tasks {
    id : number;
    title : string;
}

let tasks :Tasks[] = [
    {id: 1, title:"tache1"},
    {id: 2, title:"tache2"},
]

// route de test
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Typescript API !");
});

// route get /tasks
app.get("/tasks", (req: Request, res: Response) => {
    res.json(tasks);
});



// route post pour aouter une tache 
app.post("/tasks", (req: Request, res: Response) => {
    // Recupere le titre de la tache depuis le corps de la requete
    const {title} = req.body;

    // créer une nouvelle tache avec un id unique
    const newTask: Tasks = {
        id: tasks.length+1,
        title:title
    }

    //ajouter la nouvelle tache au tableau tasks
    tasks.push(newTask);

    res.status(201).json(newTask);
})



// modifier une tache avec PUT
app.put("/tasks/:id", (req: Request, res: Response) => {
    // Recupere l'id de la tache depuis les parametres
    const tasksId = parseInt(req.params.id);

    // Recupere le titre de la nouvelle tache
    const {title} = req.body;

    // trouver la tache a mettre a jour
    const taskToUpdate = tasks.find(task=> task.id ===tasksId);

    if (taskToUpdate) {
        taskToUpdate.title = title;
        res.status(200).json(taskToUpdate);
    } else {
        res.status(404).json({ message : "Tache non trouvée"})
    }

})



// supprmer une tache avec DELETE
app.delete("/tasks/:id", (req: Request, res: Response) => {
    const tasksId = parseInt(req.params.id);

    const findIndex = tasks.findIndex(task=> task.id ===tasksId);

    if (findIndex !== -1) {
        const deleteTask = tasks.splice(findIndex, 1);
        res.status(204).json(deleteTask);
    } else {
        res.status(404).json({message :"Tache non trouvée"})
    }
})




// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
})