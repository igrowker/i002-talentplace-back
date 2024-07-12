import { AppDataSource } from "../config/typeorm.config"
import Categoria from "../entities/categoria"

const categoryRepository = AppDataSource.getRepository(Categoria);

const postNewCategory = async (nameCategory: string) => {

    const category = await findCategoryByName(nameCategory);

    try {
        if (category) {
            return category
        }
        else {
            const newCategory = await categoryRepository.create({
                nombre: nameCategory,
            });
            const newCategorySaved = await categoryRepository.save(newCategory);
            return newCategorySaved;
        }        

    } catch (error) {
        throw error;
    }
}

const findCategoryByName = async (name: string) => {

    try {
        const category = await categoryRepository.findOne({ 
            where: {
                nombre: name.toLocaleLowerCase()
            }
        });
        
        return category;
        
    } catch (error) {
        throw error
    }
}

export default {
    postNewCategory
}