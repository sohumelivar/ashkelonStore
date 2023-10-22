import { makeAutoObservable } from "mobx";

class CategoryStore {
    constructor() {
        makeAutoObservable(this);
    }

    mainCategory = [];
    category = [];
    isModalVisible = false;
    parentCategory = [];
    finallyCategory = [];
    completeBtn = false;

    setMainCategory (mainCategory) {
        this.mainCategory = mainCategory;
    }

    setCategory(category) {
        this.category = category;
    }

    setIsModalVisible () {
        this.isModalVisible = !this.isModalVisible;
    }

    setParentCategory (category) {
        this.parentCategory = [...this.parentCategory, category];
    }

    setResetParentCaregory () {
        this.parentCategory = [];
    }

    setSliceParentCategory (i) {
        this.parentCategory = this.parentCategory.slice(0, i + 1);
    }

    setFinallyCategory (finallyCategory) {
        this.finallyCategory = finallyCategory;
    }

    setCompleteBtn () {
        this.completeBtn = !this.completeBtn;
    }

    setClassNameCategory (id) {
       this.category.map( el => Object.assign(el, { finnaly: false}));
       this.category = this.category.map( el => el.id === Number(id) ? Object.assign(el, { finnaly: true}) : el );
       
    }
}

const categoryStore = new CategoryStore();

export default categoryStore;