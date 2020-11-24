import CategoryServices from './services/CategoryServices';

export default {

    created() {
        this.findAll();
    },

    data() {
        return {
            categories: [],
            showDeleteModal: false,
            showEditModal: false,
            deleteCategoryId: -1,
            editCategoryId: -1,
            description: '',
            currentDescription: ''
        }
    },

    methods: {
        findAll() {
            CategoryServices.getCategories().then(response => {
                this.categories = response.data;
            }).catch(error => { 
                console.log('error get category', error);
                this.categories = [];
            });
        },

        hideModal() {
            this.showDeleteModal = this.showEditModal = false;
        },

        showDeleteModalCategory(id) {
            this.deleteCategoryId = id;
            this.showDeleteModal = true;
        },

        showEditModalCategory(id) {
            CategoryServices.getById(id).then(response => { 
                if (response.data) {
                    this.editCategoryId = id;
                    this.currentDescription = response.data.description;
                    this.showEditModal = true;
                }
                else {
                    alert('Erro ao buscar a categoria!');
                }
            }).catch(error => {
                console.log(error);
                alert('Erro ao buscar a categoria!');
            });
        },

        deleteCategory() {
            CategoryServices.remove(this.deleteCategoryId).then(response => { 
                this.showDeleteModal = false;

                if (response.data && response.data !== '') {
                    alert('Categoria excluida com sucesso!');
                    this.findAll()
                }
                else {
                    alert ('Ocorreu um erro ao excluir a Categoria!')
                }

            }).catch(error => {
                console.log('error delete category', error);
                this.showDeleteModal = false;
                alert ('Ocorreu um erro ao excluir a Categoria!')
            });
        },

        updateCategory() {
            if (this.currentDescription === '') {
                alert('Descrição precisa ser preenchida!');
                return;
            }

            const payload = { id: this.editCategoryId, description: this.currentDescription };
            CategoryServices.update(payload).then(response => { 
                this.showEditModal = false;
                this.currentDescription = '';
                this.editCategoryId = -1;

                if (response.data && response.data !== '') {
                    alert('Categoria atualizada com sucesso!');
                    this.findAll()
                }
                else {
                    alert ('Ocorreu um erro ao atualizar a Categoria!')
                }

            }).catch(error => {
                console.log('error delete category', error);
                this.showDeleteModal = false;
                alert ('Ocorreu um erro ao excluir a Categoria!')
            });
        },

        insertCategory() {
            if (this.description === '') {
                alert('Descrição precisa ser preenchida!');
                return;
            }

            const payload = { description: this.description};
            CategoryServices.insert(payload).then(response => { 
                if (response.data && response.data !== '') {
                    alert('Categoria inserida com sucesso!');
                    this.description = '';
                    this.findAll();
                }
                else {
                    alert ('Ocorreu um erro ao inserir a Categoria!')
                }
            }).catch(() => alert ('Ocorreu um erro ao inserir a Categoria!'));
        }
    }
}