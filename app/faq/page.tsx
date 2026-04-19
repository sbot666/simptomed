import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";

export const metadata = {
  title: "FAQ — Simptomed",
  description:
    "Ответы на частые вопросы о Simptomed: безопасность, конфиденциальность, чем отличается от визита к врачу.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Вопросы"
        title="Часто задаваемые вопросы"
        subtitle="Если вашего вопроса нет — напишите на hello@simptomed.ru."
      />
      <div className="-mt-12">
        <FAQ />
      </div>
    </>
  );
}
