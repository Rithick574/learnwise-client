export type ApplyToTeachFormData = {
    profession: string;
    profileDescription: string;
    linkedIn?: string;
    github?: string;
}

export type EditProfileFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profile:{
        avatar?:string,
        dob?:string,
        gender?:string
    }
    contact:{
        socialMedia:{
            instagram?:string;
            github?: string;
            linkedIn?: string;
        }
        additionalEmail?:string
    }
};
