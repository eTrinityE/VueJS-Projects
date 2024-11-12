// var toDos = [
//     {
//         text: 'Aprender HTML, CSS e Javascript',
//         done: true
//     },
//     {
//         text: 'Aprender o básico de Vue JS',
//         done: false
//     },
//     {
//         text: 'Completar o desafio de Vue JS com excelência',
//         done: false
//     }
// ]

const toDoList = {
    data() {
        return {
            // Iniciar ja com o array previamente preenchido
            // toDo: window.toDos,
            toDo: [],
            newTodo: {
                done: false
            }
        }
    },
    methods: {
        addTodo: function () {
            if (this.newTodo.text) {
                this.toDo.push(this.newTodo);
                this.newTodo = {
                    done: false
                };
                localStorage.setItem("tarefas", JSON.stringify(this.toDo));
            } else
                alert('O texto da tarefa é obrigatório');
        },
        storeToDo: function () {
            //Função para otimizar o gasto de processamento do navegador para não atualizar a todo momento, principalmente se a aplicação estiver comunicando com banco de dados
        }
    },
    //Life Cicles Hooks (olhar documentação para ver outros tipos)
    beforeCreate() {
        console.log('before create');
    },
    created() {
        this.toDo = localStorage.getItem('tarefas') ? JSON.parse(localStorage.getItem('tarefas')) : this.toDo;
    },
    updated() {
        //Usar a funnção storeToDo, e chamar ela exclusivamente nas 3 ações que necessitam dessa atualização
        localStorage.setItem("tarefas", JSON.stringify(this.toDo));
    }
};

Vue.createApp(toDoList).mount('#app');