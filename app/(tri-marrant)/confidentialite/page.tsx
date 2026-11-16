import type { Metadata } from "next";
import { LegalDoc } from "../../components/LegalDoc";
import { PageIntro } from "../../components/PageIntro";
import { CONTACT, LEGAL } from "@/lib/tri-marrant";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Ce site ne collecte aucune donnée personnelle, n'utilise ni cookie ni traceur. Vos droits au titre du RGPD.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <PageIntro
        tone="jaune"
        title="Confidentialité"
        intro="Ce site respecte votre vie privée : il ne collecte aucune donnée personnelle."
      />
      <LegalDoc updatedAt={LEGAL.updatedAt}>
        <h2>En bref</h2>
        <p>
          Ce site est une simple vitrine. Il ne contient aucun formulaire, aucun compte, aucun espace de
          connexion. <strong>Il ne collecte, ne stocke et ne transmet aucune donnée personnelle.</strong>
        </p>

        <h2>Cookies et traceurs</h2>
        <p>
          Le site <strong>n&apos;utilise aucun cookie</strong> et aucun traceur publicitaire ou de
          mesure d&apos;audience. Les polices de caractères sont hébergées sur notre propre serveur :
          votre navigateur ne contacte donc aucun service extérieur en les chargeant. C&apos;est pourquoi
          aucune demande de consentement aux cookies ne vous est présentée.
        </p>

        <h2>Si vous nous contactez</h2>
        <p>
          Lorsque vous nous écrivez à <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ou que vous
          nous appelez au <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>, nous recevons les informations
          que vous nous transmettez (nom, coordonnées, message). Nous les utilisons uniquement pour vous
          répondre et nous ne les communiquons à personne.
        </p>

        <h2>Liens vers d&apos;autres sites</h2>
        <p>
          Certaines pages renvoient vers des sites extérieurs (une carte, notre page Facebook). Une fois
          sur ces sites, vous dépendez de leurs propres règles de confidentialité, que nous ne
          maîtrisons pas.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique
          et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement
          des informations vous concernant que nous détiendrions. Pour l&apos;exercer, écrivez-nous à{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. En cas de désaccord, vous pouvez saisir
          la CNIL : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
        </p>

        <h2>Responsable</h2>
        <p>
          Le responsable du traitement est l&apos;association <strong>{LEGAL.orgName}</strong>. Voir les{" "}
          <a href="/mentions-legales">mentions légales</a> pour ses coordonnées complètes.
        </p>
      </LegalDoc>
    </>
  );
}
