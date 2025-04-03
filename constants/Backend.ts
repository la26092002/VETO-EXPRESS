export const Acteur = Object.freeze({
    Docteur: "Docteur",
    Vendeur: "Vendeur",
    Client: "Client",
    Admin: "Admin",
    Livreur: "Livreur"
} as const);

type ActeurType = keyof typeof Acteur;

export const ServiceType = Object.freeze({
    DemandeRdv: "Demande de rendez-vous",
    ConsultationSuivi: "Consultation de suivi",
    RdvRapide: "Rendez-vous rapide"
} as const);

type ServiceTypeType = keyof typeof ServiceType;

export const ServiceVenteType = Object.freeze({
    ProduitVeterinaire: "Produit vétérinaire",
    ProduitAnimalerie: "Produit animalerie"
} as const);

type ServiceVenteTypeType = keyof typeof ServiceVenteType;

export const ProductType = Object.freeze({
    Veterinaire: "Produit vétérinaire",
    Animalerie: "Produit animalerie"
} as const);

type ProductTypeType = keyof typeof ProductType;

export const ServiceStatus = Object.freeze({
    Confirmé: "Confirmé",
    EnCours: "En cours",
    Terminé: "Terminé",
    Annulé: "Annulé",
    Echoué: "Échoué"
} as const);

type ServiceStatusType = keyof typeof ServiceStatus;

export const ServiceLivraisonPar = Object.freeze({
    VetoLib: "VetoLib", // Prise de rendez-vous en ligne avec un professionnel de la santé
    VetoMoov: "VetoMoov", // Livraison sécurisée des produits vétérinaires
    Urgence: "Urgence" // À revoir plus tard
} as const);

type ServiceLivraisonParType = keyof typeof ServiceLivraisonPar;

export const API = Object.freeze({
    BASE_URL: "http://192.168.1.12:3000",
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    GET_USER: "/user/profile",
    UPDATE_USER: "/user/update",
    GET_PRODUCTS: "/products",
    GET_ORDERS: "/orders",
    CREATE_ORDER: "/orders/create"
} as const);

export type {
    ActeurType,
    ServiceTypeType,
    ServiceVenteTypeType,
    ProductTypeType,
    ServiceStatusType,
    ServiceLivraisonParType
};
