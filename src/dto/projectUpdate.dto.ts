interface ProjectUpdateDto {
    projectId?: string;
    empresaId?: string;
    titulo?: string;
    descripcion?: string;
    requisitos?: string;
    habilidades?: string[];
    categoria?: string;
    modalidad?: string;
    estado?: boolean;
}
export default ProjectUpdateDto;