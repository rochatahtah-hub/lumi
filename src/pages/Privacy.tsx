import { Card, Page, TopBar } from '../components/ui'

export default function PrivacyPage() {
  return (
    <>
      <TopBar title="Privacidade" />
      <Page>
        <h1 className="text-2xl font-bold">Como o LUMI cuida dos seus dados</h1>
        <p className="mt-2 text-cinza-texto">O LUMI é usado por crianças e adolescentes. Por isso, coletamos o mínimo possível — e só o que ajuda você a estudar.</p>

        <Card className="mt-5">
          <h2 className="font-semibold">Sem conta (padrão)</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-grafite-3">
            <li>Seu progresso, pontos e conquistas ficam guardados <b>só neste aparelho</b>.</li>
            <li>Não pedimos nome, CPF, telefone, endereço nem foto.</li>
            <li>A série/idade serve só para adaptar a explicação.</li>
          </ul>
        </Card>
        <Card className="mt-3">
          <h2 className="font-semibold">Com conta (opcional)</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-grafite-3">
            <li>Pedimos apenas e-mail e senha. Para menores de 18 anos, recomendamos o e-mail do responsável.</li>
            <li>Seu histórico de estudos é salvo na nuvem para aparecer em outros aparelhos.</li>
            <li>Você pode sair ou pedir a exclusão da conta a qualquer momento.</li>
          </ul>
        </Card>
        <Card className="mt-3">
          <h2 className="font-semibold">Estatísticas anônimas</h2>
          <p className="mt-2 text-grafite-3">
            Para melhorar as aulas, registramos de forma anônima quais conteúdos são estudados e quais questões têm mais erros. Isso usa um código aleatório do aparelho — nunca seu nome ou o que você escreveu.
          </p>
        </Card>
        <Card className="mt-3">
          <h2 className="font-semibold">Conteúdo que você cola</h2>
          <p className="mt-2 text-grafite-3">
            O texto que você cola é usado só para montar a sua aula. Não inclua dados pessoais nele. Em "Mais", você pode baixar ou apagar todos os seus dados deste aparelho.
          </p>
        </Card>
      </Page>
    </>
  )
}
