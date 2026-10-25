// /sala/privacidad — qué pasa con lo que se escribe en la Sala. Sin login, mismo estilo que la sala.
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MarcopoloLogo from '../components/MarcopoloLogo'
import { T } from './sala-i18n'
import './sala.css'

const t = T()

export default function SalaPrivacidad() {
  const navigate = useNavigate()
  // "Volver" vuelve a la URL de la que se vino (la sala o la invitación con su código). Sin eso (abierta directo, p. ej. desde la app), a /sala.
  const vinoDeLaSala = !!(useLocation().state as { desdeSala?: boolean } | null)?.desdeSala
  const tema = (() => {
    try {
      const g = localStorage.getItem('sala.tema')
      if (g === 'light' || g === 'dark') return g
    } catch { /* modo privado */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })()
  useEffect(() => { document.title = `${t.priv.titulo} · Sala · Marco Polo` }, [])
  const p = t.priv
  return (
    <div className="sala priv-page" data-theme={tema}>
      <div className="entry"><article className="ecard priv">
        <div className="logo"><MarcopoloLogo /></div>
        <div className="label">{t.sala}</div>
        <h1>{p.titulo}</h1>
        <p className="lede">{p.intro}</p>
        {p.secciones.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            <p>{s.p.includes(p.contacto) ? <>{s.p.split(p.contacto)[0]}<a className="lnk" href={`mailto:${p.contacto}`}>{p.contacto}</a>{s.p.split(p.contacto)[1]}</> : s.p}</p>
          </section>
        ))}
        <p className="fine">
          <Link className="lnk" to="/sala" onClick={(e) => { if (vinoDeLaSala) { e.preventDefault(); navigate(-1) } }}>{p.volver}</Link>
        </p>
      </article></div>
    </div>
  )
}
