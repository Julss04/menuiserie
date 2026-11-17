import type { Metadata } from "next";
import { LegalDoc } from "../../components/LegalDoc";
import { PageIntro } from "../../components/PageIntro";
import { CONTACT, LEGAL } from "@/lib/tri-marrant";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de Tri-Marrant (association Ose Recyclerie).",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageIntro title="Mentions légales" intro="Les informations légales relatives à ce site et à l'association qui l'édite." />
      <LegalDoc updatedAt={LEGAL.updatedAt}>
        <h2>Éditeur du site</h2>
        <p>
          Ce site est édité par <strong>{LEGAL.orgName}</strong>, association loi 1901 créée en 2019,
          qui exploite la ressourcerie Tri-Marrant et l&apos;atelier vélo L&apos;Annexe.
        </p>
        <ul>
          <li>Siège social : {LEGAL.orgAddress}</li>
          <li>SIRET : {LEGAL.siret}</li>
          <li>Numéro RNA : {LEGAL.rna}</li>
          <li>
            Téléphone : <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </li>
          <li>
            Courriel : <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </li>
          <li>Directeur ou directrice de la publication : {LEGAL.publisher}</li>
        </ul>

        <h2>Hébergeur</h2>
        <p>
          Le site est hébergé par <strong>{LEGAL.host.name}</strong>, {LEGAL.host.address} —{" "}
          <a href={LEGAL.host.url} target="_blank" rel="noopener noreferrer">
            {LEGAL.host.url}
          </a>
          .
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Le nom, le logo et la charte graphique de Tri-Marrant et de L&apos;Annexe sont la propriété de
          l&apos;association. Les textes et éléments de ce site ne peuvent pas être réutilisés sans son
          accord.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Ce site ne demande aucune information personnelle, n&apos;utilise ni cookie ni traceur, et ne
          mesure pas la navigation. Les détails figurent dans notre{" "}
          <a href="/confidentialite">politique de confidentialité</a>.
        </p>
      </LegalDoc>
    </>
  );
}
