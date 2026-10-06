import { localizeText } from "../i18n.js";import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Play, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Button from './Button.jsx';
import { lessonVideoEmbed, lessonVideoWatch, lessonVideo } from '../services/lessonVideos.js';

// The lesson player shell: media frame, lesson header, tab content (children),
// completion action and prev/next navigation.
export function CoursePlayer({
  course,
  lesson,
  index = 0,
  total = 1,
  done = false,
  onToggle,
  onComplete,
  actions,
  prev,
  next,
  mediaLabel,
  className = '',
  children
}) {
  const { t, i18n } = useTranslation();
  if (!course || !lesson) return null;
  const complete = onToggle || onComplete;
  const isArabic = i18n.resolvedLanguage === 'ar';
  const mediaImage = lesson.mediaImage || course.coverImage;
  const video = lessonVideo(lesson);
  const embedUrl = lessonVideoEmbed(lesson);
  const watchUrl = lessonVideoWatch(lesson);
  const [playing, setPlaying] = useState(false);
  const lessonTo = (l) => l ? `/courses/${course.id}/lessons/${l.id}` : undefined;

  return (
    <article id="lesson-player" className={`min-w-0 scroll-mt-24 ${className}`.trim()}>
      {localizeText(embedUrl && playing ?
      <div className="overflow-hidden border border-line bg-black">
          <div className="aspect-video w-full">
            <iframe
            src={`${embedUrl}&autoplay=1`}
            title={`${localizeText(lesson.title)} — ${t('coursePlayer.videoLesson')}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen />
          
          </div>
          {localizeText(video &&
        <div className="flex flex-wrap items-center gap-2 bg-white px-4 py-3 text-[13px]">
              <Youtube size={15} className="text-clay" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate text-ink-muted">{t('coursePlayer.nowPlaying', { title: localizeText(video.title) })}</span>
              <a href={watchUrl} target="_blank" rel="noreferrer" className="font-medium text-ink underline underline-offset-2 hover:text-clay">
                {localizeText(t('coursePlayer.watchOnYoutube'))}
              </a>
              <button type="button" onClick={() => setPlaying(false)} className="font-medium text-ink-muted underline underline-offset-2 hover:text-ink">
                {localizeText(t('coursePlayer.close'))}
              </button>
            </div>)
        }
        </div> :

      <div className="relative isolate flex aspect-video flex-col items-start justify-end overflow-hidden border border-line p-4 sm:p-6" style={{ background: course.coverTone }}>
        {localizeText(mediaImage && <img src={mediaImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />)}
        <span className="absolute inset-0 bg-black/35" aria-hidden="true" />
        <span className="relative z-10 bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
          {localizeText(t('coursePlayer.lessonOf', { current: index + 1, total }))}
        </span>
        {localizeText(embedUrl ?
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="relative z-10 mt-3 flex h-10 w-10 items-center justify-center bg-pine text-paper transition hover:bg-pine-deep focus-ring sm:h-12 sm:w-12"
          aria-label={t('coursePlayer.playVideo', { title: localizeText(lesson.title) })}
          title={t('coursePlayer.playVideo', { title: localizeText(lesson.title) })}>
          
            <Play size={18} />
          </button> :

        <button
          type="button"
          onClick={() => {
            const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
            document.getElementById('lesson-content')?.scrollIntoView({ behavior, block: 'start' });
          }}
          className="relative z-10 mt-3 flex h-10 w-10 items-center justify-center bg-pine text-paper transition hover:bg-pine-deep focus-ring sm:h-12 sm:w-12"
          aria-label={t('coursePlayer.startLesson')}
          title={t('coursePlayer.startLesson')}>
          
            <Play size={18} />
          </button>)
        }
        <p className="relative z-10 mt-3 text-[12.5px] text-white">
            {video ?
            <>{t('coursePlayer.videoLesson')} · {localizeText(lesson.length)} · {localizeText(video.title)}</> :
            mediaLabel ?
            localizeText(mediaLabel) :
            <>{localizeText(lesson.kind)} · {localizeText(lesson.length)} · {t('coursePlayer.lessonContentBelow')}</>}
          </p>
        {localizeText(watchUrl &&
        <a href={watchUrl} target="_blank" rel="noreferrer" className="relative z-10 mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white underline underline-offset-2 hover:text-white/80">
            <Youtube size={14} aria-hidden="true" /> {t('coursePlayer.watchLessonOnYoutube', { title: localizeText(lesson.title) })}
          </a>)
        }
      </div>)
      }

      <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-clay">{localizeText(isArabic ? course.titleAr || course.title : course.title)}</p>
      <h1 className="mt-2 font-serif text-[32px] leading-tight md:text-[38px]">{localizeText(isArabic ? lesson.titleAr || lesson.title : lesson.title)}</h1>
      <p className="mt-2 text-[13px] text-ink-muted">
        {localizeText(isArabic ? lesson.kindAr || lesson.kind : lesson.kind)}{localizeText(" ")}{localizeText("·")}{localizeText(" ")}{localizeText(lesson.length)}
        {course.instructor?.name && <> · {t('coursePlayer.instructor', { name: localizeText(isArabic ? course.instructor.nameAr || course.instructor.name : course.instructor.name) })}</>}
      </p>

      {localizeText(children)}

      {localizeText((complete || actions) &&
      <div className="flex flex-wrap gap-3 border-t border-line pt-5">
          {localizeText(complete &&
        <Button variant={done ? 'primary' : 'ink'} size="lg" icon={done ? Check : undefined} onClick={complete}>
              {localizeText(done ? t('coursePlayer.completed') : t('coursePlayer.markComplete'))}
            </Button>)
        }
          {localizeText(actions)}
        </div>)
      }

      {localizeText((prev || next) &&
      <div className="mt-5 flex justify-between border-t border-line pt-5">
          {localizeText(prev ?
        <Link to={lessonTo(prev)} className="flex items-center gap-1 text-[13.5px] font-medium">
              <ChevronLeft size={15} /> {localizeText(t('coursePlayer.previous'))}
            </Link> :
        <span />)}
          {localizeText(next &&
        <Link to={lessonTo(next)} className="flex items-center gap-1 text-[13.5px] font-medium">
              {localizeText(t('coursePlayer.next'))} <ChevronRight size={15} />
            </Link>)
        }
        </div>)
      }
    </article>);

}

export default CoursePlayer;
