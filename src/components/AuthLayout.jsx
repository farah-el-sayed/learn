import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";export default function AuthLayout({ children }) {useTranslation();
  return (
    <div className="grid min-h-[calc(100vh-4rem)] bg-paper lg:grid-cols-2">
      <aside className="relative h-56 overflow-hidden bg-paper sm:h-72 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]" aria-label={localizeText("A quiet study space")}>
        <img
          src="src/images/write.jpg"
          alt={localizeText("A learner writing in a notebook at a desk")}
          className="absolute bottom-0 right-0 top-4 h-[calc(100%-1rem)] w-[88%] object-cover object-center lg:top-10 lg:h-[calc(100%-2.5rem)]"
          loading="eager" />
        
        <span className="absolute bottom-0 right-0 top-4 w-[88%] bg-black/35 lg:top-10" aria-hidden="true" />
        <div className="absolute bottom-0 left-[12%] right-0 flex flex-col justify-end p-6 text-white sm:p-10 lg:p-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">{localizeText("A quieter kind of progress")}</p>
          <h2 className="mt-3 max-w-md font-serif text-[27px] leading-tight sm:text-[36px] lg:text-[54px]">{localizeText("Make room for the next idea.")}</h2>
        </div>
      </aside>
      <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12" aria-label={localizeText("Account access")}>
        {localizeText(children)}
      </section>
    </div>);

}
