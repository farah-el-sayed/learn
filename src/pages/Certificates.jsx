import { useTranslation } from "react-i18next";import { localizeText } from "../i18n.js";import { useState } from 'react';
import { Award, Download, Printer } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import Button from '../components/Button.jsx';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { SectionHead } from '../components/Cards.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { downloadCertificatePdf, printCertificate } from '../services/certificatePdf.js';

export default function Certificates() {useTranslation();
  const { certificates, profile } = useApp();
  const [busyId, setBusyId] = useState(null);

  const handleDownload = (c) => {
    setBusyId(c.id);
    try {
      downloadCertificatePdf({ course: c.course, student: profile.name, date: c.date, code: c.code });
    } finally {
      setTimeout(() => setBusyId(null), 600);
    }
  };

  return (
    <div className="mx-auto max-w-shell px-5 py-14">
      <SectionHead kicker="Student" title={localizeText("Certificates")} lede="Earned slowly. Kept permanently." />
      {localizeText(certificates.length === 0 ?
      <EmptyState
        icon={Award}
        title={localizeText("No certificates yet")}
        lede="Complete courses and quizzes to earn your certificates. They'll appear here permanently."
        action={
        <Button variant="primary" to="/courses">{localizeText("Browse courses")}

        </Button>
        } /> :


      <div className="grid gap-6 md:grid-cols-2">
          {localizeText(certificates.map((c) =>
        <div key={c.id} className="border border-line bg-white p-10 text-center">
              <Award size={28} className="mx-auto text-clay" />
              <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-ink-faint">{localizeText("Certificate of completion")}</p>
              <p className="mt-3 font-serif text-[28px]">{localizeText(c.course)}</p>
              <p className="mt-2 text-[13.5px] text-ink-muted">{localizeText("Awarded to")}{localizeText(" ")}{localizeText(profile.name)}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(c.date)}</p>
              <p className="mt-4 text-[12px] text-ink-faint">{localizeText("Ref")}{localizeText(" ")}{localizeText(c.code)}</p>
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
              variant="quiet"
              size="lg"
              icon={Download}
              loading={busyId === c.id}
              onClick={() => handleDownload(c)}>{localizeText("Download PDF")}


            </Button>
                <Button
              variant="ghost"
              size="lg"
              icon={Printer}
              onClick={() => printCertificate({ course: c.course, student: profile.name, date: c.date, code: c.code })}
              aria-label={`Print ${c.course} certificate`}>{localizeText("Print")}


            </Button>
              </div>
            </div>
        ))}
          <div className="border border-dashed border-line p-10">
            <p className="font-serif text-[22px]">{localizeText("Next: Design Foundations")}</p>
            <p className="mt-2 text-[13.5px] text-ink-muted">{localizeText("Finish the menu project and the final quiz to unlock your second certificate.")}</p>
            <ProgressBar value={38} tone="clay" className="mt-4" />
            <p className="mt-2 text-[12px] text-ink-faint">{localizeText("38% complete")}</p>
          </div>
        </div>)
      }
    </div>);

}
