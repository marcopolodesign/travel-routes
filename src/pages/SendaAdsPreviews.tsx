import ContentBox from '../components/ContentBox'
import ScrollNav from '../components/ScrollNav'
import type { NavItem } from '../components/ScrollNav'

const NAV: NavItem[] = [
  { id: 'como', label: 'Cómo leerlos' },
  { id: 'obras', label: 'Campaña A · Obras' },
  { id: 'estudio', label: 'Campaña B · Estudio' },
]

const ANUNCIOS = [
  {
    ad: 'Campaña A — Las obras (web)',
    id: '120249508959470419',
    previews: [
      { label: 'Feed de Facebook', fmt: 'MOBILE_FEED_STANDARD', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQIzjt44TnSI9oi3NwlD-mPE96dVkVBcisPahRbAGlab-IJHyVRcP0NRJB5eLyNXH5sR6-qDZJ2QPgIs1TOUMtGW1Xkf5zxRGGt0N1q3G_lSIypr3DSvHVBs-C5DcPTrVeGEQQzfe5xRLMP-y_IE7S4zDq8-c_RvkifhXqdVTyQtKSKfxr3pRygcrTcGP7sgUXBE9y48kx-U21avbcb4wlffcKuxgtjbVE9KdMTEdwYcPaR-evkKPtjRlFE7aC9sMx5XojlMCqgbAxuHaejOlZDNB_-tfZp2n_2oTDPTIc2hFRGYXQBdonyG9OQXPRjhpyVuHWz6xKdNPfjF3p7SQI12vp9V6vo-nCYrJ3hSZtlmjncCI7PFSA4UdVEFdc358yMS_kADG1l59TsmuHqBxIXj3KOUxHJgEcrOr7gutJ2gGr1WXj-ynt_B46qyBOr-4v0&t=AQLVNjRh77SBwJL8fmc' },
      { label: 'Feed de Instagram', fmt: 'INSTAGRAM_STANDARD', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQIngS1nFCNiy-dhTRLd7ZN6eJHpiUtfH0RPJfsgqzHmejw6yE8W7FkI0bbA-VD9qdjSgDr8aZPoZSqb5k5Sll4puXxqsCz8OEfTpgd9eud5cDtJakBaKlJ7S2bDoIfUndcfRfA2bK4r14BaFSKhlAZWBGlt-rf8PRLLyrEXS11u19iHb4ajyTZNnRoqXZPejq6Mv7UxykvRh4WsusJzc6yJqrrbQd1gttM3X94Eoq38h5YExdtjWyLmyTqCU2byzb3l1twkZFA-f-n9fpBEM3c26PdZQryHQac_J2rCQxZ-5LzFulXr-1NumyfX15XHmqUvAiSBXxZx0s9z4YDwfz3lv1JSQ0Ou8iVLI_ds_NLUODNK75gjgvQDqCPm9Yxo91uiTQOnzCnPeb3F0W4CeugZMsMXDxFX-Km1B0WfpS1F-C3tnZjqDprbIYzSj4zHwLE&t=AQKwQsg2hpfgfKr-Tx8' },
      { label: 'Historias de Instagram', fmt: 'INSTAGRAM_STORY', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQLMxdcCJuLXKU8HX8170NaYvmsJ_HgK0f8vXqNof-zBrVAJT63j0uRCKpsZImml2XKS0DjDazT6VupPJeMCAPsrOXwbfujm86ciiWPF2-kPND7BlzEigCtPnsDPLh8nBhC0tSx6dQSzJCV8M2Z_GEVvWTA6WAvFGgjkasWbiOFCK5Nsi1AIgl5tdxdODNg96Ssx0xRLjIlx4OGjnIYzV8sWDtUWBnVP7mmNyPg6ltX-CscuwVUrEw89Yo5S-hC3Oy-3KzJQM-ISpaXCt_IuwvSmRxZPyQN9NEVvpqp06QGs47e6n2SvXFnQjmk9ZmJ_wdGFfMB3vuYMTTLgbw8jqVyCLJPWMd7fSxw2Q6VP5cySwjNk_2st3f2XxHZgdllrwVq5OvQLM9Uf38Ct0_nOjtr7q6OKRZv4aYWsrXiKDAvrbfieU4Nmd_AsxPwmsO5KCxE&t=AQJ1FbAMiTyV1u_bLYo' },
      { label: 'Reels de Instagram', fmt: 'INSTAGRAM_REELS', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQLiooAZt6DSjMbvva3OHPEPYckck-uGjv-f9AfvFMR07DMyPtfNRSpNPcChTQoHsySZAFaAngXC37xYmhLh1M3p5GDbjL0Z1Y7Vt9_I0wT1MRkSf5Sk4ou4KtvD-PaQ16Ttfeh8AhZI3okJeS4c9bG-eon_iolRjkYSEozm2qR-igK9i6GqfL6ZgXG8MgBE1dEZzfSCGkqmwStzct1YfvTcBSWQw7iu7S4ZLPlscp0_GTGTzd6llxcKPbh9ozkXzFygx4vzXHyvGoZx1tEEGOpKaeS3LwLXpbt9z-epb6_8h05Txh47sGw5n5Si5vzyxkP9rHnVuLeUjiO9f6sN0m_lyesan5FtZhH2510Q72C7ZxM2kpVLJRawPvVaCtauL-M6GL4uw6Lq-HM_99ll-AGpgz6LcRhyI-x6T7bcJDdHjo4cE6heyCr5JOjB0_3wbUk&t=AQL53_VF4hwn5SJGn9g' },
      { label: 'Historias de Facebook', fmt: 'FACEBOOK_STORY_MOBILE', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQK34S_X2ItaqIlOhc-4h2tBsk1ZbZDsA3uJxuG4iIk2JCutuDc8IxqmPpkbKHV5qCKibTRTFGNf9Icag-kPPQegBI_ONIRlEkgVyBZXlAlsPlMyB42P-RL5cov7iNF023mwKVXiFZfo6N1UmB1qlrWOVHaaPIL_hC2NlLQdQsqXnoFpYS25IkWNwOGZ0cMIqOFmUbp8djegu77ga7wtBiQ8amcU1DItS6PTVrgyW8Xtx1Z1Bqsa2FzzGDPuMg7SfJRgwp8-saHpkk-zcsOB5QvNkGoBeYHubkwwWjCRAo48feswSGiQj4A-hPicCWcrJrWrMjb7XzF8JZ3uMDzadzUElXNLN2RdRUM2-1y9r7aWKKDpH-UZG8-fQ6ynJZy98j5COD8GtLKmIYDVEGD8XlNyzPohE_FVisub-cJk5UlSL5XjfxHSmcyMd7iD1kX27LI&t=AQLskin0Ekykks2maIQ' },
    ],
  },
  {
    ad: 'Campaña B — El estudio (Instagram)',
    id: '120249746265210419',
    previews: [
      { label: 'Feed de Facebook', fmt: 'MOBILE_FEED_STANDARD', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQKEATxZu1-dmFw0FzfKMBHIis-DDyqDxLYonqKt_D9hpfKoUc6ccGm-aExPvnkpEf8kH4vlzPyOmDREEou8sB8Twj8XWHfK19KP5MsFdp28Qy7hlf_IK5yRcOsh3ORmhJMTuN-z0mbq2xjHIfmUdVp30QfBju8U2tCTUm6z6M_LpXnBN5J-i0mrfJ8iKg8c8-4YiuafQ8UBjOgChkxazYgxl43xR_XdhOrOZmmrFtWztA1enVI3qvoouAxqx54KOGKgB7Yym29T_B0FFt3OlHhs-zUi6rld8UcRrQOpsgTUoyIXwZEG5yawV_ANksT3SenTULWZ3Qs7i0sXwzWmlpPF5at8j16ihsHExyzxZdL8Zcc0pKgsduwV9IBoNZpwwtaKL0h9ZSrO8H1w7MJ7HOgzNIvnVDnF8pL-p37Lv-eUP-dPenEtSOTPeQyYaOoY39g&t=AQLEsLV0nh969E-gwa0' },
      { label: 'Feed de Instagram', fmt: 'INSTAGRAM_STANDARD', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQJ3mpQCfqgc7kpgHndqeSHdcEsv4m_MbTZm-YZHLNNbwtVXVJ0HN6LjB6ddklpmg8gTJbqmIkdzdHiYcNNwQL6N_cWFspbqgB_ofd5Z8bKcNW-oZLE1qoeB0Utr5GaI-MnFdPvFyRju8Tcy5RKeVpibjDsSejUH2jrVIdJppZ8n5Jtphr5KC852n5hINMWSZXG65b8TPz0iZUUg9etgsMjqZ4RUoHqs5Ke2Q0V3KHeR2jzrOd_RzGtTmP_p5pBlkkmcLuXWqIqWtceoJzaiWFgahTXtIfOW8BDZ93698JUmBYX7hKI3QuOo1NUgoIVkyTJ4SCeAujeJCmO2nObTn2fUd_GPBwsTzHiuMvDyBTWX9Tc80Vb-LfijtntPzdx3JO_zjT2wkTzlkJVrApeRS3orCmqmIYKs9llrttNIXt7nTEt2g58cl57TwaNAi2hSaFg&t=AQIjxolwhiSDawzgxKA' },
      { label: 'Historias de Instagram', fmt: 'INSTAGRAM_STORY', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQJvsniehFVdfuneXs0ynA9-d2vmrYSMKv-Uoe6E9ZyJMN21BlB4qhpJqLIXZ5dX_tQS-WJ0_aMlGysYvyQLYSjzkcx7V9_rq80634nISJKliFq04x0-B98g3hRG63Nr3jtxdfshZgS9djIt38GqYXeA-d6b_7UGYx_kjh8rSjoFSmuTJx2MX4PaunJwEwo9VewO_PfmZb4F2pBxGl6eO1nu3QyLH8v7aS2-nOJ_yX4_CciQcnF1ubgFHDdys60Sh4OwmFuEVHYR7QlfhhEgKuFWkXItxqDoJMRi1cPTHuLCXUXWKDUDdUMZtS6c4HeWA0j2LH4TgrhVeSk7lQJgq3f3FDMYgME1hDXIS6Cce9GSuB7CijC_szzsl4BF4Rz4wENQeioUu_k7HoOLCB_UPfbs8GDUZyzRf5BZUgAeRGhexI2lF1dVbNH6G_pFPk-VB64&t=AQK9jg7IwKzga-lf4OU' },
      { label: 'Reels de Instagram', fmt: 'INSTAGRAM_REELS', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQIjF1YiAtJCdRzFhoQsTvdz9ho4c3PUGh3z2YdqlRKQenCQX2luyNu2pGcjreVa1I_PxIhpCYWi6TWRQsSwqm65Uf85FdHTfqqNhjloeIFtdHtmm6qivhdzzTZvrRiGx3_Gchch_kvKFcPrbuoHT_mjrnezhJzf8GGhNtPg_4crF4IUENBL_VCBk7RnbvcTeuGjwMxOowWqdYiVp9o0wXJxBgyZU8ZIpOPA2p1mZI2kuds1g_oklb0ZWqHIMYbjzIziUhsmU8wJ3MlloC1OGxh7rOr-GnCjYThkAjyC5TOiFfhteA3qkyPXd_RP64Ws54qBU4us26YP9DQpJH_hqhO8YOFLrIsHe3QaIFW917ym1mhmy7r7SAZ6pRnPfbkez7B_5myCv1PFHlql94Q_HIuuymfHZWlsyEbzbGEGaw990cUe9mHrXt4D0FqyHc2OF-U&t=AQLr-sQ6kamkIGbtsJ0' },
      { label: 'Historias de Facebook', fmt: 'FACEBOOK_STORY_MOBILE', url: 'https://business.facebook.com/ads/api/preview_iframe.php?d=AQLHHUgzd4PILf5vupeZa6-NiJqjHZZyJqo0MCiDLfjZeOkI1nyqv5FhiBoGVUgeOph8CJCprrtncDgZ2n1NjAEQcvDEri8-b-yUIeXv9h76V2526ZqU5hu6Er_lA2_UvepYaswKdCsmHea58AN59xvUcGfdQDcs-Bw6j5qdPTNQLZI9cDYhB-FxptLQSG8XL5DH0nZv3KJqMgyDdk7RbjDx0xajmzs56to-HvfPZR_O_G8CSgjFg4JHk9wx7rgthr_ogVe-7lpJjODHjsrrWEU33XeC2W41iVRjJ_SPv_9A8TdBnKMteUispitXnLjvLqjTRuJIZ3QuNnAqN3l-6-UaoO-SrTLMyrQ3xy_rGjt39vOmwO8bO6b3cbbRGAtPgaJrHm9O2rLk6YBIH0bkLbNoPKGJsEfniKBW3aTUn1WRNaj9Zi_uXSeY0ammw4AdLlw&t=AQLzl3mMPDYDXeKS1do' },
    ],
  },
] as const

function Bloque({
  id,
  anuncio,
  bajada,
}: {
  id: string
  anuncio: (typeof ANUNCIOS)[number]
  bajada: string
}) {
  return (
    <div id={id} className="mb-20 md:mb-28 scroll-mt-28">
      <h3 className="font-thunder text-2xl md:text-3xl uppercase text-black mb-2">{anuncio.ad}</h3>
      <p className="text-black/70 max-w-2xl mb-8">{bajada}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {anuncio.previews.map((p) => (
          <div
            key={p.fmt}
            className="border border-[var(--marco-border)] rounded-lg p-4 flex flex-col"
          >
            <p className="font-thunder uppercase text-[var(--marco-accent)] text-sm mb-3">
              {p.label}
            </p>
            <div className="relative w-full h-[620px]">
              <p className="absolute inset-0 flex items-center justify-center text-center text-sm text-black/40 px-6">
                Cargando el preview desde Meta…
                <br />
                puede tardar unos segundos
              </p>
              <iframe
                src={p.url}
                loading="lazy"
                title={`${anuncio.ad} — ${p.label}`}
                className="absolute inset-0 w-full h-full rounded-md border-0"
              />
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[var(--marco-accent)] mt-3 hover:underline"
            >
              Abrir en pestaña nueva ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SendaAdsPreviews() {
  return (
    <>
      <ScrollNav items={NAV} />

      <div className="mb-16 md:mb-24">
        <span className="font-thunder text-lg md:text-2xl uppercase tracking-[0.08em] text-black">
          Meta Ads · Senda Arquitectura
        </span>
        <h1 className="font-thunder text-[15vw] md:text-[8.5vw] leading-[0.88] uppercase text-[var(--marco-accent)] text-balance mt-3">
          Los anuncios,
          <br />
          como se van
          <br />
          a ver
        </h1>
        <p className="mt-8 md:mt-10 text-black/80 text-lg md:text-xl max-w-2xl">
          Los anuncios reales renderizados por Meta, en cada ubicación donde van a aparecer. No son
          maquetas: es exactamente lo que va a ver una persona en su teléfono.
        </p>
        <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[var(--marco-border)] pt-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Campañas</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">2</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Ubicaciones</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">5</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Versiones</span>
            <p className="font-thunder text-2xl md:text-3xl text-[var(--marco-accent)] mt-1">20</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wide text-black/50">Estado</span>
            <p className="font-thunder text-2xl md:text-3xl text-black mt-1">Listos</p>
          </div>
        </div>
      </div>

      <ContentBox title="Cómo leer estos previews" id="como">
        <p>
          Cada preview muestra <strong>una</strong> de las veinte versiones. Meta arma el resto en el
          momento de mostrar el anuncio: elige la foto, el título y el texto que mejor le responden a
          cada persona, y va concentrando la inversión en la combinación que gana.
        </p>
        <p>
          Los formatos verticales — historias y Reels — recortan la imagen a pantalla completa. Por
          eso el video se preparó ya en vertical, para que no quede nada importante afuera del cuadro.
        </p>
        <p className="text-sm text-black/60">
          Los previews los genera Meta en vivo, así que pueden tardar unos segundos en aparecer.
          Caducan a las pocas semanas: si alguno deja de cargar, se regenera en el momento — no
          significa que el anuncio tenga un problema.
        </p>
      </ContentBox>

      <Bloque
        id="obras"
        anuncio={ANUNCIOS[0]}
        bajada="Lleva al portfolio de senda-arq.com, a ver las siete casas terminadas con calma."
      />
      <Bloque
        id="estudio"
        anuncio={ANUNCIOS[1]}
        bajada="Lleva al perfil de Instagram, a que la persona conozca el estudio y lo siga."
      />
    </>
  )
}
