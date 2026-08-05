import PageLayout from '@/components/layout/PageLayout'

export default function NotFoundPage() {
  return (
    <PageLayout current="not-found">
      <main id="conteudo" tabIndex={-1} className="flex min-h-[70vh] items-center px-5 py-20">
        <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-line bg-surface p-8 md:p-14">
          <p className="text-xs uppercase tracking-[0.24em] text-cream/40">Erro 404</p>
          <h1 className="mt-5 text-4xl leading-none tracking-[-0.03em] text-cream md:text-6xl">Página não encontrada.</h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">O endereço pode ter mudado ou não fazer parte deste portfólio. Volte ao início ou consulte os projetos públicos.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/" className="inline-flex min-h-11 items-center rounded-full bg-cream px-5 text-sm font-bold text-ink">Voltar ao início</a>
            <a href="/projetos/" className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm text-cream/75">Ver projetos</a>
          </div>
        </div>
      </main>
    </PageLayout>
  )
}
