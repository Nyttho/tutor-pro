import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-gray-800">
      {/* Bouton retour */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-indigo-600 hover:underline"
      >
        ← Retour
      </button>

      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>

      <p className="mb-4">
        Cette politique de confidentialité décrit comment nous collectons,
        utilisons et protégeons les données personnelles dans le cadre de notre
        application de mise en relation entre professeurs particuliers et
        élèves.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Données collectées</h2>
      <p className="mb-4">
        Lors de l'inscription ou dans le cadre de l’utilisation du service, nous
        pouvons collecter les données suivantes :
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Professeurs :</strong> nom, email, mot de passe
        </li>
        <li>
          <strong>Élèves :</strong> nom, prénom, email, mot de passe, numéro de
          téléphone, adresse
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Finalités de la collecte
      </h2>
      <p className="mb-4">Ces données sont nécessaires pour :</p>
      <ul className="list-disc list-inside mb-4">
        <li>Permettre la création de compte et l’authentification</li>
        <li>Mettre en relation professeurs et élèves</li>
        <li>Gérer les communications et plannings</li>
        <li>Assurer un suivi pédagogique et administratif</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Durée de conservation
      </h2>
      <p className="mb-4">
        Les données personnelles sont conservées pendant toute la durée
        d'utilisation du compte. En cas de suppression du compte, les données
        seront supprimées ou anonymisées dans un délai de 12 mois.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Sécurité des données
      </h2>
      <p className="mb-4">
        Les données sont stockées de manière sécurisée. Les mots de passe sont
        chiffrés. Nous utilisons HTTPS et restreignons l'accès aux bases de
        données aux seules personnes autorisées.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Droits des personnes concernées
      </h2>
      <p className="mb-4">
        Conformément au RGPD, chaque personne concernée dispose des droits
        suivants :
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Accès à ses données</li>
        <li>Rectification</li>
        <li>Suppression</li>
        <li>Portabilité</li>
        <li>Opposition au traitement</li>
      </ul>
      <p className="mb-4">
        Vous pouvez exercer ces droits en nous contactant à :{" "}
        <a
          href="mailto:support@votresite.fr"
          className="text-blue-600 underline"
        >
          support@votresite.fr
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Partage avec des tiers
      </h2>
      <p className="mb-4">
        Nous ne partageons pas vos données avec des tiers à des fins
        commerciales. Certaines données peuvent être partagées avec des
        prestataires techniques (hébergement, envoi d’e-mails, outils
        statistiques) strictement dans le cadre du bon fonctionnement de
        l'application.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Consentement</h2>
      <p className="mb-4">
        En utilisant notre service, vous acceptez cette politique de
        confidentialité. Lors de la création de compte, un consentement
        explicite vous est demandé.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        8. Données concernant les élèves sans compte
      </h2>
      <p className="mb-4">
        Certains professeurs peuvent enregistrer des informations sur leurs
        élèves même si ceux-ci ne créent pas de compte sur notre plateforme. Ces
        données (nom, prénom, email, téléphone, adresse) sont utilisées
        uniquement dans le cadre de l’organisation des cours particuliers.
      </p>
      <p className="mb-4">
        Les personnes concernées (ou leurs représentants légaux dans le cas des
        mineurs) peuvent exercer leurs droits d’accès, de rectification ou de
        suppression à tout moment en nous contactant à l’adresse mentionnée
        ci-dessus. Ces données ne sont partagées avec aucun tiers et ne sont
        utilisées à aucune autre fin que celle décrite dans ce document.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Dernière mise à jour : 19 juin 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
