import { AppDataSource } from "../config/typeorm.config";
import { Habilidad } from "../entities/habilidad";

const habilityRepository = AppDataSource.getRepository(Habilidad);

const postNewHability = async (habilities: string[]) => {
    let habilitiesList: Habilidad[] = [];

    try {

        for await (const hability of habilities){
            
            const habilityFinded = await findHabilityByName(hability.toLocaleLowerCase());                      

            if (!habilityFinded) {
                const newHability = await habilityRepository.create({nombre: hability});
                const newHabilityCreated = await habilityRepository.save(newHability);
                habilitiesList.push(newHabilityCreated);
            }
            else {
                habilitiesList.push(habilityFinded);
            }
            
        }
        
        return habilitiesList;
        
    } catch (error) {
        throw error
    }
    
}

const findHabilityByName = async (name: string) => {

    try {
        const hability = await habilityRepository.findOne({ 
            where: {
                nombre: name.toLocaleLowerCase()
            }
        });
        
        return hability;
        
    } catch (error) {
        throw error
    }
}

export default {
    postNewHability
}